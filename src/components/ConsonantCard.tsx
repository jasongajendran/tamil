import React from 'react';
import { Volume2, Languages, Turtle } from 'lucide-react';
import { Letter } from '../types';
import { playAudio } from '../utils/audio';
import { motion } from 'motion/react';

interface ConsonantCardProps {
  key?: React.Key;
  letter: Letter;
  index: number;
}

const borderColors = [
  'border-red-500 shadow-red-500', 
  'border-blue-500 shadow-blue-500', 
  'border-emerald-500 shadow-emerald-500', 
  'border-amber-500 shadow-amber-500', 
  'border-violet-500 shadow-violet-500', 
  'border-orange-500 shadow-orange-500'
];

export function ConsonantCard({ letter, index }: ConsonantCardProps) {
  const colorIndex = index % borderColors.length;
  const colorClass = borderColors[colorIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`bg-white rounded-2xl p-5 border-4 ${colorClass} shadow-[4px_4px_0px_0px] hover:shadow-[8px_8px_0px_0px] hover:-translate-y-1 transition-all flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="min-w-[5rem] px-2 h-20 rounded-xl border-4 border-slate-900 flex items-center justify-center bg-amber-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900">{letter.tamil}</h2>
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => playAudio(letter.tamil, 'ta-IN')}
            title="Normal pronunciation (1x speed)"
            className="p-2.5 rounded-xl border-2 border-slate-900 bg-emerald-300 hover:bg-emerald-400 text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center"
            aria-label={`Play pronunciation for ${letter.tamil}`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => playAudio(letter.tamil, 'ta-IN', true)}
            title="Slow pronunciation (0.5x speed)"
            className="px-2 py-1.5 rounded-xl border-2 border-slate-900 bg-sky-200 hover:bg-sky-300 text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 text-xs font-black"
            aria-label={`Play slow Tamil pronunciation for ${letter.tamil}`}
          >
            <Turtle className="w-3.5 h-3.5 text-emerald-800" />
            <span>0.5x</span>
          </button>
        </div>
      </div>

      <div className="inline-block border-2 border-slate-900 px-3 py-1 bg-yellow-200 font-black text-slate-900 mb-3 self-start rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs">
        /{letter.english}/
      </div>

      <div className="border-t-2 border-slate-200 pt-3 mt-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl bg-slate-100 p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{letter.emoji}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-slate-900">{letter.exampleTamil}</span>
              <button
                onClick={() => playAudio(letter.exampleTamil, 'ta-IN')}
                className="p-1 text-slate-600 hover:text-indigo-600 transition-colors"
                aria-label={`Play pronunciation for ${letter.exampleTamil}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-bold text-slate-500">/{letter.exampleEnglish}/</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-extrabold text-slate-900 text-sm truncate">{letter.translation}</span>
          <button
            onClick={() => playAudio(letter.translation, 'en-US')}
            className="p-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 transition-colors shrink-0"
            aria-label={`Play English pronunciation for ${letter.translation}`}
          >
            <Languages className="w-3.5 h-3.5 text-slate-900" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
