import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import jwtDecode from "jwt-decode";
import Footer from "../layouts/Footer";
import ChatWhatsApp from "../layouts/ChatWhatsApp";
import Header from "./Header";

const HomeScreen = ({ navigation }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const logout = async () => {
    try {

      await AsyncStorage.removeItem("loggedIn");
      await AsyncStorage.removeItem("assignedImage");
      await AsyncStorage.removeItem("rol");

      console.log("Sesión cerrada")

      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 ">

      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        <View style={{ backgroundColor: "black", marginLeft: 5, marginRight: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 340, marginTop: -43 }}>
            <TouchableOpacity onPress={handlePress}>
              <Icon name="bars" size={24} color="#5FFDFF" />
            </TouchableOpacity>
          </View>

          {menuOpen && (
            <View style={{ marginTop: 8 }}>
              <TouchableOpacity onPress={handleClose}>
                <View style={styles.contentMenuCerrar}>
                  <Icon name="window-close" size={24} color="white" />
                  <Text style={{ marginLeft: 8, color: 'white' }}>Cerrar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="home" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Inicio</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("NosotrosScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="users" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Nosotros</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="tooth" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Procedimientos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Prueba")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agendar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("TablaUsuario")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="calendar-alt" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Citas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Ranking")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="trophy" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Ranking</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("DoctorCard")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-check" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Especialistas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="comments" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Contacto</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text>Contacto</Text>
              </TouchableOpacity>

              {/* <Button title='Salir' onPress={logout} /> */}


              <View style={styles.menu}>

                <TouchableOpacity style={styles.menuOption} onPress={() => navigation.navigate("PerfilUsuario")}>
                  <Icon name="user"  size={24} style={styles.menuIcon} />
                  <Text>Ver Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuOption} onPress={handleLogoutClick}>
                  <Icon name="sign-out-alt" size={24} style={styles.menuIcon} />
                  <Text>Cerrar sesión</Text>
                </TouchableOpacity>

              </View>

            </View>
          )}
        </View>

        <View style={styles.containerBanner}>
          <ImageBackground
            source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465042/banner_xdrd5m.png" }}
            resizeMode={"stretch"}
            style={styles.fondoContainer}
          >
            <View style={styles.containerHome}>
              <Text style={styles.heading}>
                ¡BIENVENIDOS A LA CLINICA FRESH SMILE CMILLS!
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("AgendarCita")}
                >
                  <Text style={styles.buttonText}>Agendar Cita</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                  onPress={() => navigation.navigate("MapaArmenia")}
                >
                  <Text style={styles.buttonText}>Buscar Clinica</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.containerBlog}>
            <Text>
              <Text style={styles.tituloBlog}>Nuestros procedimientos</Text>
            </Text>
          </View>

          {/* <View style={styles.containerProcedimientos}>
            <View style={styles.containerProcedimientos2}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1684267038/Fresh_Smile_Cmills/pexels-karolina-grabowska-6627600_rr7web.jpg' }}
                style={styles.image}
                resizeMode="stretch"
              />
              <View style={{ marginLeft: 25, marginTop: 30, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white', width: 100 }}>Limpieza dental</Text>
                <TouchableOpacity style={styles.buttonBlog2}
                  onPress={() => navigation.navigate("ProcedimientosScreen")}
                >
                  <Text style={styles.buttonTextBlog}>Leer más</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.containerProcedimientos}>
            <View style={styles.containerProcedimientos2}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1684268377/Fresh_Smile_Cmills/jonathan-borba-W9YEY6G8LVM-unsplash_qpfaed.jpg' }}
                style={styles.image}
                resizeMode="stretch"
              />
              <View style={{ marginLeft: 25, marginTop: 30, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>Endodoncia</Text>
                <TouchableOpacity style={styles.buttonBlog2}
                  onPress={() => navigation.navigate("ProcedimientosScreen")}
                >
                  <Text style={styles.buttonTextBlog}>Leer más</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}

          <View style={styles.containerProcedimientos}>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1684267038/Fresh_Smile_Cmills/pexels-karolina-grabowska-6627600_rr7web.jpg' }}
                style={styles.imagecard}
                resizeMode={'stretch'}
              />
              <TouchableOpacity style={styles.buttoncard} onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <Text style={styles.buttonTextBlog2}>Blanqueamiento dental</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerProcedimientos}>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852202/Fresh_Smile_Cmills/carillas_hbazmk.jpg' }}
                style={styles.imagecard}
                resizeMode={'stretch'}
              />
              <TouchableOpacity style={styles.buttoncard} onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <Text style={styles.buttonTextBlog2}>Diseño de sonrisa</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerProcedimientos}>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852210/Fresh_Smile_Cmills/implantes_keq38a.jpg' }}
                style={styles.imagecard}
                resizeMode={'stretch'}
              />
              <TouchableOpacity style={styles.buttoncard} onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <Text style={styles.buttonTextBlog2}>Implante dental</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerBlog}>
            <Text>
              <Text style={styles.tituloBlog}>Nuestros Especialistas</Text>
            </Text>
          </View>

          <View style={styles.specialistContainer}>
            <View style={styles.specialistCard}>
              <Image
                style={styles.specialistImage}
                resizeMode="stretch"
                source={{
                  uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1686505008/doctora1_ng31ar.jpg',
                }}
              />
              <Text style={styles.specialistName}>Karen Sanchez</Text>
            </View>

            <View style={styles.specialistCard}>
              <Image
                style={styles.specialistImage}
                resizeMode="stretch"
                source={{
                  uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1686505071/doctor4_qet252.jpg',
                }}
              />
              <Text style={styles.specialistName}>Juan González</Text>
            </View>

            <View style={styles.specialistCard}>
              <Image
                style={styles.specialistImage}
                resizeMode="stretch"
                source={{
                  uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1686505033/doctora3_x4tvyn.jpg',
                }}
              />
              <Text style={styles.specialistName}>María Rodríguez</Text>
            </View>

          </View>

          <View style={styles.containerBlog}>
            <Text>
              <Text style={styles.tituloBlog}>Sobre Nosotros</Text>
            </Text>
          </View>

          <View style={{ backgroundColor: "#d3d3d3", borderRadius: 5, marginTop: 20 }}>
            <View style={styles.itemContainerBlog}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465241/nosotros_iwn5ht.jpg" }}
                resizeMode={"stretch"}
                style={styles.imageSomos}
              />
              <View style={styles.contentBlog}>
                <Text style={styles.textSomos}>
                  Fresh Smile Cmills es una reconocida clínica de ortodoncia comprometida con ofrecer
                  soluciones de alta calidad para la salud dental de nuestros pacientes. Con una amplia
                  experiencia y conocimientos en el campo de la ortodoncia, nos hemos ganado la confianza
                  de numerosos individuos y familias que buscan mejorar su sonrisa y salud bucal.
                </Text>
                <TouchableOpacity style={styles.buttonBlog}
                  onPress={() => navigation.navigate("NosotrosScreen")}
                >
                  <Text style={styles.buttonTextBlog}>Conocer más</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        <View style={styles.footer}></View>

        <Footer />
      </ScrollView>
      <ChatWhatsApp />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentMenuCerrar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 300,
    marginBottom: 5,
  },
  contentMenuItems: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  contentMenuText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
  },
  containerBanner: {
    flex: 1,
    alignItems: "center",
    marginTop: -30,
  },
  containerHome: {
    alignItems: "center",
    padding: 5,
    marginTop: 50,
  },
  fondoContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    opacity: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    backgroundColor: 'lightgray',
    opacity: 0.8,
    borderRadius: 5,
  },
  containerProcedimientos2: {
    flexDirection: 'row',
  },
  containerUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 1,
    marginLeft: 15,
    color: 'white',
  },
  tituloSomos: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#7DC3E8",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  buttonProce: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: '90%',
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: 'center',
  },
  containerProcedimientos: {
    width: '85%',
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#D3D3D3",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  itemContainerBlog: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
    width: "90%",
  },
  imageSomos: {
    width: 170,
    height: 155,
    marginRight: 10,
    marginBottom: 50,
    borderRadius: 5,
  },
  contentBlog: {
    flex: 1,
  },
  textSomos: {
    marginTop: 8,
    marginLeft: 8,
    fontSize: 11,
    color: "black",
    textAlign: 'justify',
  },
  containerBlog: {
    marginTop: 20,
    marginBottom: 10,
    height: 60,
    width: '100%',
    backgroundColor: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  tituloBlog: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  buttonBlog2: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
    width: 100,
    textAlign: 'center',
    alignItems: "center",
  },
  buttonBlog: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 25,
    width: 130,
    textAlign: 'center',
  },
  buttonTextBlog: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
  },
  buttonTextBlog2: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    height: 200,
  },
  imagecard: {
    width: '100%',
    height: '80%',
    borderRadius: 5,
  },
  buttoncard: {
    marginTop: 5,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#249bad',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialistContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  specialistCard: {
    borderRadius: 15,
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#249bad',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  specialistImage: {
    marginTop: 10,
    marginBottom: 10,
    width: 130,
    height: 130,
    borderRadius: 75,
    marginVertical: 10,
  },
  specialistName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
    color: 'white',
  },
  specialistDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
    color: 'white',
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: '#249bad',
    padding: 10,
    borderRadius: 5,
    elevation: 4,
  },
  menuOption: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 8,
  },
  menuIcon: {
    marginRight: 10,
    color: 'black',
  },
});

export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from "react-native-safe-area-context";

// function HomeScreen({ navigation, isAuthenticated }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [avatarUrl, setAvatarUrl] = useState("");
//   const [name, setName] = useState("");

//   useEffect(() => {
//     generateAvatar();
//   }, []);

//   const generateAvatar = () => {
//     AsyncStorage.getItem("userId")
//       .then((userId) => {
//         if (!userId) {
//           console.error("No se encontró el userId en AsyncStorage");
//           // Manejar el caso en el que no se encuentre el userId, por ejemplo, redirigir al usuario a una página de inicio de sesión
//           return;
//         }

//         fetch(`https://freshsmile.azurewebsites.net/FreshSmile/BuscarPacientes/${userId}`)
//           .then((response) => response.json())
//           .then((data) => {
//             const fullName = data.nombre_completo;
//             const names = fullName.split(" ");
//             const firstName = names[0];
//             const lastName = names.length > 1 ? names[1] : "";

//             setName(`${firstName} ${lastName}`);

//             const avatarStyle = "set4";
//             const size = 600;
//             const apiUrl = `https://robohash.org/${encodeURIComponent(firstName)}?set=${avatarStyle}&size=${size}x${size}`;

//             fetch(apiUrl)
//               .then((response) => {
//                 if (!response.ok) {
//                   throw new Error("Error al obtener el avatar");
//                 }
//                 return response.blob();
//               })
//               .then((blob) => {
//                 const avatarUrl = URL.createObjectURL(blob);
//                 setAvatarUrl(avatarUrl);
//               })
//               .catch((error) => {
//                 console.error("Error al obtener el avatar:", error);
//               });
//           })
//           .catch((error) => {
//             console.error("Error al obtener los datos del paciente:", error);
//             // Manejar el error de forma adecuada, por ejemplo, mostrar una notificación de error al usuario
//           });
//       })
//       .catch((error) => {
//         console.error("Error al obtener el userId de AsyncStorage:", error);
//         // Manejar el error de forma adecuada
//       });
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogoutClick = () => {
//     logout();
//   };

//   const handleLogoClick = () => {
//     // Lógica adicional si es necesario
//   };

//   const logout = () => {
//     // Eliminar la información de inicio de sesión de AsyncStorage
//     AsyncStorage.removeItem("loggedIn");
//     AsyncStorage.removeItem("rol");

//     navigation.navigate('RegistrationScreen')

//     // Redireccionar al usuario a la página de registro
//     // Aquí debes implementar la navegación adecuada para tu aplicación en React Native
//   };

//   return (
//     <SafeAreaView className="flex-1 ">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
//         <View>
//           <View className="icono-inicio-wrapper">
//             <Text style={styles.dropdownLink} to="/Inicio" onPress={handleLogoutClick}>

//               Cerrar sesión

//             </Text>
//             <TouchableOpacity style={styles.dropdownWrapper} onPress={toggleDropdown}>
//               <View style={styles.iconContainer}>
//                 {avatarUrl ? (
//                   <View>
//                     <Image style={styles.iconoInicio} source={{ uri: avatarUrl }} alt="Avatar" />
//                   </View>
//                 ) : (
//                   <Image
//                     style={styles.iconoInicio}
//                     source={{
//                       uri:
//                         'https://res.cloudinary.com/dfvxujvf8/image/upload/v1683825569/Fresh_Smile_Cmills/icono_inicio_enxtjd.png',
//                     }}
//                     alt=""
//                   />
//                 )}
//               </View>
//               {isOpen && (
//                 <View style={styles.dropdown}>
//                   <View>
//             <TouchableOpacity style={styles.dropdownLink} to="/Inicio" onPress={handleLogoutClick}>

//                     <Text >

//                       Cerrar sesión

//                     </Text>
//             </TouchableOpacity>

//                   </View>
//                   {/* Agrega lógica adicional para mostrar otros enlaces de navegación según sea necesario */}
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = ({
// });

// export default HomeScreen;