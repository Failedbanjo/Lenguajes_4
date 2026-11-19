import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORES } from './Tema';

export const LETRAS_OPCIONES = ['A', 'B', 'C', 'D'];

const VERDE = { fondo: COLORES.exitoFondo, borde: COLORES.exito, texto: COLORES.exitoTexto };
const ROJO = { fondo: COLORES.errorFondo, borde: COLORES.error, texto: COLORES.errorTexto };

/**
 * Función pura que calcula los colores de una opción según su estado
 */
function getDerivedColors(option, correctAnswer, selected, isRevealed) {
  if (!isRevealed) {
    return {
      backgroundColor: COLORES.superficie,
      borderColor: COLORES.borde,
      textColor: COLORES.texto,
      prefixBg: COLORES.acento,
      opacity: 1,
    };
  }

  // La correcta siempre en verde
  if (option === correctAnswer) {
    return {
      backgroundColor: VERDE.fondo,
      borderColor: VERDE.borde,
      textColor: VERDE.texto,
      prefixBg: VERDE.borde,
      opacity: 1,
    };
  }

  // La elegida por el usuario y errónea en rojo
  if (option === selected) {
    return {
      backgroundColor: ROJO.fondo,
      borderColor: ROJO.borde,
      textColor: ROJO.texto,
      prefixBg: ROJO.borde,
      opacity: 1,
    };
  }

  // El resto quedan atenuadas
  return {
    backgroundColor: COLORES.superficie,
    borderColor: COLORES.borde,
    textColor: COLORES.texto,
    prefixBg: COLORES.textoSecundario,
    opacity: 0.45,
  };
}

export default function BotonOpcion({
  option,
  indexLabel,
  correctAnswer,
  selected,
  isRevealed,
  onPress,
}) {
  const { backgroundColor, borderColor, textColor, prefixBg, opacity } = getDerivedColors(
    option,
    correctAnswer,
    selected,
    isRevealed
  );

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      disabled={isRevealed}
      onPress={onPress}
      style={[styles.button, { backgroundColor, borderColor, opacity }]}
    >
      <View style={styles.contentRow}>
        <View style={[styles.prefixContainer, { backgroundColor: prefixBg }]}>
          <Text style={styles.prefixText}>{indexLabel}</Text>
        </View>
        <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginVertical: 6,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  prefixText: {
    color: COLORES.blanco,
    fontSize: 13,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
});
