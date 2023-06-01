import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from "../layouts/Footer";
import Button from "../components/ButtonSesion";
import ChatWhatsApp from "../layouts/ChatWhatsApp";
import Header from "./Header";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      console.log("Home Screen");
      console.log(JSON.parse(userData));
      setUserDetails(JSON.parse(userData));
    }
  };
  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );

    navigation.navigate("LoginScreen");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "white" }}>

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

              <View style={styles.containerUser}>
                <Text style={styles.text}>Bienvenido {userDetails?.fullname} </Text>
              </View>

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

              <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agenda cita</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("CitasAgendadas")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="calendar-alt" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Mis citas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="trophy" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Mi ranking</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-check" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Nuestros especialistas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="comments" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Contacto</Text>
                </View>
              </TouchableOpacity>
              <Button title='Salir' onPress={logout} />

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
                  onPress={() => navigation.navigate("SedesScreen")}
                >
                  <Text style={styles.buttonText}>Buscar Clinica</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.containerBlog}>
            <Text>
              <Text style={styles.tituloBlog}>¿Quiénes Somos?</Text>
            </Text>
          </View>

          <View>
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
                  <Text style={styles.buttonTextBlog}>Leer más</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.containerBlog}>
            <Text>
              <Text style={styles.tituloBlog}>Nuestros procedimientos</Text>
            </Text>
          </View>

          <View style={styles.containerProcedimientos}>
            <View style={styles.containerProcedimientos2}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1685124831/ortodoncista_tlq9k3.png' }}
                style={styles.image}
                resizeMode="stretch"
              />
              <View style={{ marginLeft: 25, marginTop: 30, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Ortodoncia</Text>
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
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125116/cepillo-de-dientes_1_d1q7ii.png' }}
                style={styles.image}
                resizeMode="stretch"
              />
              <View style={{ marginLeft: 25, marginTop: 30, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Limpieza dental</Text>
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
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125346/endodoncia_n5itxb.png' }}
                style={styles.image}
                resizeMode="stretch"
              />
              <View style={{ marginLeft: 25, marginTop: 30, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Endodoncia</Text>
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
                source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125180/extraccion_jn5wxt.png' }}
                style={styles.image}
                resizeMode="stretch"
              />
              <View style={{ marginLeft: 25, marginTop: 30, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Extracción dental</Text>
                <TouchableOpacity style={styles.buttonBlog2}
                  onPress={() => navigation.navigate("ProcedimientosScreen")}
                >
                  <Text style={styles.buttonTextBlog}>Leer más</Text>
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
    backgroundColor: "linear-gradient(90deg, rgba(125,195,232,1) 0%, rgba(183,222,242,1) 35%, rgba(131,205,245,1) 100%)",
  },
  image: {
    width: 150,
    height: 150,
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
    marginTop: 5,
    fontSize: 11,
    color: "black",
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
    marginTop: 10,
    marginLeft: 55,
    width: 100,
    textAlign: 'center',
  },
  buttonTextBlog: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 50,
  },
});

export default HomeScreen;