import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Boton, Encabezado, Pantalla, Tarjeta, TEXTOS } from '../components/Tema';

const Detalle = ({ route, navigation, personaje: personajeProp, onVolver }) => {
  const personaje = personajeProp || route?.params?.personaje;

  if (!personaje) {
    return null;
  }

  const { id, name, image, status, species, gender, origin, location } = personaje;

  const volver = onVolver || (() => navigation?.goBack());

  const datos = [
    ['Estado', status],
    ['Especie', species],
    ['Género', gender],
    ['Origen', origin],
    ['Ubicación', location],
  ];

  return (
    <Pantalla centrado>
      <Tarjeta style={styles.card}>
        <Encabezado etiqueta="DETALLE" centrado />
        <Avatar uri={image} tamano={160} grosorBorde={5} accessibilityLabel={`Imagen de ${name}`} />
        <Encabezado titulo={name} subtitulo={`ID: ${id}`} centrado style={styles.nombre} />

        <View style={styles.datos}>
          {datos.map(([etiqueta, valor]) => (
            <Text key={etiqueta} style={[TEXTOS.cuerpo, styles.dato]}>
              <Text style={styles.negrita}>{etiqueta}: </Text>
              {valor}
            </Text>
          ))}
        </View>

        <Boton titulo="Volver" onPress={volver} />
      </Tarjeta>
    </Pantalla>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  nombre: {
    marginTop: 12,
  },
  datos: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  dato: {
    fontSize: 16,
    marginBottom: 6,
  },
  negrita: {
    fontWeight: '600',
  },
});

export default Detalle;
