import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendarCita = ({ navigation }) => {

  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [tipoCita, setTipoCita] = useState('');
  const [estado, setEstado] = useState('');
  const [sede, setSede] = useState('');
  const [costo, setCosto] = useState('');

  const handleGuardar = async () => {

    const citasGuardadas = await AsyncStorage.getItem('citas');
    let citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];


    const horaExistente = citas.find((cita) => cita.horaCita === horaCita);
    if (horaExistente) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'La hora seleccionada ya está en uso',
        button: 'Cerrar',
      });
      return;
    }

    const nuevaCita = { fechaCita, horaCita, tipoCita, estado, sede, costo };
    citas.push(nuevaCita);
    await AsyncStorage.setItem('citas', JSON.stringify(citas));


    setFechaCita('');
    setHoraCita('');
    setTipoCita('');
    setEstado('');
    setSede('');
    setCosto('');

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Felicidades',
      textBody: 'Tu cita ha sido agendada!',
      button: 'Cerrar',
    });
  };

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "white" }}>

      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        <ImageBackground
          source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852207/Fresh_Smile_Cmills/galeria8_g8lbub.jpg" }}
          resizeMode={"stretch"}
          style={styles.fondoContainer}
        >

          <AlertNotificationRoot>

            <View style={styles.formContainertitulo}>
              <Text style={styles.formTitle}>Agenda aquí tu cita</Text>
              <Text style={styles.formText}>Llena este formulario para agendar tu cita</Text>
            </View>

            <View style={styles.formContainer}>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de la cita</Text>
                <TextInput style={styles.input} placeholder="dd/mm/aaaa" value={fechaCita} onChangeText={setFechaCita} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de la cita</Text>
                <TextInput style={styles.input} placeholder="10:00 a. m." value={horaCita} onChangeText={setHoraCita} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipo de cita</Text>
                <TextInput style={styles.input} placeholder="Tipo de cita" value={tipoCita} onChangeText={setTipoCita} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Estado</Text>
                <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Sede</Text>
                <TextInput style={styles.input} placeholder="Sede principal, secundaria, terciaria" value={sede} onChangeText={setSede} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Costo</Text>
                <TextInput style={styles.input} placeholder="Costo" value={costo} onChangeText={setCosto} />
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                  <Text style={styles.buttonText}>Agendar cita</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CitasAgendadas")}>
                  <Text style={styles.buttonText}>Ver mis citas</Text>
                </TouchableOpacity>
              </View>

            </View>
          </AlertNotificationRoot>

        </ImageBackground>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fondoContainer: {
    marginTop: 0,
    opacity: 0.9,
  },
  formContainertitulo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  formText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: 'white',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderBottomColor: '#b1a1a1',
    borderBottomWidth: 3,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "lightgray",
  },
  containerButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#249bad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendarCita;