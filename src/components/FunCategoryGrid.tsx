import React, { useState } from 'react';
import { Volume2, Languages, Hash, Palette, Dog, Users, BookOpen, Apple, Bus, Smile, Calendar, Activity, Trees, Compass, Search, Utensils, Clock, Heart } from 'lucide-react';
import { 
  numbers, commonWords, fruitsVeggies, colors, animals, family, vehicles, bodyParts, 
  daysOfWeek, verbs, nature, shapesDirections, foodTastes, timeTerms, emotions 
} from '../data/tamil';
import { playAudio } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryItem } from '../types';

type CategoryType = 
  | 'numbers' 
  | 'words' 
  | 'fruits' 
  | 'colors' 
  | 'animals' 
  | 'family' 
  | 'vehicles' 
  | 'bodyParts' 
  | 'days' 
  | 'verbs' 
  | 'nature' 
  | 'shapes'
  | 'food'
  | 'time'
  | 'emotions';

export function FunCategoryGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('numbers');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryData = (): { title: string; subtitle: string; items: CategoryItem[] } => {
    switch (activeCategory) {
      case 'numbers':
        return { title: 'Numbers (Enngal / எண்கள்)', subtitle: 'Learn numbers 1-20, 50, 100 with traditional Tamil numeral symbols (௧, ௨...)', items: numbers };
      case 'words':
        return { title: 'Everyday Words (Solgal / சொற்கள்)', subtitle: 'Essential household objects & everyday items', items: commonWords };
      case 'fruits':
        return { title: 'Fruits & Veggies (Pazhangal / பழங்கள்)', subtitle: 'Delicious fresh fruits & healthy vegetables', items: fruitsVeggies };
      case 'colors':
        return { title: 'Colors (Vannangal / வண்ணங்கள்)', subtitle: 'Vibrant color names in Tamil', items: colors };
      case 'animals':
        return { title: 'Animals & Birds (Vilangugal / விலங்குகள்)', subtitle: 'Wild, domestic animals, birds & marine life', items: animals };
      case 'family':
        return { title: 'Family & Relations (Kudumbam / குடும்பம்)', subtitle: 'Family relationships, elders & friends', items: family };
      case 'vehicles':
        return { title: 'Vehicles & Transport (Uoorthigal / ஊர்திகள்)', subtitle: 'Modes of travel by land, sea & air', items: vehicles };
      case 'bodyParts':
        return { title: 'Body Parts (Urupugal / உறுப்புகள்)', subtitle: 'Human anatomy & senses', items: bodyParts };
      case 'days':
        return { title: 'Days of the Week (Kizhaimaigal / கிழமைகள்)', subtitle: 'Seven days connected with planetary deities', items: daysOfWeek };
      case 'verbs':
        return { title: 'Action Verbs (Vinai Solgal / வினைச் சொற்கள்)', subtitle: 'Daily essential verbs (Eat, Sleep, Study, Run...)', items: verbs };
      case 'nature':
        return { title: 'Nature & Elements (Iyarkai / இயற்கை)', subtitle: 'Sun, Moon, Rain, Ocean, Mountains & Sky', items: nature };
      case 'shapes':
        return { title: 'Shapes & Directions (Vadiangal / வடிவங்கள்)', subtitle: 'Geometric shapes and cardinal directions', items: shapesDirections };
      case 'food':
        return { title: 'Food & Tastes (Unavu & Suvaigal / உணவு & சுவைகள்)', subtitle: 'Traditional South Indian cuisine & 6 tastes (Aru Suvai)', items: foodTastes };
      case 'time':
        return { title: 'Time & Calendar (Kaalam / காலம்)', subtitle: 'Periods of the day, past, present & future terms', items: timeTerms };
      case 'emotions':
        return { title: 'Emotions & Feelings (Unarchigal / உணர்ச்சிகள்)', subtitle: 'Human feelings, expressions & emotional states', items: emotions };
    }
  };

  const { title, subtitle, items } = getCategoryData();

  const filteredItems = items.filter(item => 
    item.tamil.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryTabs = [
    { id: 'numbers', label: 'Numbers (1-100)', icon: Hash, activeClass: 'bg-amber-400 text-slate-900' },
    { id: 'words', label: 'Everyday Words', icon: BookOpen, activeClass: 'bg-indigo-500 text-white' },
    { id: 'food', label: 'Food & Tastes', icon: Utensils, activeClass: 'bg-amber-600 text-white' },
    { id: 'fruits', label: 'Fruits & Veggies', icon: Apple, activeClass: 'bg-red-500 text-white' },
    { id: 'colors', label: 'Colors', icon: Palette, activeClass: 'bg-pink-500 text-white' },
    { id: 'animals', label: 'Animals & Birds', icon: Dog, activeClass: 'bg-emerald-500 text-white' },
    { id: 'family', label: 'Family & People', icon: Users, activeClass: 'bg-sky-500 text-white' },
    { id: 'vehicles', label: 'Vehicles', icon: Bus, activeClass: 'bg-purple-500 text-white' },
    { id: 'bodyParts', label: 'Body Parts', icon: Smile, activeClass: 'bg-teal-500 text-white' },
    { id: 'time', label: 'Time & Periods', icon: Clock, activeClass: 'bg-cyan-600 text-white' },
    { id: 'emotions', label: 'Emotions & Feelings', icon: Heart, activeClass: 'bg-red-600 text-white' },
    { id: 'days', label: 'Days of Week', icon: Calendar, activeClass: 'bg-blue-600 text-white' },
    { id: 'verbs', label: 'Action Verbs', icon: Activity, activeClass: 'bg-rose-500 text-white' },
    { id: 'nature', label: 'Nature & Sky', icon: Trees, activeClass: 'bg-green-600 text-white' },
    { id: 'shapes', label: 'Shapes & Directions', icon: Compass, activeClass: 'bg-orange-500 text-white' },
  ] as const;

  return (
    <div className="space-y-8">
      
      {/* Search & Filter Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search Tamil or English word..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 font-bold focus:outline-none focus:border-indigo-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black bg-slate-200 text-slate-700 px-2 py-1 rounded-lg"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categoryTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as CategoryType);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                isActive
                  ? `${tab.activeClass} scale-105 ring-4 ring-black/10`
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
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
        <p className="text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm mt-1 max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.02 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border-2 border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
            >
              {/* Top Banner / Numeral / Swatch */}
              <div className="flex items-center justify-between mb-4">
                {item.numberVal !== undefined ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300 font-extrabold text-xs border border-amber-300 dark:border-amber-700 shadow-sm flex items-center gap-1.5">
                      <span>Val: {item.numberVal}</span>
                      {item.tamilNumeral && (
                        <span className="bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded text-sm font-black">
                          {item.tamilNumeral}
                        </span>
                      )}
                    </span>
                  </div>
                ) : item.color ? (
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full border-2 border-slate-300 ${item.color} shadow-inner`} />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Color Swatch</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Word #{idx + 1}
                  </span>
                )}

                <button
                  onClick={() => playAudio(item.tamil, 'ta-IN')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-indigo-200 dark:ring-indigo-900"
                  title="Click to hear Tamil pronunciation"
                  aria-label={`Play audio for ${item.tamil}`}
                >
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>Listen</span>
                </button>
              </div>

              {/* Central Emoji & Tamil Word */}
              <div className="text-center my-3 px-2">
                <span className="text-5xl sm:text-6xl mb-3 block transform group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1 leading-tight break-words">{item.tamil}</h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">/{item.english}/</p>
              </div>

              {/* Bottom Translation */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 border border-slate-100 dark:border-slate-700 flex items-center justify-between mt-4">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 text-base truncate">{item.translation}</span>
                <button
                  onClick={() => playAudio(item.translation, 'en-US')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 hover:text-indigo-600 rounded-xl shadow-sm transition-all border border-slate-200 dark:border-slate-600 cursor-pointer font-extrabold text-xs shrink-0"
                  aria-label={`Play English translation for ${item.translation}`}
                >
                  <Languages className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>EN</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-bold text-lg">No matching words found for "{searchQuery}".</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl font-black text-xs"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
}
