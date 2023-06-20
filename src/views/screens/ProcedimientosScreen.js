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
            </View>
          )}
        </View>

        <View style={styles.containerBanner} >

          <ImageBackground source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684601807/Fresh_Smile_Cmills/Procedimientos_-fondo_j3w4lj.jpg" }} resizeMode={'stretch'} style={styles.fondoContainer}>
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

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852202/Fresh_Smile_Cmills/carillas_hbazmk.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Blanqueamiento dental</Text>
              <Text style={styles.serviceText}>
                Es un procedimiento estético que busca aclarar el color de los dientes y eliminar las manchas y decoloraciones. Se puede realizar en el consultorio del dentista o mediante el uso de kits de blanqueamiento dental en el hogar bajo la supervisión del dentista.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852210/Fresh_Smile_Cmills/implantes_keq38a.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>
                Implantes dentales
              </Text>
              <Text style={styles.serviceText}>
                Son dispositivos utilizados para reemplazar las raíces de los dientes perdidos. Los implantes dentales se colocan en el hueso maxilar o mandibular y luego se colocan coronas dentales artificiales sobre ellos para restaurar la función y la apariencia de los dientes perdidos.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852210/Fresh_Smile_Cmills/implantesss_deur5s.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>
                Prótesis dental
              </Text>
              <Text style={styles.serviceText}>
                Las prótesis dentales son reemplazos artificiales de uno o varios dientes perdidos. Pueden ser parciales o completas, removibles o fijas. Incluyen opciones como puentes y dentaduras postizas, así como implantes dentales.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852212/Fresh_Smile_Cmills/cards1_s5fs46.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Cirugía oral</Text>
              <Text style={styles.serviceText}>
                La cirugía oral incluye una variedad de procedimientos quirúrgicos en la boca y los maxilares. Puede involucrar extracciones complejas, colocación de implantes dentales, cirugía de mandíbula y corrección de deformidades faciales.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684268627/Fresh_Smile_Cmills/jonathan-borba-v_2FRXEba94-unsplash_cth93o.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Extracción de muelas del juicio</Text>
              <Text style={styles.serviceText}>
                La extracción de las muelas del juicio es un procedimiento común para eliminar las muelas que no tienen suficiente espacio para emerger o están causando problemas como dolor, infecciones o daños a los dientes adyacentes. Se realiza bajo anestesia local.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684269551/Fresh_Smile_Cmills/caroline-lm-8BkF0sTC6Uo-unsplash_efkumb.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Limpieza dental profunda</Text>
              <Text style={styles.serviceText}>
                La limpieza dental profunda, también conocida como raspado y alisado radicular, es un procedimiento para eliminar la placa bacteriana, el sarro y las toxinas de las superficies de los dientes y las raíces. Ayuda a prevenir la enfermedad periodontal y mantener las encías saludables.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684268377/Fresh_Smile_Cmills/jonathan-borba-W9YEY6G8LVM-unsplash_qpfaed.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Coronas dentales</Text>
              <Text style={styles.serviceText}>
                Las coronas dentales son fundas que se colocan sobre dientes dañados, debilitados o restaurados. Proporcionan protección y mejoran la apariencia de los dientes. Las coronas pueden ser de metal, porcelana, porcelana fusionada a metal o materiales cerámicos de alta resistencia.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1684268332/Fresh_Smile_Cmills/enis-yavuz-4u2fG9mqGvQ-unsplash_saf7yd.jpg" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Ortodoncia</Text>
              <Text style={styles.serviceText}>
                Tratamiento utilizado para corregir la posición de los dientes y la mandíbula, mejorando la estética y la función de la dentadura. Puede incluir el uso de brackets, alineadores transparentes u otros dispositivos para alinear los dientes correctamente.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852203/Fresh_Smile_Cmills/endodoncia_n1qzcw.png" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Endodoncia</Text>
              <Text style={styles.serviceText}>
                La endodoncia, o tratamiento de conducto, es un procedimiento para tratar y salvar dientes con pulpa dental dañada o infectada. Consiste en eliminar el tejido pulpar afectado, limpiar los conductos radiculares y sellarlos para prevenir futuras infecciones.
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

export default ProcedimientosScreen;