import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Boton, COLORES, Encabezado, Pantalla, Tarjeta, TEXTOS } from '../components/Tema';

const opciones = [
    { titulo: 'Perfil', descripcion: 'Consulta tu perfil', destino: 'Perfil' },
    { titulo: 'Rick y Morty', descripcion: 'Explora los personajes', destino: 'Imagenes' },
    { titulo: 'Caja', descripcion: 'Abre la pantalla de caja', destino: 'Caja' },
    { titulo: 'Quiz', descripcion: 'Pon a prueba tus conocimientos', destino: 'Quiz' },
    { titulo: 'FakeStore', descripcion: 'Explora el catálogo de productos', destino: 'Productos' },
];

const Home = ({ navigation }) => {
    const [contador, setContador] = useState(0);

    return (
        <Pantalla>
            <ScrollView contentContainerStyle={styles.container}>
                <Tarjeta style={styles.card}>
                    <Encabezado
                        etiqueta="BIENVENIDO"
                        titulo="Inicio"
                        subtitulo="Elige una sección para continuar"
                        style={styles.encabezado}
                    />

                    <View style={[styles.cajaBlanca, styles.contador]}>
                        <Text style={[TEXTOS.subtitulo, styles.negrita]}>Contador</Text>
                        <Text accessibilityLiveRegion="polite" style={[TEXTOS.titulo, styles.valor]}>
                            {contador}
                        </Text>
                        <View style={styles.acciones}>
                            <Boton
                                compacto
                                titulo="−"
                                accessibilityLabel="Disminuir contador"
                                onPress={() => setContador((valor) => valor - 1)}
                                style={styles.botonContador}
                                textStyle={styles.textoContador}
                            />
                            <Boton
                                compacto
                                titulo="+"
                                accessibilityLabel="Aumentar contador"
                                onPress={() => setContador((valor) => valor + 1)}
                                style={styles.botonContador}
                                textStyle={styles.textoContador}
                            />
                        </View>
                    </View>

                    <View style={styles.opciones}>
                        {opciones.map((opcion) => (
                            <TouchableOpacity
                                key={opcion.destino}
                                accessibilityRole="button"
                                style={[styles.cajaBlanca, styles.opcion]}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate(opcion.destino)}
                            >
                                <View style={styles.opcionTexto}>
                                    <Text style={TEXTOS.seccion}>{opcion.titulo}</Text>
                                    <Text style={[TEXTOS.pequeno, styles.descripcion]}>{opcion.descripcion}</Text>
                                </View>
                                <Text style={styles.flecha}>›</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Tarjeta>
            </ScrollView>
        </Pantalla>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        maxWidth: 420,
    },
    encabezado: {
        marginBottom: 16,
    },
    cajaBlanca: {
        backgroundColor: COLORES.blanco,
        borderColor: COLORES.borde,
        borderWidth: 1,
        borderRadius: 14,
    },
    contador: {
        alignItems: 'center',
        padding: 14,
        marginBottom: 16,
    },
    negrita: {
        fontWeight: '700',
        marginTop: 0,
    },
    valor: {
        fontSize: 30,
        marginVertical: 6,
    },
    acciones: {
        flexDirection: 'row',
        gap: 12,
    },
    botonContador: {
        width: 44,
        paddingHorizontal: 0,
    },
    textoContador: {
        fontSize: 22,
        fontWeight: '700',
    },
    opciones: {
        gap: 10,
    },
    opcion: {
        minHeight: 68,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    opcionTexto: {
        flex: 1,
    },
    descripcion: {
        marginTop: 3,
    },
    flecha: {
        color: COLORES.acento,
        fontSize: 28,
        marginLeft: 12,
    },
});

export default Home;
