// Shared Audio Context & Active References for iOS WebKit & Cross-Platform compatibility
let globalAudioCtx: AudioContext | null = null;
let activeSourceNode: AudioBufferSourceNode | null = null;
let activeAudioElement: HTMLAudioElement | null = null;
let isAudioUnlocked = false;

const clientAudioCache = new Map<string, string>();
const decodedBufferCache = new Map<string, AudioBuffer>();

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

// Explicit unlocker function to warm up Web Audio API & Web Speech API on user gesture (iOS Safari requirement)
export function unlockAudio() {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      // Play 1 frame of silent buffer to unlock iOS Safari Web Audio engine permanently
      if (!isAudioUnlocked) {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        isAudioUnlocked = true;
      }
    }
  } catch (err) {
    console.warn('AudioContext unlock attempt:', err);
  }

  // Pre-warm Web Speech API on iOS Safari
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
      if (!isAudioUnlocked) {
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
      }
    } catch {
      // Ignore fallback pre-warm error
    }
  }
}

// Register global user gesture listeners to auto-unlock on first tap/click on iOS devices
if (typeof window !== 'undefined') {
  const unlockEvents = ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'click'];
  const handleUserGesture = () => {
    unlockAudio();
    unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUserGesture));
  };
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleUserGesture, { passive: true, once: true });
  });
}

// Stop any currently active playback (Web Audio source node, HTML5 Audio element, or SpeechSynthesis)
function stopAllAudio() {
  if (activeSourceNode) {
    try {
      activeSourceNode.stop();
      activeSourceNode.disconnect();
    } catch {
      // Ignore already stopped
    }
    activeSourceNode = null;
  }

  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {
      // Ignore pause failure
    }
    activeAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel failure
    }
  }
}

// Select best Tamil/English voice for SpeechSynthesis on iOS Safari / WebKit
function getVoice(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const normalizedLang = lang.toLowerCase().replace('_', '-');

  return (
    voices.find((v) => v.lang.toLowerCase().replace('_', '-') === normalizedLang) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(normalizedLang.slice(0, 2))) ||
    voices.find((v) => v.name.toLowerCase().includes('tamil')) ||
    null
  );
}

// Fallback SpeechSynthesis execution optimized for iOS Safari
function playSpeechSynthesis(text: string, lang: 'ta-IN' | 'en-US', slowMode: boolean) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = slowMode ? 0.7 : 1.0;
    utterance.pitch = 1.0;

    const voice = getVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('SpeechSynthesis playback error:', err);
  }
}

export const playAudio = async (text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN', slowMode: boolean = false) => {
  if (typeof window === 'undefined' || !text) return;

  // 1. Synchronous unlock on gesture turn for iOS Safari
  unlockAudio();
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  // 2. Stop any ongoing audio playback
  stopAllAudio();

  const cleanText = normalizeTamil(text);
  const cacheKey = `${lang}_${cleanText}`;

  // Check if we have an in-memory decoded Web Audio buffer
  if (ctx && decodedBufferCache.has(cacheKey)) {
    try {
      const buffer = decodedBufferCache.get(cacheKey)!;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = slowMode ? 0.7 : 1.0;
      source.connect(ctx.destination);
      source.start(0);
      activeSourceNode = source;
      return;
    } catch (e) {
      console.warn('WebAudio cached buffer play failed:', e);
    }
  }

  // Find or generate audio URL
  let audioUrl = clientAudioCache.get(cacheKey);

  if (!audioUrl) {
    // Try server /api/tts endpoint first with a quick timeout (for full-stack dev/Cloud Run host)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, lang, slowMode }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.audioUrl) {
            audioUrl = data.audioUrl;
            clientAudioCache.set(cacheKey, audioUrl);
          }
        }
      }
    } catch {
      // Express backend route not available (e.g. static site host like GitHub Pages)
    }
  }

  if (!audioUrl) {
    // Direct Google Translate client-side audio stream fallback for static hosting
    const tLang = lang === 'ta-IN' ? 'ta' : 'en';
    audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${tLang}&client=tw-ob`;
  }

  // 3. Attempt Web Audio API buffer decoding & playback (Bypasses iOS Safari async HTMLAudioElement gesture lock!)
  if (ctx && audioUrl) {
    try {
      const audioResponse = await fetch(audioUrl);
      if (audioResponse.ok) {
        const arrayBuffer = await audioResponse.arrayBuffer();
        const decodedBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
          ctx.decodeAudioData(arrayBuffer, resolve, reject);
        });

        decodedBufferCache.set(cacheKey, decodedBuffer);

        // Ensure context is running
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const source = ctx.createBufferSource();
        source.buffer = decodedBuffer;
        source.playbackRate.value = slowMode ? 0.7 : 1.0;
        source.connect(ctx.destination);
        source.start(0);
        activeSourceNode = source;
        return;
      }
    } catch (webAudioErr) {
      console.warn('Web Audio API decoding failed, attempting HTML5 Audio fallback:', webAudioErr);
    }
  }

  // 4. Fallback: HTML5 Audio Element playback
  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      audio.playbackRate = slowMode ? 0.7 : 1.0;
      activeAudioElement = audio;

      await audio.play();
      return;
    } catch (htmlAudioErr) {
      console.warn('HTML5 Audio play failed, falling back to Web Speech API:', htmlAudioErr);
    }
  }

  // 5. Ultimate Fallback: Web Speech API (SpeechSynthesis)
  playSpeechSynthesis(cleanText, lang, slowMode);
};

export const hasTamilVoice = (): boolean => true;

