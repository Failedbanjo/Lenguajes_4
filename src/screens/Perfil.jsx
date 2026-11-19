import { useState } from 'react';
import { StyleSheet } from 'react-native';
import BotonShare from '../components/BotonShare';
import { Avatar, Boton, Encabezado, Pantalla, Tarjeta } from '../components/Tema';

const Perfil = ({ navigation }) => {
  const [perfil, setPerfil] = useState({
    nombre: 'Jair Patiño',
    edad: '20',
    ciudad: 'Quito',
    profesion: 'Desarrollador de software',
    imagen: 'https://i.pinimg.com/1200x/4c/33/28/4c3328b0f858c836edc90fd6adfd9479.jpg',
  });

  const editarPerfil = () => {
    navigation.navigate('EditarPerfil', {
      perfil,
      onSave: (perfilActualizado) => setPerfil(perfilActualizado),
    });
  };

  return (
    <Pantalla centrado>
      <Tarjeta style={styles.card}>
        <Avatar uri={perfil.imagen} grosorBorde={5} />

        <Encabezado
          etiqueta="PERFIL"
          titulo={perfil.nombre}
          subtitulo={perfil.profesion}
          centrado
          style={styles.info}
        />

        <Boton titulo="Editar perfil" onPress={editarPerfil} style={styles.boton} />
        <Boton titulo="Contactar" style={styles.boton} />
        <BotonShare datos={perfil} titulo="Perfil de usuario" />
      </Tarjeta>
    </Pantalla>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 32,
    alignItems: 'center',
  },
  info: {
    marginTop: 24,
    marginBottom: 30,
  },
  boton: {
    marginBottom: 12,
  },
});

export default Perfil;
