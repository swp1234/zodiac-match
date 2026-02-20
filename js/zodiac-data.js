// Zodiac Match Data - Compatibility Matrix and Analysis

const ZODIACS = {
    aries: {
        name: 'Aries',
        symbol: '♈',
        dates: '3/21-4/19',
        element: 'fire',
        color: '#e74c3c'
    },
    taurus: {
        name: 'Taurus',
        symbol: '♉',
        dates: '4/20-5/20',
        element: 'earth',
        color: '#27ae60'
    },
    gemini: {
        name: 'Gemini',
        symbol: '♊',
        dates: '5/21-6/20',
        element: 'air',
        color: '#3498db'
    },
    cancer: {
        name: 'Cancer',
        symbol: '♋',
        dates: '6/21-7/22',
        element: 'water',
        color: '#9b59b6'
    },
    leo: {
        name: 'Leo',
        symbol: '♌',
        dates: '7/23-8/22',
        element: 'fire',
        color: '#f39c12'
    },
    virgo: {
        name: 'Virgo',
        symbol: '♍',
        dates: '8/23-9/22',
        element: 'earth',
        color: '#2ecc71'
    },
    libra: {
        name: 'Libra',
        symbol: '♎',
        dates: '9/23-10/22',
        element: 'air',
        color: '#3498db'
    },
    scorpio: {
        name: 'Scorpio',
        symbol: '♏',
        dates: '10/23-11/21',
        element: 'water',
        color: '#e91e63'
    },
    sagittarius: {
        name: 'Sagittarius',
        symbol: '♐',
        dates: '11/22-12/21',
        element: 'fire',
        color: '#1abc9c'
    },
    capricorn: {
        name: 'Capricorn',
        symbol: '♑',
        dates: '12/22-1/19',
        element: 'earth',
        color: '#34495e'
    },
    aquarius: {
        name: 'Aquarius',
        symbol: '♒',
        dates: '1/20-2/18',
        element: 'air',
        color: '#16a085'
    },
    pisces: {
        name: 'Pisces',
        symbol: '♓',
        dates: '2/19-3/20',
        element: 'water',
        color: '#8e44ad'
    }
};

// Compatibility Matrix - 0-100 scores for each pairing
// Format: aries-taurus, aries-gemini, etc.
const COMPATIBILITY_MATRIX = {
    'aries-aries': { overall: 85, romantic: 88, friendship: 85, work: 82 },
    'aries-taurus': { overall: 65, romantic: 62, friendship: 68, work: 70 },
    'aries-gemini': { overall: 75, romantic: 78, friendship: 82, work: 75 },
    'aries-cancer': { overall: 60, romantic: 55, friendship: 65, work: 60 },
    'aries-leo': { overall: 90, romantic: 92, friendship: 88, work: 88 },
    'aries-virgo': { overall: 58, romantic: 52, friendship: 62, work: 65 },
    'aries-libra': { overall: 78, romantic: 80, friendship: 80, work: 75 },
    'aries-scorpio': { overall: 68, romantic: 65, friendship: 70, work: 68 },
    'aries-sagittarius': { overall: 92, romantic: 95, friendship: 90, work: 88 },
    'aries-capricorn': { overall: 62, romantic: 58, friendship: 65, work: 72 },
    'aries-aquarius': { overall: 80, romantic: 82, friendship: 85, work: 78 },
    'aries-pisces': { overall: 63, romantic: 60, friendship: 65, work: 60 },

    'taurus-aries': { overall: 65, romantic: 62, friendship: 68, work: 70 },
    'taurus-taurus': { overall: 88, romantic: 90, friendship: 85, work: 85 },
    'taurus-gemini': { overall: 62, romantic: 58, friendship: 68, work: 65 },
    'taurus-cancer': { overall: 85, romantic: 88, friendship: 82, work: 82 },
    'taurus-leo': { overall: 70, romantic: 68, friendship: 72, work: 75 },
    'taurus-virgo': { overall: 82, romantic: 85, friendship: 80, work: 88 },
    'taurus-libra': { overall: 72, romantic: 75, friendship: 70, work: 68 },
    'taurus-scorpio': { overall: 80, romantic: 82, friendship: 78, work: 80 },
    'taurus-sagittarius': { overall: 65, romantic: 62, friendship: 70, work: 65 },
    'taurus-capricorn': { overall: 88, romantic: 90, friendship: 85, work: 90 },
    'taurus-aquarius': { overall: 58, romantic: 55, friendship: 65, work: 58 },
    'taurus-pisces': { overall: 80, romantic: 82, friendship: 78, work: 75 },

    'gemini-aries': { overall: 75, romantic: 78, friendship: 82, work: 75 },
    'gemini-taurus': { overall: 62, romantic: 58, friendship: 68, work: 65 },
    'gemini-gemini': { overall: 85, romantic: 82, friendship: 90, work: 82 },
    'gemini-cancer': { overall: 65, romantic: 62, friendship: 70, work: 62 },
    'gemini-leo': { overall: 80, romantic: 82, friendship: 85, work: 80 },
    'gemini-virgo': { overall: 78, romantic: 75, friendship: 82, work: 85 },
    'gemini-libra': { overall: 92, romantic: 95, friendship: 90, work: 88 },
    'gemini-scorpio': { overall: 62, romantic: 58, friendship: 65, work: 62 },
    'gemini-sagittarius': { overall: 88, romantic: 85, friendship: 92, work: 85 },
    'gemini-capricorn': { overall: 60, romantic: 55, friendship: 65, work: 65 },
    'gemini-aquarius': { overall: 90, romantic: 92, friendship: 88, work: 88 },
    'gemini-pisces': { overall: 68, romantic: 65, friendship: 72, work: 65 },

    'cancer-aries': { overall: 60, romantic: 55, friendship: 65, work: 60 },
    'cancer-taurus': { overall: 85, romantic: 88, friendship: 82, work: 82 },
    'cancer-gemini': { overall: 65, romantic: 62, friendship: 70, work: 62 },
    'cancer-cancer': { overall: 88, romantic: 92, friendship: 85, work: 80 },
    'cancer-leo': { overall: 65, romantic: 62, friendship: 68, work: 68 },
    'cancer-virgo': { overall: 82, romantic: 85, friendship: 80, work: 85 },
    'cancer-libra': { overall: 62, romantic: 58, friendship: 65, work: 60 },
    'cancer-scorpio': { overall: 90, romantic: 95, friendship: 88, work: 85 },
    'cancer-sagittarius': { overall: 62, romantic: 58, friendship: 65, work: 60 },
    'cancer-capricorn': { overall: 78, romantic: 80, friendship: 75, work: 82 },
    'cancer-aquarius': { overall: 68, romantic: 65, friendship: 70, work: 65 },
    'cancer-pisces': { overall: 92, romantic: 95, friendship: 90, work: 88 },

    'leo-aries': { overall: 90, romantic: 92, friendship: 88, work: 88 },
    'leo-taurus': { overall: 70, romantic: 68, friendship: 72, work: 75 },
    'leo-gemini': { overall: 80, romantic: 82, friendship: 85, work: 80 },
    'leo-cancer': { overall: 65, romantic: 62, friendship: 68, work: 68 },
    'leo-leo': { overall: 85, romantic: 82, friendship: 88, work: 80 },
    'leo-virgo': { overall: 62, romantic: 58, friendship: 65, work: 70 },
    'leo-libra': { overall: 88, romantic: 90, friendship: 85, work: 82 },
    'leo-scorpio': { overall: 68, romantic: 65, friendship: 70, work: 68 },
    'leo-sagittarius': { overall: 90, romantic: 92, friendship: 88, work: 85 },
    'leo-capricorn': { overall: 62, romantic: 58, friendship: 65, work: 72 },
    'leo-aquarius': { overall: 75, romantic: 72, friendship: 80, work: 75 },
    'leo-pisces': { overall: 65, romantic: 62, friendship: 68, work: 62 },

    'virgo-aries': { overall: 58, romantic: 52, friendship: 62, work: 65 },
    'virgo-taurus': { overall: 82, romantic: 85, friendship: 80, work: 88 },
    'virgo-gemini': { overall: 78, romantic: 75, friendship: 82, work: 85 },
    'virgo-cancer': { overall: 82, romantic: 85, friendship: 80, work: 85 },
    'virgo-leo': { overall: 62, romantic: 58, friendship: 65, work: 70 },
    'virgo-virgo': { overall: 88, romantic: 85, friendship: 90, work: 92 },
    'virgo-libra': { overall: 72, romantic: 70, friendship: 75, work: 75 },
    'virgo-scorpio': { overall: 80, romantic: 82, friendship: 78, work: 85 },
    'virgo-sagittarius': { overall: 58, romantic: 55, friendship: 62, work: 60 },
    'virgo-capricorn': { overall: 90, romantic: 92, friendship: 88, work: 95 },
    'virgo-aquarius': { overall: 62, romantic: 58, friendship: 65, work: 65 },
    'virgo-pisces': { overall: 82, romantic: 85, friendship: 80, work: 78 },

    'libra-aries': { overall: 78, romantic: 80, friendship: 80, work: 75 },
    'libra-taurus': { overall: 72, romantic: 75, friendship: 70, work: 68 },
    'libra-gemini': { overall: 92, romantic: 95, friendship: 90, work: 88 },
    'libra-cancer': { overall: 62, romantic: 58, friendship: 65, work: 60 },
    'libra-leo': { overall: 88, romantic: 90, friendship: 85, work: 82 },
    'libra-virgo': { overall: 72, romantic: 70, friendship: 75, work: 75 },
    'libra-libra': { overall: 85, romantic: 82, friendship: 88, work: 80 },
    'libra-scorpio': { overall: 68, romantic: 65, friendship: 70, work: 65 },
    'libra-sagittarius': { overall: 88, romantic: 85, friendship: 92, work: 85 },
    'libra-capricorn': { overall: 62, romantic: 58, friendship: 65, work: 68 },
    'libra-aquarius': { overall: 92, romantic: 90, friendship: 95, work: 88 },
    'libra-pisces': { overall: 75, romantic: 72, friendship: 78, work: 70 },

    'scorpio-aries': { overall: 68, romantic: 65, friendship: 70, work: 68 },
    'scorpio-taurus': { overall: 80, romantic: 82, friendship: 78, work: 80 },
    'scorpio-gemini': { overall: 62, romantic: 58, friendship: 65, work: 62 },
    'scorpio-cancer': { overall: 90, romantic: 95, friendship: 88, work: 85 },
    'scorpio-leo': { overall: 68, romantic: 65, friendship: 70, work: 68 },
    'scorpio-virgo': { overall: 80, romantic: 82, friendship: 78, work: 85 },
    'scorpio-libra': { overall: 68, romantic: 65, friendship: 70, work: 65 },
    'scorpio-scorpio': { overall: 88, romantic: 90, friendship: 85, work: 82 },
    'scorpio-sagittarius': { overall: 65, romantic: 62, friendship: 68, work: 62 },
    'scorpio-capricorn': { overall: 85, romantic: 88, friendship: 82, work: 88 },
    'scorpio-aquarius': { overall: 62, romantic: 58, friendship: 65, work: 60 },
    'scorpio-pisces': { overall: 92, romantic: 95, friendship: 90, work: 85 },

    'sagittarius-aries': { overall: 92, romantic: 95, friendship: 90, work: 88 },
    'sagittarius-taurus': { overall: 65, romantic: 62, friendship: 70, work: 65 },
    'sagittarius-gemini': { overall: 88, romantic: 85, friendship: 92, work: 85 },
    'sagittarius-cancer': { overall: 62, romantic: 58, friendship: 65, work: 60 },
    'sagittarius-leo': { overall: 90, romantic: 92, friendship: 88, work: 85 },
    'sagittarius-virgo': { overall: 58, romantic: 55, friendship: 62, work: 60 },
    'sagittarius-libra': { overall: 88, romantic: 85, friendship: 92, work: 85 },
    'sagittarius-scorpio': { overall: 65, romantic: 62, friendship: 68, work: 62 },
    'sagittarius-sagittarius': { overall: 85, romantic: 82, friendship: 90, work: 80 },
    'sagittarius-capricorn': { overall: 60, romantic: 55, friendship: 65, work: 65 },
    'sagittarius-aquarius': { overall: 90, romantic: 88, friendship: 95, work: 85 },
    'sagittarius-pisces': { overall: 68, romantic: 65, friendship: 72, work: 62 },

    'capricorn-aries': { overall: 62, romantic: 58, friendship: 65, work: 72 },
    'capricorn-taurus': { overall: 88, romantic: 90, friendship: 85, work: 90 },
    'capricorn-gemini': { overall: 60, romantic: 55, friendship: 65, work: 65 },
    'capricorn-cancer': { overall: 78, romantic: 80, friendship: 75, work: 82 },
    'capricorn-leo': { overall: 62, romantic: 58, friendship: 65, work: 72 },
    'capricorn-virgo': { overall: 90, romantic: 92, friendship: 88, work: 95 },
    'capricorn-libra': { overall: 62, romantic: 58, friendship: 65, work: 68 },
    'capricorn-scorpio': { overall: 85, romantic: 88, friendship: 82, work: 88 },
    'capricorn-sagittarius': { overall: 60, romantic: 55, friendship: 65, work: 65 },
    'capricorn-capricorn': { overall: 88, romantic: 85, friendship: 90, work: 95 },
    'capricorn-aquarius': { overall: 68, romantic: 65, friendship: 70, work: 70 },
    'capricorn-pisces': { overall: 78, romantic: 80, friendship: 75, work: 80 },

    'aquarius-aries': { overall: 80, romantic: 82, friendship: 85, work: 78 },
    'aquarius-taurus': { overall: 58, romantic: 55, friendship: 65, work: 58 },
    'aquarius-gemini': { overall: 90, romantic: 92, friendship: 88, work: 88 },
    'aquarius-cancer': { overall: 68, romantic: 65, friendship: 70, work: 65 },
    'aquarius-leo': { overall: 75, romantic: 72, friendship: 80, work: 75 },
    'aquarius-virgo': { overall: 62, romantic: 58, friendship: 65, work: 65 },
    'aquarius-libra': { overall: 92, romantic: 90, friendship: 95, work: 88 },
    'aquarius-scorpio': { overall: 62, romantic: 58, friendship: 65, work: 60 },
    'aquarius-sagittarius': { overall: 90, romantic: 88, friendship: 95, work: 85 },
    'aquarius-capricorn': { overall: 68, romantic: 65, friendship: 70, work: 70 },
    'aquarius-aquarius': { overall: 85, romantic: 80, friendship: 92, work: 85 },
    'aquarius-pisces': { overall: 70, romantic: 68, friendship: 75, work: 65 },

    'pisces-aries': { overall: 63, romantic: 60, friendship: 65, work: 60 },
    'pisces-taurus': { overall: 80, romantic: 82, friendship: 78, work: 75 },
    'pisces-gemini': { overall: 68, romantic: 65, friendship: 72, work: 65 },
    'pisces-cancer': { overall: 92, romantic: 95, friendship: 90, work: 88 },
    'pisces-leo': { overall: 65, romantic: 62, friendship: 68, work: 62 },
    'pisces-virgo': { overall: 82, romantic: 85, friendship: 80, work: 78 },
    'pisces-libra': { overall: 75, romantic: 72, friendship: 78, work: 70 },
    'pisces-scorpio': { overall: 92, romantic: 95, friendship: 90, work: 85 },
    'pisces-sagittarius': { overall: 68, romantic: 65, friendship: 72, work: 62 },
    'pisces-capricorn': { overall: 78, romantic: 80, friendship: 75, work: 80 },
    'pisces-aquarius': { overall: 70, romantic: 68, friendship: 75, work: 65 },
    'pisces-pisces': { overall: 88, romantic: 92, friendship: 85, work: 80 }
};

// Element compatibility analysis - keys for i18n lookup
const ELEMENT_COMPATIBILITY_KEYS = [
    'fire-fire', 'fire-earth', 'fire-air', 'fire-water',
    'earth-earth', 'earth-air', 'earth-water',
    'air-air', 'air-water', 'water-water'
];

// Fallback English text for element compatibility
const ELEMENT_COMPATIBILITY_FALLBACK = {
    'fire-fire': 'Dynamic and passionate! Both signs bring intensity and enthusiasm to the relationship.',
    'fire-earth': 'Challenging but rewarding. Fire can learn stability, earth can learn spontaneity.',
    'fire-air': 'Excellent synergy! Air fuels fire, creating dynamic and exciting energy.',
    'fire-water': 'Complex dynamics. Fire evaporates water, but steam can be powerful together.',
    'earth-earth': 'Solid foundation! Both signs value stability, loyalty, and security.',
    'earth-air': 'Different rhythms. Earth is grounded, air is free-spirited.',
    'earth-water': 'Beautiful harmony! Earth nurtures water, creating growth and understanding.',
    'air-air': 'Intellectual connection! Both love communication and mental stimulation.',
    'air-water': 'Interesting contrast. Air is logical, water is emotional.',
    'water-water': 'Deeply intuitive! Both understand emotions and empathy naturally.'
};

// Detailed compatibility analysis data (English fallback)
const COMPATIBILITY_ANALYSIS_FALLBACK = {
    'aries-leo': {
        strengths: 'Both are passionate, ambitious fire signs that fuel each other\'s energy. You share a zest for life, adventure, and taking risks. Natural leaders, you support each other\'s goals with enthusiasm and loyalty.',
        cautions: 'Both love being in the spotlight. Competition for attention or control could be an issue. Try to find ways to celebrate each other\'s wins.',
        advice: 'Channel your combined fire energy into shared adventures. Be mindful of ego clashes and practice admiring each other genuinely.'
    },
    'aries-sagittarius': {
        strengths: 'Perfect match! Both fire signs crave adventure, freedom, and new experiences. You understand each other\'s need for independence and excitement naturally.',
        cautions: 'Both can be impulsive and impatient. Recklessness could lead to problems if not checked.',
        advice: 'Your shared enthusiasm is your superpower. Balance spontaneity with some planning to ensure success.'
    },
    'taurus-capricorn': {
        strengths: 'Both practical earth signs value hard work, loyalty, and building something lasting. You understand each other\'s need for security and material stability.',
        cautions: 'Both can be stubborn and overly focused on work. Remember to enjoy life together.',
        advice: 'Create goals together and build wealth as a team. Schedule time for romance despite busy schedules.'
    },
    'gemini-libra': {
        strengths: 'Fellow air signs who speak the same language! Excellent communication, shared intellectual interests, and natural harmony make this a delightful pairing.',
        cautions: 'Both can be indecisive or overly analytical. Balance thinking with doing.',
        advice: 'Use your communication skills to explore ideas together. Keep conversations flowing and decisions moving forward.'
    },
    'cancer-scorpio': {
        strengths: 'Deep water sign connection! Both understand emotional depths and intuition. Intense loyalty, natural empathy, and authentic understanding create powerful bonds.',
        cautions: 'Both can be secretive or overly protective. Trust and open communication are essential.',
        advice: 'Create safe emotional space for each other. Allow vulnerability without judgment.'
    },
    'default': {
        strengths: 'Every pairing has unique strengths waiting to be discovered. Focus on your shared values and what attracts you to each other.',
        cautions: 'Different signs have different needs. Be patient in understanding each other\'s perspectives.',
        advice: 'Celebrate your differences while building on common ground. Communication is key to any successful relationship.'
    }
};

// i18n key map for specific pair analyses
const ANALYSIS_PAIR_KEYS = ['aries-leo', 'aries-sagittarius', 'taurus-capricorn', 'gemini-libra', 'cancer-scorpio'];

// Get compatibility data
function getCompatibility(zodiac1, zodiac2) {
    const key = `${zodiac1}-${zodiac2}`;
    const reverseKey = `${zodiac2}-${zodiac1}`;

    if (COMPATIBILITY_MATRIX[key]) {
        return COMPATIBILITY_MATRIX[key];
    } else if (COMPATIBILITY_MATRIX[reverseKey]) {
        return COMPATIBILITY_MATRIX[reverseKey];
    }
    return { overall: 70, romantic: 70, friendship: 70, work: 70 };
}

// Get zodiac from birth date
function getZodiacByDate(month, day) {
    const dates = [
        ['capricorn', [1, 1], [1, 19]],
        ['aquarius', [1, 20], [2, 18]],
        ['pisces', [2, 19], [3, 20]],
        ['aries', [3, 21], [4, 19]],
        ['taurus', [4, 20], [5, 20]],
        ['gemini', [5, 21], [6, 20]],
        ['cancer', [6, 21], [7, 22]],
        ['leo', [7, 23], [8, 22]],
        ['virgo', [8, 23], [9, 22]],
        ['libra', [9, 23], [10, 22]],
        ['scorpio', [10, 23], [11, 21]],
        ['sagittarius', [11, 22], [12, 21]],
        ['capricorn', [12, 22], [12, 31]]
    ];

    for (let [zodiac, [startMonth, startDay], [endMonth, endDay]] of dates) {
        if (month === startMonth && day >= startDay) {
            if (month !== endMonth || day <= endDay) {
                return zodiac;
            }
        }
        if (month === endMonth && day <= endDay) {
            return zodiac;
        }
    }
    return 'capricorn';
}

// Get element of zodiac
function getElement(zodiac) {
    return ZODIACS[zodiac] ? ZODIACS[zodiac].element : 'earth';
}

// Get element compatibility description (i18n-aware)
function getElementCompatibilityDescription(element1, element2) {
    const pair1 = `${element1}-${element2}`;
    const pair2 = `${element2}-${element1}`;
    const key = ELEMENT_COMPATIBILITY_FALLBACK[pair1] ? pair1 : pair2;
    const i18nKey = `element.${key.replace('-', '_')}`;

    if (window.i18n && typeof i18n.t === 'function') {
        const val = i18n.t(i18nKey);
        if (val && val !== i18nKey) return val;
    }
    return ELEMENT_COMPATIBILITY_FALLBACK[key] || ELEMENT_COMPATIBILITY_FALLBACK[pair2] || 'Unique combination of elements!';
}

// Get analysis data (i18n-aware)
function getAnalysisData(zodiac1, zodiac2) {
    const key1 = `${zodiac1}-${zodiac2}`;
    const key2 = `${zodiac2}-${zodiac1}`;

    // Determine which pair key to use
    let pairKey = 'default';
    if (ANALYSIS_PAIR_KEYS.includes(key1)) {
        pairKey = key1;
    } else if (ANALYSIS_PAIR_KEYS.includes(key2)) {
        pairKey = key2;
    }

    const i18nPrefix = `analysis.${pairKey.replace('-', '_')}`;

    if (window.i18n && typeof i18n.t === 'function') {
        const s = i18n.t(`${i18nPrefix}.strengths`);
        const c = i18n.t(`${i18nPrefix}.cautions`);
        const a = i18n.t(`${i18nPrefix}.advice`);

        // Check if i18n returned actual translations (not raw keys)
        if (s && s !== `${i18nPrefix}.strengths`) {
            return { strengths: s, cautions: c, advice: a };
        }
    }

    // Fallback to English
    const fallback = COMPATIBILITY_ANALYSIS_FALLBACK[pairKey] || COMPATIBILITY_ANALYSIS_FALLBACK['default'];
    return fallback;
}

// Generate daily horoscope based on date seed
function generateDailyHoroscope(zodiac) {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    const messages = [
        'Today brings clarity and new insights into your relationships.',
        'A conversation could lead to deeper understanding with someone special.',
        'Your natural charm is especially magnetic today.',
        'Trust your intuition when making important decisions.',
        'A small gesture of affection will be deeply appreciated.',
        'This is a good day to think about your emotional needs.',
        'Someone may surprise you with unexpected kindness.',
        'Communication flows smoothly - use this to your advantage.',
        'Patience and understanding will unlock new possibilities.',
        'Your energy attracts positive people and experiences.'
    ];

    const index = seed % messages.length;
    return messages[index];
}
