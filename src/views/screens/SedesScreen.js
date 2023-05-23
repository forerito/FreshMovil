import React, { useState } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Footer from "../layouts/Footer";
import ChatWhatsApp from "../layouts/ChatWhatsApp";
import Icon from "react-native-vector-icons/FontAwesome5";

const SedesScreen = ({ navigation }) => {

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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 330, marginTop: -43 }}>
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

              <TouchableOpacity onPress={() => navigation.navigate("SedesScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="globe-americas" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Sedes</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("BlogScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="newspaper" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Blog</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="comments" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Contacto</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.containerBanner} >

          <ImageBackground source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684602492/Fresh_Smile_Cmills/Sedes-fondo_pw8rao.jpg" }} resizeMode={'stretch'} style={styles.fondoContainer}>
            <View style={styles.containerHome}>
              <Text style={styles.heading}>¡SONRÍE SIN LÍMITES DESDE NUESTRAS SEDES!</Text>
            </View>
          </ImageBackground>

        </View>

        <View style={styles.containerSedes}>
          <Text>
            <Text style={styles.tituloSedes}>Nuestras sedes</Text>
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465017/armenia_kbrxlp.png" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titlePrincipal}>Sede Armenia</Text>
              <Text style={styles.title}>Calle 6 #16A/54 Torre Valparaiso</Text>
              <Text style={styles.title}>Lunes a Viernes 9 AM a 6 PM</Text>
              <Text style={styles.title}>3103594986</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AgendarCita")}>
                <Text style={styles.buttonText}>Agendar tu cita</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.titlePrincipal}>Sede Génova</Text>
              <Text style={styles.title}>Carrera 11 #26A-04</Text>
              <Text style={styles.title}>Lunes a Viernes 9 AM a 6 PM</Text>
              <Text style={styles.title}>3188950833</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AgendarCita")}>
                <Text style={styles.buttonText}>Agendar tu cita</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684464909/tebaida_wnxuwf.jpg" }}
              resizeMode={"stretch"}
              style={styles.image1}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684464917/circasia_hucthm.jpg" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titlePrincipal}>Sede Tebaida</Text>
              <Text style={styles.title}>Calle 12 CR 5 #4/93</Text>
              <Text style={styles.title}>Lunes a Viernes 9 AM a 6 PM</Text>
              <Text style={styles.title}>3188950833</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AgendarCita")}>
                <Text style={styles.buttonText}>Agendar tu cita</Text>
              </TouchableOpacity>
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
    alignItems: "center",
    marginTop: 20,
  },
  containerHome: {
    alignItems: 'center',
    padding: 5,
    marginTop: 50,
    width: 370,
    height: 100,
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
  containerSedes: {
    marginTop: 15,
    marginBottom: 8,
    height: 60,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  tituloSedes: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 4,
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  image1: {
    width: 200,
    height: 200,
    marginLeft: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: 'flex-start',
  },
  titlePrincipal: {
    fontSize: 20,
    marginBottom: 6,
    textAlign: "left",
    fontWeight: 'bold',
    color: '#00bcbf',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    marginTop: 50,
  },
});

export default SedesScreen;