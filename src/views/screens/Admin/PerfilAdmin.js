// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { View, Text, TextInput, TouchableOpacity, Image, Alert, Button, ScrollView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const PerfilAdmin = () => {
//   const [Documento, setTipoDocumento] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [Telefono, setTelefono] = useState("");
//   const [Direccion, setDireccion] = useState("");
//   const [Especialidad, setEspecialidad] = useState("");
//   const [Descripcion, setDescripcion] = useState("");
//   const [estado, setEstado] = useState("");
//   const [Correo, setCorreo] = useState("");
//   const [Contraseña, setContraseña] = useState("");
//   const [fechaRegistro, setFechaRegistro] = useState("");
//   const [especialista, setEspecialista] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [identificacionEspecialista, setIdentificacionEspecialista] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userId = await AsyncStorage.getItem("userId");

//         const response = await axios.get(
//           `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${userId}`
//         );
//         setEspecialista(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       setTipoDocumento(especialista.tipo_documento);
//       setNombre(especialista.nombre_completo);
//       setTelefono(especialista.telefono);
//       setDireccion(especialista.direccion);
//       setEspecialidad(especialista.especialidad);
//       setCorreo(especialista.correo);
//       setContraseña(especialista.contraseña);
//       setFechaRegistro(especialista.fecha_registro);
//       setDescripcion(especialista.descripcion);
//       setEstado(especialista.estado);
//       setIdentificacionEspecialista(especialista.identificacion_especialista);
//     }
//   }, [loading, especialista]);

//   const formattedFechaRegistro = moment(fechaRegistro).format(
//     "DD/MM/YYYY HH:mm:ss"
//   );

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSaveButtonClick = async () => {
//     try {
//       const datosEspecialista = {
//         tipo_documento: Documento,
//         identificacion_especialista: identificacionEspecialista,
//         nombre_completo: nombre,
//         telefono: Telefono,
//         direccion: Direccion,
//         especialidad: Especialidad,
//         descripcion: Descripcion,
//         correo: Correo,
//         contraseña: Contraseña,
//       };

//       const accessToken = await AsyncStorage.getItem("accessToken");

//       const config = {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       };

//       await axios.put(
//         "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ModificarEspecialista",
//         datosEspecialista,
//         config
//       );

//       setEditMode(false);
//       setLoading(true);
//       // Cambiar la alerta por una que funcione en React Native
//       Alert.alert("¡Éxito! Datos modificados con éxito");
//     } catch (error) {
//       console.error(error.response);
//       // Cambiar la alerta por una que funcione en React Native
//       Alert.alert("¡Error! Ocurrió un error al modificar los datos");
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 ">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
//         <View>
//           <View style={styles.containerUsuario}>
//             <View style={styles.tarjetaPerfilU}>
//               <Image
//                 style={styles.imagePerfilUsuario}
//                 source={{
//                   uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1686197632/usuario_fitvn6.png",
//                 }}
//                 alt="Inicio"
//               />
//               <Text style={styles.perfilTitulo}>Mi Perfil</Text>
//               <Text style={styles.perfilInfo}>freshSmileCmills</Text>
//               <Text style={styles.perfilInfo}>Revisa tu perfil</Text>
//               {editMode ? (
//                 <Button
//                   title="Guardar"
//                   onPress={handleSaveButtonClick}
//                   style={styles.guardarBoton}
//                 />
//               ) : (
//                 <Button
//                   title="Editar"
//                   onPress={() => setEditMode(true)}
//                   style={styles.editarBoton}
//                 />
//               )}
//             </View>
//             <View style={styles.bannerPrincipalAd}>
//               <Text style={styles.tituloBanner}>¡Bienvenido A Tu Perfil!</Text>
//             </View>
//           </View>

//           <View style={styles.perfilTabla}>
//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Tipo de documento:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={Documento}
//                 onChangeText={setTipoDocumento}
//                 editable={false}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>
//                 Identificación del Especialista:
//               </Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={identificacionEspecialista.toString()}
//                 onChangeText={setIdentificacionEspecialista}
//                 editable={editMode}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Nombre:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={nombre}
//                 onChangeText={setNombre}
//                 editable={editMode}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Teléfono:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={Telefono}
//                 onChangeText={setTelefono}
//                 editable={editMode}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Dirección:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={Direccion}
//                 onChangeText={setDireccion}
//                 editable={editMode}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Especialidad:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={Especialidad}
//                 onChangeText={setEspecialidad}
//                 editable={editMode}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Correo:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={Correo}
//                 onChangeText={setCorreo}
//                 editable={editMode}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Contraseña:</Text>
//               <View style={styles.passwordInputContainer}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   secureTextEntry={!showPassword}
//                   value={Contraseña}
//                   onChangeText={setContraseña}
//                   editable={editMode}
//                 />
//                 <TouchableOpacity onPress={togglePasswordVisibility}>
//                   <Icon
//                     name={showPassword ? "eye-slash" : "eye"}
//                     style={styles.passwordToggleIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Fecha de registro:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={formattedFechaRegistro}
//                 onChangeText={setFechaRegistro}
//                 editable={false}
//               />
//             </View>

//             <View style={styles.perfilRow}>
//               <Text style={styles.perfilDescripcion}>Estado:</Text>
//               <TextInput
//                 style={styles.perfilValor}
//                 value={estado}
//                 onChangeText={setEstado}
//                 editable={false}
//               />
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = ({

// });

// export default PerfilAdmin;




import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Button, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Header";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const PerfilAdmin = () => {
  const [Documento, setTipoDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Especialidad, setEspecialidad] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [especialista, setEspecialista] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [identificacionEspecialista, setIdentificacionEspecialista] = useState("");



  const images = [
    "https://img.freepik.com/free-vector/cute-girl-gaming-holding-joystick-with-hand-peace-cartoon-icon-illustration-people-technology-icon-concept-isolated-flat-cartoon-style_138676-2168.jpg?w=740&t=st=1686703355~exp=1686703955~hmac=c2666eef056d68fb3cf25e50dd516cec520f2ea66bcee38aff1dea8a3fd481ab",
    "https://img.freepik.com/free-vector/cute-gorilla-playing-game-virtual-reality-with-joystick-cartoon-vector-icon-illustration-animal_138676-6743.jpg?w=740&t=st=1686703668~exp=1686704268~hmac=f7c14344a573bfbc51293a459eea06f80ae7c48c82f168e79cbec4aa495439f9",
    "https://i.pinimg.com/564x/63/52/77/6352774cefd5f7d2450b120c2af1bcaa.jpg",
    "https://img.freepik.com/free-vector/cute-astronaut-with-rocket-bag-cartoon-vector-icon-illustration-technology-education-icon-isolated_138676-5828.jpg?w=740&t=st=1686703712~exp=1686704312~hmac=46d2c66efedb34251d87a12eb587577e6985622760112de67d666370e7bd16d9",
    "https://img.freepik.com/free-psd/samurai-online-video-games-3d-illustration_1419-2618.jpg?w=740&t=st=1686703405~exp=1686704005~hmac=b7d72099acf8b34e8e3e2bfb075bd9d0b7a357db5d9b3ef26490de684898cbe5",
  ];

  const [assignedImage, setAssignedImage] = useState(null);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const fetchAssignedImage = async () => {
    try {
      let storedImage = await AsyncStorage.getItem('assignedImage');
      if (!storedImage) {
        storedImage = getRandomImage();
        await AsyncStorage.setItem('assignedImage', storedImage);
      }
      setAssignedImage(storedImage);
    } catch (error) {
      console.log('Error fetching assigned image:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.get(
          `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${userId}`
        );
        setEspecialista(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTipoDocumento(especialista.tipo_documento);
      setNombre(especialista.nombre_completo);
      setTelefono(especialista.telefono);
      setDireccion(especialista.direccion);
      setEspecialidad(especialista.especialidad);
      setCorreo(especialista.correo);
      setContraseña(especialista.contraseña);
      setFechaRegistro(especialista.fecha_registro);
      setDescripcion(especialista.descripcion);
      setEstado(especialista.estado);
      setIdentificacionEspecialista(especialista.identificacion_especialista);
    }
  }, [loading, especialista]);

  const formattedFechaRegistro = moment(fechaRegistro).format(
    "DD/MM/YYYY HH:mm:ss"
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveButtonClick = async () => {
    try {
      const datosEspecialista = {
        tipo_documento: Documento,
        identificacion_especialista: identificacionEspecialista,
        nombre_completo: nombre,
        telefono: Telefono,
        direccion: Direccion,
        especialidad: Especialidad,
        descripcion: Descripcion,
        correo: Correo,
        contraseña: Contraseña,
      };

      const accessToken = await AsyncStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.put(
        "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ModificarEspecialista",
        datosEspecialista,
        config
      );

      setEditMode(false);
      setLoading(true);
      // Cambiar la alerta por una que funcione en React Native
      // Alert.alert("¡Éxito! Datos modificados con éxito");
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "ÉXITO",
        textBody: "Datos modificados con éxito",
        button: "Cerrar",
      });
      return;
    } catch (error) {
      console.error(error.response);
      // Cambiar la alerta por una que funcione en React Native
      // Alert.alert("¡Error! Ocurrió un error al modificar los datos");
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "ERROR",
        textBody: "Ocurrió un error al modificar los datos",
        button: "Cerrar",
      });
      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AlertNotificationRoot>

          <Header />

          <View>
            {/* <View style={styles.bannerPrincipalAd}>
              <Text style={styles.tituloBanner}>¡Bienvenido a tu perfil!</Text>
            </View> */}
            <View style={styles.containerUsuario}>
              <View style={styles.tarjetaPerfilU}>
                <Image
                  style={styles.imagePerfilUsuario}
                  source={{ uri: assignedImage }}
                />
                <View style={{ flex: 1, marginLeft: 10, marginTop: 10 }}>
                  <Text style={styles.perfilTitulo}>Mi Perfil</Text>
                  <Text style={styles.perfilInfo}>Revisa tu perfil</Text>
                  {editMode ? (
                    <TouchableOpacity
                      onPress={handleSaveButtonClick}
                      style={[styles.guardarBotonContainer, { flex: 1 }]}
                    >

                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Guardar</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setEditMode(true)}
                      style={[styles.editarBotonContainer, { flex: 1 }]}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Editar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.perfilTabla}>
              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Tipo de documento:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={Documento}
                  onChangeText={setTipoDocumento}
                  editable={false}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>
                  Identificación del Especialista:
                </Text>
                <TextInput
                  style={styles.perfilValor}
                  value={identificacionEspecialista.toString()}
                  onChangeText={setIdentificacionEspecialista}
                  editable={editMode}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Nombre:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={nombre}
                  onChangeText={setNombre}
                  editable={editMode}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Teléfono:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={Telefono}
                  onChangeText={setTelefono}
                  editable={editMode}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Dirección:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={Direccion}
                  onChangeText={setDireccion}
                  editable={editMode}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Especialidad:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={Especialidad}
                  onChangeText={setEspecialidad}
                  editable={editMode}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Correo:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={Correo}
                  onChangeText={setCorreo}
                  editable={editMode}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Contraseña:</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                    value={Contraseña}
                    onChangeText={setContraseña}
                    editable={editMode}
                  />
                  <View>

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        name={showPassword ? 'eye-slash' : 'eye'}
                        size={24}
                        style={styles.passwordToggleIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Fecha de registro:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={formattedFechaRegistro}
                  onChangeText={setFechaRegistro}
                  editable={false}
                />
              </View>

              <View style={styles.perfilRow}>
                <Text style={styles.perfilDescripcion}>Estado:</Text>
                <TextInput
                  style={styles.perfilValor}
                  value={estado}
                  onChangeText={setEstado}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </AlertNotificationRoot>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tarjetaPerfilU: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  imagePerfilUsuario: {
    marginTop: -20,
    width: 90,
    height: 90,
    borderRadius: 25,
  },
  perfilTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  perfilInfo: {
    fontSize: 16,
    marginBottom: 3,
  },
  guardarBotonContainer: {
    // flex: 1,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#249bad',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  guardarBoton: {
    // flex: 1,
  },
  editarBotonContainer: {
    // flex: 1,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#8fccd6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  editarBoton: {
    // flex: 1,
  },
  bannerPrincipalAd: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  tituloBanner: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  perfilTabla: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
  },
  perfilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  perfilDescripcion: {
    width: 150,
    textAlign: 'center',
    marginRight: 10,
    fontWeight: 'bold',
  },
  perfilValor: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    padding: 10,
    width: '77%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
  },
  passwordToggleIcon: {
    position: 'absolute',
    right: 10,
    marginTop: -13,
  },
});

export default PerfilAdmin;