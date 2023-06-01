import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import NosotrosScreen from "./src/views/screens/NosotrosScreen";
import ProcedimientosScreen from "./src/views/screens/ProcedimientosScreen";
import ContactoScreen from "./src/views/screens/ContactoScreen";
import AgendarCita from "./src/views/screens/AgendarCita";
import DoctorCard from "./src/views/screens/DoctorCard";
import TablaUsuario from "./src/views/screens/Tablas/TablaUsuario";
import TablaAdmin from "./src/views/screens/Tablas/TablaAdmin";

import CitasAgendadas from "./src/views/screens/CitasAgendadas";
import CitasPendientes from "./src/views/screens/CitasPendientes";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NosotrosScreen" component={NosotrosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProcedimientosScreen" component={ProcedimientosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactoScreen" component={ContactoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgendarCita" component={AgendarCita} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorCard" component={DoctorCard} options={{ headerShown: false }} />
        <Stack.Screen name="TablaUsuario" component={TablaUsuario} options={{ headerShown: false }} />
        <Stack.Screen name="TablaAdmin" component={TablaAdmin} options={{ headerShown: false }} />

        <Stack.Screen name="CitasAgendadas" component={CitasAgendadas} options={{ headerShown: false }} />
        <Stack.Screen name="CitasPendientes" component={CitasPendientes} options={{ headerShown: false }} />

        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;