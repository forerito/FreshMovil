import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const LoginScreen = ({ navigation, setRol }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => {
    // Handle navigation to the login screen
    navigation.navigate('RegistrationScreen');
  };

  const handleSubmit = async () => {
    try {
      let url;
      if (role === "paciente") {
        url = "https://freshsmile.azurewebsites.net/FreshSmile/loginPaciente";
      } else if (role === "administrador") {
        url = "https://freshsmile.azurewebsites.net/FreshSmile/loginAdministrador";
      } else {
        throw new Error("Rol no válido");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `correo=${email}&contraseña=${password}`,
      });

      if (response.ok) {
        // Inicio de sesión exitoso
        const data = await response.text();
        // Aquí puedes mostrar una alerta o realizar cualquier otra acción en React Native
        Alert.alert("Inicio de sesión exitoso", data);
        // setRol(role);
        await AsyncStorage.setItem("loggedIn", "true");
        await AsyncStorage.setItem("rol", role);
      
        // Redirigir al usuario a la página de inicio según el rol seleccionado
        if (role === "paciente") {
          navigation.navigate("HomeScreenPaciente");
        } else if (role === "administrador") {
          navigation.navigate("HomeScreenAdministrador");
        }
      } else {
        throw new Error("Correo o contraseña incorrectos");
      }
    } catch (error) {
      // Aquí puedes mostrar una alerta de error en React Native
      Alert.alert("Error:", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
    <AlertNotificationRoot>
        <View style={styles.container}>
          <Text style={styles.titlePrincipal}>INICIAR SESIÓN</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo</Text>
            <View style={styles.inputContainer}>
              <Icon name="envelope" size={24} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={24} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Ingrese su contraseña"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconContainer}
              >
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Rol</Text>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={role}
                style={styles.input}
                onValueChange={(value) => setRole(value)}
              >
                
                <Picker.Item label="Seleccione un rol" value="" />
                <Picker.Item label="Paciente" value="paciente" />
                <Picker.Item label="Administrador" value="administrador" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.title}>Iniciar sesión</Text>
          </TouchableOpacity>

          <View style={styles.loginLink}>
            <Text style={styles.loginText}>¿Aún no tienes una cuenta?</Text>

            <TouchableOpacity
              onPress={handleRegisterClick}
              style={styles.button2}
              activeOpacity={0.7}
            >
              <Text style={styles.title2}>Registrate</Text>
            </TouchableOpacity>

          </View>

        </View>
    </AlertNotificationRoot>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  titlePrincipal: {
    color: "#4fafd2",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
    color: 'black',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#249bad",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  title2: {
    color: "#249bad",
    fontWeight: "bold",
    fontSize: 18,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    marginRight: 5,
  },
  button2: {
    height: 40,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
};

export default LoginScreen;