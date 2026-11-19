import { View, Text, StyleSheet } from 'react-native';
import { INFO_BLOQUES, INFO_DIFICULTAD } from '../utils/infoQuiz';
import { Insignia, Tarjeta, TEXTOS } from './Tema';

/**
 * Tarjeta de pregunta reutilizable.
 * - etiqueta: texto de la insignia izquierda (por defecto, el nombre del eje temático)
 * - mostrarDificultad: muestra la insignia de dificultad a la derecha
 */
export default function TarjetaPregunta({ question, etiqueta, mostrarDificultad = true }) {
  if (!question) return null;

  const blockName = etiqueta || INFO_BLOQUES[question.block]?.name || question.block;
  const diffData = INFO_DIFICULTAD[question.difficulty];

  return (
    <Tarjeta style={styles.card}>
      <View style={styles.headerRow}>
        <Insignia texto={blockName.toUpperCase()} style={styles.insignia} />

        {mostrarDificultad && diffData && (
          <Insignia
            texto={diffData.label.toUpperCase()}
            style={{ backgroundColor: diffData.badgeBg }}
            textStyle={{ color: diffData.badgeText }}
          />
        )}
      </View>

      <Text style={[TEXTOS.titulo, styles.questionText]}>{question.question}</Text>
    </Tarjeta>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: '100%',
    padding: 20,
    marginVertical: 14,
    minHeight: 140,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  insignia: {
    flexShrink: 1,
  },
  questionText: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
  },
});
