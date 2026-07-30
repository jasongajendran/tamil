// Shared Audio Context & Active References for iOS WebKit & Cross-Platform compatibility
let globalAudioCtx: AudioContext | null = null;
let sharedAudioElement: HTMLAudioElement | null = null;
let isAudioUnlocked = false;

const clientAudioCache = new Map<string, string>();

const CONSONANT_PHONETIC_MAP: Record<string, string> = {
  'ஃ': 'அக்கு',
  'க்': 'இக்',
  'ங்': 'இங்',
  'ச்': 'இச்',
  'ஞ்': 'இஞ்',
  'ட்': 'இட்',
  'ண்': 'இண்',
  'த்': 'இத்',
  'ந்': 'இந்',
  'ப்': 'இப்',
  'ம்': 'இம்',
  'ய்': 'இய்',
  'ர்': 'இர்',
  'ல்': 'இல்',
  'வ்': 'இவ்',
  'ழ்': 'இழ்',
  'ள்': 'இள்',
  'ற்': 'இற்',
  'ன்': 'இன்',
};

function normalizeTamil(text: string): string {
  const trimmed = text.trim();
  return CONSONANT_PHONETIC_MAP[trimmed] || trimmed;
}

// Lazy AudioContext initializer with iOS Safari webkitAudioContext support
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  return globalAudioCtx;
}

// Get or create a single pre-unlocked HTMLAudioElement for iOS Safari
function getSharedAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioElement) {
    sharedAudioElement = new Audio();
    // Warm up element with 0.1s silent WAV data URI
    sharedAudioElement.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
  }
  return sharedAudioElement;
}

// Pre-fetch speech voices for iOS WebKit engine
let cachedVoices: SpeechSynthesisVoice[] = [];
function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

// Synchronous audio unlocker function for iOS Safari user gesture compliance
export function unlockAudio() {
  if (typeof window === 'undefined') return;

  // 1. Unlock Web Audio API context
  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    if (ctx && !isAudioUnlocked) {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      isAudioUnlocked = true;
    }
  } catch (err) {
    console.warn('AudioContext unlock:', err);
  }

  // 2. Unlock HTML5 Audio element on user gesture
  try {
    const audio = getSharedAudioElement();
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  } catch {
    // Ignore unlock catch
  }

  // 3. Pre-warm Web Speech API on iOS Safari
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
    } catch {
      // Ignore fallback pre-warm error
    }
  }
}

// Register global user gesture listeners to auto-unlock on first tap/touch on iOS devices
if (typeof window !== 'undefined') {
  const unlockEvents = ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click'];
  const handleUserGesture = () => {
    unlockAudio();
    unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUserGesture));
  };
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleUserGesture, { passive: true, once: true });
  });
}

// Stop any currently playing speech or HTML audio
function stopAllAudio() {
  if (sharedAudioElement) {
    try {
      sharedAudioElement.pause();
      sharedAudioElement.currentTime = 0;
    } catch {
      // Ignore
    }
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
}

// Find best matching voice for Tamil/English on iOS Safari
function findBestVoice(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  const targetLang = lang.toLowerCase().replace('_', '-');
  const shortLang = targetLang.slice(0, 2);

  return (
    voices.find((v) => v.lang.toLowerCase().replace('_', '-') === targetLang) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(shortLang)) ||
    voices.find((v) => v.name.toLowerCase().includes('tamil')) ||
    null
  );
}

// Synchronously trigger Web Speech API (iOS Safari requires sync call in click handler)
function speakWebSpeechSync(text: string, lang: 'ta-IN' | 'en-US', slowMode: boolean): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = slowMode ? 0.6 : 0.9;
    utterance.pitch = 1.0;

    const voice = findBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('WebSpeech API sync speak error:', err);
    return false;
  }
}

// Detect if running on static host (e.g. GitHub Pages) where backend Express API routes do not exist
function checkIsStaticHosting(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host.includes('github.io') || host.includes('netlify') || host.includes('vercel') || host.includes('pages.dev');
}

export const playAudio = async (text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN', slowMode: boolean = false) => {
  if (typeof window === 'undefined' || !text) return;

  // CRITICAL STEP FOR iOS SAFARI: Unlock audio context & speech synthesis SYNCHRONOUSLY
  unlockAudio();

  // Stop previous sounds
  stopAllAudio();

  const cleanText = normalizeTamil(text);
  const cacheKey = `${lang}_${cleanText}`;
  const isStaticHost = checkIsStaticHosting();

  // ON GITHUB PAGES / STATIC HOSTING:
  // Backend Express routes (/api/tts) do NOT exist on static hosts.
  // iOS Safari invalidates user gestures if we wait for an async fetch that 404s.
  // Therefore, on static hosts or iOS, we trigger Web Speech API SYNCHRONOUSLY right now!
  if (isStaticHost) {
    const spoke = speakWebSpeechSync(cleanText, lang, slowMode);
    if (spoke) return;
  }

  // Check client-side audio cache
  let audioUrl = clientAudioCache.get(cacheKey);

  // If not static host (or WebSpeech wasn't handled), attempt backend TTS endpoint with fast 400ms timeout
  if (!audioUrl && !isStaticHost) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 400);

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, lang, slowMode }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.audioUrl) {
          audioUrl = data.audioUrl;
          clientAudioCache.set(cacheKey, audioUrl);
        }
      }
    } catch {
      // Backend unavailable or timed out (e.g. static site)
    }
  }

  // Play audio via pre-unlocked HTMLAudioElement if audioUrl is available
  if (audioUrl) {
    try {
      const audio = getSharedAudioElement();
      if (audio) {
        audio.src = audioUrl;
        audio.playbackRate = slowMode ? 0.7 : 1.0;
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn('HTML5 Audio play failed:', err);
    }
  }

  // Direct Google Translate Audio URL Fallback for HTML5 Audio
  const tLang = lang === 'ta-IN' ? 'ta' : 'en';
  const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${tLang}&client=tw-ob`;

  try {
    const audio = getSharedAudioElement();
    if (audio) {
      audio.src = directUrl;
      audio.playbackRate = slowMode ? 0.7 : 1.0;
      await audio.play();
      return;
    }
  } catch {
    // Fallback to Web Speech API
  }

  // Ultimate iOS Safari Fallback: Synchronous Web Speech API
  speakWebSpeechSync(cleanText, lang, slowMode);
};

export const hasTamilVoice = (): boolean => true;


