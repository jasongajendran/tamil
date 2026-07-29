import React, { useState } from 'react';
import { Volume2, Languages, Hash, Palette, Dog, Users, BookOpen, Apple } from 'lucide-react';
import { numbers, commonWords, fruitsVeggies, colors, animals, family } from '../data/tamil';
import { playAudio } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryItem } from '../types';

type CategoryType = 'numbers' | 'words' | 'fruits' | 'colors' | 'animals' | 'family';

export function FunCategoryGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('numbers');

  const getCategoryData = (): { title: string; items: CategoryItem[] } => {
    switch (activeCategory) {
      case 'numbers':
        return { title: 'Numbers (Enngal ௧-௰)', items: numbers };
      case 'words':
        return { title: 'Everyday Words & Objects (Solgal)', items: commonWords };
      case 'fruits':
        return { title: 'Fruits & Vegetables (Pazhangal & Kaikani)', items: fruitsVeggies };
      case 'colors':
        return { title: 'Colors (Vannangal)', items: colors };
      case 'animals':
        return { title: 'Animals & Birds (Vilangugal)', items: animals };
      case 'family':
        return { title: 'Family & People (Kudumbam)', items: family };
    }
  };

  const { title, items } = getCategoryData();

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {(
          [
            { id: 'numbers', label: 'Numbers (1-10)', icon: Hash, activeClass: 'bg-amber-400 text-slate-900' },
            { id: 'words', label: 'Everyday Words', icon: BookOpen, activeClass: 'bg-indigo-500 text-white' },
            { id: 'fruits', label: 'Fruits & Veggies', icon: Apple, activeClass: 'bg-red-500 text-white' },
            { id: 'colors', label: 'Colors', icon: Palette, activeClass: 'bg-pink-500 text-white' },
            { id: 'animals', label: 'Animals & Birds', icon: Dog, activeClass: 'bg-emerald-500 text-white' },
            { id: 'family', label: 'Family & People', icon: Users, activeClass: 'bg-sky-500 text-white' },
          ] as const
        ).map(tab => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                isActive
                  ? `${tab.activeClass} scale-105 ring-4 ring-black/10`
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Section Header */}
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm mt-1">
          Tap any card to hear authentic native Tamil pronunciation!
        </p>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white rounded-3xl p-6 shadow-lg border-2 border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
            >
              {/* Top Banner / Number badge / Color swatch */}
              <div className="flex items-center justify-between mb-4">
                {item.numberVal !== undefined ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-300 shadow-sm">
                      Number {item.numberVal}
                    </span>
                  </div>
                ) : item.color ? (
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full border-2 border-slate-300 ${item.color} shadow-inner`} />
                    <span className="text-xs font-bold text-slate-500">Color Swatch</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Word #{idx + 1}
                  </span>
                )}

                <button
                  onClick={() => playAudio(item.tamil, 'ta-IN')}
                  className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label={`Play audio for ${item.tamil}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Central Emoji & Tamil Word */}
              <div className="text-center my-3">
                <span className="text-6xl mb-3 block transform group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <h4 className="text-3xl font-black text-slate-900 mb-1">{item.tamil}</h4>
                <p className="text-indigo-600 font-extrabold text-sm">/{item.english}/</p>
              </div>

              {/* Bottom Translation */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center justify-between mt-4">
                <span className="font-extrabold text-slate-800 text-base">{item.translation}</span>
                <button
                  onClick={() => playAudio(item.translation, 'en-US')}
                  className="p-1.5 bg-white text-slate-500 hover:text-indigo-600 rounded-xl shadow-sm transition-colors cursor-pointer"
                  aria-label={`Play English translation for ${item.translation}`}
                >
                  <Languages className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
