// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import {
//   ALERT_TYPE,
//   Dialog,
//   AlertNotificationRoot,
//   Toast,
// } from "react-native-alert-notification";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const LoginScreen = ({ navigation, setRol }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const handleRegisterClick = () => {
//     // Handle navigation to the login screen
//     navigation.navigate('RegistrationScreen');
//   };

//   const handleSubmit = async () => {
//     try {
//       let url;
//       if (role === "paciente") {
//         url = "https://freshsmile.azurewebsites.net/login/paciente";
//       } else if (role === "especialista") {
//         url = "https://freshsmile.azurewebsites.net/login/especialista";
//       } else {
//         throw new Error("Rol no válido");
//       }

//       const response = await axios.post(url, { email, password });

//       if (response.status === 200) {

//         const { id, token } = response.data;

//         Alert.alert("Inicio de sesión exitoso");

//         console.log("accessToken", token);
//         console.log("loggedIn", "true");
//         console.log("rol", role);
//         console.log("userId", id);

//         if (role === "paciente") {
//           navigation.navigate("HomeScreenPaciente");
//         } else if (role === "especialista") {
//           navigation.navigate("HomeEspecialista");
//         }
//       } else {
//         throw new Error(errorData.message);
//       }
//     } catch (error) {
//       Alert.alert("Error:", error.message);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
//     <AlertNotificationRoot>
//         <View style={styles.container}>
//           <Text style={styles.titlePrincipal}>INICIAR SESIÓN</Text>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Correo</Text>
//             <View style={styles.inputContainer}>
//               <Icon name="envelope" size={24} style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Ingrese su correo electrónico"
//                 value={email}
//                 onChangeText={(text) => setEmail(text)}
//               />
//             </View>
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Contraseña</Text>
//             <View style={styles.inputContainer}>
//               <Icon name="lock" size={24} style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Ingrese su contraseña"
//                 value={password}
//                 onChangeText={(text) => setPassword(text)}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIconContainer}
//               >
//                 <Icon
//                   name={showPassword ? 'eye-slash' : 'eye'}
//                   size={24}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Rol</Text>
//             <View style={styles.inputContainer}>
//               <Picker
//                 selectedValue={role}
//                 style={styles.input}
//                 onValueChange={(value) => setRole(value)}
//               >

//                 <Picker.Item label="Seleccione un rol" value="" />
//                 <Picker.Item label="Paciente" value="paciente" />
//                 <Picker.Item label="especialista" value="especialista" />
//               </Picker>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={handleSubmit}
//             style={styles.button}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.title}>Iniciar sesión</Text>
//           </TouchableOpacity>

//           <View style={styles.loginLink}>
//             <Text style={styles.loginText}>¿Aún no tienes una cuenta?</Text>

//             <TouchableOpacity
//               onPress={handleRegisterClick}
//               style={styles.button2}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.title2}>Registrate</Text>
//             </TouchableOpacity>

//           </View>

//         </View>
//     </AlertNotificationRoot>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = {
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
//   loginLink: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   loginText: {
//     marginRight: 5,
//   },
//   button2: {
//     height: 40,
//     alignSelf: 'center',
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 15,
//   },
// };


import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const LoginScreen = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  // const [modalText, setModalText] = useState("");
  // const [modalType, setModalType] = useState("success");

  // const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (modalType === "success") {
  //     setTimeout(() => {
  //       setModalText("");
  //       setModalType("");
  //     }, 5000);
  //   }
  // }, [modalType]);

  // const handleRegisterClick = () => {
  //   // Handle navigation to the login screen
  //   navigation.navigate('RegistrationScreen');
  // };

  // const handleSubmit = async () => {

  //   try {
  //     let url;
  //     if (role === "paciente") {
  //       url = "https://freshsmile.azurewebsites.net/login/paciente";
  //     } else if (role === "especialista") {
  //       url = "https://freshsmile.azurewebsites.net/login/especialista";
  //     } else {
  //       throw new Error("Rol no válido");
  //     }

  //     const response = await axios.post(url, { email, password });


  //     if (response.status === 200) {
  //       const { id, token } = response.data;
  //       setModalText(response.data.message);

  //       // Alert.alert("Inicio de sesión exitoso");
  //       Alert.alert(
  //         'ÉXITO',
  //         'Inicio de sesión exitoso',
  //         [
  //           {
  //             text: 'Cerrar',
  //             onPress: () => {
  //               if (role === 'paciente') {
  //                 navigation.navigate('HomeScreen');
  //               } else if (role === 'especialista') {
  //                 navigation.navigate('HomeEspecialista');
  //               }
  //             },
  //           },
  //         ],
  //         { type: 'success' } // Puedes personalizar el tipo de alerta dependiendo de la biblioteca que utilices
  //       );

  //       await AsyncStorage.setItem("accessToken", token);
  //       await AsyncStorage.setItem("loggedIn", "true");
  //       await AsyncStorage.setItem("rol", role);
  //       // await AsyncStorage.setItem("userId", id);
  //       await AsyncStorage.setItem("userId", JSON.stringify(id));

  //       console.log("accessToken", token);
  //       console.log("loggedIn", "true");
  //       console.log("rol", role);
  //       console.log("userId", id);



  //     } else {
  //       const errorData = response.data;
  //       throw new Error(errorData.message);
  //     }
  //   } catch (error) {
  //     setModalText(error.message);
  //     setModalType("error");
  //   }
  // };



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => {
    navigation.navigate('RegistrationScreen');
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let url;
      if (role === "paciente") {
        url = "https://freshsmile.azurewebsites.net/login/paciente";
      } else if (role === "especialista") {
        url = "https://freshsmile.azurewebsites.net/login/especialista";
      } else {
        throw new Error("Rol no válido");
      }

      const response = await axios.post(url, { email, password });

      setLoading(false);

      if (response.status === 200) {
        const { id, token } = response.data;

        Alert.alert("EXITO", "Inicio de sesión exitoso");

        navigation.navigate("HomeScreen");
        await AsyncStorage.setItem("accessToken", token);
        await AsyncStorage.setItem("loggedIn", "true");
        await AsyncStorage.setItem("rol", role);
        await AsyncStorage.setItem("userId", id);
      } else {
        const errorData = response.data;
        throw new Error(errorData.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
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
                  <Picker.Item label="especialista" value="especialista" />
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