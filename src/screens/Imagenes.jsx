import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Avatar, Boton, Encabezado, Pantalla, Tarjeta, TEXTOS } from '../components/Tema';

const Imagenes = ({ navigation, onVerDetalle }) => {
    const [listaImagenes, setListaImagenes] = useState([]);

    useEffect(() => {
        const getImagenesRick = async () => {
            const res = await fetch('https://rickandmortyapi.com/api/character');
            const data = await res.json();
            setListaImagenes(
                data.results.map(
                    ({ id, name, image, status, species, gender, origin, location }) => ({
                        id,
                        name,
                        image,
                        status,
                        species,
                        gender,
                        origin: origin.name,
                        location: location.name,
                    })
                )
            );
        };

        getImagenesRick();
    }, []);

    const verDetalle = (item) => {
        if (onVerDetalle) {
            onVerDetalle(item);
        } else if (navigation) {
            navigation.navigate('Detalle', { personaje: item });
        }
    };

    return (
        <Pantalla>
            <FlatList
                data={listaImagenes}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.lista}
                ListHeaderComponent={
                    <Encabezado
                        titulo="Rick y Morty"
                        subtitulo="Personajes de la serie"
                        sobreFondo
                        style={styles.header}
                    />
                }
                renderItem={({ item }) => (
                    <Tarjeta style={styles.personaje}>
                        <View style={styles.fila}>
                            <Avatar
                                uri={item.image}
                                tamano={80}
                                grosorBorde={3}
                                style={styles.imagen}
                                accessibilityLabel={`Imagen de ${item.name}`}
                            />
                            <View style={styles.info}>
                                <Text style={[TEXTOS.seccion, styles.nombre]}>{item.name}</Text>
                                <Text style={TEXTOS.pequeno}>ID: {item.id}</Text>
                            </View>
                        </View>
                        <Boton titulo="Ver detalle" onPress={() => verDetalle(item)} />
                    </Tarjeta>
                )}
            />
        </Pantalla>
    );
};

const styles = StyleSheet.create({
    lista: {
        padding: 16,
    },
    header: {
        marginBottom: 18,
        paddingHorizontal: 4,
    },
    personaje: {
        maxWidth: '100%',
        borderRadius: 18,
        marginBottom: 12,
        padding: 14,
    },
    fila: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    imagen: {
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 17,
        marginBottom: 4,
    },
});

export default Imagenes;
