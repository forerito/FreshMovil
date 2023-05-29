import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5";

const CitasAgendadas = ({ navigation }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const [citas, setCitas] = useState([]);

  const obtenerCitasAgendadas = async () => {

    const citasGuardadas = await AsyncStorage.getItem('citas');
    if (citasGuardadas) {
      const citasParseadas = JSON.parse(citasGuardadas);
      setCitas(citasParseadas);
    }
  };

  useEffect(() => {
    obtenerCitasAgendadas();
  }, []);

  const handleCancelarCita = async (index) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas cancelar esta cita?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const nuevasCitas = citas.filter((_, i) => i !== index);
            await AsyncStorage.setItem('citas', JSON.stringify(nuevasCitas));
            setCitas(nuevasCitas);

            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Éxito',
              textBody: '¡Tu cita ha sido cancelada!',
              button: 'Cerrar',
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "white" }}>

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

        <AlertNotificationRoot>
          <View style={styles.containerInfo}>
            <View style={styles.content}>
              <Text style={styles.title}>MIS CITAS</Text>
              {/* <Text style={styles.subtitle}>Has accedido como</Text> */}
            </View>
          </View>
          <View>
            {citas.length > 0 ? (
              citas.map((cita, index) => (
                <View key={index} style={styles.container1}>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Tipo de documento: </Text>
                      <Text style={styles.text}>{cita.tipoDocumento}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Número documento: </Text>
                      <Text style={styles.text}>{cita.numeroDocumento}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Nombre: </Text>
                      <Text style={styles.text}>{cita.nombrePaciente}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Teléfono: </Text>
                      <Text style={styles.text}>{cita.telefonoCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Correo electrónico: </Text>
                      <Text style={styles.text}>{cita.correoCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Fecha cita: </Text>
                      <Text style={styles.text}>{cita.fechaCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Hora disponibilidad: </Text>
                      <Text style={styles.text}>{cita.disponibilidadCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Tipo cita: </Text>
                      <Text style={styles.text}>{cita.tipoCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Sede: </Text>
                      <Text style={styles.text}>{cita.sede}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.button} onPress={() => handleCancelarCita(index)}>
                    <Text style={styles.buttonText}>Cancelar cita</Text>
                  </TouchableOpacity>

                </View>
              ))
            ) : (
              <Text style={styles.SinCitas}>No tienes citas agendadas</Text>
            )}

            <View style={styles.containerVolver}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AgendarCita")}>
                <Text style={styles.buttonText}>Volver</Text>
              </TouchableOpacity>
            </View>

          </View>
        </AlertNotificationRoot>

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
  containerInfo: {
    margin: 10,
    backgroundColor: '#249bad',
    padding: 10,
    borderRadius: 10,
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  containerVolver: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    marginRight: 10,
    padding: 2,
    paddingLeft: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  SinCitas: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
    textAlign: 'center',
  },
});

export default CitasAgendadas;