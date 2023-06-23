import React, { useState, useEffect } from "react";
import { Text, Image, View, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Header from "./Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from "../layouts/Footer";
import ChatWhatsApp from "../layouts/ChatWhatsApp";

const NosotrosScreen = ({ navigation }) => {
  const [especialistas, setEspecialistas] = useState([]);

  useEffect(() => {
    const fetchEspecialistas = async () => {
      try {
        const response = await fetch(
          "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarEspecialista"
        );
        const data = await response.json();
        const filteredEspecialistas = data.filter(
          (_, index) => index === 1 || index === 2 || index === 5 || index === 4
        );
        setEspecialistas(filteredEspecialistas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEspecialistas();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

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
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="home" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Inicio</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("NosotrosScreen")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="users" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Nosotros</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ProcedimientosScreen")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="tooth" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Procedimientos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("AgendarCita")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agendar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("TablaUsuario")}
              >
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

              <TouchableOpacity
                onPress={() => navigation.navigate("Especialistas")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="user-check" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Especialistas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ContactoScreen")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="comments" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Contacto</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>Contacto</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.containerBanner}>
          <ImageBackground
            source={{
              uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852201/Fresh_Smile_Cmills/banner_fjy0jl.jpg",
            }}
            resizeMode={"stretch"}
            style={styles.fondoContainer}
          >
            <View style={styles.containerHome}>
              <Text style={styles.heading}>CONOCE SOBRE NOSOTROS</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.containerBlog}>
          <Text style={styles.containerBlog}>
            <Text style={styles.tituloBlog}>
              Nos caracterizamos por ser un consultorio de alta responsabilidad
            </Text>
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.borderImage}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852193/Fresh_Smile_Cmills/imagen15.jpg_gg3f9o.jpg",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Nosotros</Text>
            <Text style={styles.paragraph}>
              Nuestro equipo de profesionales altamente capacitados y
              especializados trabaja de la mano con cada paciente para diseñar
              un plan de tratamiento individualizado, teniendo en cuenta sus
              necesidades y objetivos específicos. Utilizamos las últimas
              tecnologías y técnicas en ortodoncia para garantizar resultados
              óptimos y duraderos.
            </Text>
          </View>
        </View>

        <View style={styles.containerEmpresa}>
          <View style={styles.itemEmpresa}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465038/icono-cohete_lcojoc.png",
              }}
              resizeMode={"stretch"}
              style={styles.imageEmpresa}
            />
            <Text style={styles.textEmpresa}>Misión</Text>
            <Text style={styles.text2}>
              La misión de nuestro consultorio odontológico ser proporcionar una
              atención dental de alta calidad y personalizada a los pacientes
              promoviendo la salud oral y mejorando la salud de nuestros
              pacientes
            </Text>
          </View>

          <View style={styles.itemEmpresa}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465036/icono-ojo_jxzh94.png",
              }}
              resizeMode={"stretch"}
              style={styles.imageEmpresa}
            />
            <Text style={styles.textEmpresa}>Visión</Text>
            <Text style={styles.text2}>
              Ser reconocidos como el consultorio odontológico líder en nuestra
              comunidad, brindando una atención
            </Text>
          </View>

          <View style={styles.itemEmpresa}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465040/icono-diamante_oqtknb.png",
              }}
              resizeMode={"stretch"}
              style={styles.imageEmpresa}
            />
            <Text style={styles.textEmpresa}>Valores</Text>
            <Text style={styles.text2}>
              Profesionalismo: ofrecer servicios odontológicos de alta calidad
              basados en conocimientos científicos
            </Text>
          </View>
        </View>

        <View style={styles.specialistContainer}>

          <View>
            {especialistas.map((especialista, index) => (
              <View style={styles.specialistCard} key={index}>
                <Image
                  style={styles.specialistImage}
                  source={{ uri:
                    
                    "https://i.pinimg.com/564x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg" }}
                  alt={`Imagen ${index + 1}`}
                  resizeMode="stretch"
                />
                <Text style={styles.specialistName}>{especialista.nombre_completo}</Text>
                <Text style={styles.specialistDescription}>{especialista.descripcion}</Text>
              </View>
            ))}
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
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 300,
    marginBottom: 5,
  },
  contentMenuItems: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  contentMenuText: {
    marginLeft: 8,
    color: "white",
    fontSize: 16,
  },
  containerBanner: {
    alignItems: "center",
    marginTop: -30,
    marginBottom: 10,
  },
  containerHome: {
    alignItems: "center",
    padding: 5,
    marginTop: 50,
    width: 370,
    height: 100,
  },
  fondoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -25,
    color: "white",
    textAlign: "center",
    backgroundColor: "lightgray",
    opacity: 0.8,
    borderRadius: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 180,
    height: 160,
    marginTop: 35,
    marginRight: 16,
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 10,
    padding: 5,
  },
  containerEmpresa: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  itemEmpresa: {
    marginBottom: 20,
    alignItems: "center",
  },
  imageEmpresa: {
    width: 150,
    height: 150,
  },
  textEmpresa: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#34cfe7",
  },
  text2: {
    textAlign: "center",
    marginHorizontal: 20,
  },
  specialistContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  containerBlog: {
    marginTop: 20,
    marginBottom: 10,
    height: 60,
    width: "100%",
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
  specialistCard: {
    borderRadius: 8,
    marginTop: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  specialistImage: {
    marginTop: 10,
    marginBottom: 10,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 10,
  },
  specialistName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  specialistDescription: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 25,
    width: 325,
    textAlign: "center",
    marginHorizontal: 20,
  },
  footer: {
    marginTop: 20,
  },
});

export default NosotrosScreen;
