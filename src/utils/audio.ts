let activeAudio: HTMLAudioElement | null = null;
const clientAudioCache = new Map<string, string>();
const audioObjectCache = new Map<string, HTMLAudioElement>();

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

export function getAudioStreamUrl(text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN'): string {
  const cleanText = normalizeTamil(text);
  const tLang = lang === 'ta-IN' ? 'ta' : 'en';
  return `/api/proxy-audio?text=${encodeURIComponent(cleanText)}&lang=${tLang}`;
}

export function preloadAudio(text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN') {
  if (typeof window === 'undefined' || !text) return;
  const cleanText = normalizeTamil(text);
  const cacheKey = `${lang}_norm_${cleanText}`;
  if (!clientAudioCache.has(cacheKey)) {
    const url = getAudioStreamUrl(cleanText, lang);
    clientAudioCache.set(cacheKey, url);
    const audio = new Audio(url);
    audio.preload = 'auto';
    audioObjectCache.set(cacheKey, audio);
  }
}

export const playAudio = (text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN', slowMode: boolean = false) => {
  if (typeof window === 'undefined' || !text) return;

  // Stop any currently playing audio or speech synthesis immediately
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  const cleanText = normalizeTamil(text);
  const cacheKey = `${lang}_${slowMode ? 'slow' : 'norm'}_${cleanText}`;

  let audioUrl = clientAudioCache.get(cacheKey);
  if (!audioUrl) {
    audioUrl = getAudioStreamUrl(cleanText, lang);
    clientAudioCache.set(cacheKey, audioUrl);
  }

  let audio = audioObjectCache.get(cacheKey);
  if (!audio) {
    audio = new Audio(audioUrl);
    audioObjectCache.set(cacheKey, audio);
  } else {
    audio.currentTime = 0;
  }

  audio.playbackRate = slowMode ? 0.65 : 1.0;
  activeAudio = audio;

  // Synchronously play audio inside user gesture handler for 0ms latency
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Instant Fallback to Web Speech API if HTML5 Audio encounters browser restrictions
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang;
        if (slowMode) utterance.rate = 0.65;
        window.speechSynthesis.speak(utterance);
      }
    });
  }
};

export const hasTamilVoice = (): boolean => true;

// Pre-warm audio cache in background for standard vowels & consonants
if (typeof window !== 'undefined') {
  const coreAlphabet = [
    'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ',
    'க்', 'ங்', 'ச்', 'ஞ்', 'ட்', 'ண்', 'த்', 'ந்', 'ப்', 'ம்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்', 'ற்', 'ன்',
    'வணக்கம்', 'நன்றி', 'ஒன்று', 'இரண்டு', 'மூன்று'
  ];
  setTimeout(() => {
    coreAlphabet.forEach(char => preloadAudio(char, 'ta-IN'));
  }, 500);
}

