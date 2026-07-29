import React, { useState } from 'react';
import { Volume2, Sparkles, Plus, Equal, Languages } from 'lucide-react';
import { vowels, consonants } from '../data/tamil';
import { playAudio } from '../utils/audio';
import { getCombinedLetter } from '../utils/tamilFusion';
import { motion } from 'motion/react';

export function CombinationBuilder() {
  const [selectedConsonant, setSelectedConsonant] = useState(consonants[0]);
  const [selectedVowel, setSelectedVowel] = useState(vowels[0]);

  // Compute exact Tamil Uyir-Mei combined letter and phonetics
  const fusion = getCombinedLetter(selectedConsonant.tamil, selectedVowel.tamil);

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border-4 border-indigo-400/30">
      
      {/* Title & Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-200 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-400/30 mb-3">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>Uyir Mei Ezhuthukkal Lab</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
          Interactive Letter Fusion
        </h3>
        <p className="text-indigo-200 text-sm md:text-base max-w-xl mx-auto">
          In Tamil, combining a <span className="text-amber-300 font-bold">Consonant (Body)</span> with a <span className="text-pink-300 font-bold">Vowel (Soul)</span> creates a brand new letter!
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-stretch">
        
        {/* Consonant Selector */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <label className="block text-amber-300 font-black text-sm uppercase tracking-wider mb-3">
            1. Select Consonant (Mei)
          </label>
          <div className="grid grid-cols-6 gap-2">
            {consonants.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedConsonant(c);
                  playAudio(c.tamil, 'ta-IN');
                }}
                className={`p-2 rounded-2xl text-xl font-black transition-all cursor-pointer ${
                  selectedConsonant.id === c.id
                    ? 'bg-amber-400 text-slate-900 scale-105 shadow-lg ring-4 ring-amber-300/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {c.tamil}
              </button>
            ))}
          </div>
        </div>

        {/* Vowel Selector */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <label className="block text-pink-300 font-black text-sm uppercase tracking-wider mb-3">
            2. Select Vowel (Uyir)
          </label>
          <div className="grid grid-cols-6 gap-2">
            {vowels.map(v => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVowel(v);
                  playAudio(v.tamil, 'ta-IN');
                }}
                className={`p-2 rounded-2xl text-xl font-black transition-all cursor-pointer ${
                  selectedVowel.id === v.id
                    ? 'bg-pink-500 text-white scale-105 shadow-lg ring-4 ring-pink-300/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {v.tamil}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fusion Result Arena */}
      <motion.div 
        key={`${selectedConsonant.id}-${selectedVowel.id}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 border-white/20 text-center flex flex-col items-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-6">
          
          {/* Consonant */}
          <div className="bg-amber-400 text-slate-900 rounded-3xl p-4 md:p-6 w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center shadow-xl">
            <span className="text-3xl md:text-5xl font-black">{selectedConsonant.tamil}</span>
            <span className="text-xs font-bold mt-1">/{selectedConsonant.english}/</span>
          </div>

          <Plus className="w-8 h-8 text-pink-300" />

          {/* Vowel */}
          <div className="bg-pink-500 text-white rounded-3xl p-4 md:p-6 w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center shadow-xl">
            <span className="text-3xl md:text-5xl font-black">{selectedVowel.tamil}</span>
            <span className="text-xs font-bold mt-1">/{selectedVowel.english}/</span>
          </div>

          <Equal className="w-8 h-8 text-yellow-300" />

          {/* Combined Result */}
          <div className="bg-gradient-to-br from-yellow-300 to-amber-500 text-slate-900 rounded-3xl p-4 md:p-6 w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-2xl border-4 border-white animate-pulse">
            <span className="text-4xl md:text-6xl font-black">{fusion.combined}</span>
            <span className="text-xs font-black tracking-widest mt-1">/{fusion.combinedEng}/</span>
          </div>
        </div>

        {/* Listen Action */}
        <button
          onClick={() => playAudio(fusion.combined, 'ta-IN')}
          className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-amber-300 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Volume2 className="w-6 h-6 text-indigo-600" />
          <span>Listen to "{fusion.combined}" ({fusion.combinedEng})</span>
        </button>

        {/* Example Word if available */}
        {fusion.example && (
          <div className="mt-6 bg-white/10 rounded-2xl p-4 w-full max-w-md border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{fusion.emoji}</span>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-white">{fusion.example}</span>
                  <button
                    onClick={() => playAudio(fusion.example!, 'ta-IN')}
                    className="text-amber-300 hover:text-amber-200 cursor-pointer"
                    title="Listen Tamil word"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-indigo-200">/{fusion.exampleEng}/ &bull; {fusion.meaning}</p>
              </div>
            </div>
            <button
              onClick={() => playAudio(fusion.meaning!, 'en-US')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-indigo-200 cursor-pointer"
              title="Listen English translation"
            >
              <Languages className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

