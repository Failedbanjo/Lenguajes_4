import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import {
    Boton,
    COLORES,
    Calificacion,
    Cargando,
    Insignia,
    MensajeError,
    Pantalla,
    Precio,
    Tarjeta,
    TEXTOS,
} from '../components/Tema';

const API_URL = 'https://fakestoreapi.com/products';

const DetalleProducto = ({ route, navigation }) => {
    const { producto: productoInicial, id } = route.params || {};

    const [producto, setProducto] = useState(productoInicial || null);
    const [cargando, setCargando] = useState(!productoInicial && !!id);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!producto && id) {
            let activo = true;
            fetch(`${API_URL}/${id}`)
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        throw new Error(`Error en el servidor: ${respuesta.status}`);
                    }
                    return respuesta.json();
                })
                .then((datos) => {
                    if (activo) setProducto(datos);
                })
                .catch((err) => {
                    if (activo) setError(err.message || 'No se pudo obtener el detalle del producto');
                })
                .finally(() => {
                    if (activo) setCargando(false);
                });

            return () => {
                activo = false;
            };
        }
    }, [id, producto]);

    const handleComprar = () => {
        if (!producto) return;
        Alert.alert(
            '¡Orden Confirmada!',
            `Has seleccionado:\n"${producto.title}"\n\nTotal a pagar: $${Number(producto.price).toFixed(2)}\n\n¿Deseas finalizar la compra?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar Compra',
                    onPress: () => {
                        Alert.alert('¡Éxito!', 'Tu compra ha sido procesada con éxito.', [
                            { text: 'Volver al catálogo', onPress: () => navigation.goBack() },
                        ]);
                    },
                },
            ]
        );
    };

    if (cargando) {
        return <Cargando mensaje="Cargando información del producto..." />;
    }

    if (error || !producto) {
        return (
            <MensajeError
                titulo="Producto no encontrado"
                mensaje={error || 'No se pudieron recuperar los datos de este artículo.'}
                textoBoton="Regresar a la lista"
                onPress={() => navigation.goBack()}
            />
        );
    }

    return (
        <Pantalla>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Imagen grande */}
                <Tarjeta style={styles.imageCard}>
                    <Image
                        source={{ uri: producto.image }}
                        style={styles.imagenGrande}
                        resizeMode="contain"
                    />
                </Tarjeta>

                <Tarjeta style={styles.detallesCard}>
                    {/* Categoría y calificación */}
                    <View style={styles.headerInfo}>
                        <Insignia texto={producto.category?.toUpperCase()} style={styles.insignia} />

                        {producto.rating && (
                            <Calificacion
                                valor={producto.rating.rate}
                                cantidad={producto.rating.count}
                                sufijo="reseñas"
                                style={[styles.cajaBlanca, styles.calificacion]}
                            />
                        )}
                    </View>

                    {/* Título */}
                    <Text style={[TEXTOS.titulo, styles.titulo]}>{producto.title}</Text>

                    {/* Precio destacado */}
                    <View style={[styles.cajaBlanca, styles.precioCard]}>
                        <View>
                            <Text style={TEXTOS.pequeno}>Precio total</Text>
                            <Precio valor={producto.price} style={styles.precio} />
                        </View>
                        <Insignia
                            texto="Envío gratis"
                            style={styles.envioGratis}
                            textStyle={styles.envioGratisTexto}
                        />
                    </View>

                    {/* Descripción */}
                    <View style={[styles.cajaBlanca, styles.seccionDescripcion]}>
                        <Text style={[TEXTOS.seccion, styles.subtituloSeccion]}>Descripción del producto</Text>
                        <Text style={TEXTOS.cuerpo}>{producto.description}</Text>
                    </View>

                    {/* Botón de compra */}
                    <Boton titulo="Comprar ahora" onPress={handleComprar} />
                </Tarjeta>
            </ScrollView>
        </Pantalla>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
        alignItems: 'center',
        gap: 16,
    },
    imageCard: {
        maxWidth: 480,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORES.blanco,
    },
    imagenGrande: {
        width: '100%',
        height: '100%',
    },
    detallesCard: {
        maxWidth: 480,
        padding: 20,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    insignia: {
        flexShrink: 1,
    },
    cajaBlanca: {
        backgroundColor: COLORES.blanco,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORES.borde,
    },
    calificacion: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    titulo: {
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 16,
    },
    precioCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginBottom: 20,
    },
    precio: {
        fontSize: 26,
    },
    envioGratis: {
        alignSelf: 'center',
        backgroundColor: COLORES.exitoFondo,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    envioGratisTexto: {
        color: COLORES.exito,
        fontSize: 12,
    },
    seccionDescripcion: {
        padding: 16,
        marginBottom: 24,
    },
    subtituloSeccion: {
        fontSize: 15,
        marginBottom: 10,
    },
});

export default DetalleProducto;
