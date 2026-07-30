import React from 'react';
import { Volume2, Languages, Turtle } from 'lucide-react';
import { Phrase } from '../types';
import { playAudio } from '../utils/audio';
import { motion } from 'motion/react';

interface PhraseCardProps {
  key?: React.Key;
  phrase: Phrase;
  index: number;
}

export function PhraseCard({ phrase, index }: PhraseCardProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: index * 0.05 }}
      className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full mb-6`}
    >
      <div className={`flex flex-col max-w-[95%] md:max-w-[75%] relative ${isLeft ? 'items-start' : 'items-end'}`}>
        
        {phrase.category && (
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full mb-1 ml-14">
            {phrase.category}
          </span>
        )}

        <div className="flex items-end gap-3">
          {isLeft && (
            <div className="w-12 h-12 shrink-0 bg-yellow-200 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-md z-10">
              {phrase.emoji}
            </div>
          )}

          <div className={`bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-5 rounded-3xl shadow-lg relative ${isLeft ? 'rounded-bl-sm' : 'rounded-br-sm'}`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 justify-between">
                <h3 className="text-2xl md:text-3xl font-black drop-shadow-md">{phrase.tamil}</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => playAudio(phrase.tamil, 'ta-IN', true)}
                    title="Slow pronunciation (0.5x speed)"
                    className="px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors text-emerald-200 flex items-center gap-1 text-xs font-black cursor-pointer"
                    aria-label={`Play slow pronunciation for ${phrase.tamil}`}
                  >
                    <Turtle className="w-4 h-4 shrink-0" />
                    <span>0.5x</span>
                  </button>
                  <button
                    onClick={() => playAudio(phrase.tamil, 'ta-IN')}
                    title="Normal pronunciation (1x speed)"
                    className="px-3 py-1.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-full font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    aria-label={`Play pronunciation for ${phrase.tamil}`}
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    <span>Listen</span>
                  </button>
                </div>
              </div>
              <p className="text-indigo-100 font-medium text-base tracking-widest">/{phrase.english}/</p>
            </div>
          </div>

          {!isLeft && (
            <div className="w-12 h-12 shrink-0 bg-teal-200 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-md z-10">
              {phrase.emoji}
            </div>
          )}
        </div>

        <div className={`mt-2 flex flex-col gap-1 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 ${isLeft ? 'ml-14' : 'mr-14'}`}>
          <div className="flex items-center justify-between gap-3">
            <span className="font-extrabold text-slate-800 dark:text-white text-base">{phrase.translation}</span>
            <button
              onClick={() => playAudio(phrase.translation, 'en-US')}
              className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0"
              aria-label={`Play English pronunciation for ${phrase.translation}`}
            >
              <Languages className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>EN</span>
            </button>
          </div>
          {phrase.contextNote && (
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 italic border-t border-slate-100 dark:border-slate-700/60 pt-1.5 mt-1">
              💡 {phrase.contextNote}
            </p>
          )}
        </div>

      </div>
    </motion.div>
  );
}
