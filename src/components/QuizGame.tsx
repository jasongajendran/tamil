import React, { useState, useEffect } from 'react';
import { Volume2, Trophy, Sparkles, RefreshCw, CheckCircle2, XCircle, Star } from 'lucide-react';
import { 
  vowels, consonants, numbers, commonWords, fruitsVeggies, colors, animals, family, vehicles, bodyParts, 
  daysOfWeek, verbs, nature, shapesDirections, phrases 
} from '../data/tamil';
import { playAudio } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: string;
  type: 'audio' | 'word' | 'emoji';
  promptTamil: string;
  promptEnglish: string;
  promptEmoji: string;
  correctTamil: string;
  options: string[];
}

export function QuizGame() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);

    // Rich pool combining all category items and phrases
    const letterItems = vowels.map(v => ({ tamil: v.tamil, translation: `${v.translation} (${v.exampleTamil})`, emoji: v.emoji }));
    const phraseItems = phrases.map(p => ({ tamil: p.tamil, translation: p.translation, emoji: p.emoji }));
    const categoryItems = [
      ...numbers, ...commonWords, ...fruitsVeggies, ...colors, 
      ...animals, ...family, ...vehicles, ...bodyParts,
      ...daysOfWeek, ...verbs, ...nature, ...shapesDirections
    ].map(c => ({
      tamil: c.tamil,
      translation: c.translation,
      emoji: c.emoji
    }));

    const pool = [...categoryItems, ...phraseItems, ...letterItems];
    const randomIndex = Math.floor(Math.random() * pool.length);
    const target = pool[randomIndex];

    // Pick 3 distractor Tamil words
    const distractors: string[] = [];
    while (distractors.length < 3) {
      const rand = pool[Math.floor(Math.random() * pool.length)];
      if (rand.tamil !== target.tamil && !distractors.includes(rand.tamil)) {
        distractors.push(rand.tamil);
      }
    }

    // Shuffle options
    const options = [...distractors, target.tamil].sort(() => Math.random() - 0.5);

    const types: ('audio' | 'word' | 'emoji')[] = target.emoji ? ['audio', 'word', 'emoji'] : ['audio', 'word'];
    const type = types[Math.floor(Math.random() * types.length)];

    const q: Question = {
      id: Math.random().toString(),
      type,
      promptTamil: target.tamil,
      promptEnglish: target.translation,
      promptEmoji: target.emoji,
      correctTamil: target.tamil,
      options,
    };

    setCurrentQuestion(q);

    if (type === 'audio') {
      setTimeout(() => playAudio(target.tamil, 'ta-IN'), 300);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !currentQuestion) return;

    setSelectedOption(option);
    const correct = option === currentQuestion.correctTamil;
    setIsCorrect(correct);

    if (correct) {
      playAudio(currentQuestion.correctTamil, 'ta-IN');
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-b from-amber-100 via-orange-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border-4 border-amber-300 dark:border-slate-700">
      
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-3xl border border-amber-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-400 text-slate-900 rounded-2xl font-black">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Score</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{score} pts</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-yellow-300 text-yellow-950 px-3 py-1.5 rounded-2xl font-black text-sm">
          <Star className="w-4 h-4 fill-yellow-950" />
          <span>{streak} Streak</span>
        </div>

        <button
          onClick={generateQuestion}
          className="p-3 bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 transition-transform active:scale-95"
          title="Skip or New Question"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Question Card */}
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-200 text-amber-900 rounded-full">
          {currentQuestion.type === 'audio' && '🔊 Listen & Match'}
          {currentQuestion.type === 'word' && '🔤 Translate to Tamil'}
          {currentQuestion.type === 'emoji' && '🖼️ Match Emoji with Tamil'}
        </span>

        <div className="my-6 min-h-[120px] flex flex-col items-center justify-center">
          {currentQuestion.type === 'audio' && (
            <button
              onClick={() => playAudio(currentQuestion.correctTamil, 'ta-IN')}
              className="p-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 animate-bounce flex items-center justify-center gap-2"
            >
              <Volume2 className="w-10 h-10" />
              <span className="font-bold text-lg pr-2">Tap to Listen Again</span>
            </button>
          )}

          {currentQuestion.type === 'word' && (
            <h3 className="text-4xl font-black text-slate-900 dark:text-white">
              "{currentQuestion.promptEnglish}"
            </h3>
          )}

          {currentQuestion.type === 'emoji' && (
            <div className="text-center">
              <span className="text-7xl mb-2 block">{currentQuestion.promptEmoji}</span>
              <p className="text-base font-bold text-slate-600 dark:text-slate-300">"{currentQuestion.promptEnglish}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrectAnswer = option === currentQuestion.correctTamil;

          let btnStyle = "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400";
          
          if (selectedOption !== null) {
            if (isCorrectAnswer) {
              btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105";
            } else if (isSelected && !isCorrectAnswer) {
              btnStyle = "bg-rose-500 text-white border-rose-600 shadow-md";
            } else {
              btnStyle = "bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleSelectOption(option)}
              className={`p-5 rounded-3xl text-2xl font-black shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${btnStyle}`}
            >
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Result & Next Button */}
      {selectedOption !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {isCorrect ? (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-black text-xl mb-4">
              <CheckCircle2 className="w-6 h-6" />
              <span>Correct! Excellent Job! 🎉</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-rose-600 font-black text-xl mb-4">
              <XCircle className="w-6 h-6" />
              <span>Oops! Correct answer: {currentQuestion.correctTamil}</span>
            </div>
          )}

          <button
            onClick={generateQuestion}
            className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-lg hover:bg-amber-400 hover:text-slate-900 transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            Next Challenge 🚀
          </button>
        </motion.div>
      )}
    </div>
  );
}
