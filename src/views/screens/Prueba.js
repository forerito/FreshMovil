import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ScrollView, StyleSheet, Dimensions } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Header from './Header';
import Footer from '../layouts/Footer';
import axios from 'axios';



const tiposDocumento = [
  "Cédula de ciudadanía",
  "Tarjeta de identidad",
  "Cédula de extranjería",
  "Pasaporte",
];

const Prueba = () => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipoCita, setTipoCita] = useState("");
  const [selectedHour, setSelectedHour] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [actualCitas, setActualCitas] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [procedimientos, setProcedimientos] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [citasAgendadas, setCitasAgendadas] = useState([]);
  const [noHayHorasDisponibles, setNoHayHorasDisponibles] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCitaParaMi, setIsCitaParaMi] = useState(true);

  const [availableHours, setAvailableHours] = useState(["08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "17:00:00", "17:30:00"]);


  useEffect(() => {
    axios.get('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos')
      .then(response => {
        const procedimientos = response.data;

        // Guardar los procedimientos en el estado del componente
        setEspecialistas(procedimientos);
      })
      .catch(error => {
        console.error('Error al obtener los procedimientos:', error);
      });
  }, []);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');

    const currentDateWithoutTime = new Date();
    currentDateWithoutTime.setHours(0, 0, 0, 0);



    // Encontrar el índice de la hora seleccionada
    const selectedIndex = availableHours.findIndex(hour => hour === selectedHour);

    // Eliminar la hora seleccionada del array de horas disponibles
    if (selectedIndex !== -1) {
      availableHours.splice(selectedIndex, 1);
    }

    // Actualizar el estado con las horas disponibles actualizadas
    setAvailableHours([...availableHours])

    // Obtener el procedimiento seleccionado
    const selectedProcedimiento = procedimientos.find((procedimiento) => procedimiento.nombre === tipoCita);

    // Obtener el identificador y el identificacion_especialistas del procedimiento seleccionado
    const identificacionProcedimiento = selectedProcedimiento ? selectedProcedimiento.identificacion_procedimientos : '';
    const identificacionEspecialistas = selectedProcedimiento ? selectedProcedimiento.identificacion_especialistas : '';

    // Obtener los valores del formulario
    const formData = {
      numero_documento: numeroDocumento,
      nombre_completo: nombre,
      tipo_documento: tipoDocumento,
      fecha: selectedDate,
      hora: selectedHour,
      estado_cita: 'Programada',
      id_paciente: userId,
      id_procedimiento: identificacionProcedimiento,
      id_especialista: identificacionEspecialistas, // Agregar el identificacion_especialistas al objeto formData
    };

    // Realizar la solicitud POST a la API
    axios
      .post('https://freshsmile.azurewebsites.net/FreshSmile/CrearCita', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API después de crear la cita
        console.log('Cita creada:', response.data);

        // Mostrar la alerta de SweetAlert
        Alert.alert('Cita', 'creada.');


        // Reiniciar los campos del formulario
        setTipoDocumento("");
        setNumeroDocumento("");
        setNombre("");
        setTipoCita("");
        setSelectedHour(null);
        setSelectedDate(new Date());
        setCitasAgendadas([...citasAgendadas, response.data]);
      })
      .catch((error) => {
        console.error('Error al crear la cita:', error);
      });


  };

  const isDateAvailable = (date) => {
    const selectedDateWithoutTime = new Date(date);
    selectedDateWithoutTime.setHours(0, 0, 0, 0); // Establecer la hora, minutos, segundos y milisegundos a cero

    return !unavailableDates.includes(selectedDateWithoutTime.toISOString().split("T")[0]);
  };

  // Genera una lista de fechas no disponibles de manera aleatoria o mediante una llamada al servidor
  useEffect(() => {
    const generateUnavailableDates = () => {
      // Replace this code with your logic to generate unavailable dates randomly or fetch them from the server
      const dates = [
        "2023-01-01", "2023-01-10", "2023-01-15", "2023-01-20", "2023-01-25",
        "2023-02-05", "2023-02-12", "2023-02-18", "2023-02-22", "2023-02-28",
        "2023-03-07", "2023-03-15", "2023-03-22", "2023-03-28", "2023-03-30",
        "2023-04-05", "2023-04-12", "2023-04-20", "2023-04-25", "2023-04-28",
        "2023-05-05", "2023-05-10", "2023-05-15", "2023-05-20", "2023-05-25",
        "2023-06-10", "2023-06-15", "2023-06-20",
        "2023-07-05", "2023-07-20", "2023-07-25", "2023-07-30",
        "2023-08-05", "2023-08-10", "2023-08-15", "2023-08-20", "2023-08-25",
        "2023-09-05", "2023-09-10", "2023-09-15", "2023-09-20", "2023-09-28",
        "2023-10-05", "2023-10-10", "2023-10-15", "2023-10-20", "2023-10-25",
        "2023-11-05", "2023-11-10", "2023-11-15", "2023-11-20", "2023-11-28",
        "2023-12-05", "2023-12-10", "2023-12-15", "2023-12-20", "2023-12-25"
      ];
      setUnavailableDates(dates);
    };

    generateUnavailableDates();
  }, []);

  // Función para filtrar las fechas y deshabilitar las no disponibles
  const filterDates = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return !unavailableDates.includes(formattedDate);
  };


  // Actualiza la fecha seleccionada
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // Abrir el selector de fecha al cargar el componente
    setIsModalVisible(true);
    getCitas();
  }, []);


  const getCitas = () => {
    axios
      .get("https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas")
      .then((res) => {
        const citas = res.data.map((cita) => {
          return { fecha: cita.fecha, hora: cita.hora };
        });
        setActualCitas(citas);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(filteredCitas);
  }, [filteredCitas]);

  useEffect(() => {
    const selectedDateString = selectedDate.toISOString().slice(0, 10);
    const filteredData = actualCitas.filter((cita) => cita.fecha === selectedDateString);
    const uniqueData = Array.from(new Set(filteredData.map((cita) => cita.hora)));
    setFilteredCitas(uniqueData);

    setNoHayHorasDisponibles(uniqueData.length === 0);
  }, [selectedDate, actualCitas]);


  useEffect(() => {
    console.log(actualCitas);
  }, [actualCitas]);

  useEffect(() => {
    setShowModal(true);
    getCitas();
  }, []);


  useEffect(() => {
    // Obtener el userId del AsyncStorage
    const obtenerUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('No se encontró el userId en el AsyncStorage');
          return;
        }

        // Realizar la solicitud HTTP para obtener los datos de la persona
        axios
          .get(`https://freshsmile.azurewebsites.net/FreshSmile/BuscarPacientes/${userId}`)
          .then((response) => {
            const data = response.data;

            // Establecer los valores en los campos del formulario
            setTipoDocumento(data.tipo_documento);
            setNumeroDocumento(data.identificacion_paciente);
            setNombre(data.nombre_completo);
          })
          .catch((error) => {
            console.error('Error al obtener los datos de la persona:', error);
          });
      } catch (error) {
        console.error('Error al obtener el userId del AsyncStorage:', error);
      }
    };

    obtenerUserId();
  }, []);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los procedimientos
    axios
      .get("https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos")
      .then((response) => {
        // Guardar los procedimientos en el estado
        setProcedimientos(response.data);
      })
      .catch((error) => {
        // Manejar el error en caso de que la solicitud falle
        console.error("Error al obtener los procedimientos:", error);
      });
  }, []);

  useEffect(() => {
    if (procedimientos.length > 0 && tipoCita === '') {
      setTipoCita(procedimientos[0].nombre);
    }
  }, [procedimientos]);

  const handleHourSelect = (hour) => {
    // Verificar si la hora seleccionada ya está ocupada
    const isHourAvailable = filteredCitas.every((cita) => cita !== hour);

    if (isHourAvailable) {
      setSelectedHour(hour);
    } else {
      alert("La hora seleccionada ya está ocupada. Por favor, elige otra hora.");
    }

  };

  const handleModalButtonClick = forMe => {
    setShowModal(false); // Cerrar la ventana modal al hacer clic en un botón
    setIsModalVisible(!isModalVisible);
    // Realizar acciones según el botón seleccionado (para mí o para otra persona)
    if (forMe) {
      setFieldsDisabled(true); // Bloquear los campos
    } else {
      // Aquí puedes establecer los valores predeterminados para tu propia cita
      // utilizando los datos del usuario actual o algún valor por defecto
      setTipoDocumento(""); // Limpiar los campos para evitar valores incorrectos
      setNumeroDocumento("");
      setNombre("");
      // Realizar acciones para permitir al usuario ingresar los datos de otra persona
      setFieldsDisabled(false); // Desbloquear los campos
    }
  };


  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCitaParaMi = (isParaMi) => {
    setIsCitaParaMi(isParaMi);
    handleToggleModal();
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.container}>
          <Text style={styles.titlePrincipal}>Agenda tu cita</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de documento:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={tipoDocumento}
                onChangeText={setTipoDocumento}
                placeholder="Seleccione un tipo de documento"
                required
                editable={!fieldsDisabled}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Número de documento:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={numeroDocumento.toString()}
                onChangeText={setNumeroDocumento}
                placeholder="Ingrese el número de documento"
                required
                editable={!fieldsDisabled}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre completo:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingrese su nombre completo"
                required
                editable={!fieldsDisabled}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de cita:</Text>
            <View style={styles.inputContainer1}>
              <Picker
                selectedValue={tipoCita}
                style={styles.text}
                onValueChange={(value) => setTipoCita(value)}
              >
                {procedimientos.map((procedimiento) => {
                  const key = procedimiento.id ? procedimiento.id.toString() : '';
                  return (
                    <Picker.Item
                      key={key}
                      label={procedimiento.nombre}
                      value={procedimiento.nombre}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>


          <View style={styles.formGroup}>
            <Text style={styles.label}>Fecha disponible:</Text>
            <TouchableOpacity onPress={() => setCalendarOpen(true)}>
              <View style={styles.inputContainer2}>
                <Text style={styles.text2}>{selectedDate ? selectedDate.toLocaleDateString() : 'Seleccione una fecha'}</Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={calendarOpen}
              mode="date"
              minimumDate={currentDate}
              onConfirm={date => {
                setSelectedDate(date);
                setCalendarOpen(false);
              }}
              onCancel={() => setCalendarOpen(false)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Horas disponibles:</Text>
            <View style={styles.hourGrid}>
              {availableHours.map((hour) => {
                const isHourAvailable = !filteredCitas.some(cita => cita === hour);

                if (isHourAvailable) {
                  return (
                    <TouchableOpacity
                      key={hour}
                      style={[
                        styles.hourButton,
                        selectedHour === hour ? styles.selected : null,
                      ]}
                      onPress={() => handleHourSelect(hour)}
                    >
                      <Text>{hour}</Text>
                    </TouchableOpacity>
                  );
                }

                return null;
              })}
            </View>
          </View>


          <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} activeOpacity={0.7}>
            <Text style={styles.title}>Agendar cita</Text>
          </TouchableOpacity>


        </View>

        <Modal visible={isModalVisible} animationType="none">
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.heading}>¿Para quién es la cita?</Text>

              <View style={styles.containerModal}>
                <TouchableOpacity
                  onPress={() => handleModalButtonClick(true)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Para mí</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleModalButtonClick(false)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Para otra persona</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Footer />


      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  titlePrincipal: {
    color: "#4fafd2",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  inputContainer1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    height: 50,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 10,
  },
  inputContainer2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    height: 60,

    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginTop: -11,
  },
  text2: {
    marginLeft: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    padding: 0,
    paddingHorizontal: 10,
  },
  hourGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  buttonContainer: {
    height: 50,
    width: "50%",
    backgroundColor: "#249bad",
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  hourButton: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#ccc',
  },
  button: {
    backgroundColor: '#249bad',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  modalButtonText: {
    color: '#fff',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    maxHeight: '80%',
  },
  selected: {
    // Estilos para la hora seleccionada
    backgroundColor: '#249bad',
  },
});

export default Prueba;