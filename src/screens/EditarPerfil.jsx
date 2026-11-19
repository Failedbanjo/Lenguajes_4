import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Boton, COLORES, Insignia, Pantalla, Tarjeta, TEXTOS } from '../components/Tema';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const EditarPerfil = ({ navigation, route }) => {
    const perfilInicial = route?.params?.perfil || {
        nombre: 'Pablo Aguilar',
        edad: '20',
        ciudad: 'Cuenca',
        profesion: 'Desarrollador de software',
        imagen: 'https://animota.net/cdn/shop/files/00095421535_03.jpg?v=1692950795&width=1445',
    };

    const [perfil, setPerfil] = useState(perfilInicial);
    const [cancelaciones, setCancelaciones] = useState(0);

    const procesarResultadoPicker = (result) => {
        if (result.canceled) {
            setCancelaciones((prev) => prev + 1);
            return;
        }

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            // Validación de tamaño (máximo 5 MB si está reportado fileSize)
            if (asset.fileSize && asset.fileSize > MAX_IMAGE_SIZE_BYTES) {
                const tamanoMB = (asset.fileSize / (1024 * 1024)).toFixed(2);
                Alert.alert(
                    'Imagen muy pesada',
                    `La imagen seleccionada pesa ${tamanoMB} MB. El tamaño máximo permitido es de 5 MB.`
                );
                return;
            }

            setPerfil((prev) => ({ ...prev, imagen: asset.uri }));
        }
    };

    const seleccionarDeGaleria = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!status.granted) {
            Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        procesarResultadoPicker(result);
    };

    const tomarFoto = async () => {
        const status = await ImagePicker.requestCameraPermissionsAsync();
        if (!status.granted) {
            Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        procesarResultadoPicker(result);
    };

    const eliminarFoto = () => {
        Alert.alert(
            'Eliminar foto',
            '¿Estás seguro de que deseas eliminar la foto de perfil?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => setPerfil((prev) => ({ ...prev, imagen: null })),
                },
            ]
        );
    };

    const guardarCambios = () => {
        if (route?.params?.onSave) {
            route.params.onSave(perfil);
        }
        navigation.goBack();
    };

    const renderInput = (label, key, keyboardType = 'default') => (
        <View style={styles.fieldRow}>
            <Text style={[TEXTOS.seccion, styles.label]}>{label}</Text>
            <TextInput
                style={styles.input}
                value={perfil[key]}
                onChangeText={(txt) => setPerfil({ ...perfil, [key]: txt })}
                placeholderTextColor={COLORES.textoSecundario}
                keyboardType={keyboardType}
            />
        </View>
    );

    return (
        <Pantalla>
            <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Tarjeta style={styles.card}>
                        {/* Contador de cancelaciones en la esquina superior derecha */}
                        <Insignia texto={`CANCELADAS: ${cancelaciones}`} style={styles.cancelaciones} />

                        <Avatar uri={perfil.imagen} grosorBorde={2} style={styles.avatar} />

                        {/* Botones para seleccionar / tomar foto */}
                        <View style={styles.botonesRow}>
                            <Boton titulo="Galería" compacto style={styles.boton} onPress={seleccionarDeGaleria} />
                            <Boton
                                titulo="Cámara"
                                variante="secundario"
                                compacto
                                style={styles.boton}
                                onPress={tomarFoto}
                            />
                        </View>

                        {/* Botón Eliminar Foto de Perfil */}
                        {perfil.imagen && (
                            <Boton
                                titulo="Eliminar foto"
                                variante="secundario"
                                compacto
                                style={styles.botonEliminar}
                                onPress={eliminarFoto}
                            />
                        )}

                        {/* Formulario de edición */}
                        <View style={styles.formContainer}>
                            {renderInput('Nombre', 'nombre')}
                            {renderInput('Edad', 'edad', 'numeric')}
                            {renderInput('Ciudad', 'ciudad')}
                            {renderInput('Profesión', 'profesion')}
                        </View>

                        <Boton titulo="Guardar cambios" style={styles.guardarButton} onPress={guardarCambios} />
                    </Tarjeta>
                </ScrollView>
            </SafeAreaView>
        </Pantalla>
    );
};

export default EditarPerfil;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        paddingTop: 44,
        alignItems: 'center',
    },
    cancelaciones: {
        position: 'absolute',
        top: 14,
        right: 14,
    },
    avatar: {
        marginBottom: 16,
    },
    botonesRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
        marginBottom: 10,
    },
    boton: {
        flex: 1,
        minHeight: 44,
    },
    botonEliminar: {
        width: '100%',
        marginBottom: 16,
    },
    formContainer: {
        width: '100%',
        backgroundColor: COLORES.blanco,
        borderWidth: 1,
        borderColor: COLORES.borde,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    fieldRow: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 13,
        marginBottom: 4,
    },
    input: {
        backgroundColor: COLORES.superficie,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 15,
        color: COLORES.texto,
        borderWidth: 1,
        borderColor: COLORES.borde,
    },
    guardarButton: {
        marginTop: 16,
    },
});
