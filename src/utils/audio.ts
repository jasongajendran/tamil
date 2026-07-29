let activeAudio: HTMLAudioElement | null = null;
const clientAudioCache = new Map<string, string>();

export const playAudio = async (text: string, lang: 'ta-IN' | 'en-US' = 'ta-IN', slowMode: boolean = false) => {
  if (typeof window === 'undefined' || !text) return;

  // Stop any currently playing audio immediately to prevent overlaps
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }

  const cleanText = text.trim();
  const cacheKey = `${lang}_${slowMode ? 'slow' : 'norm'}_${cleanText}`;

  try {
    let audioUrl = clientAudioCache.get(cacheKey);

    if (!audioUrl) {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, lang, slowMode }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioUrl) {
          audioUrl = data.audioUrl;
          clientAudioCache.set(cacheKey, audioUrl);
        }
      }
    }

    if (!audioUrl) {
      // Direct stream endpoint fallback
      audioUrl = `/api/proxy-audio?text=${encodeURIComponent(cleanText)}&lang=${encodeURIComponent(lang)}`;
    }

    const audio = new Audio(audioUrl);
    if (slowMode) {
      audio.playbackRate = 0.7;
    }
    activeAudio = audio;

    await audio.play().catch((playErr) => {
      console.warn("Audio play failed:", playErr);
    });
  } catch (err) {
    console.warn("TTS request failed:", err);
  }
};

export const hasTamilVoice = (): boolean => true;
