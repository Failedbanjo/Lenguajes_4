import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BotonOpcion, { LETRAS_OPCIONES } from '../components/BotonOpcion';
import TarjetaPregunta from '../components/TarjetaPregunta';
import { Boton, COLORES, Insignia, Pantalla, Tarjeta } from '../components/Tema';

export default function RondaGracia({
  question,
  graceIndex,
  graceResult,
  graceSelected,
  effectiveScore,
  onSelect,
  onContinue,
  onRetire,
}) {
  if (!question) return null;

  const isAnswered = graceResult !== null;
  const isCorrect = graceResult === 'correct';
  const isMaxScore = effectiveScore >= 10;

  return (
    <Pantalla>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Barra superior */}
        <View style={styles.topBar}>
          <Boton
            titulo="Salir"
            variante="secundario"
            compacto
            onPress={onRetire}
          />
          <View style={styles.badgeRow}>
            <Insignia texto={`RONDA DE GRACIA #${graceIndex + 1}`} style={styles.graceBadge} />
            <Text style={styles.scoreText}>
              {effectiveScore}
              <Text style={styles.scoreSub}> / 10</Text>
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Aviso sobre las preguntas del desarrollador */}
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>PREGUNTAS DEL DESARROLLADOR</Text>
            <Text style={styles.disclaimerText}>
              Has entrado a la Ronda de Gracia. Estas preguntas son de dificultad extrema y
              están basadas en los gustos personales del creador (One Piece, The Legend of Zelda,
              Soul Eater, Undertale y Yu-Gi-Oh!).
            </Text>
          </View>

          {/* Tarjeta de la pregunta */}
          <TarjetaPregunta
            question={question}
            etiqueta={question.topic || 'Trivia personal'}
            mostrarDificultad={false}
          />

          {/* Opciones de respuesta */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, idx) => (
              <BotonOpcion
                key={`${question.id}_${idx}`}
                option={option}
                indexLabel={LETRAS_OPCIONES[idx] || `${idx + 1}`}
                correctAnswer={question.correctAnswer}
                selected={graceSelected}
                isRevealed={isAnswered}
                onPress={() => onSelect(option)}
              />
            ))}
          </View>

          {/* Panel de decisiones */}
          <View style={styles.actionPanel}>
            {!isAnswered ? (
              <Boton
                titulo={`Plantarme y asegurar ${effectiveScore} pts`}
                variante="secundario"
                onPress={onRetire}
              />
            ) : (
              <>
                <Tarjeta
                  style={[styles.feedback, isCorrect ? styles.feedbackSuccess : styles.feedbackFailure]}
                >
                  <Text style={[styles.feedbackTitle, isCorrect ? styles.textSuccess : styles.textFailure]}>
                    {isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
                  </Text>
                  <Text style={styles.feedbackSub}>
                    {isCorrect
                      ? `Sumaste +1 punto. Tu nota actual es ${effectiveScore}/10.`
                      : `La ronda de gracia concluye aquí. Conservas los puntos obtenidos (${effectiveScore}/10).`}
                  </Text>
                </Tarjeta>

                {!isCorrect ? (
                  <Boton titulo="Ver resultados finales" onPress={onRetire} />
                ) : isMaxScore ? (
                  <Boton titulo="¡Puntaje máximo! Ver resultados" onPress={onRetire} />
                ) : (
                  <>
                    <Boton titulo="Siguiente pregunta (+1 pt en juego)" onPress={onContinue} />
                    <Boton
                      titulo={`Plantarse y retirarse con ${effectiveScore} pts`}
                      variante="secundario"
                      onPress={onRetire}
                    />
                  </>
                )}
              </>
            )}
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  graceBadge: {
    alignSelf: 'center',
    flexShrink: 1,
  },
  scoreText: {
    color: COLORES.superficie,
    fontSize: 18,
    fontWeight: '800',
  },
  scoreSub: {
    color: COLORES.borde,
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    flexGrow: 1,
  },
  disclaimer: {
    borderWidth: 1,
    borderColor: COLORES.borde,
    borderRadius: 14,
    padding: 14,
    backgroundColor: COLORES.velo,
  },
  disclaimerTitle: {
    color: COLORES.superficie,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  disclaimerText: {
    color: COLORES.borde,
    fontSize: 13,
    lineHeight: 19,
  },
  optionsContainer: {
    marginVertical: 6,
  },
  actionPanel: {
    marginTop: 14,
    gap: 12,
  },
  feedback: {
    maxWidth: '100%',
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  feedbackSuccess: {
    backgroundColor: COLORES.exitoFondo,
    borderColor: COLORES.exito,
  },
  feedbackFailure: {
    backgroundColor: COLORES.errorFondo,
    borderColor: COLORES.error,
  },
  feedbackTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  textSuccess: {
    color: COLORES.exito,
  },
  textFailure: {
    color: COLORES.error,
  },
  feedbackSub: {
    color: COLORES.texto,
    fontSize: 14,
    textAlign: 'center',
  },
});
