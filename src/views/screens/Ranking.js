import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from "../layouts/Footer";

const Ranking = ({ navigation }) => {
  const [especialistasData, setEspecialistasData] = useState([]);
  const [especialistasVC, setEspecialistasVC] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const fetchEspecialistasData = async () => {
    try {
      const response = await axios.get("https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarEspecialista");
      setEspecialistasData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos desde la API:", error);
    }
  };

  const fetchEspecialistasVC = async () => {
    try {
      const response = await axios.get("https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarRating");
      setEspecialistasVC(response.data.sort((a, b) => b.valoracion - a.valoracion).slice(0, 5));
    } catch (error) {
      console.error("Error al obtener los datos desde la API:", error);
    }
  };

  useEffect(() => {
    fetchEspecialistasVC();
    fetchEspecialistasData();
  }, []);

  const calculateStars = (valoracion) => {
    const roundedValoracion = Math.round(valoracion);
    return "⭐".repeat(roundedValoracion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

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

        <View style={styles.rankingContainer}>
          <Text style={styles.title}>Ranking</Text>
          <View style={styles.hr} />
          <View style={styles.rankingTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeadingLeft}>PUESTO</Text>
              <Text style={styles.tableHeadingCenter}>NOMBRE</Text>
              <Text style={styles.tableHeadingRight}>VALORACIÓN</Text>
            </View>
            {especialistasData.length > 0 &&
              especialistasVC.length > 0 &&
              especialistasVC.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.tableRow,
                    index === 0 ? styles.firstPlaceRow : null,
                  ]}
                >
                  <Text style={styles.position}>{index + 1}</Text>
                  <View style={styles.profilePicContainer}>
                    <Image
                      source={{ uri: item.foto || "https://fresh-smile.netlify.app/assets/user-d6ab4092.webp" }}
                      style={styles.profilePic}
                    />
                    {index === 0 && (
                      <Image
                        source={{
                          uri: "https://png.pngtree.com/png-clipart/20220206/original/pngtree-crown-vector-png-image_7263860.png",
                        }}
                        style={styles.crownIcon}
                      />
                    )}
                  </View>

                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{especialistasData.find((elem) => elem.identificacion_especialista === item.identificacion_especialista).nombre_completo}</Text>
                  </View>

                  <View style={styles.starsContainer}>

                    <Text style={styles.stars}>{calculateStars(item.valoracion)}</Text>
                  </View>

                </View>
              ))}
          </View>
        </View>

        <Footer />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  rankingContainer: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hr: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  rankingTable: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tableHeadingLeft: {
    marginLeft: 10,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableHeadingCenter: {
    marginLeft: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableHeadingRight: {
    marginRight: 8,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  firstPlaceRow: {
    backgroundColor: '#FFFB72',
  },
  position: {
    width: 30,
    fontWeight: 'bold',
  },
  tableHeading: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
    width: '100%',
    textAlign: 'center',
  },
  profilePicContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  crownIcon: {
  },
  nameContainer: {
    flex: 1,
    marginLeft: 60,
    justifyContent: 'center',
  },
  name: {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  starsContainer: {
    flex: 1,
    marginLeft: 30,
    justifyContent: 'center',
  },
  stars: {
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
};

export default Ranking;