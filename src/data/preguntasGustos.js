/**
 * Pool de preguntas de gracia sobre los gustos del desarrollador.
 * Temas:
 * - One Piece (2)
 * - The Legend of Zelda (2)
 * - Soul Eater (2)
 * - Undertale (2)
 * - Yu-Gi-Oh! (2)
 */

export const PREGUNTAS_GUSTOS = [
  {
    id: 'gusto_one_piece_1',
    block: 'grace',
    topic: 'One Piece',
    difficulty: 'hard',
    question: '¿Cuál es el verdadero nombre de la Fruta del Diablo de Luffy, revelado en el arco de Wano?',
    correctAnswer: 'Hito Hito no Mi, Modelo: Nika',
    distractors: ['Gomu Gomu no Mi, Modelo: Sol', 'Hito Hito no Mi, Modelo: Daibutsu', 'Tori Tori no Mi, Modelo: Fénix'],
  },
  {
    id: 'gusto_one_piece_2',
    block: 'grace',
    topic: 'One Piece',
    difficulty: 'hard',
    question: '¿Cómo se llamaba el barco del Rey de los Piratas, Gol D. Roger?',
    correctAnswer: 'Oro Jackson',
    distractors: ['Moby Dick', 'Red Force', 'Thousand Sunny'],
  },
  {
    id: 'gusto_zelda_1',
    block: 'grace',
    topic: 'The Legend of Zelda',
    difficulty: 'hard',
    question: "¿Cómo se llama el mundo paralelo a Hyrule en el que transcurre \"Majora's Mask\"?",
    correctAnswer: 'Termina',
    distractors: ['Lorule', 'Holodrum', 'Labrynna'],
  },
  {
    id: 'gusto_zelda_2',
    block: 'grace',
    topic: 'The Legend of Zelda',
    difficulty: 'hard',
    question: '¿Qué tres diosas crearon el mundo de Hyrule y dejaron atrás la Trifuerza?',
    correctAnswer: 'Din, Nayru y Farore',
    distractors: ['Hylia, Nayru y Din', 'Din, Farore y Hylia', 'Zelda, Nayru y Farore'],
  },
  {
    id: 'gusto_soul_eater_1',
    block: 'grace',
    topic: 'Soul Eater',
    difficulty: 'hard',
    question: '¿Quién es la técnico (meister) que empuña a Soul Eater Evans como guadaña?',
    correctAnswer: 'Maka Albarn',
    distractors: ['Tsubaki Nakatsukasa', 'Liz Thompson', 'Crona'],
  },
  {
    id: 'gusto_soul_eater_2',
    block: 'grace',
    topic: 'Soul Eater',
    difficulty: 'hard',
    question: '¿Cómo se llama el arma demoníaca que vive dentro de la sangre de Crona?',
    correctAnswer: 'Ragnarok',
    distractors: ['Excalibur', 'Masamune', 'Asura'],
  },
  {
    id: 'gusto_undertale_1',
    block: 'grace',
    topic: 'Undertale',
    difficulty: 'hard',
    question: '¿Cómo se llama el misterioso antiguo científico real del Subsuelo que "se dispersó en el tiempo y el espacio"?',
    correctAnswer: 'W. D. Gaster',
    distractors: ['Alphys', 'Gerson', 'Asgore'],
  },
  {
    id: 'gusto_undertale_2',
    block: 'grace',
    topic: 'Undertale',
    difficulty: 'hard',
    question: 'Los nombres de los hermanos esqueleto Sans y Papyrus están inspirados en...',
    correctAnswer: 'Tipografías (Comic Sans y Papyrus)',
    distractors: ['Instrumentos musicales', 'Personajes de la saga Mother', 'Tipos de pasta italiana'],
  },
  {
    id: 'gusto_yugioh_1',
    block: 'grace',
    topic: 'Yu-Gi-Oh!',
    difficulty: 'hard',
    question: '¿Cuántas cartas de Exodia hay que reunir en la mano para ganar automáticamente el duelo?',
    correctAnswer: '5',
    distractors: ['3', '4', '7'],
  },
  {
    id: 'gusto_yugioh_2',
    block: 'grace',
    topic: 'Yu-Gi-Oh!',
    difficulty: 'hard',
    question: '¿Quién es el mangaka creador original de Yu-Gi-Oh!?',
    correctAnswer: 'Kazuki Takahashi',
    distractors: ['Akira Toriyama', 'Eiichiro Oda', 'Masashi Kishimoto'],
  },
];
