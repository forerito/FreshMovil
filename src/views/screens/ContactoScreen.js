// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity, TextInput, ImageBackground, ScrollView, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import Header from "./Header";

// const ContactoScreen = ({ navigation }) => {

//   const [menuOpen, setMenuOpen] = useState(false);

//   const handlePress = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleClose = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <SafeAreaView className="flex-1 " style={{ backgroundColor: "white" }}>
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

//         <Header />

//         <View style={{ backgroundColor: "black", marginLeft: 5, marginRight: 5 }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 340, marginTop: -43 }}>
//             <TouchableOpacity onPress={handlePress}>
//               <Icon name="bars" size={24} color="#5FFDFF" />
//             </TouchableOpacity>
//           </View>

//           {menuOpen && (
//             <View style={{ marginTop: 8 }}>
//               <TouchableOpacity onPress={handleClose}>
//                 <View style={styles.contentMenuCerrar}>
//                   <Icon name="window-close" size={24} color="white" />
//                   <Text style={{ marginLeft: 8, color: 'white' }}>Cerrar</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="home" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Inicio</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("NosotrosScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="users" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Nosotros</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("ProcedimientosScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="tooth" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Procedimientos</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="comments" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Contacto</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         <ImageBackground
//           source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465034/fondo_v946ct.png" }}
//           resizeMode={"cover"}
//           style={styles.fondoContainer}
//         >
//           <View style={styles.container}>
//             <View style={styles.background}>
//               <View style={styles.contentContainer}>
//                 <Text style={styles.title}>Contáctanos</Text>
//                 <Text style={styles.text}>
//                   Te brindamos nuestros servicios. Ponte en contacto con
//                   nosotros para obtener una sonrisa más saludable y hermosa.
//                 </Text>

//                 <View style={styles.containerDatos}>
//                   <View style={styles.containerContacto}>
//                     <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465029/icono-direcci%C3%B3n_hla3rj.png" }} style={styles.imageContacto1} />
//                     <View style={styles.textContainerContacto}>
//                       <Text style={styles.titleContacto}>Dirección</Text>
//                       <Text style={styles.paragraphContacto}>
//                         Sede Norte calle 6 N #16A-54 Edificio torre Valparaiso.
//                         Local 2 profesionales.
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={styles.containerContacto}>
//                     <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465032/icono-llamada_kpkv37.png" }} style={styles.imageContacto} />
//                     <View style={styles.textContainerContacto}>
//                       <Text style={styles.titleContacto}>Teléfono</Text>
//                       <Text style={styles.paragraphContacto}>3103594986</Text>
//                     </View>
//                   </View>

//                   <View style={styles.containerContacto}>
//                     <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465031/icono-email_egregl.png" }} style={styles.imageContacto} />
//                     <View style={styles.textContainerContacto}>
//                       <Text style={styles.titleContacto}>
//                         Correo electrónico
//                       </Text>
//                       <Text style={styles.paragraphContacto}>
//                         freshsmilecmills@gmail.com
//                       </Text>
//                     </View>
//                   </View>
//                 </View>

//                 <View style={styles.formContainer}>
//                   <Text style={styles.formTitle}>
//                     Te brindamos los mejores servicios
//                   </Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Nombre completo"
//                   />
//                   <TextInput style={styles.input} placeholder="Teléfono" />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Correo electrónico"
//                   />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Motivo del mensaje"
//                   />

//                   <View style={styles.containerButton}>
//                     <TouchableOpacity
//                       style={styles.button}
//                     >
//                       <Text style={styles.buttonText}>Enviar</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <Text style={styles.paragraph}>
//                     Si desea solicitar más información, por favor contáctenos.
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   contentMenuCerrar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 300,
//     marginBottom: 5,
//   },
//   contentMenuItems: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'black',
//     padding: 10,
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   contentMenuText: {
//     marginLeft: 8,
//     color: 'white',
//     fontSize: 16,
//   },
//   fondoContainer: {
//     width: '100%',
//     alignItems: "center",
//     marginTop: 0,
//     opacity: 0.9,
//   },
//   contentContainer: {
//     padding: 10,
//     marginLeft: -10,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "white",
//     marginLeft: 10,
//   },
//   text: {
//     marginBottom: 10,
//     color: "white",
//     marginLeft: 10,
//     marginRight: 30,
//   },
//   imageContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   imageItem: {
//     alignItems: "center",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginBottom: 5,
//   },
//   imageTitle: {
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   imageText: {
//     marginBottom: 5,
//   },
//   formContainer: {
//     marginTop: 15,
//     marginLeft: 5,
//     marginRight: 5,
//     width: "100%",
//     padding: 15,
//     backgroundColor: "lightgray",
//   },
//   formTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   input: {
//     justifyContent: 'flex-end',
//     flexDirection: 'column',
//     marginBottom: 5,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//     padding: 5,
//     backgroundColor: "white",
//     opacity: 0.8,
//   },
//   paragraph: {
//     fontSize: 15,
//     textAlign: "center",
//   },
//   containerContacto: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     margin: 5,
//   },
//   containerText: {
//     width: "100%",
//   },
//   containerDatos: {
//     backgroundColor: "lightwhite",
//     marginLeft: 15,
//     width: "100%",
//   },
//   imageContacto1: {
//     width: 50,
//     height: 65,
//     marginLeft: 10,
//   },
//   imageContacto: {
//     width: 50,
//     height: 50,
//     marginLeft: 10,
//   },
//   textContainerContacto: {
//     marginLeft: 20,
//   },
//   titleContacto: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#5FFDFF",
//   },
//   paragraphContacto: {
//     width: 290,
//     color: 'white',
//   },
//   containerButton: {
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#249bad",
//     padding: 10,
//     borderRadius: 30,
//     margin: 10,
//     width: 120,
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//   },
// });

// export default ContactoScreen;

import React, { useState } from 'react';
import { View, TextInput, Button, Linking } from 'react-native';

const ContactoScreen = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSendEmail = () => {
    if (!nombre || !telefono || !correo || !motivo) {
      // Mostrar alerta de campos incompletos
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Construir el cuerpo del correo electrónico
    const subject = encodeURIComponent('Me gustaría comunicarme con ustedes Fresh Smile Cmills');
    const body = encodeURIComponent(`
      Mi nombre es : ${nombre}
      Mi número de contacto: ${telefono}
      El motivo de mi mensaje es : ${motivo}
    `);

    const mailtoLink = `mailto:freshsmilecmills@gmail.com?subject=${subject}&body=${body}`;

    // Abrir la aplicación de correo electrónico
    Linking.openURL(mailtoLink).catch(() => {
      alert('No se pudo abrir la aplicación de correo electrónico.');
    });

    // Limpia los campos del formulario
    setNombre('');
    setTelefono('');
    setCorreo('');
    setMotivo('');
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        placeholder="Motivo"
        value={motivo}
        onChangeText={setMotivo}
      />
      <Button
        title="Enviar"
        onPress={handleSendEmail}
      />
    </View>
  );
};

export default ContactoScreen;