import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import NosotrosScreen from "./src/views/screens/NosotrosScreen";
import NosotrosAdmin from "./src/views/screens/Admin/NosotrosAdmin";
import ProcedimientosScreen from "./src/views/screens/ProcedimientosScreen";
import ProcedimientosAdmin from "./src/views/screens/Admin/ProcedimientosAdmin";
import ContactoScreen from "./src/views/screens/ContactoScreen";
import Especialistas from "./src/views/screens/Especialistas";
import Ranking from "./src/views/screens/Ranking";
import TablaUsuario from "./src/views/screens/Tablas/TablaUsuario";
import TablaAdmin from "./src/views/screens/Tablas/TablaAdmin";
import HomeEspecialista from "./src/views/screens/Admin/HomeEspecialista";
import PerfilAdmin from "./src/views/screens/Admin/PerfilAdmin";
import PerfilUsuario from "./src/views/screens/PerfilUsuario";
import SpecialistCards from "./src/views/screens/Admin/Valoraciones";
import AgendarCita from "./src/views/screens/AgendarCita";


const Stack = createNativeStackNavigator();


function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Especialistas">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeEspecialista" component={HomeEspecialista} options={{ headerShown: false }} />
        <Stack.Screen name="NosotrosScreen" component={NosotrosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NosotrosAdmin" component={NosotrosAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="ProcedimientosScreen" component={ProcedimientosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProcedimientosAdmin" component={ProcedimientosAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="ContactoScreen" component={ContactoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgendarCita" component={AgendarCita} options={{ headerShown: false }} />
        <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }} />
        <Stack.Screen name="Especialistas" component={Especialistas} options={{ headerShown: false }} />
        <Stack.Screen name="TablaUsuario" component={TablaUsuario} options={{ headerShown: false }} />
        <Stack.Screen name="TablaAdmin" component={TablaAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="PerfilAdmin" component={PerfilAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} options={{ headerShown: false }} />
        <Stack.Screen name="SpecialistCards" component={SpecialistCards} options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;