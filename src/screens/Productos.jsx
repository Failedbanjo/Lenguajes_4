import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import {
    COLORES,
    Calificacion,
    Cargando,
    Encabezado,
    Insignia,
    MensajeError,
    Pantalla,
    Precio,
    TEXTOS,
} from '../components/Tema';

const API_URL = 'https://fakestoreapi.com/products';

const obtenerProductos = async () => {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
        throw new Error(`Error en el servidor: ${respuesta.status}`);
    }
    return respuesta.json();
};

const Productos = ({ navigation }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [refrescando, setRefrescando] = useState(false);

    useEffect(() => {
        let activo = true;
        obtenerProductos()
            .then((datos) => {
                if (activo) setProductos(datos);
            })
            .catch((err) => {
                if (activo) setError(err.message || 'No se pudieron cargar los productos');
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    // setEstado: setRefrescando (deslizar hacia abajo) o setCargando (botón reintentar)
    const recargar = async (setEstado) => {
        setEstado(true);
        setError(null);
        try {
            setProductos(await obtenerProductos());
        } catch (err) {
            setError(err.message || 'No se pudieron cargar los productos');
        } finally {
            setEstado(false);
        }
    };

    const irADetalle = (producto) => {
        navigation.navigate('DetalleProducto', {
            producto,
            id: producto.id,
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => irADetalle(item)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.thumbnail}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.infoContainer}>
                <Insignia texto={item.category?.toUpperCase()} style={styles.insignia} />

                <Text style={[TEXTOS.seccion, styles.titulo]} numberOfLines={2}>
                    {item.title}
                </Text>

                {item.rating && (
                    <Calificacion
                        valor={item.rating.rate}
                        cantidad={item.rating.count}
                        style={styles.calificacion}
                    />
                )}

                <View style={styles.footerRow}>
                    <Precio valor={item.price} />
                    <Text style={styles.verMasTexto}>Ver detalle</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (cargando && !refrescando) {
        return <Cargando mensaje="Cargando catálogo de productos..." />;
    }

    if (error && productos.length === 0) {
        return (
            <MensajeError
                mensaje={error}
                textoBoton="Reintentar"
                onPress={() => recargar(setCargando)}
            />
        );
    }

    return (
        <Pantalla>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refrescando}
                        onRefresh={() => recargar(setRefrescando)}
                        colors={[COLORES.acento]}
                        tintColor={COLORES.superficie}
                    />
                }
                ListHeaderComponent={
                    <Encabezado
                        titulo="Explorar Productos"
                        subtitulo="Selecciona cualquier producto para ver especificaciones y comprar"
                        sobreFondo
                        style={styles.header}
                    />
                }
            />
        </Pantalla>
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: COLORES.superficie,
        borderRadius: 18,
        marginBottom: 12,
        flexDirection: 'row',
        padding: 12,
        borderWidth: 1,
        borderColor: COLORES.borde,
        shadowColor: COLORES.sombra,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    imageContainer: {
        width: 105,
        height: 125,
        borderRadius: 12,
        backgroundColor: COLORES.blanco,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        borderWidth: 1,
        borderColor: COLORES.borde,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'space-between',
    },
    insignia: {
        marginBottom: 4,
    },
    titulo: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 19,
    },
    calificacion: {
        marginTop: 4,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    verMasTexto: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORES.acento,
    },
});

export default Productos;
