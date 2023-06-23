import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SpecialistCards = ({ navigation }) => {
  const [data, setData] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarRating",
          { headers }
        );
        setData(response.data);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const fetchAllPatientData = async () => {
    if (data) {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const updatedData = await Promise.all(
          data.map(async (especialista) => {
            const response = await axios.get(
              `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${especialista.identificacion_especialista}`,
              { headers }
            );
            const patientData = response.data;

            return {
              ...especialista,
              patientData,
            };
          })
        );

        setData(updatedData);
      } catch (error) {
        console.log("Error al obtener los datos del paciente:", error);
      }
    }
  };

  useEffect(() => {
    fetchAllPatientData();
  }, [data]);

  const filteredData = data
    ? data.filter(
      (especialista, index, self) =>
        index ===
        self.findIndex(
          (e) =>
            e.identificacion_especialista ===
            especialista.identificacion_especialista
        )
    )
    : null;

  const renderRatingStars = (valoracion) => {
    const roundedValoracion = Math.round(valoracion);
    const stars = [];

    for (let i = 0; i < roundedValoracion; i++) {
      stars.push(<Icon key={i} name="star" style={styles.starIcon} />);
    }

    return stars;
  };

  return (
    <SafeAreaView className="flex-1">
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

        <View style={[styles.cardContainer, { paddingHorizontal: 20 }]}>
          {filteredData ? (
            filteredData.map((especialista) => (
              <View
                key={especialista.id}
                style={[styles.card, { borderRadius: 10, marginBottom: 20 }]}
              >
                <View style={styles.icon}>
                  <Icon
                    name="user"
                    style={[styles.iconLarge, { fontSize: 40 }]}
                  />
                </View>
                <Text style={styles.cardText}>
                  Identificación del especialista:{" "}
                  {especialista.identificacion_especialista}
                </Text>
                {especialista.patientData && (
                  <View>
                    <Text style={styles.cardText}>
                      Nombre del paciente:{" "}
                      {especialista.patientData.nombre_completo}
                    </Text>
                    <Text style={styles.cardText}>
                      Correo del paciente: {especialista.patientData.correo}
                    </Text>
                    <Text style={styles.cardText}>
                      Especialidad: {especialista.patientData.especialidad}
                    </Text>
                  </View>
                )}
                <Text style={styles.cardText}>
                  Valoración: {renderRatingStars(especialista.valoracion)}
                </Text>
                <Text style={styles.cardText}>
                  Votos: {especialista.votos ? especialista.votos.length : 0}
                </Text>
                <View style={styles.comentarios}>
                  <Text style={styles.comentariosTitle}>Comentarios:</Text>
                  {especialista.comentarios &&
                    especialista.comentarios.length > 0 ? (
                    especialista.comentarios.map((comentario, index) => (
                      <View key={index} style={styles.comentarioItem}>
                        <Text style={styles.comentarioText}>
                          {comentario.userId}: {comentario.comentario}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text>No hay comentarios.</Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
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
  cardContainer: {
    marginTop: 20,
    backgroundColor: "white",
  },
  card: {
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconLarge: {
    fontSize: 40,
  },
  cardText: {
    textAlign: "center",
    marginBottom: 5,
  },
  comentarios: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  comentariosTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  comentarioItem: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  comentarioText: {
    textAlign: "center",
  },
  starIcon: {
    color: "gold",
    borderRadius: 10,
    padding: 5,
  },
});

export default SpecialistCards;