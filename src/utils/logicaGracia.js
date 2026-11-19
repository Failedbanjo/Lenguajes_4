import { mezclar } from './mezclar';

/**
 * Determina si se debe activar la ronda de gracia.
 * Condición: Menos de 5 aciertos al final y 50% de probabilidad aleatoria.
 * @param {number} score - Puntaje actual del quiz normal
 * @returns {boolean}
 */
export function debeActivarGracia(score) {
  if (score >= 5) return false;
  return Math.random() < 0.5;
}

/**
 * Prepara la cola de preguntas de gracia barajando el pool y las 4 opciones de cada una.
 * @param {Array} questions - Pool de preguntas de gracia
 * @returns {Array} Preguntas preparadas con sus opciones barajadas
 */
export function prepararColaGracia(questions) {
  if (!questions || questions.length === 0) return [];
  const preguntasMezcladas = mezclar(questions);
  return preguntasMezcladas.map((q) => ({
    ...q,
    options: mezclar([q.correctAnswer, ...q.distractors]),
  }));
}
