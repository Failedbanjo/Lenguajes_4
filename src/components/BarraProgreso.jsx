import { View, Text, StyleSheet } from 'react-native';
import { COLORES } from './Tema';

export default function BarraProgreso({ current, total }) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.counterText}>
          Pregunta <Text style={styles.boldText}>{current}</Text> de {total}
        </Text>
        <Text style={styles.percentText}>{Math.round(percentage)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  counterText: {
    color: COLORES.borde,
    fontSize: 13,
    fontWeight: '500',
  },
  boldText: {
    color: COLORES.superficie,
    fontWeight: '700',
  },
  percentText: {
    color: COLORES.borde,
    fontSize: 12,
    fontWeight: '600',
  },
  track: {
    height: 8,
    width: '100%',
    backgroundColor: COLORES.veloFuerte,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORES.superficie,
    borderRadius: 999,
  },
});
