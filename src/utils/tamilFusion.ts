export interface FusionResult {
  consonantTamil: string;
  consonantEng: string;
  vowelTamil: string;
  vowelEng: string;
  combined: string;
  combinedEng: string;
  example?: string;
  exampleEng?: string;
  meaning?: string;
  emoji?: string;
}

const consonantBases: Record<string, { base: string; eng: string }> = {
  'க்': { base: 'க', eng: 'k' },
  'ங்': { base: 'ங', eng: 'ng' },
  'ச்': { base: 'ச', eng: 'ch' },
  'ஞ்': { base: 'ஞ', eng: 'nj' },
  'ட்': { base: 'ட', eng: 't' },
  'ண்': { base: 'ண', eng: 'n' },
  'த்': { base: 'த', eng: 'th' },
  'ந்': { base: 'ந', eng: 'n' },
  'ப்': { base: 'ப', eng: 'p' },
  'ம்': { base: 'ம', eng: 'm' },
  'ய்': { base: 'ய', eng: 'y' },
  'ர்': { base: 'ர', eng: 'r' },
  'ல்': { base: 'ல', eng: 'l' },
  'வ்': { base: 'வ', eng: 'v' },
  'ழ்': { base: 'ழ', eng: 'zh' },
  'ள்': { base: 'ள', eng: 'l' },
  'ற்': { base: 'ற', eng: 'r' },
  'ன்': { base: 'ன', eng: 'n' },
};

const uMap: Record<string, string> = {
  'க': 'கு', 'ங': 'ஙு', 'ச': 'சு', 'ஞ': 'ஞு', 'ட': 'டு', 'ண': 'ணு',
  'த': 'து', 'ந': 'நு', 'ப': 'பு', 'ம': 'மு', 'ய': 'யு', 'ர': 'ரு',
  'ல': 'லு', 'வ': 'வு', 'ழ': 'ழு', 'ள': 'ளு', 'ற': 'று', 'ன': 'னு'
};

const ooMap: Record<string, string> = {
  'க': 'கூ', 'ங': 'ஙூ', 'ச': 'சூ', 'ஞ': 'ஞூ', 'ட': 'டூ', 'ண': 'ணூ',
  'த': 'தூ', 'ந': 'நூ', 'ப': 'பூ', 'ம': 'மூ', 'ய': 'யூ', 'ர': 'ரூ',
  'ல': 'லூ', 'வ': 'வூ', 'ழ': 'ழூ', 'ள': 'ளூ', 'ற': 'றூ', 'ன': 'னூ'
};

const vowelEngSuffix: Record<string, string> = {
  'அ': 'a',
  'ஆ': 'aa',
  'இ': 'i',
  'ஈ': 'ee',
  'உ': 'u',
  'ஊ': 'oo',
  'எ': 'e',
  'ஏ': 'ae',
  'ஐ': 'ai',
  'ஒ': 'o',
  'ஓ': 'oo',
  'ஔ': 'au',
};

// Rich vocabulary for fusion combinations
const exampleDictionary: Record<string, { example: string; exampleEng: string; meaning: string; emoji: string }> = {
  // Ka series
  'க': { example: 'கண்', exampleEng: 'Kan', meaning: 'Eye', emoji: '👁️' },
  'கா': { example: 'காடு', exampleEng: 'Kaadu', meaning: 'Forest', emoji: '🌲' },
  'கி': { example: 'கிளி', exampleEng: 'Kili', meaning: 'Parrot', emoji: '🦜' },
  'கீ': { example: 'கீரை', exampleEng: 'Keerai', meaning: 'Spinach', emoji: '🥬' },
  'கு': { example: 'குடை', exampleEng: 'Kudai', meaning: 'Umbrella', emoji: '☂️' },
  'கூ': { example: 'கூடு', exampleEng: 'Koodu', meaning: 'Nest', emoji: '🪹' },
  'கெ': { example: 'கெண்டை', exampleEng: 'Kendai', meaning: 'Carp Fish', emoji: '🐟' },
  'கே': { example: 'கேள்வி', exampleEng: 'Kaelvi', meaning: 'Question', emoji: '❓' },
  'கை': { example: 'கை', exampleEng: 'Kai', meaning: 'Hand', emoji: '✋' },
  'கொ': { example: 'கொடி', exampleEng: 'Kodi', meaning: 'Flag', emoji: '🚩' },
  'கோ': { example: 'கோயில்', exampleEng: 'Koyil', meaning: 'Temple', emoji: '🛕' },
  'கௌ': { example: 'கௌதாரி', exampleEng: 'Kauthaari', meaning: 'Quail Bird', emoji: '🐦' },

  // Cha series
  'ச': { example: 'சட்டை', exampleEng: 'Sattai', meaning: 'Shirt', emoji: '👕' },
  'சா': { example: 'சாப்பிடு', exampleEng: 'Saappidu', meaning: 'Eat', emoji: '🍽️' },
  'சி': { example: 'சிங்கம்', exampleEng: 'Singam', meaning: 'Lion', emoji: '🦁' },
  'சீ': { example: 'சீப்பு', exampleEng: 'Seeppu', meaning: 'Comb', emoji: '🪮' },
  'சு': { example: 'சுவரொட்டி', exampleEng: 'Suvarotti', meaning: 'Poster', emoji: '🖼️' },
  'சூ': { example: 'சூரியன்', exampleEng: 'Sooriyan', meaning: 'Sun', emoji: '☀️' },
  'செ': { example: 'செடி', exampleEng: 'Chedi', meaning: 'Plant', emoji: '🪴' },
  'சே': { example: 'சேவல்', exampleEng: 'Seval', meaning: 'Rooster', emoji: '🐓' },
  'சை': { example: 'சைக்கிள்', exampleEng: 'Saikkil', meaning: 'Bicycle', emoji: '🚲' },
  'சொ': { example: 'சொல்', exampleEng: 'Sol', meaning: 'Word / Speak', emoji: '💬' },
  'சோ': { example: 'சோளம்', exampleEng: 'Solam', meaning: 'Corn', emoji: '🌽' },
  'சௌ': { example: 'சௌக்கியம்', exampleEng: 'Saukkiyam', meaning: 'Wellness / Fine', emoji: '😊' },

  // Tha series
  'த': { example: 'தாமரை', exampleEng: 'Thamarai', meaning: 'Lotus', emoji: '🪷' },
  'தா': { example: 'தாத்தா', exampleEng: 'Thaatha', meaning: 'Grandfather', emoji: '👴' },
  'தி': { example: 'திரை', exampleEng: 'Thirai', meaning: 'Screen', emoji: '🖥️' },
  'தீ': { example: 'தீ', exampleEng: 'Thee', meaning: 'Fire', emoji: '🔥' },
  'து': { example: 'துப்பாக்கி', exampleEng: 'Thuppakki', meaning: 'Gun', emoji: '🔫' },
  'தூ': { example: 'தூக்கம்', exampleEng: 'Thookkam', meaning: 'Sleep', emoji: '😴' },
  'தெ': { example: 'தென்னை', exampleEng: 'Thennai', meaning: 'Coconut Tree', emoji: '🌴' },
  'தே': { example: 'தேனீ', exampleEng: 'Thenee', meaning: 'Honeybee', emoji: '🐝' },
  'தை': { example: 'தை', exampleEng: 'Thai', meaning: 'Tamil Month', emoji: '📅' },
  'தொ': { example: 'தொப்பி', exampleEng: 'Thoppi', meaning: 'Cap', emoji: '🧢' },
  'தோ': { example: 'தோட்டம்', exampleEng: 'Thottam', meaning: 'Garden', emoji: '🏡' },
  'தௌ': { example: 'தௌலத்', exampleEng: 'Thaulath', meaning: 'Wealth', emoji: '💰' },

  // Pa series
  'ப': { example: 'பந்து', exampleEng: 'Panthu', meaning: 'Ball', emoji: '⚽' },
  'பா': { example: 'பாம்பு', exampleEng: 'Paambu', meaning: 'Snake', emoji: '🐍' },
  'பி': { example: 'பிள்ளை', exampleEng: 'Pillai', meaning: 'Child', emoji: '👶' },
  'பீ': { example: 'பீர்க்கன்', exampleEng: 'Peerkkan', meaning: 'Ridge Gourd', emoji: '🥒' },
  'பு': { example: 'புலி', exampleEng: 'Puli', meaning: 'Tiger', emoji: '🐯' },
  'பூ': { example: 'பூ', exampleEng: 'Poo', meaning: 'Flower', emoji: '🌸' },
  'பெ': { example: 'பெட்டி', exampleEng: 'Petti', meaning: 'Box', emoji: '📦' },
  'பே': { example: 'பேனா', exampleEng: 'Paenaa', meaning: 'Pen', emoji: '🖊️' },
  'பை': { example: 'பை', exampleEng: 'Pai', meaning: 'Bag', emoji: '🛍️' },
  'பொ': { example: 'பொம்மை', exampleEng: 'Bommai', meaning: 'Doll', emoji: '🪆' },
  'போ': { example: 'போட்டி', exampleEng: 'Potti', meaning: 'Contest', emoji: '🏆' },
  'பௌ': { example: 'பௌர்ணமி', exampleEng: 'Pournami', meaning: 'Full Moon', emoji: '🌕' },

  // Ma series
  'ம': { example: 'மரம்', exampleEng: 'Maram', meaning: 'Tree', emoji: '🌳' },
  'மா': { example: 'மாம்பழம்', exampleEng: 'Maambazham', meaning: 'Mango', emoji: '🥭' },
  'மி': { example: 'மிளகாய்', exampleEng: 'Milagai', meaning: 'Chilli', emoji: '🌶️' },
  'மீ': { example: 'மீன்', exampleEng: 'Meen', meaning: 'Fish', emoji: '🐟' },
  'மு': { example: 'முயல்', exampleEng: 'Muyal', meaning: 'Rabbit', emoji: '🐰' },
  'மூ': { example: 'மூக்கு', exampleEng: 'Mookku', meaning: 'Nose', emoji: '👃' },
  'மெ': { example: 'மெழுகுவர்த்தி', exampleEng: 'Meluguvarthi', meaning: 'Candle', emoji: '🕯️' },
  'மே': { example: 'மேகம்', exampleEng: 'Maegam', meaning: 'Cloud', emoji: '☁️' },
  'மை': { example: 'மை', exampleEng: 'Mai', meaning: 'Ink', emoji: '🖋️' },
  'மொ': { example: 'மொட்டு', exampleEng: 'Mottu', meaning: 'Flower Bud', emoji: '🌷' },
  'மோ': { example: 'மோர்', exampleEng: 'Moor', meaning: 'Buttermilk', emoji: '🥛' },
  'மௌ': { example: 'மௌனம்', exampleEng: 'Maunam', meaning: 'Silence', emoji: '🤫' },

  // Na series (ந்)
  'ந': { example: 'நண்டு', exampleEng: 'Nandu', meaning: 'Crab', emoji: '🦀' },
  'நா': { example: 'நாய்', exampleEng: 'Naay', meaning: 'Dog', emoji: '🐶' },
  'நி': { example: 'நிலா', exampleEng: 'Nilaa', meaning: 'Moon', emoji: '🌙' },
  'நீ': { example: 'நீச்சல்', exampleEng: 'Neechal', meaning: 'Swimming', emoji: '🏊' },
  'நு': { example: 'நுங்கு', exampleEng: 'Nungu', meaning: 'Ice Apple', emoji: '🥥' },
  'நூ': { example: 'நூல்', exampleEng: 'Nool', meaning: 'Thread / Book', emoji: '🧵' },
  'நெ': { example: 'நெல்', exampleEng: 'Nel', meaning: 'Paddy / Rice', emoji: '🌾' },
  'நே': { example: 'நேரம்', exampleEng: 'Naeram', meaning: 'Time', emoji: '⏰' },
  'நை': { example: 'நைல்', exampleEng: 'Nail', meaning: 'Nile River', emoji: '🌊' },
  'நொ': { example: 'நொடி', exampleEng: 'Nodi', meaning: 'Second', emoji: '⏱️' },
  'நோ': { example: 'நோட்டு', exampleEng: 'Nottu', meaning: 'Notebook', emoji: '📓' },
  'நௌ': { example: 'நௌகா', exampleEng: 'Nauka', meaning: 'Boat', emoji: '⛵' },

  // Ra series (ர)
  'ர': { example: 'ரயில்', exampleEng: 'Rayil', meaning: 'Train', emoji: '🚆' },
  'ரா': { example: 'ராக்கெட்', exampleEng: 'Raakket', meaning: 'Rocket', emoji: '🚀' },
  'ரி': { example: 'ரிங்', exampleEng: 'Ring', meaning: 'Ring', emoji: '💍' },
  'ரீ': { example: 'ரீல்', exampleEng: 'Reel', meaning: 'Film Reel', emoji: '🎞️' },
  'ரு': { example: 'ருசி', exampleEng: 'Rusi', meaning: 'Taste', emoji: '😋' },
  'ரூ': { example: 'ரூபாய்', exampleEng: 'Roobai', meaning: 'Rupee', emoji: '💵' },
  'ரெ': { example: 'ரெக்கை', exampleEng: 'Rekkai', meaning: 'Feather / Wing', emoji: '🪶' },
  'ரே': { example: 'ரேடியோ', exampleEng: 'Raadio', meaning: 'Radio', emoji: '📻' },
  'ரை': { example: 'ரைடர்', exampleEng: 'Rider', meaning: 'Rider', emoji: '🏍️' },
  'ரொ': { example: 'ரொட்டி', exampleEng: 'Rotti', meaning: 'Bread', emoji: '🍞' },
  'ரோ': { example: 'ரோஜா', exampleEng: 'Rojaa', meaning: 'Rose', emoji: '🌹' },
  'ரௌ': { example: 'ரௌத்திரம்', exampleEng: 'Rauthiram', meaning: 'Fierce Energy', emoji: '⚡' },

  // La series (ல)
  'ல': { example: 'லட்டு', exampleEng: 'Laddu', meaning: 'Sweet Laddu', emoji: '🧆' },
  'லா': { example: 'லாபம்', exampleEng: 'Laabam', meaning: 'Profit', emoji: '📈' },
  'லி': { example: 'லிப்ட்', exampleEng: 'Lift', meaning: 'Elevator', emoji: '🛗' },
  'லீ': { example: 'லீவு', exampleEng: 'Leevu', meaning: 'Holiday', emoji: '🏖️' },
  'லு': { example: 'லுங்கி', exampleEng: 'Lungi', meaning: 'Garment', emoji: '🥻' },
  'லூ': { example: 'லூப்', exampleEng: 'Loop', meaning: 'Loop', emoji: '🔄' },
  'லெ': { example: 'லெமன்', exampleEng: 'Lemon', meaning: 'Lemon', emoji: '🍋' },
  'லே': { example: 'லேசர்', exampleEng: 'Laesar', meaning: 'Laser', emoji: '🔦' },
  'லை': { example: 'லைட்', exampleEng: 'Lait', meaning: 'Light', emoji: '💡' },
  'லொ': { example: 'லொட்டாய்', exampleEng: 'Lottai', meaning: 'Lollipop', emoji: '🍭' },
  'லோ': { example: 'லோகம்', exampleEng: 'Logam', meaning: 'World', emoji: '🌍' },
  'லௌ': { example: 'லௌகீகம்', exampleEng: 'Laukeegam', meaning: 'Worldliness', emoji: '🌐' },

  // Va series (வ)
  'வ': { example: 'வண்டி', exampleEng: 'Vandi', meaning: 'Vehicle', emoji: '🚗' },
  'வா': { example: 'வாத்து', exampleEng: 'Vaathu', meaning: 'Duck', emoji: '🦆' },
  'வி': { example: 'விளக்கு', exampleEng: 'Vilakku', meaning: 'Lamp', emoji: '🪔' },
  'வீ': { example: 'வீடு', exampleEng: 'Veedu', meaning: 'House', emoji: '🏠' },
  'வு': { example: 'வுட்', exampleEng: 'Wood', meaning: 'Wood', emoji: '🪵' },
  'வூ': { example: 'வூப்', exampleEng: 'Woof', meaning: 'Woof Bark', emoji: '🐕' },
  'வெ': { example: 'வெங்காயம்', exampleEng: 'Vengayam', meaning: 'Onion', emoji: '🧅' },
  'வே': { example: 'வேர்', exampleEng: 'Vaer', meaning: 'Root', emoji: '🌱' },
  'வை': { example: 'வைரம்', exampleEng: 'Vairam', meaning: 'Diamond', emoji: '💎' },
  'வொ': { example: 'வொலிபால்', exampleEng: 'Volleyball', meaning: 'Volleyball', emoji: '🏐' },
  'வோ': { example: 'வோட்டு', exampleEng: 'Vottu', meaning: 'Vote', emoji: '🗳️' },
  'வௌ': { example: 'வௌவால்', exampleEng: 'Vauvaal', meaning: 'Bat', emoji: '🦇' },
};

export function getCombinedLetter(consonantTamil: string, vowelTamil: string): FusionResult {
  const cInfo = consonantBases[consonantTamil] || { base: consonantTamil.replace('்', ''), eng: 'k' };
  const base = cInfo.base;
  const cEng = cInfo.eng;
  const vEng = vowelEngSuffix[vowelTamil] || 'a';

  let combined = base;

  switch (vowelTamil) {
    case 'அ':
      combined = base;
      break;
    case 'ஆ':
      combined = `${base}\u0BBE`; // ா
      break;
    case 'இ':
      combined = `${base}\u0BBF`; // ி
      break;
    case 'ஈ':
      combined = `${base}\u0BC0`; // ீ
      break;
    case 'உ':
      combined = uMap[base] || `${base}\u0BC1`; // ு
      break;
    case 'ஊ':
      combined = ooMap[base] || `${base}\u0BC2`; // ூ
      break;
    case 'எ':
      combined = `${base}\u0BC6`; // ெ
      break;
    case 'ஏ':
      combined = `${base}\u0BC7`; // ே
      break;
    case 'ஐ':
      combined = `${base}\u0BC8`; // ை
      break;
    case 'ஒ':
      combined = `${base}\u0BCA`; // ொ
      break;
    case 'ஓ':
      combined = `${base}\u0BCB`; // ோ
      break;
    case 'ஔ':
      combined = `${base}\u0BCC`; // ௌ
      break;
    default:
      combined = base;
  }

  const combinedEng = `${cEng}${vEng}`;
  const dictMatch = exampleDictionary[combined];

  return {
    consonantTamil,
    consonantEng: cEng === 'k' ? 'ik' : `${cEng}`,
    vowelTamil,
    vowelEng: vEng,
    combined,
    combinedEng,
    example: dictMatch?.example,
    exampleEng: dictMatch?.exampleEng,
    meaning: dictMatch?.meaning,
    emoji: dictMatch?.emoji,
  };
}
