import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { PREGUNTAS } from '../data/preguntas';
import { useQuiz } from '../hooks/useQuiz';
import { Boton, Pantalla } from '../components/Tema';
import BarraProgreso from '../components/BarraProgreso';
import TarjetaPregunta from '../components/TarjetaPregunta';
import BotonOpcion, { LETRAS_OPCIONES } from '../components/BotonOpcion';
import Resultados from './Resultados';
import RondaGracia from './RondaGracia';

export default function Quiz({ navigation }) {
  const {
    current,
    currentIndex,
    total,
    selected,
    isRevealed,
    status,
    score,
    answers,
    select,
    next,
    restart,

    // Props de Gracia
    graceCurrent,
    graceIndex,
    graceSelected,
    graceResult,
    gracePoints,
    effectiveScore,
    selectGrace,
    continueGrace,
    retireGrace,
  } = useQuiz(PREGUNTAS, 10);

  // Si se activa la ronda de gracia (score < 5 y 50% de probabilidad)
  if (status === 'grace') {
    return (
      <RondaGracia
        question={graceCurrent}
        graceIndex={graceIndex}
        graceResult={graceResult}
        graceSelected={graceSelected}
        effectiveScore={effectiveScore}
        onSelect={selectGrace}
        onContinue={continueGrace}
        onRetire={retireGrace}
      />
    );
  }

  // Si terminó, renderizar pantalla de resultados
  if (status === 'finished') {
    return (
      <Resultados
        score={score}
        total={total}
        answers={answers}
        gracePoints={gracePoints}
        onRestart={restart}
        onExit={() => navigation.goBack()}
      />
    );
  }

  return (
    <Pantalla>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Barra superior: botón salir y progreso */}
        <View style={styles.topBar}>
          <Boton
            titulo="Salir"
            variante="secundario"
            compacto
            onPress={() => navigation.goBack()}
          />
          <View style={styles.progressWrapper}>
            <BarraProgreso current={currentIndex + 1} total={total} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Tarjeta con el eje, dificultad y pregunta */}
          <TarjetaPregunta question={current} />

          {/* Opciones de respuesta */}
          <View style={styles.optionsContainer}>
            {current?.options.map((option, idx) => (
              <BotonOpcion
                key={`${current.id}_${idx}`}
                option={option}
                indexLabel={LETRAS_OPCIONES[idx] || `${idx + 1}`}
                correctAnswer={current.correctAnswer}
                selected={selected}
                isRevealed={isRevealed}
                onPress={() => select(option)}
              />
            ))}
          </View>

          {/* Botón opcional "Siguiente" para avanzar antes de que termine el delay */}
          {isRevealed && (
            <Boton
              titulo={currentIndex + 1 === total ? 'Ver resultados' : 'Siguiente'}
              onPress={next}
              style={styles.nextButton}
            />
          )}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 12,
  },
  progressWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    flexGrow: 1,
  },
  optionsContainer: {
    marginVertical: 10,
  },
  nextButton: {
    marginTop: 12,
  },
});
