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

          <Text style={styles.titulo}>Conoce Nuestros Procedimientos</Text>

          <View style={styles.containerProcedimientos}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465319/dise%C3%B1osonrisa_uofwag.jpg" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <TouchableOpacity style={styles.buttonProce}
              onPress={() => navigation.navigate("ProcedimientosScreen")}
            >
              <Text style={styles.buttonText}>Diseño de sonrisa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerProcedimientos}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465271/dise%C3%B1osonrisa2_yis8so.jpg" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <TouchableOpacity style={styles.buttonProce}
              onPress={() => navigation.navigate("ProcedimientosScreen")}
            >
              <Text style={styles.buttonText}>Blanqueamiento</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerProcedimientos}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465073/implantes_fjrpyg.jpg" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <TouchableOpacity style={styles.buttonProce}
              onPress={() => navigation.navigate("ProcedimientosScreen")}
            >
              <Text style={styles.buttonText}>Implantes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerBlog}>
          <Text>
            <Text style={styles.tituloBlog}>Nuestro Blog</Text>
          </Text>
        </View>

        <View>
          <View style={styles.itemContainerBlog}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465034/consultorio2_yjjmzo.jpg" }}
              resizeMode={"stretch"}
              style={styles.imageBlog}
            />
            <View style={styles.contentBlog}>
              <Text style={styles.titleBlog}>Odontoestetic</Text>
              <Text style={styles.textBlog}>
                Odontoestetic es una clínica privada prestadora de servicios de
                salud oral, con mas de 15 años de experiencia
              </Text>
              <TouchableOpacity style={styles.buttonBlog}
                onPress={() => navigation.navigate("BlogScreen")}
              >
                <Text style={styles.buttonTextBlog}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.itemContainerBlog}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465065/Dentix_lnjc6h.png" }}
              resizeMode={"stretch"}
              style={styles.imageBlog}
            />
            <View style={styles.contentBlog}>
              <Text style={styles.titleBlog}>Dentix</Text>
              <Text style={styles.textBlog}>
                Dentix es una empresa española de servicios dentales fundada en
                2010 por Ángel Lorenzo. Es una empresa familiar cuyo modelo de
                negocio se basa en clínicas propias, no en acuerdos de
                franquicia
              </Text>
              <TouchableOpacity style={styles.buttonBlog}
                onPress={() => navigation.navigate("BlogScreen")}
              >
                <Text style={styles.buttonTextBlog}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.itemContainerBlog}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465025/consultorio3_mc2jhx.jpg" }}
              resizeMode={"stretch"}
              style={styles.imageBlog}
            />
            <View style={styles.contentBlog}>
              <Text style={styles.titleBlog}>Centro Medico Integral</Text>
              <Text style={styles.textBlog}>
                Centro Medico Integral es un establecimiento de atención médica
                que ofrece una amplia gama de servicios para atender las
                necesidades de salud de sus pacientes
              </Text>
              <TouchableOpacity style={styles.buttonBlog}
                onPress={() => navigation.navigate("BlogScreen")}
              >
                <Text style={styles.buttonTextBlog}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.itemContainerBlog}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465034/consultorio2_yjjmzo.jpg" }}
              resizeMode={"stretch"}
              style={styles.imageBlog}
            />
            <View style={styles.contentBlog}>
              <Text style={styles.titleBlog}>Prodentales</Text>
              <Text style={styles.textBlog}>
                El Dr.Oscar Zapata ofrece odontología general y especializada
                para pacientes de todas las edades. Sus servicios abarcan la
                prevención, el diagnóstico y el tratamiento de condiciones
                especiales o enfermedades que afectan a los dientes
              </Text>
              <TouchableOpacity style={styles.buttonBlog}
                onPress={() => navigation.navigate("BlogScreen")}
              >
                <Text style={styles.buttonTextBlog}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.tituloSomos}>¿Quienes Somos?</Text>

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
            <Text style={styles.titulo2}>Clinica Fresh Smile Cmills</Text>
          </Text>
        </View>

        <View style={styles.containerProcedimientos}>
          <Image
            source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465035/sede1_nv5feq.png" }}
            resizeMode={"stretch"}
            style={styles.imageSedes}
          />
          <Text style={styles.tituloSedes}>SEDE ARMENIA</Text>
          <TouchableOpacity style={styles.buttonProce}
            onPress={() => navigation.navigate("SedesScreen")}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerProcedimientos}>
          <Image
            source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465036/sede2_ullry4.png" }}
            resizeMode={"stretch"}
            style={styles.imageSedes}
          />
          <Text style={styles.tituloSedes}>SEDE TEBAIDA</Text>
          <TouchableOpacity style={styles.buttonProce}
            onPress={() => navigation.navigate("SedesScreen")}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerProcedimientos}>
          <Image
            source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465036/sede3_r9syxe.png" }}
            resizeMode={"stretch"}
            style={styles.imageSedes}
          />
          <Text style={styles.tituloSedes}>SEDE GÉNOVA</Text>
          <TouchableOpacity style={styles.buttonProce}
            onPress={() => navigation.navigate("SedesScreen")}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
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
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    color: "#7DC3E8",
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
    borderRadius: 50,
    margin: 10,
  },
  buttonProce: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  containerProcedimientos: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 25,
  },
  imageSedes: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -170,
    marginBottom: 20,
  },
  containerBlog: {
    marginTop: 20,
    marginBottom: 20,
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  tituloBlog: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  titulo2: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  tituloSedes: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  itemContainerBlog: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: "linear-gradient(90deg, rgba(125,195,232,1) 0%, rgba(183,222,242,1) 35%, rgba(131,205,245,1) 100%)",
    width: "90%",
    marginLeft: 20,
  },
  imageBlog: {
    width: 120,
    height: 110,
    marginRight: 10,
    borderRadius: 5,
  },
  imageSomos: {
    width: 140,
    height: 110,
    marginRight: 10,
    marginBottom: 50,
  },
  contentBlog: {
    flex: 1,
  },
  titleBlog: {
    fontSize: 18,
    color: "#4fafd2",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  textBlog: {
    fontSize: 12,
    color: "black",
  },
  textSomos: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    color: "black",
  },
  buttonBlog: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 100,
    textAlign: "center",
  },
  buttonTextBlog: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    marginTop: 50,
  },
});

export default HomeScreen;