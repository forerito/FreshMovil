import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../Header";

const HomeAdmin = ({ navigation }) => {

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

              <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agenda cita</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="star" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Mi valoración</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => navigation.navigate("CitasAgendadas")}>
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
              </TouchableOpacity> */}

              {/* <Button title='Salir' onPress={logout} /> */}

            </View>
          )}
        </View>
        <View style={styles.footer}></View>

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

export default HomeAdmin;