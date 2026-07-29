let activeAudio: HTMLAudioElement | null = null;
const clientAudioCache = new Map<string, string>();

const CONSONANT_PHONETIC_MAP: Record<string, string> = {
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

export const playAudio = async (text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN', slowMode: boolean = false) => {
  if (typeof window === 'undefined' || !text) return;

  // Stop any currently playing audio or speech
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

  try {
    let audioUrl = clientAudioCache.get(cacheKey);

    if (!audioUrl) {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cleanText, lang, slowMode }),
        });

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
      } catch (e) {
        // Express backend route not available (e.g. static site host like GitHub Pages)
      }
    }

    if (!audioUrl) {
      // Direct Google Translate client-side audio stream fallback for static hosting
      const tLang = lang === 'ta-IN' ? 'ta' : 'en';
      audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${tLang}&client=tw-ob`;
    }

    const audio = new Audio(audioUrl);
    if (slowMode) {
      audio.playbackRate = 0.7;
    }
    activeAudio = audio;

    await audio.play().catch(() => {
      // Ultimate Web Speech API fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang;
        if (slowMode) utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
      }
    });
  } catch (err) {
    console.warn("TTS fallback execution:", err);
  }
};

export const hasTamilVoice = (): boolean => true;
