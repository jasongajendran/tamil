import React from 'react';
import { Volume2, Languages, Turtle, Edit3 } from 'lucide-react';
import { Letter } from '../types';
import { playAudio } from '../utils/audio';
import { motion } from 'motion/react';

interface VowelCardProps {
  key?: React.Key;
  letter: Letter;
  index: number;
  onOpenWritingGuide?: (tamil: string) => void;
}

const colors = [
  'bg-pink-200 border-pink-400 text-pink-900',
  'bg-purple-200 border-purple-400 text-purple-900',
  'bg-yellow-200 border-yellow-400 text-yellow-900',
  'bg-emerald-200 border-emerald-400 text-emerald-900',
  'bg-sky-200 border-sky-400 text-sky-900',
  'bg-orange-200 border-orange-400 text-orange-900',
];

export function VowelCard({ letter, index, onOpenWritingGuide }: VowelCardProps) {
  const colorScheme = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.4, delay: index * 0.04 }}
      className={`${colorScheme} rounded-[2.5rem] p-6 shadow-xl border-4 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-white/70 rounded-full shadow-sm text-slate-800">
          {letter.tamil === 'ஃ' ? 'Aayutha Ezhuthu' : `Vowel #${index + 1}`}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => playAudio(letter.tamil, 'ta-IN', true)}
            title="Slow pronunciation (0.5x speed)"
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-1 text-xs font-black cursor-pointer"
            aria-label={`Play slow Tamil pronunciation for ${letter.tamil}`}
          >
            <Turtle className="w-4 h-4 text-emerald-100" />
            <span>0.5x</span>
          </button>
          <button
            onClick={() => playAudio(letter.tamil, 'ta-IN')}
            title="Normal pronunciation (1x speed)"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-black cursor-pointer ring-2 ring-indigo-200"
            aria-label={`Play Tamil pronunciation for ${letter.tamil}`}
          >
            <Volume2 className="w-5 h-5 shrink-0" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center my-2">
        <button
          onClick={() => playAudio(letter.tamil, 'ta-IN')}
          className="px-5 py-3 min-w-[6.5rem] min-h-[6rem] bg-white/90 rounded-3xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer border-2 border-white/80 my-2 group-hover:border-indigo-400"
          title="Click to play letter sound"
          aria-label={`Play audio for letter ${letter.tamil}`}
        >
          <h2 className={`font-black text-slate-900 drop-shadow-sm leading-none ${letter.tamil.length > 1 ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl'}`}>{letter.tamil}</h2>
        </button>

        <div className="flex items-center gap-2 mt-2">
          <div className="bg-white/80 px-4 py-1 rounded-full shadow-sm">
            <p className="text-slate-800 font-extrabold text-base tracking-widest">/{letter.english}/</p>
          </div>

          {onOpenWritingGuide && (
            <button
              onClick={() => onOpenWritingGuide(letter.tamil)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-full font-black text-xs shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-amber-500/30"
              title="See pencil writing animation and paper guide"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>How to Write</span>
            </button>
          )}
        </div>
      </div>

      <div className="w-full bg-white/80 rounded-2xl p-4 mt-4 backdrop-blur-sm shadow-sm border border-white/60">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-4xl mb-1">{letter.emoji}</span>

          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-slate-900">{letter.exampleTamil}</span>
            <button
              onClick={() => playAudio(letter.exampleTamil, 'ta-IN')}
              className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-black transition-all shadow-sm cursor-pointer"
              aria-label={`Play pronunciation for ${letter.exampleTamil}`}
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span>Listen</span>
            </button>
          </div>

          <p className="text-xs font-bold text-slate-600">/{letter.exampleEnglish}/</p>

          <div className="flex items-center gap-2 mt-2 bg-slate-50 px-3 py-1.5 rounded-xl w-full justify-between shadow-inner">
            <span className="font-bold text-slate-800 text-sm truncate">{letter.translation}</span>
            <button
              onClick={() => playAudio(letter.translation, 'en-US')}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-700 rounded-lg text-xs font-black transition-all shadow-sm border border-slate-200 shrink-0 cursor-pointer"
              aria-label={`Play English pronunciation for ${letter.translation}`}
            >
              <Languages className="w-4 h-4 text-blue-600 shrink-0" />
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
