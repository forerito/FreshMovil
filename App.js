import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/views/screens/HomeScreen";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import BlogScreen from "./src/views/screens/BlogScreen";
import ProcedimientosScreen from "./src/views/screens/ProcedimientosScreen";
import NosotrosScreen from "./src/views/screens/NosotrosScreen";
import SedesScreen from "./src/views/screens/SedesScreen";
import ContactoScreen from "./src/views/screens/ContactoScreen";
import AgendarCita from "./src/views/screens/AgendarCita";

import CitasAgendadas from "./src/views/screens/CitasAgendadas";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CitasAgendadas">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BlogScreen" component={BlogScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProcedimientosScreen" component={ProcedimientosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NosotrosScreen" component={NosotrosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SedesScreen" component={SedesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactoScreen" component={ContactoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgendarCita" component={AgendarCita} options={{ headerShown: false }} />

        <Stack.Screen name="CitasAgendadas" component={CitasAgendadas} options={{ headerShown: false }} />
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
