import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CitasAgendadas = () => {
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

    const nuevasCitas = citas.filter((_, i) => i !== index);
    await AsyncStorage.setItem('citas', JSON.stringify(nuevasCitas));
    setCitas(nuevasCitas);

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Exito',
      textBody: 'Tu cita ha sido cancelada!',
      button: 'Cerrar',
    });
  };

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "white" }}>

      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        <AlertNotificationRoot>
          <View>
            {citas.length > 0 ? (
              citas.map((cita, index) => (
                <View key={index} style={styles.container1}>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Fecha: </Text>
                      <Text style={styles.text}>{cita.fechaCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Hora: </Text>
                      <Text style={styles.text}>{cita.horaCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Tipo: </Text>
                      <Text style={styles.text}>{cita.tipoCita}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Estado: </Text>
                      <Text style={styles.text}>{cita.estado}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Sede: </Text>
                      <Text style={styles.text}>{cita.sede}</Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.row}>
                      <Text style={styles.boldText}>Costo: </Text>
                      <Text style={styles.text}>{cita.costo}</Text>
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
          </View>
        </AlertNotificationRoot>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'column',
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#249bad",
    padding: 10,
    borderRadius: 5,
    margin: 10,
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