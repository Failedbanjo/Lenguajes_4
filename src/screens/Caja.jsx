import { StyleSheet } from 'react-native';
import { Boton, Encabezado, Pantalla, Tarjeta } from '../components/Tema';

const Caja = ({ navigation }) => {
    return (
        <Pantalla centrado>
            <Tarjeta>
                <Encabezado etiqueta="SECCIÓN" titulo="Caja" centrado style={styles.encabezado} />
                <Boton titulo="Regresar" onPress={() => navigation.goBack()} />
            </Tarjeta>
        </Pantalla>
    );
};

const styles = StyleSheet.create({
    encabezado: {
        marginBottom: 20,
    },
});

export default Caja;
