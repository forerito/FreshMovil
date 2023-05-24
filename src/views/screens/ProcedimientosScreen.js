import React, { useState } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "./Header";
import Footer from "../layouts/Footer";
import ChatWhatsApp from "../layouts/ChatWhatsApp";

const ProcedimientosScreen = ({ navigation }) => {

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

              <TouchableOpacity onPress={() => navigation.navigate("CitasAgendadas")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="calendar-alt" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Mis citas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agendamiento</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.containerBanner} >

          <ImageBackground source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684601807/Fresh_Smile_Cmills/Procedimientos_-fondo_j3w4lj.jpg" }} resizeMode={'stretch'} style={styles.fondoContainer}>
            <View style={styles.containerHome}>
              <Text style={styles.heading}>¡NUESTROS PROCEDIMIENTOS!</Text>
            </View>
          </ImageBackground>

        </View>

        <View style={styles.containerBlog}>
          <Text>
            <Text style={styles.tituloBlog}>Te brindaremos lo mejor para tu salud</Text>
          </Text>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465022/blanqueamiento_tukanw.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Blanqueamiento dental</Text>
              <Text style={styles.serviceText}>
                El blanqueamiento dental es un procedimiento de odontología estética que busca aclarar el color de los dientes para obtener una sonrisa más blanca y brillante.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465292/brackets_ccon9q.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>
                Brackets
              </Text>
              <Text style={styles.serviceText}>
                El tratamiento de brackets es un procedimiento ortodóntico utilizado para corregir la alineación y posición de los dientes.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465334/cordales_wrozqf.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>
                Extracción de cordales
              </Text>
              <Text style={styles.serviceText}>
                La extracción de las cordales es un procedimiento común y seguro, y suele ser necesario cuando las muelas del juicio causan dolor o pueden afectar la salud bucal en general
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465271/dise%C3%B1osonrisa2_yis8so.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Diseño de sonrisa</Text>
              <Text style={styles.serviceText}>
                El diseño de sonrisa es un proceso estético y personalizado en odontología que busca mejorar la apariencia de la sonrisa de una persona.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465245/fractura-dientes_ksa0kp.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Fractura dental</Text>
              <Text style={styles.serviceText}>
                El tratamiento de fractura dental en odontología es un procedimiento que se realiza para reparar un diente dañado debido a una fractura o una fisura.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684464937/implantes2_x0iwcf.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Implantes dentales</Text>
              <Text style={styles.serviceText}>
                El tratamiento de implantes dentales es un procedimiento odontológico utilizado para reemplazar dientes perdidos o extraídos.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465237/caries-infantil_qht9ag.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Caries</Text>
              <Text style={styles.serviceText}>
                El tratamiento de caries es un procedimiento dental utilizado para eliminar y tratar las cavidades o deterioro de los dientes causados por la caries dental.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465294/frenos_elag17.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Frenos dentales</Text>
              <Text style={styles.serviceText}>
                Los frenos dentales son dispositivos utilizados en odontología para corregir la posición y alineación de los dientes.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684464942/cirugia_xo6czs.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Cirugía de Encías</Text>
              <Text style={styles.serviceText}>
                La cirugía de encías es un procedimiento dental que se realiza para tratar y corregir problemas en las encías y estructuras de soporte de los dientes.
              </Text>
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
  serviceItem: {
    alignItems: "center",
  },
  serviceImg: {
    width: "80%",
    height: 180,
    borderRadius: 10,
  },
  serviceTitle: {
    fontSize: 25,
    width: "100%",
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
    borderColor: "gray",
    borderWidth: 1,
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

export default ProcedimientosScreen;