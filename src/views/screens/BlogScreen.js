import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import Footer from '../layouts/Footer';
import ChatWhatsApp from '../layouts/ChatWhatsApp';
import Icon from "react-native-vector-icons/FontAwesome5";

const BlogScreen = ({ navigation }) => {

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
            </View>
          )}
        </View>

        <View style={styles.containerEmpresa}>
          <View style={styles.itemEmpresa}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465032/cards4_iepwg5.jpg" }} resizeMode={'stretch'} style={styles.imageEmpresa} />
          </View>
          <View style={styles.itemEmpresa}>
            <Image source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852209/Fresh_Smile_Cmills/IMPLANTES-DENTALES_no3n0n.jpg" }} resizeMode={'stretch'} style={styles.imageEmpresa} />
          </View>
          <View style={styles.itemEmpresa}>
            <Image source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852203/Fresh_Smile_Cmills/cards5_zik6lu.jpg" }} resizeMode={'stretch'} style={styles.imageEmpresa} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465024/consultorio1_fvzdh7.jpg" }} resizeMode={'stretch'} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>DENTIX</Text>
              <Text style={styles.text}>Dentix es una empresa española de servicios dentales fundada en 2010 por Ángel Lorenzo. Es una empresa familiar cuyo modelo de negocio se basa en clínicas propias, no en acuerdos de franquicia.</Text>
              <Text style={styles.text}>Sede central: Calle de la Ribera del Loira, 56, 28042; Madrid, Comunidad de Madrid, España.</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <Text style={styles.buttonText}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465034/consultorio2_yjjmzo.jpg" }} resizeMode={'stretch'} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>ODONTOESTETIC</Text>
              <Text style={styles.text}>Odontoestetic es una clínica privada prestadora de servicios de salud oral, con más de 15 años de experiencia, especializada en áreas de educación, promoción y prevención de salud bucal, rehabilitación oral, endodoncia, periodoncia, ortodoncia y estética dental.</Text>
              <Text style={styles.text}>Sede central: Carrera 12 #1A Norte, Armenia 630004</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <Text style={styles.buttonText}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465027/consultorio4_kuhcaj.jpg" }} resizeMode={'stretch'} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>PRODENTALES</Text>
              <Text style={styles.text}>El Dr. Óscar Zapata ofrece odontología general y especializada para pacientes de todas las edades. Sus servicios abarcan la prevención, el diagnóstico y el tratamiento de condiciones especiales o enfermedades que afectan a los dientes.</Text>
              <Text style={styles.text}>Sede central: Cl 3 N 12-05 Armenia - Quindío, Colombia</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProcedimientosScreen")}>
                <Text style={styles.buttonText}>Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
  containerEmpresa: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEmpresa: {
    alignItems: 'center',
  },
  imageEmpresa: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 180,
    height: 300,
    marginRight: 10,
    marginLeft: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
    color: '#7DC3E8',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    marginRight: 5,
  },
  button: {
    backgroundColor: '#249bad',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 105,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BlogScreen;