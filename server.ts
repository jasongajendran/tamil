import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/safely with user-agent header
let genaiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genaiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      genaiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return genaiClient;
}

// Convert raw 24kHz 16-bit 1-channel PCM audio to WAV Data URI
function pcmToWavDataUri(base64Pcm: string, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): string {
  const pcmBuffer = Buffer.from(base64Pcm, 'base64');
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const wavBuffer = Buffer.alloc(44 + dataSize);

  wavBuffer.write('RIFF', 0);
  wavBuffer.writeUInt32LE(36 + dataSize, 4);
  wavBuffer.write('WAVE', 8);
  wavBuffer.write('fmt ', 12);
  wavBuffer.writeUInt32LE(16, 16);
  wavBuffer.writeUInt16LE(1, 20);
  wavBuffer.writeUInt16LE(numChannels, 22);
  wavBuffer.writeUInt32LE(sampleRate, 24);
  wavBuffer.writeUInt32LE(byteRate, 28);
  wavBuffer.writeUInt16LE(blockAlign, 32);
  wavBuffer.writeUInt16LE(bitsPerSample, 34);
  wavBuffer.write('data', 36);
  wavBuffer.writeUInt32LE(dataSize, 40);

  pcmBuffer.copy(wavBuffer, 44);

  return 'data:audio/wav;base64,' + wavBuffer.toString('base64');
}

// Mapping isolated Tamil Mei Ezhuthukkal (pure consonants with pulli) to authentic phonetic recitation
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

function normalizeTamilTextForTts(text: string): string {
  const trimmed = text.trim();
  if (CONSONANT_PHONETIC_MAP[trimmed]) {
    return CONSONANT_PHONETIC_MAP[trimmed];
  }
  return trimmed;
}

// In-memory audio cache for instant playback
const ttsCache = new Map<string, string>();

// Proxy route to stream native Tamil audio reliably from server to client
app.get("/api/proxy-audio", async (req, res) => {
  try {
    const rawText = (req.query.text as string) || "";
    const rawLang = (req.query.lang as string) || "ta-IN";
    const lang = (rawLang === "ta-IN" || rawLang === "ta" || rawLang.startsWith("ta")) ? "ta" : "en";
    if (!rawText) {
      return res.status(400).send("Text parameter is required");
    }

    const text = normalizeTamilTextForTts(rawText);
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;

    const audioRes = await fetch(googleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!audioRes.ok) {
      return res.status(500).send("Audio fetch failed");
    }

    const arrayBuffer = await audioRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "public, max-age=86400",
    });
    res.send(buffer);
  } catch (e) {
    res.status(500).send("Audio streaming error");
  }
});

// API Route for Neural TTS
app.post("/api/tts", async (req, res) => {
  try {
    const { text: rawText, lang = 'ta-IN', slowMode = false } = req.body;
    if (!rawText || typeof rawText !== 'string') {
      return res.status(400).json({ error: "Text is required" });
    }

    const text = normalizeTamilTextForTts(rawText);
    const cacheKey = `${lang}_${slowMode ? 'slow' : 'normal'}_${text}`;
    if (ttsCache.has(cacheKey)) {
      return res.json({ audioUrl: ttsCache.get(cacheKey) });
    }

    const ai = getGenAI();
    if (ai) {
      try {
        // Gemini TTS synthesizes prompt text verbatim as spoken audio.
        // We pass ONLY the exact target text (e.g. 'எ' or 'கௌதாரி') so no English instructions are spoken out loud.
        const promptText = text;

        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: promptText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        });

        const audioPart = response.candidates?.[0]?.content?.parts?.[0];
        if (audioPart?.inlineData?.data) {
          const wavDataUri = pcmToWavDataUri(audioPart.inlineData.data, 24000, 1, 16);
          ttsCache.set(cacheKey, wavDataUri);
          return res.json({ audioUrl: wavDataUri });
        }
      } catch (genAiError: any) {
        // Handle rate limits (429), high demand (503), or quota issues seamlessly by falling back to audio proxy
        // Do not flood console with error messages for expected fallback behavior
      }
    }

    // Reliable server-proxied audio URL fallback
    const fallbackUrl = `/api/proxy-audio?text=${encodeURIComponent(text)}&lang=${encodeURIComponent(lang)}`;
    ttsCache.set(cacheKey, fallbackUrl);
    return res.json({ audioUrl: fallbackUrl });
  } catch (err: any) {
    const fallbackUrl = `/api/proxy-audio?text=${encodeURIComponent(req.body.text || '')}&lang=${encodeURIComponent(req.body.lang || 'ta-IN')}`;
    return res.json({ audioUrl: fallbackUrl });
  }
});

// Start Express Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
