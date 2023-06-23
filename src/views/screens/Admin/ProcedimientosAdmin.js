import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../Header";
import axios from "axios";
import Footer from "../../layouts/Footer";
import ChatWhatsApp from "../../layouts/ChatWhatsApp";

const ProcedimientosAdmin = ({ navigation }) => {

  const [procedimientos, setProcedimientos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos");
        setProcedimientos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 120000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setImageLoaded(true);
    }, 2000);
  }, []);


  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        <View
          style={{ backgroundColor: "black", marginLeft: 5, marginRight: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 340,
              marginTop: -43,
            }}
          >
            <TouchableOpacity onPress={handlePress}>
              <Icon name="bars" size={24} color="#5FFDFF" />
            </TouchableOpacity>
          </View>

          {menuOpen && (
            <View style={{ marginTop: 8 }}>

              <TouchableOpacity
                onPress={() => navigation.navigate("HomeEspecialista")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="home" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Inicio</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("NosotrosAdmin")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="users" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Nosotros</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ProcedimientosAdmin")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="tooth" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Procedimientos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("TablaAdmin")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agenda</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("SpecialistCards")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="star" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Valoraciones</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>Contacto</Text>
              </TouchableOpacity>

            </View>
          )}
        </View>

        <View style={styles.containerBanner} >

          <ImageBackground source={{ uri: "https://res.cloudinary.com/smilecmills/image/upload/v1684601807/Fresh_Smile_Cmills/Procedimientos_-fondo_j3w4lj.jpg" }} resizeMode={'stretch'} style={styles.fondoContainer}>
            <View style={styles.containerHome}>
              <Text style={styles.heading}>CONOCE UN POCO SOBRE NUESTROS PROCEDIMIENTOS</Text>
            </View>
          </ImageBackground>

        </View>

        <View style={styles.containerBlog}>
          <Text>
            <Text style={styles.tituloBlog}>Te brindaremos lo mejor para tu salud</Text>
          </Text>
        </View>

        <View>
          {procedimientos.map((procedimiento) => (
            <View style={styles.containercompleto} key={procedimiento.nombre}>
              <View style={styles.viewcompleto}>
                <View style={styles.serviceItem}>
                  {!imageLoaded ? (
                    <ActivityIndicator size="large" color="#249bad" />
                  ) : (
                    <Image source={{ uri: procedimiento.foto }} style={styles.serviceImg} />
                  )}
                  <Text style={styles.serviceTitle}>{procedimiento.nombre}</Text>
                  <Text style={styles.serviceText}>{procedimiento.descripcion}</Text>
                </View>
              </View>
            </View>
          ))}
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
  serviceItem: {
    alignItems: "center",
  },
  serviceImg: {
    marginTop: 2,
    width: "80%",
    height: 160,
    borderRadius: 10,
  },
  serviceTitle: {
    fontSize: 25,
    width: "90%",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
    color: '#7DC3E8',
  },
  serviceText: {
    fontSize: 12,
    width: "90%",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 6,
    marginBottom: 10,
  },
  containercompleto: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  containerBlog: {
    marginTop: 20,
    marginBottom: 10,
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  tituloBlog: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  viewcompleto: {
    width: "90%",
    borderRadius: 10,
    borderColor: "#249bad",
    backgroundColor: "#D3D3D3",
    borderWidth: 3,
    padding: 10,
  },
  containerBanner: {
    alignItems: "center",
    marginTop: -30,
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
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    opacity: 0.8,
    borderRadius: 5,
  },
  fondoContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    opacity: 1,
  },
  footer: {
    marginTop: 30,
  },
});

export default ProcedimientosAdmin;