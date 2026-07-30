import React, { useState, useEffect } from 'react';
import { Sparkles, Shapes, MessageCircle, ArrowUp, Zap, Grid, Gamepad2, Volume2 } from 'lucide-react';
import { vowels, consonants, phrases } from './data/tamil';
import { VowelCard } from './components/VowelCard';
import { ConsonantCard } from './components/ConsonantCard';
import { CombinationBuilder } from './components/CombinationBuilder';
import { FunCategoryGrid } from './components/FunCategoryGrid';
import { PhraseCard } from './components/PhraseCard';
import { QuizGame } from './components/QuizGame';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'vowels' | 'consonants' | 'combinations' | 'categories' | 'phrases' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('vowels');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 180);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBgColor = () => {
    switch (activeTab) {
      case 'vowels': return 'bg-sky-50 dark:bg-slate-950';
      case 'consonants': return 'bg-amber-50 dark:bg-slate-950';
      case 'combinations': return 'bg-purple-950 dark:bg-slate-950 text-white';
      case 'categories': return 'bg-emerald-50 dark:bg-slate-950';
      case 'phrases': return 'bg-indigo-50 dark:bg-slate-950';
      case 'quiz': return 'bg-orange-50 dark:bg-slate-950';
    }
  };

  const tabsConfig = [
    { id: 'vowels', label: 'Vowels', icon: Sparkles, color: 'text-pink-500', activeBg: 'bg-pink-500 text-white' },
    { id: 'consonants', label: 'Consonants', icon: Shapes, color: 'text-amber-500', activeBg: 'bg-amber-500 text-slate-900' },
    { id: 'combinations', label: 'Fusion Lab', icon: Zap, color: 'text-purple-400', activeBg: 'bg-purple-600 text-white' },
    { id: 'categories', label: 'Words & Numbers', icon: Grid, color: 'text-emerald-500', activeBg: 'bg-emerald-500 text-white' },
    { id: 'phrases', label: 'Phrases', icon: MessageCircle, color: 'text-indigo-500', activeBg: 'bg-indigo-600 text-white' },
    { id: 'quiz', label: 'Quiz Game', icon: Gamepad2, color: 'text-orange-500', activeBg: 'bg-orange-500 text-white' },
  ] as const;

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-pink-200 selection:text-pink-900 ${getBgColor()}`}>
      
      {/* Creative Playful Header */}
      <header className="pt-8 pb-4 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl animate-bounce">🐘</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm">
              Tamil Master
            </h1>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🦚</span>
          </div>
          <p className="text-base sm:text-xl font-black text-slate-700 dark:text-slate-200 mt-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-6 py-2 rounded-full inline-block border border-slate-200 dark:border-slate-700 shadow-sm">
            Unleash Your Tamil Superpowers! 🚀
          </p>
        </motion.div>
      </header>

      {/* Navigation Bar (Desktop) */}
      <div className="hidden md:flex justify-center my-6 sticky top-4 z-40 px-4">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2 rounded-full shadow-xl border-4 border-white/80 dark:border-slate-800 flex flex-wrap gap-2 justify-center">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToTop();
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black transition-all cursor-pointer ${
                  isActive
                    ? `${tab.activeBg} shadow-md scale-105 ring-2 ring-black/10`
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-current' : tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-36 md:pb-16">
        <AnimatePresence mode="wait">
          
          {/* VOWELS */}
          {activeTab === 'vowels' && (
            <motion.div
              key="vowels"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-pink-600 dark:text-pink-400 mb-1">Uyir Ezhuthukkal & Aayutha Ezhuthu</h2>
                <p className="text-2xl font-black text-pink-500/90 dark:text-pink-300 font-serif tracking-wide mb-2">உயிர் எழுத்துகள் & ஆய்த எழுத்து (ஃ)</p>
                <p className="text-slate-600 dark:text-slate-300 font-bold max-w-xl mx-auto text-sm sm:text-base">
                  12 Vowels (Soul of Tamil) plus the special Aayutha Ezhuthu (ஃ - Akku). Tap any letter or word to hear its sound! 🎈
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vowels.map((letter, i) => (
                  <VowelCard key={letter.id} letter={letter} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* CONSONANTS */}
          {activeTab === 'consonants' && (
            <motion.div
              key="consonants"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-1">Mei Ezhuthukkal (Consonants)</h2>
                <p className="text-2xl font-black text-amber-600/90 dark:text-amber-300 font-serif tracking-wide mb-2">மெய் எழுத்துகள்</p>
                <p className="text-slate-600 dark:text-slate-300 font-bold max-w-xl mx-auto text-sm sm:text-base">
                  These 18 solid building blocks are the "Body" (Mei) of Tamil. Look for the dot (Pulli) on top! 🧱
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {consonants.map((letter, i) => (
                  <ConsonantCard key={letter.id} letter={letter} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* FUSION LAB */}
          {activeTab === 'combinations' && (
            <motion.div
              key="combinations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <CombinationBuilder />
            </motion.div>
          )}

          {/* WORDS, NUMBERS & CATEGORIES */}
          {activeTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <FunCategoryGrid />
            </motion.div>
          )}

          {/* PHRASES */}
          {activeTab === 'phrases' && (
            <motion.div
              key="phrases"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-2">Everyday Magic Phrases</h2>
                <p className="text-slate-600 dark:text-slate-300 font-bold max-w-xl mx-auto text-sm sm:text-base">
                  Start conversing right away! Tap any phrase to practice pronunciation. 💬
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {phrases.map((phrase, i) => (
                  <PhraseCard key={phrase.id} phrase={phrase} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* QUIZ GAME */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <QuizGame />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Scroll-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 p-3 bg-white/90 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 rounded-full shadow-2xl border-2 border-indigo-200 dark:border-slate-700 backdrop-blur-md focus:outline-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Bottom Nav for Mobile with Descriptions for every icon */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-md">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl px-2 py-2.5 rounded-3xl shadow-2xl border-2 border-white/60 dark:border-slate-800 flex justify-between items-center gap-1 overflow-x-auto hide-scrollbar">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToTop();
                }}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-300 min-w-[56px] flex-1 cursor-pointer ${
                  isActive ? 'bg-slate-100 dark:bg-slate-800 scale-105' : 'text-slate-400 hover:text-slate-600'
                }`}
                aria-label={`Switch to ${tab.label}`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? tab.color : 'text-slate-400'}`} />
                <span className={`text-[10px] font-black tracking-tight leading-none text-center ${
                  isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
