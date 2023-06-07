import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import Icon from "react-native-vector-icons/FontAwesome5";

const RegistrationScreen = ({ navigation }) => {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nombres, setNombres] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleTipoDocumentoChange = (value) => {
    setTipoDocumento(value);
  };

  const handleNumeroDocumentoChange = (value) => {
    setNumeroDocumento(value);
  };

  const handleNombresChange = (value) => {
    setNombres(value);
  };

  const handleDireccionChange = (value) => {
    setDireccion(value);
  };

  const handleTelefonoChange = (value) => {
    setTelefono(value);
  };

  const handleCorreoChange = (value) => {
    setCorreo(value);
  };

  const handleContraseñaChange = (value) => {
    const contraseña = value;

    if (contraseña.length <= 8) {
      setContraseña(contraseña);
    } else {
      Alert.alert('Contraseña inválida', 'La contraseña no puede tener más de 8 caracteres.');
    }
  };

  const handleRolChange = (value) => {
    setRol(value);
  };

  const opcionesTipoDocumento = [
    { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
    { value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' },
    { value: 'Cédula de extranjería', label: 'Cédula de extranjería' },
    // Add more options as needed
  ];

  const handleLoginClick = () => {
    // Handle navigation to the login screen
    navigation.navigate('LoginScreen');
  };

  const handleSubmit = async () => {

    if (
      tipoDocumento === '' ||
      numeroDocumento === '' ||
      nombres === '' ||
      direccion === '' ||
      telefono === '' ||
      correo === '' ||
      contraseña === '' ||
      rol === ''
    ) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Campos vacíos',
        textBody: 'Por favor, completa todos los campos del formulario.',
        button: 'Cerrar',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "ERROR",
        textBody: "Correo no valido",
        button: "Close",
      });
      return;
    }

    let apiEndpoint = '';
    let datosFormulario = {};

    if (rol === 'Administrador') {
      apiEndpoint = 'https://freshsmile.azurewebsites.net/FreshSmile/CrearAdministradores';
      datosFormulario = {
        tipo_documento_uadministrador: tipoDocumento,
        numero_documento_uadministrador: numeroDocumento,
        nombres_uadministrador: nombres,
        direccion_uadministrador: direccion,
        telefono_uadministrador: telefono,
        correo: correo,
        contraseña: contraseña,
      };
    } else if (rol === 'Paciente') {
      apiEndpoint = 'https://freshsmile.azurewebsites.net/FreshSmile/CrearPacientes';
      datosFormulario = {
        tipo_documento_paciente: tipoDocumento,
        numero_documento_paciente: numeroDocumento,
        nombres_paciente: nombres,
        direccion_paciente: direccion,
        telefono_paciente: telefono,
        correo: correo,
        contraseña: contraseña,
      };
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormulario),
      });

      if (response.ok) {
        Alert.alert('Registro exitoso', '¡Se ha registrado correctamente!', [
          { text: 'OK', onPress: resetFormAndNavigateToLogin },
        ]);
      } else {
        Alert.alert('Error en el registro', 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      Alert.alert('Error en el registro', 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
      console.error(error);
    }
  };

  const resetFormAndNavigateToLogin = () => {
    setTipoDocumento('');
    setNumeroDocumento('');
    setNombres('');
    setApellidos('');
    setDireccion('');
    setTelefono('');
    setCorreo('');
    setContraseña('');
    setRol('');
    // Handle navigation to the login screen
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <AlertNotificationRoot>
          <View style={styles.container}>
            <Text style={styles.titlePrincipal}>REGISTRO</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de documento</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={tipoDocumento}
                  onValueChange={handleTipoDocumentoChange}
                  style={styles.input}
                >
                  <Picker.Item label="Seleccione un tipo de documento" value="" />
                  {opcionesTipoDocumento.map((opcion) => (
                    <Picker.Item
                      key={opcion.value}
                      label={opcion.label}
                      value={opcion.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Número de documento</Text>
              <View style={styles.inputContainer}>
                <Icon name="address-card" size={24} style={styles.icon} />
                <TextInput
                  value={numeroDocumento}
                  placeholder="Ingrese su número de documento"
                  onChangeText={handleNumeroDocumentoChange}
                  style={styles.input}
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombres</Text>
              <View style={styles.inputContainer}>
                <Icon name="user" size={24} style={styles.icon} />
                <TextInput
                  value={nombres}
                  placeholder="Ingrese sus nombres"
                  onChangeText={handleNombresChange}
                  style={styles.input}
                  required
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Dirección</Text>
              <View style={styles.inputContainer}>
                <Icon name="building" size={24} style={styles.icon} />
                <TextInput
                  value={direccion}
                  placeholder="Ingrese su dirección"
                  onChangeText={handleDireccionChange}
                  style={styles.input}
                  required
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <View style={styles.inputContainer}>
                <Icon name="mobile-alt" size={24} style={styles.icon} />
                <TextInput
                  value={telefono}
                  placeholder="Ingrese su número de teléfono"
                  onChangeText={handleTelefonoChange}
                  style={styles.input}
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <View style={styles.inputContainer}>
                <Icon name="envelope" size={24} style={styles.icon} />
                <TextInput
                  value={correo}
                  placeholder="Ingrese su correo electrónico"
                  onChangeText={handleCorreoChange}
                  style={styles.input}
                  keyboardType="email-address"
                  required
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={24} style={styles.icon} />
                <TextInput
                  value={contraseña}
                  placeholder="Ingrese su contraseña"
                  onChangeText={handleContraseñaChange}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  required
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
              <Text style={styles.label}>Tipo de Rol</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={rol}
                  onValueChange={handleRolChange}
                  style={styles.input}
                >
                  <Picker.Item label="Seleccione su rol" value="" />
                  <Picker.Item label="Administrador" value="Administrador" />
                  <Picker.Item label="Paciente" value="Paciente" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.button}
              activeOpacity={0.7}
            >
              <Text style={styles.title}>Registrarme</Text>
            </TouchableOpacity>

            <View style={styles.loginLink}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>

              <TouchableOpacity
                onPress={handleLoginClick}
                style={styles.button2}
                activeOpacity={0.7}
              >
                <Text style={styles.title2}>Iniciar sesión</Text>
              </TouchableOpacity>

            </View>
          </View>
        </AlertNotificationRoot>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    marginRight: 5,
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
  button2: {
    height: 40,
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
});

export default RegistrationScreen;