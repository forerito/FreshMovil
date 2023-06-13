import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from './Header';
import Footer from '../layouts/Footer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const tiposDocumento = [
  'Cédula de ciudadanía',
  'Tarjeta de identidad',
  'Cédula de extranjería',
  'Pasaporte',
];

const Prueba = () => {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoCita, setTipoCita] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCitaParaMi, setIsCitaParaMi] = useState(true);

  useEffect(() => {
    // Abrir el selector de fecha al cargar el componente
    setIsModalVisible(true);
  }, []);

  const handleSubmit = () => {
    // Crear el objeto de datos a enviar al backend
    const data = {
      tipo_documento_acompañante: tipoDocumento,
      identificacion_acompañante: numeroDocumento,
      nombre_completo: nombre,
      fecha: selectedDate,
      hora: selectedHour,
    };

    // Realizar la solicitud POST al backend
    // axios.post("URL_DE_TU_API", data)
    //   .then((response) => {
    //     // Manejar la respuesta del backend si es necesario
    //     console.log(response.data);
    //     // Restablecer los campos del formulario después de enviar los datos
    //     setTipoDocumento("");
    //     setNumeroDocumento("");
    //     setNombre("");
    //     setTipoCita("");
    //     setSelectedDate(null);
    //     setSelectedHour(null);
    //   })
    //   .catch((error) => {
    //     // Manejar el error si la solicitud no se completa correctamente
    //     console.error(error);
    //   });
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    console.log("A date has been picked: ", date.strftime);
    setShowDatePicker(false);
  };

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCitaParaMi = (isParaMi) => {
    setIsCitaParaMi(isParaMi);
    handleToggleModal();
  };

  return (
    <SafeAreaView className="flex-1 ">

      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        <View style={styles.container}>
          <Text style={styles.heading}>Agenda tu cita</Text>
          <View style={styles.formContainer}>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de documento</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={tipoDocumento}
                  onValueChange={(value) => setTipoDocumento(value)}
                  enabled={!isCitaParaMi}
                  style={styles.input}
                >
                  <Picker.Item label="Seleccione un tipo de documento" value="" />
                  {tiposDocumento.map((tipo) => (
                    <Picker.Item key={tipo} label={tipo} value={tipo} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Número de documento:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Ingrese su dirección"
                  value={numeroDocumento}
                  onChangeText={(text) => setNumeroDocumento(text)}
                  editable={!isCitaParaMi}
                  required
                />
              </View>
            </View>



            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre completo:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Ingrese su nombre"
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                  editable={!isCitaParaMi}
                  required
                />
              </View>
            </View>



            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de cita:</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={tipoCita}
                  onValueChange={(value) => setTipoCita(value)}
                  enabled={!isCitaParaMi}
                  style={styles.input}
                >
                  <Picker.Item label="Seleccione el tipo de cita" value="" />
                  <Picker.Item label="Consulta" value="Consulta" />
                  <Picker.Item label="Control" value="Control" />
                  <Picker.Item label="Emergencia" value="Emergencia" />
                </Picker>
              </View>
            </View>

            <Modal visible={isModalVisible} animationType="none">
              <View style={styles.container}>
                <Text style={styles.heading}>¿Para quién es la cita?</Text>

                <View style={styles.containerModal}>
                  <TouchableOpacity
                    onPress={() => handleCitaParaMi(true)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Para mí</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleCitaParaMi(false)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Para otra persona</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>

            <Text style={styles.label}>Fecha disponible:</Text>
            <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
            {selectedDate && <Text>{selectedDate.toDateString()}</Text>}
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setShowDatePicker(false)}
            />

            <Text style={styles.label}>Horas disponibles:</Text>
            <View style={styles.hourGrid}>
              <Button
                title="9:00 AM"
                onPress={() => handleHourSelect('9:00 AM')}
                color={selectedHour === '9:00 AM' ? '#249bad' : '#D3D3D3'}
              />
              <Button
                title="10:00 AM"
                onPress={() => handleHourSelect('10:00 AM')}
                color={selectedHour === '10:00 AM' ? '#249bad' : '#D3D3D3'}
              />
              <Button
                title="11:00 AM"
                onPress={() => handleHourSelect('11:00 AM')}
                color={selectedHour === '11:00 AM' ? '#249bad' : '#D3D3D3'}
              />
              {/* Agrega más botones de hora según sea necesario */}
            </View>
            <Button title="Agendar cita" onPress={handleSubmit} />
          </View>
        </View>

        <Footer />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  hourGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#249bad',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Prueba;