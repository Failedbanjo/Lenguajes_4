import { COLORES } from '../components/Tema';

/**
 * Metadatos del quiz por eje temático y dificultad.
 */

export const INFO_BLOQUES = {
  entertainment: { id: 'entertainment', name: 'Entretenimiento' },
  history: { id: 'history', name: 'Historia' },
  news: { id: 'news', name: 'Actualidad' },
  technology: { id: 'technology', name: 'Tecnología' },
  society: { id: 'society', name: 'Sociedad y Cultura' },
};

export const INFO_DIFICULTAD = {
  easy: {
    label: 'Fácil',
    badgeBg: COLORES.exitoFondo,
    badgeText: COLORES.exito,
  },
  medium: {
    label: 'Intermedia',
    badgeBg: COLORES.advertenciaFondo,
    badgeText: COLORES.advertencia,
  },
  hard: {
    label: 'Difícil',
    badgeBg: COLORES.errorFondo,
    badgeText: COLORES.error,
  },
};
