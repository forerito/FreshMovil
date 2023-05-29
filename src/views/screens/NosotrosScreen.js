import React, { useState } from 'react'
import { Text, Image, View, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Header from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from '../layouts/Footer';
import ChatWhatsApp from '../layouts/ChatWhatsApp';

const NosotrosScreen = ({ navigation }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <SafeAreaView className='flex-1 ' style={{ backgroundColor: 'white' }}>
      <ScrollView className='h-full' showsVerticalScrollIndicator={false}>

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

          <ImageBackground source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852201/Fresh_Smile_Cmills/banner_fjy0jl.jpg" }} resizeMode={'stretch'} style={styles.fondoContainer}>
            <View style={styles.containerHome}>
              <Text style={styles.heading}>¡SOBRE NOSOTROS!</Text>
            </View>
          </ImageBackground>

        </View>


        <View style={styles.container}>
          <Image
            source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852193/Fresh_Smile_Cmills/imagen15.jpg_gg3f9o.jpg" }} resizeMode={'stretch'}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>Nosotros</Text>
            <Text style={styles.paragraph}>
              Nuestro equipo de profesionales altamente capacitados y especializados trabaja de la mano con cada paciente para diseñar un plan de tratamiento individualizado, teniendo en cuenta sus necesidades y objetivos específicos. Utilizamos las últimas tecnologías y técnicas en ortodoncia para garantizar resultados óptimos y duraderos.</Text>
          </View>
        </View>

        <View style={styles.containerEmpresa}>
          <View style={styles.itemEmpresa}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465038/icono-cohete_lcojoc.png" }} resizeMode={'stretch'} style={styles.imageEmpresa} />
            <Text style={styles.textEmpresa}>Misión</Text>
            <Text style={styles.text2}>La misión de nuestro consultorio odontológico
              ser proporcionar una atención dental
              de alta calidad y personalizada a los pacientes
              promoviendo la salud oral y mejorando
              la salud de nuestros pacientes</Text>
          </View>

          <View style={styles.itemEmpresa}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465036/icono-ojo_jxzh94.png" }} resizeMode={'stretch'} style={styles.imageEmpresa} />
            <Text style={styles.textEmpresa}>Visión</Text>
            <Text style={styles.text2}>Ser reconocidos como el consultorio
              odontológico líder en nuestra
              comunidad, brindando una atención</Text>
          </View>

          <View style={styles.itemEmpresa}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465040/icono-diamante_oqtknb.png" }} resizeMode={'stretch'} style={styles.imageEmpresa} />
            <Text style={styles.textEmpresa}>Valores</Text>
            <Text style={styles.text2}>Profesionalismo: ofrecer servicios
              odontológicos de alta calidad basados
              en conocimientos científicos</Text>
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
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 10,
  },
  containerHome: {
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    opacity: 0.8,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 180,
    height: 160,
    marginTop: 35,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 10,
  },
  containerEmpresa: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEmpresa: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageEmpresa: {
    width: 150,
    height: 150,
  },
  textEmpresa: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text2: {
    textAlign: 'center',
    marginHorizontal: 20,
  },


  footer: {
    marginTop: 20,
  },
});

export default NosotrosScreen;