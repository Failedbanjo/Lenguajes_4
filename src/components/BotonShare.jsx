import { View, Share, StyleSheet } from 'react-native';
import { Boton } from './Tema';

const BotonShare = ({ datos, titulo = 'Compartir perfil' }) => {

    const share = async () => {
        try {
            // Concatenar los datos del objeto en un solo mensaje
            let mensaje = '';
            if (datos && typeof datos === 'object') {
                mensaje = Object.entries(datos)
                    .map(([clave, valor]) => `${clave.charAt(0).toUpperCase() + clave.slice(1)}: ${valor}`)
                    .join('\n');
            } else if (typeof datos === 'string') {
                mensaje = datos;
            }

            const shareData = await Share.share({
                message: mensaje,
                title: titulo
            });

            if (shareData.action === Share.sharedAction) {
                console.log('Compartido con éxito');
            }

        } catch (error) {
            console.error('Error al compartir:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Boton titulo="Compartir" onPress={share} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        width: '100%',
        alignItems: 'center',
    },
});

export default BotonShare;