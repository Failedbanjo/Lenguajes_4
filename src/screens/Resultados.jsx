import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { INFO_BLOQUES } from '../utils/infoQuiz';
import { Boton, COLORES, Encabezado, Insignia, Pantalla, Tarjeta, TEXTOS } from '../components/Tema';

export default function Resultados({ score, total, answers, gracePoints = 0, onRestart, onExit }) {
  const percentage = Math.round((score / total) * 100);

  // Mensaje según el rendimiento
  let title = '¡Buen intento!';
  let message = 'Sigue practicando para dominar todos los ejes de cultura general.';

  if (percentage === 100) {
    title = '¡Puntaje perfecto!';
    message = '¡Increíble! Dominas la cultura general a la perfección.';
  } else if (percentage >= 80) {
    title = '¡Excelente trabajo!';
    message = 'Tienes un conocimiento muy sólido en la mayoría de los campos.';
  } else if (percentage >= 60) {
    title = '¡Bien jugado!';
    message = 'Acertaste más de la mitad. ¡Un desempeño bastante destacado!';
  }

  // Agrupar respuestas por bloque temático
  const blockStats = Object.keys(INFO_BLOQUES)
    .map((blockKey) => {
      const blockQuestions = answers.filter((a) => a.block === blockKey);
      return {
        key: blockKey,
        name: INFO_BLOQUES[blockKey].name,
        total: blockQuestions.length,
        correct: blockQuestions.filter((a) => a.correct).length,
      };
    })
    .filter((stat) => stat.total > 0);

  return (
    <Pantalla>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Puntaje principal */}
          <Tarjeta style={styles.scoreCard}>
            <Encabezado etiqueta="RESULTADOS" titulo={title} subtitulo={message} centrado />

            <Text style={styles.scoreNumber}>
              {score}
              <Text style={styles.totalNumber}> / {total}</Text>
            </Text>
            <Text style={styles.scorePercentage}>{percentage}% de aciertos</Text>

            {gracePoints > 0 && (
              <Insignia
                texto={`+${gracePoints} pts en la Ronda de Gracia`}
                style={styles.graceBadge}
              />
            )}
          </Tarjeta>

          {/* Desglose por eje */}
          {blockStats.length > 0 && (
            <Tarjeta style={styles.breakdownCard}>
              <Text style={[TEXTOS.seccion, styles.breakdownTitle]}>Desglose por eje temático</Text>
              {blockStats.map((item, idx) => (
                <View
                  key={item.key}
                  style={[styles.breakdownRow, idx === blockStats.length - 1 && styles.lastRow]}
                >
                  <Text style={[TEXTOS.cuerpo, styles.blockName]}>{item.name}</Text>
                  <View style={styles.blockScoreCol}>
                    <Text style={styles.blockScoreText}>
                      {item.correct}/{item.total}
                    </Text>
                    {item.correct === item.total && (
                      <Text style={styles.blockScoreMini}>Perfecto</Text>
                    )}
                  </View>
                </View>
              ))}
            </Tarjeta>
          )}

          {/* Acciones */}
          <View style={styles.buttonGroup}>
            <Boton titulo="Jugar de nuevo" onPress={onRestart} />
            <Boton titulo="Volver al inicio" variante="secundario" onPress={onExit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 16,
  },
  scoreCard: {
    maxWidth: 480,
    alignItems: 'center',
  },
  scoreNumber: {
    color: COLORES.acento,
    fontSize: 56,
    fontWeight: '800',
    marginTop: 16,
  },
  totalNumber: {
    color: COLORES.textoSecundario,
    fontSize: 24,
    fontWeight: '600',
  },
  scorePercentage: {
    color: COLORES.textoSecundario,
    fontSize: 15,
    fontWeight: '600',
  },
  graceBadge: {
    alignSelf: 'center',
    marginTop: 12,
  },
  breakdownCard: {
    maxWidth: 480,
  },
  breakdownTitle: {
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  blockName: {
    fontWeight: '500',
  },
  blockScoreCol: {
    alignItems: 'flex-end',
  },
  blockScoreText: {
    color: COLORES.acento,
    fontSize: 16,
    fontWeight: '700',
  },
  blockScoreMini: {
    color: COLORES.exito,
    fontSize: 11,
    fontWeight: '600',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 480,
    gap: 12,
  },
});
