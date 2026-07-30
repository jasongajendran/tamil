import React, { useState, useEffect, useRef } from 'react';
import { X, Edit3, Volume2, RotateCcw, MapPin, Hand, ArrowRight, Sparkles, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playAudio } from '../utils/audio';

export interface StrokeGuide {
  strokeNumber: number;
  strokeName: string;
  color: string;          // Hex color for SVG path
  badgeColor: string;     // Tailwind badge class
  borderClass: string;    // Tailwind border class
  path: string;           // SVG path string
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  liftPencil: boolean;    // whether pencil is lifted after this stroke
  startDesc: string;      // Start location description
  directionDesc: string;  // Movement direction instructions
  liftDesc?: string;      // Pencil lift instructions
  endDesc: string;        // End location description
}

export interface LetterStrokeInfo {
  tamil: string;
  english: string;
  name: string;
  strokes: StrokeGuide[];
  paperTip: string;
}

export const VOWEL_STROKES: Record<string, LetterStrokeInfo> = {
  'அ': {
    tamil: 'அ',
    english: 'a',
    name: 'Short A (அகரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Loop & Sweep (சுழி & வளைவு)',
        color: '#4f46e5', // Indigo
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 58 55 C 72 45, 75 75, 52 68 C 35 60, 48 108, 70 102 C 88 96, 115 90, 115 90',
        startPos: { x: 58, y: 55 },
        endPos: { x: 115, y: 90 },
        liftPencil: true,
        startDesc: 'Start with a small circle loop near the top left.',
        directionDesc: 'Loop clockwise down 🔄, curve up-right, then sweep horizontal right along baseline ➡️',
        liftDesc: '✋ LIFT PENCIL here before starting standing line!',
        endDesc: 'Stop at the end of the horizontal sweep line.'
      },
      {
        strokeNumber: 2,
        strokeName: 'Standing Line (நேர்க்கோடு)',
        color: '#10b981', // Emerald
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 115 48 L 115 125',
        startPos: { x: 115, y: 48 },
        endPos: { x: 115, y: 125 },
        liftPencil: false,
        startDesc: 'Place pencil at the top right above the horizontal line.',
        directionDesc: 'Draw a straight vertical line straight down across the horizontal bar to baseline ⬇️',
        endDesc: 'Stop cleanly at the bottom baseline.'
      }
    ],
    paperTip: 'Keep the initial top circle small and neat so the vertical standing line balances nicely.'
  },
  'ஆ': {
    tamil: 'ஆ',
    english: 'aa',
    name: 'Long AA (ஆகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Base Loop & Sweep',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 58 55 C 72 45, 75 75, 52 68 C 35 60, 48 108, 70 102 C 88 96, 115 90, 115 90',
        startPos: { x: 58, y: 55 },
        endPos: { x: 115, y: 90 },
        liftPencil: true,
        startDesc: 'Start at the top-left circle loop (same as "அ").',
        directionDesc: 'Loop clockwise 🔄 and sweep horizontal line to the right ➡️',
        liftDesc: '✋ LIFT PENCIL before starting standing line with tail!',
        endDesc: 'Stop at horizontal line tip.'
      },
      {
        strokeNumber: 2,
        strokeName: 'Standing Line & Bottom Tail (கீழ் சுழி)',
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 115 48 L 115 125 C 100 148, 62 142, 60 122 C 55 110, 72 110, 78 120',
        startPos: { x: 115, y: 48 },
        endPos: { x: 78, y: 120 },
        liftPencil: false,
        startDesc: 'Start top-right vertical position.',
        directionDesc: 'Draw straight down ⬇️, then curve left and loop counter-clockwise into a bottom tail ↪️',
        endDesc: 'End at the bottom loop hook.'
      }
    ],
    paperTip: 'The bottom tail curves gracefully below the baseline like a small upward hook.'
  },
  'இ': {
    tamil: 'இ',
    english: 'i',
    name: 'Short I (இகரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Top Circle & Inner Loop',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 52 50 C 72 48, 70 70, 52 66 C 35 60, 48 100, 70 95 C 92 90, 112 80, 100 102 C 85 120, 35 120, 30 110',
        startPos: { x: 52, y: 50 },
        endPos: { x: 30, y: 110 },
        liftPencil: true,
        startDesc: 'Start with a small top circle.',
        directionDesc: 'Loop top circle, curve inside internally, and sweep down toward bottom-left 🔄',
        liftDesc: '✋ LIFT PENCIL before sweeping the flat baseline!',
        endDesc: 'Stop at bottom left curve.'
      },
      {
        strokeNumber: 2,
        strokeName: 'Baseline Sweep Line',
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 30 110 L 132 110',
        startPos: { x: 30, y: 110 },
        endPos: { x: 132, y: 110 },
        liftPencil: false,
        startDesc: 'Start at bottom-left corner.',
        directionDesc: 'Extend a smooth straight horizontal line left to right along baseline ➡️',
        endDesc: 'Stop at bottom-right baseline end.'
      }
    ],
    paperTip: 'Maintain a smooth, continuous fluid hand movement for the initial inner curve.'
  },
  'ஈ': {
    tamil: 'ஈ',
    english: 'ee',
    name: 'Long EE (ஈகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Left Pillar',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 48 45 L 48 125',
        startPos: { x: 48, y: 45 },
        endPos: { x: 48, y: 125 },
        liftPencil: true,
        startDesc: 'Start top left.',
        directionDesc: 'Draw a straight vertical line straight down ⬇️',
        liftDesc: '✋ LIFT PENCIL before drawing roof frame!',
        endDesc: 'Stop at baseline left.'
      },
      {
        strokeNumber: 2,
        strokeName: 'Roof & Right Pillar',
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 48 45 L 112 45 L 112 125',
        startPos: { x: 48, y: 45 },
        endPos: { x: 112, y: 125 },
        liftPencil: true,
        startDesc: 'Start at top left corner.',
        directionDesc: 'Draw across top horizontal roof ➡️, then turn down straight for right pillar ⬇️',
        liftDesc: '✋ LIFT PENCIL before placing dots!',
        endDesc: 'Stop at baseline right.'
      },
      {
        strokeNumber: 3,
        strokeName: 'Inner Dot (உள் புள்ளி)',
        color: '#f43f5e', // Rose
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-500',
        path: 'M 78 82 A 5 5 0 1 1 78 82.1',
        startPos: { x: 78, y: 82 },
        endPos: { x: 78, y: 82 },
        liftPencil: true,
        startDesc: 'Center inside arch frame.',
        directionDesc: 'Place a small neat circular dot 🔘',
        liftDesc: '✋ LIFT PENCIL before placing outer dot!',
        endDesc: 'Inside center.'
      },
      {
        strokeNumber: 4,
        strokeName: 'Outer Dot (வெளிப் புள்ளி)',
        color: '#d97706', // Amber
        badgeColor: 'bg-amber-600 text-white',
        borderClass: 'border-amber-500',
        path: 'M 132 82 A 5 5 0 1 1 132 82.1',
        startPos: { x: 132, y: 82 },
        endPos: { x: 132, y: 82 },
        liftPencil: false,
        startDesc: 'Outside right pillar.',
        directionDesc: 'Place second neat dot outside on the right 🔘',
        endDesc: 'Outside right.'
      }
    ],
    paperTip: 'Make the two vertical pillars strictly parallel and space the dots clearly.'
  },
  'உ': {
    tamil: 'உ',
    english: 'u',
    name: 'Short U (உகரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Continuous Loop & Base Bar',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 50 55 C 70 50, 70 70, 50 68 C 35 65, 82 70, 50 110 L 128 110',
        startPos: { x: 50, y: 55 },
        endPos: { x: 128, y: 110 },
        liftPencil: false,
        startDesc: 'Start with a small loop near top-left.',
        directionDesc: 'Loop clockwise 🔄, arc down counter-clockwise, then extend horizontal right along baseline ➡️',
        endDesc: 'Stop at baseline end right.'
      }
    ],
    paperTip: 'Written in 1 single continuous stroke without lifting your pencil!'
  },
  'ஊ': {
    tamil: 'ஊ',
    english: 'oo',
    name: 'Long OO (ஊகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: "Base 'உ' Shape",
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 45 60 C 65 55, 65 75, 45 73 C 30 70, 78 75, 45 115 L 120 115',
        startPos: { x: 45, y: 60 },
        endPos: { x: 120, y: 115 },
        liftPencil: true,
        startDesc: 'Start with top loop.',
        directionDesc: 'Write short vowel "உ" base stroke 🔄 ➡️',
        liftDesc: '✋ LIFT PENCIL to add "ள" crown symbol above!',
        endDesc: 'Stop at baseline.'
      },
      {
        strokeNumber: 2,
        strokeName: "Companion 'ள' Symbol",
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 75 52 C 65 52, 65 65, 75 65 L 105 65 C 105 80, 85 80, 75 80',
        startPos: { x: 75, y: 52 },
        endPos: { x: 75, y: 80 },
        liftPencil: false,
        startDesc: 'Start top-middle above baseline.',
        directionDesc: 'Write the companion symbol "ள" loop and hook 🔄',
        endDesc: 'Stop resting above baseline.'
      }
    ],
    paperTip: 'Position the secondary "ள" symbol comfortably above the right side of the base.'
  },
  'எ': {
    tamil: 'எ',
    english: 'e',
    name: 'Short E (எகரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Bottom Loop & Frame',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 45 95 C 32 95, 32 110, 45 110 C 58 110, 58 95, 45 95 L 45 48 L 110 48 L 110 120',
        startPos: { x: 45, y: 95 },
        endPos: { x: 110, y: 120 },
        liftPencil: false,
        startDesc: 'Start near bottom-left with a loop.',
        directionDesc: 'Loop circle 🔄, draw straight up ⬆️, right across roof ➡️, then straight down to baseline ⬇️',
        endDesc: 'Stop at baseline bottom-right.'
      }
    ],
    paperTip: 'Written in 1 continuous stroke. Keep corners clean and squared.'
  },
  'ஏ': {
    tamil: 'ஏ',
    english: 'ee',
    name: 'Long EE (ஏகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Frame & Slanted Tail (சாய்வுக் கோடு)',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 45 95 C 32 95, 32 110, 45 110 C 58 110, 58 95, 45 95 L 45 48 L 110 48 L 110 120 L 138 138',
        startPos: { x: 45, y: 95 },
        endPos: { x: 138, y: 138 },
        liftPencil: false,
        startDesc: 'Start bottom-left loop (same as "எ").',
        directionDesc: 'Follow "எ" frame 🔄 ⬆️ ➡️ ⬇️, then extend a downward slanting line past baseline ↘️',
        endDesc: 'Stop at bottom right tail tip.'
      }
    ],
    paperTip: 'The slanting line extends downwards towards the right below the notebook line.'
  },
  'ஐ': {
    tamil: 'ஐ',
    english: 'ai',
    name: 'Diphthong AI (ஐகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Front Double Loop Prefix',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 35 60 C 20 60, 20 85, 35 85 C 50 85, 50 60, 35 60',
        startPos: { x: 35, y: 60 },
        endPos: { x: 35, y: 60 },
        liftPencil: true,
        startDesc: 'Start top-left.',
        directionDesc: 'Draw initial double loop prefix 🔄',
        liftDesc: '✋ LIFT PENCIL before center arch!',
        endDesc: 'Complete circle loop.'
      },
      {
        strokeNumber: 2,
        strokeName: 'Center Arch',
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 50 72 C 65 60, 80 60, 95 72 L 95 105',
        startPos: { x: 50, y: 72 },
        endPos: { x: 95, y: 105 },
        liftPencil: true,
        startDesc: 'Start beside front loop.',
        directionDesc: 'Sweep over into a center arch and down ↪️ ⬇️',
        liftDesc: '✋ LIFT PENCIL before drawing twin bottom waves!',
        endDesc: 'Stop center right.'
      },
      {
        strokeNumber: 3,
        strokeName: 'Bottom Twin Wave Loops',
        color: '#f43f5e',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-500',
        path: 'M 35 120 C 50 120, 50 135, 65 135 M 65 135 C 80 135, 80 120, 95 120 M 95 120 C 110 120, 110 135, 125 135',
        startPos: { x: 35, y: 120 },
        endPos: { x: 125, y: 135 },
        liftPencil: false,
        startDesc: 'Start bottom-left underneath.',
        directionDesc: 'Add two smooth matching wave loops along bottom 〰️',
        endDesc: 'Stop bottom-right.'
      }
    ],
    paperTip: 'Make the two bottom wave loops uniform in width and height.'
  },
  'ஒ': {
    tamil: 'ஒ',
    english: 'o',
    name: 'Short O (ஒகரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Loop, Middle Arc & Baseline Bar',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 50 48 C 70 45, 70 65, 50 63 C 35 60, 82 65, 50 85 C 82 90, 82 122, 40 120 L 125 120',
        startPos: { x: 50, y: 48 },
        endPos: { x: 125, y: 120 },
        liftPencil: false,
        startDesc: 'Start top circle near top-left.',
        directionDesc: 'Loop circle 🔄, arc middle section ↪️, sweep down and extend flat line right along baseline ➡️',
        endDesc: 'Stop at baseline end.'
      }
    ],
    paperTip: '1 continuous fluid stroke. Forms the foundation shape for "ஓ" and "ஔ"!'
  },
  'ஓ': {
    tamil: 'ஓ',
    english: 'oo',
    name: 'Long OO (ஓகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Loop, Middle Arc & Inward Curling Tail',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 50 48 C 70 45, 70 65, 50 63 C 35 60, 82 65, 50 85 C 82 90, 82 122, 40 120 L 125 120 C 135 100, 105 95, 100 105',
        startPos: { x: 50, y: 48 },
        endPos: { x: 100, y: 105 },
        liftPencil: false,
        startDesc: 'Start top circle.',
        directionDesc: 'Follow "ஒ" shape 🔄 ➡️, then at the baseline end curl upwards and inward into a small tail ↪️',
        endDesc: 'Stop curled inside tail.'
      }
    ],
    paperTip: 'The end tail curls gracefully inside above the baseline.'
  },
  'ஔ': {
    tamil: 'ஔ',
    english: 'au',
    name: 'Diphthong AU (ஔகாரம்)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: "Left 'ஒ' Symbol",
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 40 48 C 60 45, 60 65, 40 63 C 25 60, 72 65, 40 85 C 72 90, 72 122, 30 120 L 92 120',
        startPos: { x: 40, y: 48 },
        endPos: { x: 92, y: 120 },
        liftPencil: true,
        startDesc: 'Start top left circle.',
        directionDesc: 'Write "ஒ" symbol on the left 🔄 ➡️',
        liftDesc: '✋ LIFT PENCIL to write companion symbol on right!',
        endDesc: 'Stop baseline.'
      },
      {
        strokeNumber: 2,
        strokeName: "Right Companion 'ள'",
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 112 50 C 102 50, 102 65, 112 65 L 142 65 C 142 80, 122 80, 112 80 L 112 120',
        startPos: { x: 112, y: 50 },
        endPos: { x: 112, y: 120 },
        liftPencil: false,
        startDesc: 'Start top right.',
        directionDesc: 'Write companion "ள" symbol 🔄 ⬇️',
        endDesc: 'Stop baseline right.'
      }
    ],
    paperTip: 'Keep both symbols close together as a unified pair.'
  },
  'ஃ': {
    tamil: 'ஃ',
    english: 'ak',
    name: 'Aayutha Ezhuthu (ஆய்த எழுத்து)',
    strokes: [
      {
        strokeNumber: 1,
        strokeName: 'Top Dot (மேல் புள்ளி)',
        color: '#4f46e5',
        badgeColor: 'bg-indigo-600 text-white',
        borderClass: 'border-indigo-500',
        path: 'M 80 48 A 6 6 0 1 1 80 60',
        startPos: { x: 80, y: 54 },
        endPos: { x: 80, y: 54 },
        liftPencil: true,
        startDesc: 'Top vertex position.',
        directionDesc: 'Draw one solid circular dot at the top 🔘',
        liftDesc: '✋ LIFT PENCIL to draw bottom left dot!',
        endDesc: 'Top vertex.'
      },
      {
        strokeNumber: 2,
        strokeName: 'Bottom Left Dot (கீழ் இடப் புள்ளி)',
        color: '#10b981',
        badgeColor: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        path: 'M 55 95 A 6 6 0 1 1 55 107',
        startPos: { x: 55, y: 101 },
        endPos: { x: 55, y: 101 },
        liftPencil: true,
        startDesc: 'Bottom left vertex position.',
        directionDesc: 'Draw second dot at bottom-left 🔘',
        liftDesc: '✋ LIFT PENCIL to draw bottom right dot!',
        endDesc: 'Bottom left.'
      },
      {
        strokeNumber: 3,
        strokeName: 'Bottom Right Dot (கீழ் வலப் புள்ளி)',
        color: '#f43f5e',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-500',
        path: 'M 105 95 A 6 6 0 1 1 105 107',
        startPos: { x: 105, y: 101 },
        endPos: { x: 105, y: 101 },
        liftPencil: false,
        startDesc: 'Bottom right vertex position.',
        directionDesc: 'Draw third dot at bottom-right 🔘',
        endDesc: 'Bottom right.'
      }
    ],
    paperTip: 'The three dots should form a neat balanced equilateral triangle.'
  }
};

interface WritingGuideModalProps {
  initialTamil?: string;
  onClose: () => void;
}

export function WritingGuideModal({ initialTamil = 'அ', onClose }: WritingGuideModalProps) {
  const vowelKeys = Object.keys(VOWEL_STROKES);
  const [selectedLetter, setSelectedLetter] = useState<string>(
    VOWEL_STROKES[initialTamil] ? initialTamil : 'அ'
  );

  const strokeInfo = VOWEL_STROKES[selectedLetter] || VOWEL_STROKES['அ'];

  const [activeTab, setActiveTab] = useState<'diagram' | 'practice'>('diagram');
  const [highlightedStrokeIndex, setHighlightedStrokeIndex] = useState<number | null>(null);

  // Practice Canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState<string>('#1e1b4b');
  const [penSize, setPenSize] = useState<number>(10);

  // Play audio pronunciation when switching letter
  useEffect(() => {
    playAudio(strokeInfo.tamil, 'ta-IN');
    setHighlightedStrokeIndex(null);
    clearCanvas();
  }, [selectedLetter]);

  // Clear canvas handler
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.beginPath();
    ctx.moveTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-indigo-200 dark:border-slate-800 overflow-hidden my-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-md">
              <Edit3 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                Tamil Writing & Stroke Guide
              </h3>
              <p className="text-xs text-indigo-200 font-bold">
                Clear start points, direction arrows & stroke-by-stroke instructions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-indigo-200 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Letter Switcher Bar */}
        <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 shrink-0 mr-1">
            Vowels:
          </span>
          {vowelKeys.map((v) => {
            const isSel = v === selectedLetter;
            return (
              <button
                key={v}
                onClick={() => setSelectedLetter(v)}
                className={`px-3.5 py-1.5 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer shrink-0 ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-400'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-600'
                }`}
              >
                {v}
              </button>
            );
          })}
        </div>

        {/* Modal Main Body Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Interactive Visual Diagram & Practice Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* View Mode Toggle */}
            <div className="w-full flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-4 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('diagram')}
                className={`flex-1 py-2 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'diagram'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Stroke Directions & Markers</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className={`flex-1 py-2 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'practice'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>Tracing Practice Pad</span>
              </button>
            </div>

            {/* School Notebook Lined Paper Frame */}
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] bg-[#fffdfa] rounded-3xl border-4 border-amber-200 shadow-xl overflow-hidden flex items-center justify-center select-none">
              
              {/* Notebook Paper Lines */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                {/* Red margin vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-rose-300 opacity-60"></div>
                
                {/* Blue Horizontal Paper Rules */}
                <div className="w-full h-full flex flex-col justify-between py-6">
                  <div className="w-full border-b border-sky-200"></div>
                  <div className="w-full border-b border-sky-300 border-dashed"></div>
                  <div className="w-full border-b-2 border-rose-400"></div>
                  <div className="w-full border-b border-sky-200"></div>
                </div>
              </div>

              {activeTab === 'diagram' ? (
                /* High-Contrast Stroke Directions Vector Diagram */
                <div className="relative w-full h-full p-2 flex items-center justify-center">
                  <svg
                    viewBox="0 0 160 160"
                    className="w-full h-full max-w-[320px] max-h-[320px] relative z-10"
                  >
                    <defs>
                      <marker
                        id="arrow-indigo"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
                      </marker>
                      <marker
                        id="arrow-emerald"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                      </marker>
                      <marker
                        id="arrow-rose"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                      </marker>
                    </defs>

                    {/* Faint Dotted Full Letter Background */}
                    <text
                      x="80"
                      y="90"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="105"
                      fontWeight="900"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                      className="font-serif sm:font-sans opacity-40 select-none"
                    >
                      {strokeInfo.tamil}
                    </text>

                    {/* Stroke Paths Rendered in Color */}
                    {strokeInfo.strokes.map((s, idx) => {
                      const isHighlighted = highlightedStrokeIndex === null || highlightedStrokeIndex === idx;
                      const opacity = isHighlighted ? 1 : 0.25;

                      let markerId = 'arrow-indigo';
                      if (s.color.includes('10b981')) markerId = 'arrow-emerald';
                      if (s.color.includes('f43f5e')) markerId = 'arrow-rose';

                      return (
                        <g key={idx} style={{ opacity, transition: 'opacity 0.2s' }}>
                          <path
                            d={s.path}
                            fill="none"
                            stroke={s.color}
                            strokeWidth="9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            markerEnd={`url(#${markerId})`}
                          />
                        </g>
                      );
                    })}

                    {/* Start (🟢 Green) and End (🔴 Red) Position Markers */}
                    {strokeInfo.strokes.map((s, idx) => {
                      const isHighlighted = highlightedStrokeIndex === null || highlightedStrokeIndex === idx;
                      if (!isHighlighted) return null;

                      return (
                        <g key={`markers-${idx}`}>
                          {/* Green Start Circle */}
                          <g transform={`translate(${s.startPos.x}, ${s.startPos.y})`}>
                            <circle r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                            <text
                              x="0"
                              y="1"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize="8"
                              fontWeight="900"
                              fill="#ffffff"
                            >
                              S{s.strokeNumber}
                            </text>
                          </g>

                          {/* Red End Circle */}
                          <g transform={`translate(${s.endPos.x}, ${s.endPos.y})`}>
                            <circle r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                            <text
                              x="0"
                              y="1"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize="7"
                              fontWeight="900"
                              fill="#ffffff"
                            >
                              E{s.strokeNumber}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>

                  {/* On-Diagram Visual Legend Overlay */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[11px] font-black bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                      <span>S1 = Start</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                      <span>E1 = End</span>
                    </div>
                    <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Follow Arrow</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Tracing Practice Canvas */
                <div className="relative w-full h-full flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={320}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-full cursor-crosshair touch-none relative z-10"
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-500 font-extrabold text-xs sm:text-sm bg-white/40 backdrop-blur-[1px] text-center p-4">
                      ✍️ Use your finger or stylus to trace over the letter!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Practice Controls or Diagram Stroke Filter Buttons */}
            {activeTab === 'diagram' ? (
              <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-slate-500 mr-1">Highlight:</span>
                <button
                  onClick={() => setHighlightedStrokeIndex(null)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                    highlightedStrokeIndex === null
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  All Strokes
                </button>
                {strokeInfo.strokes.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHighlightedStrokeIndex(idx)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                      highlightedStrokeIndex === idx
                        ? `${s.badgeColor} shadow-md scale-105`
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Stroke {s.strokeNumber}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-3 flex-wrap justify-center">
                {/* Pen color choices */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  {['#1e1b4b', '#2563eb', '#dc2626', '#16a34a'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setPenColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                        penColor === c ? 'scale-125 ring-2 ring-indigo-500' : 'hover:scale-110'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Pad</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Step-by-Step Writing Directions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Header Letter Name & Audio Button */}
              <div className="flex items-center justify-between bg-amber-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-700">
                <div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white mr-2">
                    {strokeInfo.tamil}
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    /{strokeInfo.english}/ &bull; {strokeInfo.name}
                  </span>
                </div>
                <button
                  onClick={() => playAudio(strokeInfo.tamil, 'ta-IN')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md text-xs font-black flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>Listen</span>
                </button>
              </div>

              {/* Stroke-by-Stroke Step Breakdown Cards */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-indigo-500" />
                    <span>Stroke-by-Stroke Hand Directions</span>
                  </h4>
                  <span className="text-xs font-black bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-lg">
                    {strokeInfo.strokes.length} {strokeInfo.strokes.length === 1 ? 'Stroke' : 'Strokes'} Total
                  </span>
                </div>

                {strokeInfo.strokes.map((stroke, idx) => {
                  const isHighlighted = highlightedStrokeIndex === idx;

                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setHighlightedStrokeIndex(idx)}
                      whileHover={{ scale: 1.01 }}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isHighlighted
                          ? `${stroke.borderClass} bg-indigo-50/70 dark:bg-slate-800 shadow-md`
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-slate-300'
                      }`}
                    >
                      {/* Stroke Card Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-xl text-xs font-black ${stroke.badgeColor}`}>
                            Stroke {stroke.strokeNumber}
                          </span>
                          <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {stroke.strokeName}
                          </h5>
                        </div>
                      </div>

                      {/* Direction Specifications */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-start gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                          <span className="shrink-0 text-sm">🟢</span>
                          <div>
                            <span className="uppercase text-[10px] tracking-wider text-slate-400 block font-black">Where to Start:</span>
                            <span>{stroke.startDesc}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                          <span className="shrink-0 text-sm">➡️</span>
                          <div>
                            <span className="uppercase text-[10px] tracking-wider text-slate-400 block font-black">Movement Direction:</span>
                            <span className="leading-relaxed">{stroke.directionDesc}</span>
                          </div>
                        </div>

                        {stroke.liftPencil ? (
                          <div className="flex items-start gap-1.5 font-black text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/50 p-2 rounded-xl border border-amber-300 dark:border-amber-800">
                            <Hand className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{stroke.liftDesc || 'LIFT PENCIL here before starting next stroke!'}</span>
                          </div>
                        ) : (
                          <div className="flex items-start gap-1.5 font-bold text-rose-700 dark:text-rose-400">
                            <span className="shrink-0 text-sm">🔴</span>
                            <div>
                              <span className="uppercase text-[10px] tracking-wider text-slate-400 block font-black">Where to End:</span>
                              <span>{stroke.endDesc}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Handwriting Tip Card */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-start gap-2.5">
              <span className="text-xl shrink-0">💡</span>
              <div>
                <span className="font-black block text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-0.5">
                  Paper Handwriting Tip:
                </span>
                <p className="leading-relaxed font-semibold">{strokeInfo.paperTip}</p>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
