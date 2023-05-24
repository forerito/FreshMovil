import React from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import user from "../../../assets/usuario.png";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    let isValid = true;

    if (!inputs.email) {
      handleError("Por favor ingrese su dirección de correo eléctronico", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Por favor ingrese una dirección de correo válida", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Por favor ingrese una contraseña", "password");
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError("La contraseña debe ser de mínimo 8 carácteres", "password");
      isValid = false;
    }

    if (isValid) login();
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };

  const login = () => {
    console.log("login!");
    console.log(inputs);

    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        let userData = await AsyncStorage.getItem("userData");

        if (userData) {
          userData = JSON.parse(userData);
          console.log("userData");
          console.log(userData);

          if (
            inputs.email == userData.email &&
            inputs.password == userData.password
          ) {
            navigation.navigate("HomeScreen");
            AsyncStorage.setItem(
              "userData",
              JSON.stringify({ ...userData, loggedIn: true })
            );
          } else {
            console.log("No Account Found");
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "ERROR",
              textBody: "¡Correo/Contraseña incorrectos!",
              button: "Cerrar",
            });
          }
        } else {
          console.log("No Account Found");
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "ERROR",
            textBody: "El usuario no está registrado",
            button: "Cerrar",
          });
        }
      } catch (error) {
        console.log("Error! " + error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "ERROR",
          textBody: error,
          button: "Cerrar",
        });
      }
    }, 3000);
  };

  return (
    <AlertNotificationRoot style={styles.notification}>
      <SafeAreaView style={styles.container}>
        <Loader visible={loading} />
        <ScrollView contentContainerStyle={styles.svContainer}>
          <Image source={user} style={styles.image} />
          <Text style={styles.heading}>Inicio de Sesión</Text>
          <View style={styles.viewContainer}>
            <Input
              label="Correo"
              iconName="envelope"
              placeholder="Ingrese su correo"
              onChangeText={(text) => handleOnChange(text, "email")}
              onFocus={() => handleError(null, "email")}
              error={errors.email}
            />
            <Input
              label="Contraseña"
              iconName="lock"
              password
              placeholder="Ingrese su contraseña"
              onChangeText={(text) => handleOnChange(text, "password")}
              onFocus={() => handleError(null, "password")}
              error={errors.password}
            />

            <Button title="Iniciar sesión" onPress={validate} />
            <Text
              style={styles.textRegister}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              ¿Aún no eres miembro? Regístrate
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  notification: {
    justifyContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 20,
    borderRadius: 5,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  svContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  viewContainer: {
    paddingVertical: 20,
  },
  textRegister: {
    textAlign: "center",
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    alignSelf: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "center",
  },
});

export default LoginScreen;