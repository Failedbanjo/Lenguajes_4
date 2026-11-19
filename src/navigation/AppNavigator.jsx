import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import EditarPerfil from '../screens/EditarPerfil';
import Imagenes from '../screens/Imagenes';
import Caja from '../screens/Caja';
import Detalle from '../screens/Detalle';
import Quiz from '../screens/Quiz';
import Productos from '../screens/Productos';
import DetalleProducto from '../screens/DetalleProducto';
import { OPCIONES_CABECERA } from '../components/Tema';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={OPCIONES_CABECERA}>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ title: 'Editar Perfil' }} />
            <Stack.Screen name="Imagenes" component={Imagenes} options={{ title: 'Rick y Morty' }} />
            <Stack.Screen name="Caja" component={Caja} options={{ title: 'Caja' }} />
            <Stack.Screen name="Detalle" component={Detalle} options={{ title: 'Detalle del Personaje' }} />
            <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
            <Stack.Screen name="Productos" component={Productos} options={{ title: 'Catálogo de Productos' }} />
            <Stack.Screen name="DetalleProducto" component={DetalleProducto} options={{ title: 'Detalle del Producto' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
