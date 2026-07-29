import { Letter, Phrase, CategoryItem, Combination } from '../types';

export const vowels: Letter[] = [
  { id: 'v1', tamil: 'அ', english: 'a', exampleTamil: 'அம்மா', exampleEnglish: 'Amma', translation: 'Mother', emoji: '👩‍👧', type: 'vowel' },
  { id: 'v2', tamil: 'ஆ', english: 'aa', exampleTamil: 'ஆடு', exampleEnglish: 'Aadu', translation: 'Goat', emoji: '🐐', type: 'vowel' },
  { id: 'v3', tamil: 'இ', english: 'i', exampleTamil: 'இலை', exampleEnglish: 'Ilai', translation: 'Leaf', emoji: '🍃', type: 'vowel' },
  { id: 'v4', tamil: 'ஈ', english: 'ee', exampleTamil: 'ஈ', exampleEnglish: 'Ee', translation: 'Housefly', emoji: '🪰', type: 'vowel' },
  { id: 'v5', tamil: 'உ', english: 'u', exampleTamil: 'உரல்', exampleEnglish: 'Ural', translation: 'Mortar', emoji: '🥣', type: 'vowel' },
  { id: 'v6', tamil: 'ஊ', english: 'oo', exampleTamil: 'ஊஞ்சல்', exampleEnglish: 'Oonjal', translation: 'Swing', emoji: '🛝', type: 'vowel' },
  { id: 'v7', tamil: 'எ', english: 'e', exampleTamil: 'எலி', exampleEnglish: 'Eli', translation: 'Rat', emoji: '🐀', type: 'vowel' },
  { id: 'v8', tamil: 'ஏ', english: 'ae', exampleTamil: 'ஏணி', exampleEnglish: 'Aeni', translation: 'Ladder', emoji: '🪜', type: 'vowel' },
  { id: 'v9', tamil: 'ஐ', english: 'ai', exampleTamil: 'ஐந்து', exampleEnglish: 'Ainthu', translation: 'Five', emoji: '5️⃣', type: 'vowel' },
  { id: 'v10', tamil: 'ஒ', english: 'o', exampleTamil: 'ஒட்டகம்', exampleEnglish: 'Ottagam', translation: 'Camel', emoji: '🐪', type: 'vowel' },
  { id: 'v11', tamil: 'ஓ', english: 'oo', exampleTamil: 'ஓடம்', exampleEnglish: 'Oodam', translation: 'Boat', emoji: '🛶', type: 'vowel' },
  { id: 'v12', tamil: 'ஔ', english: 'au', exampleTamil: 'ஔவையார்', exampleEnglish: 'Avvaiyar', translation: 'Poetess', emoji: '👵', type: 'vowel' },
  { id: 'v13', tamil: 'ஃ', english: 'ak', exampleTamil: 'எஃகு', exampleEnglish: 'Ehgu', translation: 'Steel / Sword (Aayutha Ezhuthu)', emoji: '⚔️', type: 'vowel' },
];

export const consonants: Letter[] = [
  { id: 'c1', tamil: 'க்', english: 'ik', exampleTamil: 'சக்கரம்', exampleEnglish: 'Sakkaram', translation: 'Wheel', emoji: '🎡', type: 'consonant' },
  { id: 'c2', tamil: 'ங்', english: 'ing', exampleTamil: 'சிங்கம்', exampleEnglish: 'Singam', translation: 'Lion', emoji: '🦁', type: 'consonant' },
  { id: 'c3', tamil: 'ச்', english: 'ich', exampleTamil: 'எலுமிச்சை', exampleEnglish: 'Elumichai', translation: 'Lemon', emoji: '🍋', type: 'consonant' },
  { id: 'c4', tamil: 'ஞ்', english: 'inj', exampleTamil: 'இஞ்சி', exampleEnglish: 'Inji', translation: 'Ginger', emoji: '🫚', type: 'consonant' },
  { id: 'c5', tamil: 'ட்', english: 'it', exampleTamil: 'சட்டை', exampleEnglish: 'Sattai', translation: 'Shirt', emoji: '👕', type: 'consonant' },
  { id: 'c6', tamil: 'ண்', english: 'in', exampleTamil: 'நண்டு', exampleEnglish: 'Nandu', translation: 'Crab', emoji: '🦀', type: 'consonant' },
  { id: 'c7', tamil: 'த்', english: 'ith', exampleTamil: 'வாத்து', exampleEnglish: 'Vaathu', translation: 'Duck', emoji: '🦆', type: 'consonant' },
  { id: 'c8', tamil: 'ந்', english: 'ind', exampleTamil: 'பந்து', exampleEnglish: 'Panthu', translation: 'Ball', emoji: '⚽', type: 'consonant' },
  { id: 'c9', tamil: 'ப்', english: 'ip', exampleTamil: 'கப்பல்', exampleEnglish: 'Kappal', translation: 'Ship', emoji: '🚢', type: 'consonant' },
  { id: 'c10', tamil: 'ம்', english: 'im', exampleTamil: 'மரம்', exampleEnglish: 'Maram', translation: 'Tree', emoji: '🌳', type: 'consonant' },
  { id: 'c11', tamil: 'ய்', english: 'iy', exampleTamil: 'நாய்', exampleEnglish: 'Naay', translation: 'Dog', emoji: '🐶', type: 'consonant' },
  { id: 'c12', tamil: 'ர்', english: 'ir', exampleTamil: 'தேர்', exampleEnglish: 'Ther', translation: 'Chariot', emoji: '🛕', type: 'consonant' },
  { id: 'c13', tamil: 'ல்', english: 'il', exampleTamil: 'கல்', exampleEnglish: 'Kal', translation: 'Stone', emoji: '🪨', type: 'consonant' },
  { id: 'c14', tamil: 'வ்', english: 'iv', exampleTamil: 'செவ்வந்தி', exampleEnglish: 'Sevvanthi', translation: 'Chrysanthemum', emoji: '🌼', type: 'consonant' },
  { id: 'c15', tamil: 'ழ்', english: 'izh', exampleTamil: 'யாழ்', exampleEnglish: 'Yaazh', translation: 'Harp', emoji: '🪕', type: 'consonant' },
  { id: 'c16', tamil: 'ள்', english: 'ill', exampleTamil: 'முள்', exampleEnglish: 'Mul', translation: 'Thorn', emoji: '🌵', type: 'consonant' },
  { id: 'c17', tamil: 'ற்', english: 'irr', exampleTamil: 'நாற்காலி', exampleEnglish: 'Naarkaali', translation: 'Chair', emoji: '🪑', type: 'consonant' },
  { id: 'c18', tamil: 'ன்', english: 'inn', exampleTamil: 'மீன்', exampleEnglish: 'Meen', translation: 'Fish', emoji: '🐟', type: 'consonant' },
];

export const numbers: CategoryItem[] = [
  { id: 'n1', numberVal: 1, tamilNumeral: '௧', tamil: 'ஒன்று', english: 'Ondru', translation: 'One', emoji: '1️⃣' },
  { id: 'n2', numberVal: 2, tamilNumeral: '௨', tamil: 'இரண்டு', english: 'Irandu', translation: 'Two', emoji: '2️⃣' },
  { id: 'n3', numberVal: 3, tamilNumeral: '௩', tamil: 'மூன்று', english: 'Moondru', translation: 'Three', emoji: '3️⃣' },
  { id: 'n4', numberVal: 4, tamilNumeral: '௪', tamil: 'நான்கு', english: 'Naangu', translation: 'Four', emoji: '4️⃣' },
  { id: 'n5', numberVal: 5, tamilNumeral: '௫', tamil: 'ஐந்து', english: 'Ainthu', translation: 'Five', emoji: '5️⃣' },
  { id: 'n6', numberVal: 6, tamilNumeral: '௬', tamil: 'ஆறு', english: 'Aaru', translation: 'Six', emoji: '6️⃣' },
  { id: 'n7', numberVal: 7, tamilNumeral: '௭', tamil: 'ஏழு', english: 'Aezhu', translation: 'Seven', emoji: '7️⃣' },
  { id: 'n8', numberVal: 8, tamilNumeral: '௮', tamil: 'எட்டு', english: 'Ettu', translation: 'Eight', emoji: '8️⃣' },
  { id: 'n9', numberVal: 9, tamilNumeral: '௯', tamil: 'ஒன்பது', english: 'Onpathu', translation: 'Nine', emoji: '9️⃣' },
  { id: 'n10', numberVal: 10, tamilNumeral: '௰', tamil: 'பத்து', english: 'Pathu', translation: 'Ten', emoji: '🔟' },
];

export const commonWords: CategoryItem[] = [
  { id: 'w1', tamil: 'வீடு', english: 'Veedu', translation: 'House', emoji: '🏠' },
  { id: 'w2', tamil: 'புத்தகம்', english: 'Puthagam', translation: 'Book', emoji: '📚' },
  { id: 'w3', tamil: 'மரம்', english: 'Maram', translation: 'Tree', emoji: '🌳' },
  { id: 'w4', tamil: 'பூ', english: 'Poo', translation: 'Flower', emoji: '🌸' },
  { id: 'w5', tamil: 'தண்ணீர்', english: 'Thanneer', translation: 'Water', emoji: '💧' },
  { id: 'w6', tamil: 'சூரியன்', english: 'Sooriyan', translation: 'Sun', emoji: '☀️' },
  { id: 'w7', tamil: 'நிலா', english: 'Nila', translation: 'Moon', emoji: '🌙' },
  { id: 'w8', tamil: 'நட்சத்திரம்', english: 'Natsathiram', translation: 'Star', emoji: '⭐️' },
  { id: 'w9', tamil: 'மழை', english: 'Mazhai', translation: 'Rain', emoji: '🌧️' },
  { id: 'w10', tamil: 'பள்ளி', english: 'Palli', translation: 'School', emoji: '🏫' },
  { id: 'w11', tamil: 'கண்', english: 'Kan', translation: 'Eye', emoji: '👁️' },
  { id: 'w12', tamil: 'கை', english: 'Kai', translation: 'Hand', emoji: '🤚' },
];

export const fruitsVeggies: CategoryItem[] = [
  { id: 'fv1', tamil: 'மாம்பழம்', english: 'Maambazham', translation: 'Mango', emoji: '🥭' },
  { id: 'fv2', tamil: 'வாழைப்பழம்', english: 'Vaazhaipazham', translation: 'Banana', emoji: '🍌' },
  { id: 'fv3', tamil: 'தேங்காய்', english: 'Thengaai', translation: 'Coconut', emoji: '🥥' },
  { id: 'fv4', tamil: 'ஆப்பிள்', english: 'Aappil', translation: 'Apple', emoji: '🍎' },
  { id: 'fv5', tamil: 'தக்காளி', english: 'Thakkaali', translation: 'Tomato', emoji: '🍅' },
  { id: 'fv6', tamil: 'எலுமிச்சை', english: 'Elumichai', translation: 'Lemon', emoji: '🍋' },
  { id: 'fv7', tamil: 'இஞ்சி', english: 'Inji', translation: 'Ginger', emoji: '🫚' },
  { id: 'fv8', tamil: 'வெங்காயம்', english: 'Vengayam', translation: 'Onion', emoji: '🧅' },
];

export const colors: CategoryItem[] = [
  { id: 'clr1', tamil: 'சிவப்பு', english: 'Sivappu', translation: 'Red', emoji: '🔴', color: 'bg-red-500' },
  { id: 'clr2', tamil: 'நீலம்', english: 'Neelam', translation: 'Blue', emoji: '🔵', color: 'bg-blue-500' },
  { id: 'clr3', tamil: 'பச்சை', english: 'Pachai', translation: 'Green', emoji: '🟢', color: 'bg-emerald-500' },
  { id: 'clr4', tamil: 'மஞ்சள்', english: 'Manjal', translation: 'Yellow', emoji: '🟡', color: 'bg-amber-400' },
  { id: 'clr5', tamil: 'வெள்ளை', english: 'Vellai', translation: 'White', emoji: '⚪', color: 'bg-slate-100 border border-slate-300' },
  { id: 'clr6', tamil: 'கருப்பு', english: 'Karuppu', translation: 'Black', emoji: '⚫', color: 'bg-slate-900' },
  { id: 'clr7', tamil: 'செம்மஞ்சள்', english: 'Semmanjal', translation: 'Orange', emoji: '🟠', color: 'bg-orange-500' },
  { id: 'clr8', tamil: 'ஊதா', english: 'Oodha', translation: 'Purple', emoji: '🟣', color: 'bg-purple-600' },
  { id: 'clr9', tamil: 'இளஞ்சிவப்பு', english: 'Ilansivappu', translation: 'Pink', emoji: '🩷', color: 'bg-pink-400' },
  { id: 'clr10', tamil: 'பழுப்பு', english: 'Pazhuppu', translation: 'Brown', emoji: '🟤', color: 'bg-amber-800' },
];

export const animals: CategoryItem[] = [
  { id: 'a1', tamil: 'யானை', english: 'Yaanai', translation: 'Elephant', emoji: '🐘' },
  { id: 'a2', tamil: 'சிங்கம்', english: 'Singam', translation: 'Lion', emoji: '🦁' },
  { id: 'a3', tamil: 'புலி', english: 'Puli', translation: 'Tiger', emoji: '🐯' },
  { id: 'a4', tamil: 'மயில்', english: 'Mayil', translation: 'Peacock', emoji: '🦚' },
  { id: 'a5', tamil: 'நாய்', english: 'Naay', translation: 'Dog', emoji: '🐶' },
  { id: 'a6', tamil: 'பூனை', english: 'Poonai', translation: 'Cat', emoji: '🐱' },
  { id: 'a7', tamil: 'பசு', english: 'Pasu', translation: 'Cow', emoji: '🐮' },
  { id: 'a8', tamil: 'குரங்கு', english: 'Kurangu', translation: 'Monkey', emoji: '🐒' },
  { id: 'a9', tamil: 'கிளி', english: 'Kili', translation: 'Parrot', emoji: '🦜' },
  { id: 'a10', tamil: 'மீன்', english: 'Meen', translation: 'Fish', emoji: '🐟' },
  { id: 'a11', tamil: 'முயல்', english: 'Muyal', translation: 'Rabbit', emoji: '🐰' },
  { id: 'a12', tamil: 'குதிரை', english: 'Kuthirai', translation: 'Horse', emoji: '🐴' },
  { id: 'a13', tamil: 'வாத்து', english: 'Vaathu', translation: 'Duck', emoji: '🦆' },
  { id: 'a14', tamil: 'காகம்', english: 'Kaagam', translation: 'Crow', emoji: '🐦‍⬛' },
];

export const family: CategoryItem[] = [
  { id: 'f1', tamil: 'அம்மா', english: 'Amma', translation: 'Mother', emoji: '👩' },
  { id: 'f2', tamil: 'அப்பா', english: 'Appa', translation: 'Father', emoji: '👨' },
  { id: 'f3', tamil: 'அண்ணன்', english: 'Annan', translation: 'Elder Brother', emoji: '👦' },
  { id: 'f4', tamil: 'அக்கா', english: 'Akka', translation: 'Elder Sister', emoji: '👧' },
  { id: 'f5', tamil: 'தம்பி', english: 'Thambi', translation: 'Younger Brother', emoji: '👶' },
  { id: 'f6', tamil: 'தங்கை', english: 'Thangai', translation: 'Younger Sister', emoji: '🧒' },
  { id: 'f7', tamil: 'தாத்தா', english: 'Thaatha', translation: 'Grandfather', emoji: '👴' },
  { id: 'f8', tamil: 'பாட்டி', english: 'Paatti', translation: 'Grandmother', emoji: '👵' },
  { id: 'f9', tamil: 'மாமா', english: 'Maama', translation: 'Uncle', emoji: '👨‍🦳' },
  { id: 'f10', tamil: 'அத்தை', english: 'Athai', translation: 'Aunt', emoji: '👩‍🦳' },
  { id: 'f11', tamil: 'நண்பன்', english: 'Nanban', translation: 'Friend', emoji: '🧑‍🤝‍🧑' },
];

export const vehicles: CategoryItem[] = [
  { id: 'vh1', tamil: 'பஸ்', english: 'Bus', translation: 'Bus', emoji: '🚌' },
  { id: 'vh2', tamil: 'கார்', english: 'Car', translation: 'Car', emoji: '🚗' },
  { id: 'vh3', tamil: 'இரயில்', english: 'Irayil', translation: 'Train', emoji: '🚂' },
  { id: 'vh4', tamil: 'விமானம்', english: 'Vimaanam', translation: 'Aeroplane', emoji: '✈️' },
  { id: 'vh5', tamil: 'மிதிவண்டி', english: 'Mithivandi', translation: 'Bicycle', emoji: '🚲' },
  { id: 'vh6', tamil: 'கப்பல்', english: 'Kappal', translation: 'Ship', emoji: '🚢' },
  { id: 'vh7', tamil: 'ஆட்டோ', english: 'Aatto', translation: 'Auto Rickshaw', emoji: '🛺' },
];

export const bodyParts: CategoryItem[] = [
  { id: 'bp1', tamil: 'கண்', english: 'Kan', translation: 'Eye', emoji: '👁️' },
  { id: 'bp2', tamil: 'காது', english: 'Kaathu', translation: 'Ear', emoji: '👂' },
  { id: 'bp3', tamil: 'மூக்கு', english: 'Mookku', translation: 'Nose', emoji: '👃' },
  { id: 'bp4', tamil: 'வாய்', english: 'Vaay', translation: 'Mouth', emoji: '👄' },
  { id: 'bp5', tamil: 'கை', english: 'Kai', translation: 'Hand', emoji: '🤚' },
  { id: 'bp6', tamil: 'கால்', english: 'Kaal', translation: 'Leg / Foot', emoji: '🦶' },
  { id: 'bp7', tamil: 'தலை', english: 'Thalai', translation: 'Head', emoji: '🗣️' },
  { id: 'bp8', tamil: 'பல்', english: 'Pal', translation: 'Tooth', emoji: '🦷' },
];

export const phrases: Phrase[] = [
  { id: 'p1', tamil: 'வணக்கம்', english: 'Vanakkam', translation: 'Hello / Greetings', emoji: '🙏', category: 'Greetings' },
  { id: 'p2', tamil: 'நன்றி', english: 'Nandri', translation: 'Thank you', emoji: '🙌', category: 'Manners' },
  { id: 'p3', tamil: 'எப்படி இருக்கிறீர்கள்?', english: 'Eppadi irukkireergal?', translation: 'How are you?', emoji: '👋', category: 'Questions' },
  { id: 'p4', tamil: 'நான் நன்றாக இருக்கிறேன்', english: 'Naan nandraaga irukkiren', translation: 'I am fine', emoji: '😊', category: 'Responses' },
  { id: 'p5', tamil: 'உங்கள் பெயர் என்ன?', english: 'Ungal peyar enna?', translation: 'What is your name?', emoji: '🤔', category: 'Questions' },
  { id: 'p6', tamil: 'என் பெயர்...', english: 'En peyar...', translation: 'My name is...', emoji: '🙋', category: 'Responses' },
  { id: 'p7', tamil: 'காலை வணக்கம்', english: 'Kaalai vanakkam', translation: 'Good morning', emoji: '🌅', category: 'Greetings' },
  { id: 'p8', tamil: 'இரவு வணக்கம்', english: 'Iravu vanakkam', translation: 'Good night', emoji: '🌙', category: 'Greetings' },
  { id: 'p9', tamil: 'சரி', english: 'Sari', translation: 'Okay / All right', emoji: '👍', category: 'Manners' },
  { id: 'p10', tamil: 'தயவுசெய்து', english: 'Dhayavu seidhu', translation: 'Please', emoji: '🥺', category: 'Manners' },
  { id: 'p11', tamil: 'மீண்டும் சந்திப்போம்', english: 'Meendum santhippom', translation: 'See you again!', emoji: '👋', category: 'Greetings' },
  { id: 'p12', tamil: 'எனக்கு புரியவில்லை', english: 'Enakku puriyavillai', translation: 'I do not understand', emoji: '🤷‍♂️', category: 'Responses' },
  { id: 'p13', tamil: 'வாருங்கள்', english: 'Vaarungal', translation: 'Welcome!', emoji: '🤗', category: 'Greetings' },
  { id: 'p14', tamil: 'போய் வருகிறேன்', english: 'Poi varugiren', translation: 'Goodbye / See you', emoji: '🏃‍♂️', category: 'Greetings' },
  { id: 'p15', tamil: 'மன்னித்துக்கொள்ளுங்கள்', english: 'Mannithukollungal', translation: 'Sorry / Excuse me', emoji: '🙏', category: 'Manners' },
  { id: 'p16', tamil: 'எவ்வளவு?', english: 'Evvalavu?', translation: 'How much?', emoji: '💰', category: 'Questions' },
  { id: 'p17', tamil: 'சாப்பிட்டீர்களா?', english: 'Saappitteergala?', translation: 'Have you eaten?', emoji: '🍲', category: 'Questions' },
  { id: 'p18', tamil: 'எனக்கு உதவி வேண்டும்', english: 'Enakku udhavi vaendum', translation: 'I need help', emoji: '🆘', category: 'Requests' },
  { id: 'p19', tamil: 'அற்புதமாக இருக்கிறது', english: 'Arputhamaga irukkirathu', translation: 'It is wonderful!', emoji: '✨', category: 'Responses' },
  { id: 'p20', tamil: 'எனக்கு பசிக்கிறது', english: 'Enakku pasikkirathu', translation: 'I am hungry', emoji: '😋', category: 'Responses' },
];

export const combinationsSample: Combination[] = [
  { consonant: 'க்', consonantEng: 'ik', vowel: 'அ', vowelEng: 'a', combined: 'க', combinedEng: 'ka', example: 'கண்', exampleEng: 'Kan', meaning: 'Eye', emoji: '👁️' },
  { consonant: 'க்', consonantEng: 'ik', vowel: 'ஆ', vowelEng: 'aa', combined: 'கா', combinedEng: 'kaa', example: 'காடு', exampleEng: 'Kaadu', meaning: 'Forest', emoji: '🌲' },
  { consonant: 'க்', consonantEng: 'ik', vowel: 'இ', vowelEng: 'i', combined: 'கி', combinedEng: 'ki', example: 'கிளி', exampleEng: 'Kili', meaning: 'Parrot', emoji: '🦜' },
  { consonant: 'க்', consonantEng: 'ik', vowel: 'ஈ', vowelEng: 'ee', combined: 'கீ', combinedEng: 'kee', example: 'கீரை', exampleEng: 'Keerai', meaning: 'Spinach', emoji: '🥬' },
  { consonant: 'ச்', consonantEng: 'ich', vowel: 'அ', vowelEng: 'a', combined: 'ச', combinedEng: 'cha', example: 'சட்டை', exampleEng: 'Sattai', meaning: 'Shirt', emoji: '👕' },
  { consonant: 'ச்', consonantEng: 'ich', vowel: 'ஆ', vowelEng: 'aa', combined: 'சா', combinedEng: 'chaa', example: 'சாப்பிடு', exampleEng: 'Saappidu', meaning: 'Eat', emoji: '🍽️' },
  { consonant: 'த்', consonantEng: 'ith', vowel: 'அ', vowelEng: 'a', combined: 'த', combinedEng: 'tha', example: 'தாமரை', exampleEng: 'Thamarai', meaning: 'Lotus', emoji: '🪷' },
  { consonant: 'ப்', consonantEng: 'ip', vowel: 'அ', vowelEng: 'a', combined: 'ப', combinedEng: 'pa', example: 'பந்து', exampleEng: 'Panthu', meaning: 'Ball', emoji: '⚽' },
  { consonant: 'ம்', consonantEng: 'im', vowel: 'அ', vowelEng: 'a', combined: 'ம', combinedEng: 'ma', example: 'மரம்', exampleEng: 'Maram', meaning: 'Tree', emoji: '🌳' },
];
