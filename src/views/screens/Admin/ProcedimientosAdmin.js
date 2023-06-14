import React, { useState } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../Header";
import Footer from "../../layouts/Footer";
import ChatWhatsApp from "../../layouts/ChatWhatsApp";

const ProcedimientosAdmin = ({ navigation }) => {

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

              <TouchableOpacity onPress={() => navigation.navigate("HomeAdmin")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="home" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Inicio</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("NosotrosAdmin")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="users" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Nosotros</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ProcedimientosAdmin")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="tooth" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Procedimientos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("TablaAdmin")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agenda</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("DoctorCard")}>
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125232/blanqueamiento-dental_k79oav.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125289/implante_m34lfe.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685126311/diente_iowcnf.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685126397/medico_meiagz.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685127203/muela-del-juicio_gepql6.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685127204/limpieza-dental_yooh5t.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685127203/corona-dental_j2kdj1.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685124831/ortodoncista_tlq9k3.png" }}
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
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125116/cepillo-de-dientes_1_d1q7ii.png" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Limpieza dental</Text>
              <Text style={styles.serviceText}>
                También conocida como profilaxis dental, es un procedimiento en el que se eliminan la placa y el sarro de los dientes para prevenir enfermedades dentales y mantener una buena salud bucal.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125346/endodoncia_n5itxb.png" }}
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

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685125180/extraccion_jn5wxt.png" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Extracción dental</Text>
              <Text style={styles.serviceText}>
                Consiste en la remoción de un diente dañado, infectado o afectado por una enfermedad periodontal. Las extracciones dentales también se realizan en casos de dientes de sabiduría impactados o cuando hay una superpoblación dental en la boca.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containercompleto}>
          <View style={styles.viewcompleto}>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1685127846/sonrisa_naagzz.png" }}
                resizeMode={"stretch"}
                style={styles.serviceImg}
              />
              <Text style={styles.serviceTitle}>Diseño de sonrisa</Text>
              <Text style={styles.serviceText}>
                El diseño de sonrisa es un procedimiento estético que busca mejorar la apariencia de la sonrisa y los dientes. Consiste en un análisis detallado de la forma, el color, el tamaño y la posición de los dientes, así como de la armonía facial en general.
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
    width: "60%",
    height: 160,
    borderRadius: 10,
  },
  serviceTitle: {
    fontSize: 25,
    width: "90%",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
    color: 'black',
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