import React, { useState } from 'react';
import { Volume2, Sparkles, Plus, Equal, Languages, Table, Zap } from 'lucide-react';
import { vowels, consonants, uyirVowelsHeader, meiConsonantsHeader, combinationsMap, combinationTransliterations } from '../data/tamil';
import { playAudio } from '../utils/audio';
import { getCombinedLetter } from '../utils/tamilFusion';
import { motion, AnimatePresence } from 'motion/react';

export function CombinationBuilder() {
  const [mode, setMode] = useState<'sandbox' | 'grid'>('sandbox');
  const [selectedConsonant, setSelectedConsonant] = useState(consonants[0]);
  const [selectedVowel, setSelectedVowel] = useState(vowels[0]);
  const [hoveredCell, setHoveredCell] = useState<{ c: string; vIndex: number; char: string; eng: string } | null>(null);

  // Compute exact Tamil Uyir-Mei combined letter and phonetics
  const fusion = getCombinedLetter(selectedConsonant.tamil, selectedVowel.tamil);

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-2xl border-4 border-indigo-500/30">
      
      {/* Title & Mode Switcher */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-200 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-400/30 mb-3">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>Uyir Mei Ezhuthukkal (216 Combinations)</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
          Tamil Syllabary & Fusion Lab
        </h3>
        <p className="text-indigo-200 text-sm md:text-base max-w-xl mx-auto mb-6">
          In Tamil, combining 18 Consonants (Body) with 12 Vowels (Soul) creates 216 unique compound letters!
        </p>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
          <button
            onClick={() => setMode('sandbox')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              mode === 'sandbox'
                ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Interactive Fusion Sandbox</span>
          </button>
          <button
            onClick={() => setMode('grid')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              mode === 'grid'
                ? 'bg-purple-500 text-white shadow-md scale-105'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Full 216 Grid Chart</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'sandbox' ? (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {/* Selectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-stretch">
              
              {/* Consonant Selector */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
                <label className="block text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider mb-3">
                  1. Select Consonant (Mei - 18)
                </label>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {consonants.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedConsonant(c);
                        playAudio(c.tamil, 'ta-IN');
                      }}
                      className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black transition-all cursor-pointer flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem] ${
                        selectedConsonant.id === c.id
                          ? 'bg-amber-400 text-slate-900 scale-105 shadow-lg ring-2 sm:ring-4 ring-amber-300/50'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {c.tamil}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vowel Selector */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
                <label className="block text-pink-300 font-black text-xs sm:text-sm uppercase tracking-wider mb-3">
                  2. Select Vowel (Uyir - 12)
                </label>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {vowels.slice(0, 12).map(v => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVowel(v);
                        playAudio(v.tamil, 'ta-IN');
                      }}
                      className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black transition-all cursor-pointer flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem] ${
                        selectedVowel.id === v.id
                          ? 'bg-pink-500 text-white scale-105 shadow-lg ring-2 sm:ring-4 ring-pink-300/50'
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
              className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-5 md:p-8 border-2 border-white/20 text-center flex flex-col items-center"
            >
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-6">
                
                {/* Consonant */}
                <div className="bg-amber-400 text-slate-900 rounded-3xl px-4 py-3 md:px-6 md:py-4 min-w-[5.5rem] md:min-w-[7.5rem] min-h-[5.5rem] md:min-h-[7.5rem] flex flex-col items-center justify-center shadow-xl">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black leading-none">{selectedConsonant.tamil}</span>
                  <span className="text-xs sm:text-sm font-bold mt-1.5 opacity-90">/{selectedConsonant.english}/</span>
                </div>

                <Plus className="w-6 h-6 md:w-8 md:h-8 text-pink-300 shrink-0" />

                {/* Vowel */}
                <div className="bg-pink-500 text-white rounded-3xl px-4 py-3 md:px-6 md:py-4 min-w-[5.5rem] md:min-w-[7.5rem] min-h-[5.5rem] md:min-h-[7.5rem] flex flex-col items-center justify-center shadow-xl">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black leading-none">{selectedVowel.tamil}</span>
                  <span className="text-xs sm:text-sm font-bold mt-1.5 opacity-90">/{selectedVowel.english}/</span>
                </div>

                <Equal className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 shrink-0" />

                {/* Combined Result */}
                <div className="bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 text-slate-900 rounded-3xl px-5 py-3.5 md:px-8 md:py-5 min-w-[7.5rem] md:min-w-[10.5rem] min-h-[6.5rem] md:min-h-[8.5rem] flex flex-col items-center justify-center shadow-2xl border-4 border-white animate-pulse">
                  <span className={`font-black leading-none whitespace-nowrap ${fusion.combined.length >= 2 ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl'}`}>{fusion.combined}</span>
                  <span className="text-xs sm:text-sm font-black tracking-wider mt-1.5">/{fusion.combinedEng}/</span>
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
                <div className="mt-6 bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 w-full max-w-lg border border-white/20 shadow-lg text-left">
                  <div className="text-[11px] font-black uppercase tracking-wider text-amber-300 mb-2">
                    Example Word
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-3xl sm:text-4xl p-2.5 bg-white/10 rounded-2xl shrink-0 flex items-center justify-center">
                        {fusion.emoji}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xl sm:text-2xl font-black text-white tracking-wide">{fusion.example}</span>
                          <span className="text-xs font-bold text-amber-200 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-300/30">
                            /{fusion.exampleEng}/
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-200 mt-0.5">{fusion.meaning}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                      <button
                        onClick={() => playAudio(fusion.example!, 'ta-IN')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
                        title="Listen Tamil word"
                      >
                        <Volume2 className="w-4 h-4 shrink-0" />
                        <span>Listen</span>
                      </button>
                      <button
                        onClick={() => playAudio(fusion.meaning!, 'en-US')}
                        className="flex items-center gap-1 px-2.5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-black transition-all border border-white/20 active:scale-95 cursor-pointer"
                        title="Listen English translation"
                      >
                        <Languages className="w-4 h-4 text-indigo-200 shrink-0" />
                        <span>EN</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* FULL 216 SYLLABARY GRID */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="bg-amber-400/20 border border-amber-400/30 rounded-2xl p-4 text-amber-200 text-xs sm:text-sm flex items-center justify-between">
              <span>💡 Tap any cell in the table below to hear its exact pronunciation!</span>
              {hoveredCell && (
                <span className="font-black text-amber-300 bg-amber-400/30 px-3 py-1 rounded-xl">
                  {hoveredCell.c} + {uyirVowelsHeader[hoveredCell.vIndex]?.char} = {hoveredCell.char} ({hoveredCell.eng})
                </span>
              )}
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/20 shadow-2xl bg-slate-900/80 backdrop-blur-md max-h-[600px] overflow-y-auto">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-purple-900/90 text-amber-300 sticky top-0 z-20 backdrop-blur-md">
                    <th className="p-3 border-b border-r border-white/10 font-black min-w-[70px]">Mei \ Uyir</th>
                    {uyirVowelsHeader.map((v, idx) => (
                      <th key={idx} className="p-2 sm:p-3 border-b border-r border-white/10 font-black min-w-[50px]">
                        <div className="text-base sm:text-lg text-white">{v.char}</div>
                        <div className="text-[10px] text-pink-300 font-medium">/{v.eng}/</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {meiConsonantsHeader.map((cObj) => {
                    const rowChars = combinationsMap[cObj.char] || [];
                    const rowEngs = combinationTransliterations[cObj.char] || [];
                    return (
                      <tr key={cObj.char} className="hover:bg-white/5 transition-colors border-b border-white/5">
                        <td className="p-2 sm:p-3 bg-indigo-950/80 font-black border-r border-white/10 text-amber-300 sticky left-0 z-10">
                          <div className="text-base sm:text-lg">{cObj.char}</div>
                          <div className="text-[10px] text-indigo-300">/{cObj.eng}/</div>
                        </td>
                        {rowChars.map((char, vIdx) => {
                          const eng = rowEngs[vIdx] || '';
                          return (
                            <td
                              key={vIdx}
                              onMouseEnter={() => setHoveredCell({ c: cObj.char, vIndex: vIdx, char, eng })}
                              onClick={() => playAudio(char, 'ta-IN')}
                              className="p-2 border-r border-white/10 hover:bg-amber-400 hover:text-slate-900 cursor-pointer font-black text-base sm:text-lg transition-all active:scale-95"
                              title={`${cObj.char} + ${uyirVowelsHeader[vIdx]?.char} = ${char} (${eng})`}
                            >
                              <div className="leading-none">{char}</div>
                              <div className="text-[9px] font-normal opacity-70 group-hover:opacity-100">/{eng}/</div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
