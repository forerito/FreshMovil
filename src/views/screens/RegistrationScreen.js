// import React, { useState } from 'react';
// import { View, TextInput, Text, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Picker } from '@react-native-picker/picker';
// import {
//   ALERT_TYPE,
//   Dialog,
//   AlertNotificationRoot,
//   Toast,
// } from "react-native-alert-notification";
// import Icon from "react-native-vector-icons/FontAwesome5";

// const RegistrationScreen = ({ navigation }) => {
//   const [tipoDocumento, setTipoDocumento] = useState('');
//   const [numeroDocumento, setNumeroDocumento] = useState('');
//   const [nombres, setNombres] = useState('');
//   const [direccion, setDireccion] = useState('');
//   const [telefono, setTelefono] = useState('');
//   const [correo, setCorreo] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [rol, setRol] = useState('');

//   const [showPassword, setShowPassword] = useState(false);

//   const handleTipoDocumentoChange = (value) => {
//     setTipoDocumento(value);
//   };

//   const handleNumeroDocumentoChange = (value) => {
//     setNumeroDocumento(value);
//   };

//   const handleNombresChange = (value) => {
//     setNombres(value);
//   };

//   const handleDireccionChange = (value) => {
//     setDireccion(value);
//   };

//   const handleTelefonoChange = (value) => {
//     setTelefono(value);
//   };

//   const handleCorreoChange = (value) => {
//     setCorreo(value);
//   };

//   const handleContraseñaChange = (value) => {
//     const contraseña = value;

//     if (contraseña.length <= 8) {
//       setContraseña(contraseña);
//     } else {
//       Alert.alert('Contraseña inválida', 'La contraseña no puede tener más de 8 caracteres.');
//     }
//   };

//   const handleRolChange = (value) => {
//     setRol(value);
//   };

//   const opcionesTipoDocumento = [
//     { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
//     { value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' },
//     { value: 'Cédula de extranjería', label: 'Cédula de extranjería' },
//     // Add more options as needed
//   ];

//   const handleLoginClick = () => {
//     // Handle navigation to the login screen
//     navigation.navigate('LoginScreen');
//   };

//   const handleSubmit = async () => {

//     if (
//       tipoDocumento === '' ||
//       numeroDocumento === '' ||
//       nombres === '' ||
//       direccion === '' ||
//       telefono === '' ||
//       correo === '' ||
//       contraseña === '' ||
//       rol === ''
//     ) {
//       Dialog.show({
//         type: ALERT_TYPE.DANGER,
//         title: 'Campos vacíos',
//         textBody: 'Por favor, completa todos los campos del formulario.',
//         button: 'Cerrar',
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(correo)) {
//       Dialog.show({
//         type: ALERT_TYPE.DANGER,
//         title: "ERROR",
//         textBody: "Correo no valido",
//         button: "Close",
//       });
//       return;
//     }

//     let apiEndpoint = '';
//     let datosFormulario = {};

//     if (rol === 'Administrador') {
//       apiEndpoint = 'https://freshsmile.azurewebsites.net/FreshSmile/CrearAdministradores';
//       datosFormulario = {
//         tipo_documento_uadministrador: tipoDocumento,
//         numero_documento_uadministrador: numeroDocumento,
//         nombres_uadministrador: nombres,
//         direccion_uadministrador: direccion,
//         telefono_uadministrador: telefono,
//         correo: correo,
//         contraseña: contraseña,
//       };
//     } else if (rol === 'Paciente') {
//       apiEndpoint = 'https://freshsmile.azurewebsites.net/FreshSmile/CrearPacientes';
//       datosFormulario = {
//         tipo_documento_paciente: tipoDocumento,
//         numero_documento_paciente: numeroDocumento,
//         nombres_paciente: nombres,
//         direccion_paciente: direccion,
//         telefono_paciente: telefono,
//         correo: correo,
//         contraseña: contraseña,
//       };
//     }

//     try {
//       const response = await fetch(apiEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(datosFormulario),
//       });

//       if (response.ok) {
//         Alert.alert('Registro exitoso', '¡Se ha registrado correctamente!', [
//           { text: 'OK', onPress: resetFormAndNavigateToLogin },
//         ]);
//       } else {
//         Alert.alert('Error en el registro', 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
//       }
//     } catch (error) {
//       Alert.alert('Error en el registro', 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
//       console.error(error);
//     }
//   };

//   const resetFormAndNavigateToLogin = () => {
//     setTipoDocumento('');
//     setNumeroDocumento('');
//     setNombres('');
//     setApellidos('');
//     setDireccion('');
//     setTelefono('');
//     setCorreo('');
//     setContraseña('');
//     setRol('');
//     // Handle navigation to the login screen
//     navigation.navigate('LoginScreen');
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
//         <AlertNotificationRoot>
//           <View style={styles.container}>
//             <Text style={styles.titlePrincipal}>REGISTRO</Text>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Tipo de documento</Text>
//               <View style={styles.inputContainer}>
//                 <Picker
//                   selectedValue={tipoDocumento}
//                   onValueChange={handleTipoDocumentoChange}
//                   style={styles.input}
//                 >
//                   <Picker.Item label="Seleccione un tipo de documento" value="" />
//                   {opcionesTipoDocumento.map((opcion) => (
//                     <Picker.Item
//                       key={opcion.value}
//                       label={opcion.label}
//                       value={opcion.value}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Número de documento</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="address-card" size={24} style={styles.icon} />
//                 <TextInput
//                   value={numeroDocumento}
//                   placeholder="Ingrese su número de documento"
//                   onChangeText={handleNumeroDocumentoChange}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   required
//                 />
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Nombres</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="user" size={24} style={styles.icon} />
//                 <TextInput
//                   value={nombres}
//                   placeholder="Ingrese sus nombres"
//                   onChangeText={handleNombresChange}
//                   style={styles.input}
//                   required
//                 />
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Dirección</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="building" size={24} style={styles.icon} />
//                 <TextInput
//                   value={direccion}
//                   placeholder="Ingrese su dirección"
//                   onChangeText={handleDireccionChange}
//                   style={styles.input}
//                   required
//                 />
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Teléfono</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="mobile-alt" size={24} style={styles.icon} />
//                 <TextInput
//                   value={telefono}
//                   placeholder="Ingrese su número de teléfono"
//                   onChangeText={handleTelefonoChange}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   required
//                 />
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Correo electrónico</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="envelope" size={24} style={styles.icon} />
//                 <TextInput
//                   value={correo}
//                   placeholder="Ingrese su correo electrónico"
//                   onChangeText={handleCorreoChange}
//                   style={styles.input}
//                   keyboardType="email-address"
//                   required
//                 />
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Contraseña</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="lock" size={24} style={styles.icon} />
//                 <TextInput
//                   value={contraseña}
//                   placeholder="Ingrese su contraseña"
//                   onChangeText={handleContraseñaChange}
//                   style={styles.input}
//                   secureTextEntry={!showPassword}
//                   required
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                   style={styles.eyeIconContainer}
//                 >
//                   <Icon
//                     name={showPassword ? 'eye-slash' : 'eye'}
//                     size={24}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Tipo de Rol</Text>
//               <View style={styles.inputContainer}>
//                 <Picker
//                   selectedValue={rol}
//                   onValueChange={handleRolChange}
//                   style={styles.input}
//                 >
//                   <Picker.Item label="Seleccione su rol" value="" />
//                   <Picker.Item label="Administrador" value="Administrador" />
//                   <Picker.Item label="Paciente" value="Paciente" />
//                 </Picker>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={handleSubmit}
//               style={styles.button}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.title}>Registrarme</Text>
//             </TouchableOpacity>

//             <View style={styles.loginLink}>
//               <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>

//               <TouchableOpacity
//                 onPress={handleLoginClick}
//                 style={styles.button2}
//                 activeOpacity={0.7}
//               >
//                 <Text style={styles.title2}>Iniciar sesión</Text>
//               </TouchableOpacity>

//             </View>
//           </View>
//         </AlertNotificationRoot>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   titlePrincipal: {
//     color: "#4fafd2",
//     fontWeight: "bold",
//     fontSize: 30,
//     marginBottom: 20,
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   formGroup: {
//     marginBottom: 5,
//   },
//   label: {
//     marginBottom: 5,
//     fontWeight: "bold",
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: 'gray',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },
//   icon: {
//     marginRight: 10,
//     color: 'black',
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 10,
//   },
//   loginLink: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   loginText: {
//     marginRight: 5,
//   },
//   button: {
//     height: 50,
//     width: "50%",
//     backgroundColor: "#249bad",
//     marginTop: 10,
//     marginBottom: 10,
//     alignSelf: 'center',
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 15,
//   },
//   button2: {
//     height: 40,
//     alignSelf: 'center',
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 15,
//   },
//   title: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   title2: {
//     color: "#249bad",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   eyeIconContainer: {
//     position: 'absolute',
//     right: 10,
//   },
// });

// export default RegistrationScreen;


import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
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
  const [nombrescompletos, setNombrescompletos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [procedimientos, setProcedimientos] = useState([]);
  const [especialidad, setEspecialidad] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleTipoDocumentoChange = (value) => {
    setTipoDocumento(value);
  };

  const handleNumeroDocumentoChange = (value) => {
    if (/^\d*$/.test(value)) {
      setNumeroDocumento(value);
    }
  };

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los procedimientos
    fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos')
      .then(response => response.json())
      .then(data => {
        // Guardar los procedimientos en el estado
        setProcedimientos(data);
      })
      .catch(error => {
        // Manejar el error en caso de que la solicitud falle
        console.error('Error al obtener los procedimientos:', error);
      });
  }, []);

  const handleNombresChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNombrescompletos(value);
    }
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
      // Mostrar el mensaje de error utilizando una librería adecuada para la interfaz de usuario en React Native
      console.log('La contraseña no puede tener más de 8 caracteres.');
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCodigo('');
  };

  const handleCodigoChange = (value) => {
    setCodigo(value);
  };

  const handleEspecialidadChange = (value) => {
    setEspecialidad(value);
  };

  const handleRolChange = (value) => {
    setRol(value);
    if (value === 'Especialista') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const opcionesTipoDocumento = [
    { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
    { value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' },
    { value: 'Cédula de extranjería', label: 'Cédula de extranjería' },
    // Add more options as needed
  ];

  const handleLoginClick = () => {
    // Navegar a la pantalla de login
    navigation.navigate('LoginScreen');
  };

  const validarCodigo = async () => {
    try {
      const response = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCodigo');
      const codigos = await response.json();
      const codigoValido = codigos.some((obj) => obj.codigo === codigo);

      return codigoValido;
    } catch (error) {
      console.error('Error al validar el código:', error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
      throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
    }
  };

  const validarCorreo = async (correo, rol) => {
    let apiEndpoint = '';

    if (rol === 'Especialista') {
      apiEndpoint =
        'https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarEspecialista';
    } else if (rol === 'Paciente') {
      apiEndpoint =
        'https://freshsmile.azurewebsites.net/FreshSmile/ConsultarPacientes';
    }

    try {
      const response = await fetch(apiEndpoint);
      const usuarios = await response.json();
      const correoRegistrado = usuarios.some(
        (usuario) => usuario.correo === correo
      );
      return correoRegistrado;
    } catch (error) {
      console.error('Error al validar el correo:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      // Mostrar el mensaje de error utilizando una librería adecuada para la interfaz de usuario en React Native
      console.log('La dirección de correo electrónico no es válida.');
      return;
    }

    let apiEndpoint = '';
    let datosFormulario = {};

    if (rol === 'Especialista') {
      const codigoValido = await validarCodigo();

      if (!codigoValido) {
        // Mostrar el mensaje de error utilizando una librería adecuada para la interfaz de usuario en React Native
        console.log('El código ingresado no es válido.');
        return;
      }

      apiEndpoint =
        'https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/CrearEspecialista';
      datosFormulario = {
        identificacion_especialista: numeroDocumento,
        tipo_documento: tipoDocumento,
        nombre_completo: nombrescompletos,
        telefono: telefono,
        direccion: direccion,
        especialidad: especialidad,
        correo: correo,
        contraseña: contraseña,
      };
    } else if (rol === 'Paciente') {
      apiEndpoint =
        'https://freshsmile.azurewebsites.net/FreshSmile/CrearPacientes';
      datosFormulario = {
        identificacion_paciente: numeroDocumento,
        tipo_documento: tipoDocumento,
        nombre_completo: nombrescompletos,
        direccion: direccion,
        telefono: telefono,
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
        // Mostrar el mensaje de éxito utilizando una librería adecuada para la interfaz de usuario en React Native
        console.log('¡Se ha registrado correctamente!');
        Alert.alert('Registro exitoso', '¡Se ha registrado correctamente!');
        // Resetear los valores de los campos
        setTipoDocumento('');
        setNumeroDocumento('');
        setNombrescompletos('');
        setDireccion('');
        setTelefono('');
        setEspecialidad('');
        setCorreo('');
        setContraseña('');
        setRol('');
        setCodigo('');
        navigation.navigate('LoginScreen');
      } else {
        // Mostrar el mensaje de error utilizando una librería adecuada para la interfaz de usuario en React Native
        console.log(
          'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.'
        );
      }
    } catch (error) {
      // Mostrar el mensaje de error utilizando una librería adecuada para la interfaz de usuario en React Native
      console.log(
        'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.'
      );
      console.error(error);
    }
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
              <Text style={styles.label}>Nombre completo</Text>
              <View style={styles.inputContainer}>
                <Icon name="user" size={24} style={styles.icon} />
                <TextInput
                  value={nombrescompletos}
                  placeholder="Ingrese su nombre completo"
                  onChangeText={handleNombresChange}
                  style={styles.input}
                  required
                />
              </View>
            </View>

            {rol === 'Especialista' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Especialidad</Text>
                <View style={styles.inputContainer}>
                  <Picker
                    selectedValue={especialidad}
                    onValueChange={handleEspecialidadChange}
                    style={styles.input}
                  >
                    <Picker.Item label="Seleccionar especialidad" value="" />
                    {procedimientos.map((procedimiento) => (
                      <Picker.Item
                        key={procedimiento.value}
                        label={procedimiento.label}
                        value={procedimiento.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

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
              <Text style={styles.label}>Rol</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={rol}
                  onValueChange={handleRolChange}
                  style={styles.input}
                >
                  <Picker.Item label="Seleccione su rol" value="" />
                  <Picker.Item label="Especialista" value="Especialista" />
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
          {rol === 'Especialista' && (
            <Modal
              visible={showModal}
              onRequestClose={handleCloseModal}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Ingresar código</Text>
                <View style={styles.inputContainer}>
                  <Icon name="code" size={24} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={codigo}
                    onChangeText={handleCodigoChange}
                    placeholder="Ingrese el código"
                  />
                </View>
                <View style={styles.modalButtonContainer}>
                  <View style={styles.modalButtonContainer2}>
                    <TouchableOpacity style={styles.buttonModal} onPress={handleCloseModal}>
                      <Text style={styles.buttonTextModal}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalButtonContainer2}>
                    <TouchableOpacity style={styles.buttonModal} onPress={handleSubmit}>
                      <Text style={styles.buttonTextModal}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </Modal>
          )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButtonContainer2: {
    marginHorizontal: 10,
  },
  buttonModal: {
    backgroundColor: '#249bad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextModal: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegistrationScreen;