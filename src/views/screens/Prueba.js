// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, Button, Modal, ScrollView, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from './Header';
// import Footer from '../layouts/Footer';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const tiposDocumento = [
//   'Cédula de ciudadanía',
//   'Tarjeta de identidad',
//   'Cédula de extranjería',
//   'Pasaporte',
// ];

// const Prueba = () => {
//   const [tipoDocumento, setTipoDocumento] = useState('');
//   const [numeroDocumento, setNumeroDocumento] = useState('');
//   const [nombre, setNombre] = useState('');
//   const [tipoCita, setTipoCita] = useState('');
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedHour, setSelectedHour] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isCitaParaMi, setIsCitaParaMi] = useState(true);
//   const [fieldsDisabled, setFieldsDisabled] = useState(false); // Estado para controlar si los campos están bloqueados o no
//   const [actualCitas, setActualCitas] = useState([]);
//   const [filteredCitas, setFilterCitas] = useState([]);

//   useEffect(() => {
//     // Abrir el selector de fecha al cargar el componente
//     setIsModalVisible(true);
//   }, []);

//   const handleSubmit = () => {
//     // Crear el objeto de datos a enviar al backend
//     const data = {
//       tipo_documento_acompañante: tipoDocumento,
//       identificacion_acompañante: numeroDocumento,
//       nombre_completo: nombre,
//       fecha: selectedDate,
//       hora: selectedHour,
//     };


//   };

//   const handleHourSelect = (hour) => {
//     setSelectedHour(hour);
//   };

//   const handleDateConfirm = (date) => {
//     setSelectedDate(date);
//     console.log("A date has been picked: ", date);
//     setShowDatePicker(false);
//   };

//   const handleToggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   const handleCitaParaMi = (isParaMi) => {
//     setIsCitaParaMi(isParaMi);
//     handleToggleModal();
//   };

//   return (
//     <SafeAreaView className="flex-1 ">

//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

//         <Header />

//         <View style={styles.container}>
//           <Text style={styles.heading}>Agenda tu cita</Text>
//           <View style={styles.formContainer}>


//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Tipo de documento</Text>
//               <View style={styles.inputContainer}>
//                 <Picker
//                   selectedValue={tipoDocumento}
//                   onValueChange={(value) => setTipoDocumento(value)}
//                   enabled={!isCitaParaMi}
//                   style={styles.input}
//                 >
//                   <Picker.Item label="Seleccione un tipo de documento" value="" />
//                   {tiposDocumento.map((tipo) => (
//                     <Picker.Item key={tipo} label={tipo} value={tipo} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Número de documento:</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   placeholder="Ingrese su dirección"
//                   value={numeroDocumento}
//                   onChangeText={(text) => setNumeroDocumento(text)}
//                   editable={!isCitaParaMi}
//                   required
//                 />
//               </View>
//             </View>



//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Nombre completo:</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   placeholder="Ingrese su nombre"
//                   value={nombre}
//                   onChangeText={(text) => setNombre(text)}
//                   editable={!isCitaParaMi}
//                   required
//                 />
//               </View>
//             </View>



//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Tipo de cita:</Text>
//               <View style={styles.inputContainer}>
//                 <Picker
//                   selectedValue={tipoCita}
//                   onValueChange={(value) => setTipoCita(value)}
//                   enabled={!isCitaParaMi}
//                   style={styles.input}
//                 >
//                   <Picker.Item label="Seleccione el tipo de cita" value="" />
//                   <Picker.Item label="Consulta" value="Consulta" />
//                   <Picker.Item label="Control" value="Control" />
//                   <Picker.Item label="Emergencia" value="Emergencia" />
//                 </Picker>
//               </View>
//             </View>

//             <Modal visible={isModalVisible} animationType="none">
//               <View style={styles.container}>
//                 <Text style={styles.heading}>¿Para quién es la cita?</Text>

//                 <View style={styles.containerModal}>
//                   <TouchableOpacity
//                     onPress={() => handleCitaParaMi(true)}
//                     style={styles.button}
//                   >
//                     <Text style={styles.buttonText}>Para mí</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => handleCitaParaMi(false)}
//                     style={styles.button}
//                   >
//                     <Text style={styles.buttonText}>Para otra persona</Text>
//                   </TouchableOpacity>
//                 </View>

//               </View>
//             </Modal>

//             <Text style={styles.label}>Fecha disponible:</Text>
//             <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
//             {selectedDate && <Text>{selectedDate.toDateString()}</Text>}
//             <DateTimePickerModal
//               isVisible={showDatePicker}
//               mode="date"
//               onConfirm={handleDateConfirm}
//               onCancel={() => setShowDatePicker(false)}
//             />

//             <Text style={styles.label}>Horas disponibles:</Text>
//             <View style={styles.hourGrid}>
//               <Button
//                 title="9:00 AM"
//                 onPress={() => handleHourSelect('9:00 AM')}
//                 color={selectedHour === '9:00 AM' ? '#249bad' : '#D3D3D3'}
//               />
//               <Button
//                 title="10:00 AM"
//                 onPress={() => handleHourSelect('10:00 AM')}
//                 color={selectedHour === '10:00 AM' ? '#249bad' : '#D3D3D3'}
//               />
//               <Button
//                 title="11:00 AM"
//                 onPress={() => handleHourSelect('11:00 AM')}
//                 color={selectedHour === '11:00 AM' ? '#249bad' : '#D3D3D3'}
//               />
//               {/* Agrega más botones de hora según sea necesario */}
//             </View>
//             <Button title="Agendar cita" onPress={handleSubmit} />
//           </View>
//         </View>

//         <Footer />

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '80%',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#333',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   hourGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   containerModal: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: '#249bad',
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Prueba;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Prueba = () => {
  const [actualCitas, setActualCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoCita, setTipoCita] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCitaParaMi, setIsCitaParaMi] = useState(true);
  const [telefono, setTelefono] = useState('');
  const [procedimientos, setProcedimientos] = useState([]);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getCitas = () => {
    axios.get("https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas")
      .then(res => setActualCitas(res.data.map(cita => ({ fecha: cita.fecha, hora: cita.hora }))))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    console.log(filteredCitas);
  }, [filteredCitas]);

  useEffect(() => {
    console.log(selectedDate?.toISOString().slice(0, 10) || "");
    console.log(actualCitas.filter(cita => cita.fecha === selectedDate?.toISOString().slice(0, 10)));
    setFilteredCitas(actualCitas.filter(cita => cita.fecha === selectedDate?.toISOString().slice(0, 10)).map(cita2 => cita2.hora));
  }, [selectedDate]);

  useEffect(() => {
    console.log(actualCitas);
  }, [actualCitas]);

  useEffect(() => {
    // Abrir el selector de fecha al cargar el componente
    setIsModalVisible(true);
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
            setTelefono(data.telefono);
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
      .then(response => {
        // Guardar los procedimientos en el estado
        setProcedimientos(response.data);
      })
      .catch(error => {
        // Manejar el error en caso de que la solicitud falle
        console.error("Error al obtener los procedimientos:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el objeto de datos a enviar al backend
    const data = {
      identificacion_citas: numeroDocumento,
      numero_documento: numeroDocumento,
      nombre_completo: nombre,
      tipo_documento: tipoDocumento,
      fecha: selectedDate,
      hora: selectedHour,
      estado_cita: "Confirmada",
    };

    // Realizar la solicitud POST al backend
    axios
      .post("https://freshsmile.azurewebsites.net/FreshSmile/CrearCita", data)
      .then(response => {
        // Manejar la respuesta del backend si es necesario
        console.log(response.data);
        // Restablecer los campos del formulario después de enviar los datos
        setTipoDocumento("");
        setNumeroDocumento("");
        setNombre("");
        setTelefono("");
        setEmail("");
        setTipoCita("");
        setSelectedHour(null);
        setSelectedDate(null);
        // Mostrar una alerta de cita creada con éxito
        alert("Cita creada con éxito");
      })
      .catch(error => {
        // Manejar el error si la solicitud no se completa correctamente
        console.error(error);
      });
  };

  const handleHourSelect = hour => {
    setSelectedHour(hour);
    console.log(hour)
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const filterDates = () => {
    // Implement your logic for date filtering
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

  const availableHours = ["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00"];

  return (
    <View>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dexfjrgyw/image/upload/v1686448002/agendarcita_obeh4x.jpg' }}
        style={styles.manImage}
      />
      <View style={styles.agendaFormContainer}>
        <Text style={styles.heading}>Agenda tu cita</Text>
        <View>
          <Text>Tipo de documento:</Text>
          <TextInput
            style={styles.input}
            value={tipoDocumento}
            onChangeText={setTipoDocumento}
            placeholder="Seleccione un tipo de documento"
            required
            editable={!fieldsDisabled}
          />
        </View>
        <View>
          <Text>Número de documento:</Text>
          <TextInput
            style={styles.input}
            value={numeroDocumento.toString()}
            onChangeText={setNumeroDocumento}
            placeholder="Ingrese el número de documento"
            required
            editable={!fieldsDisabled}
          />
        </View>
        <View>
          <Text>Nombre completo:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingrese su nombre completo"
            required
            editable={!fieldsDisabled}
          />
        </View>


        <View>
          <Text>Tipo de cita:</Text>
          <Picker
            selectedValue={tipoCita}
            onValueChange={(value) => setTipoCita(value)}
          >
            <Picker.Item label="Seleccione un tipo de cita" value="" />
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


        <View>
          <Text>Fecha disponible:</Text>
          <TouchableOpacity onPress={() => setCalendarOpen(true)}>
            <Text>{selectedDate ? selectedDate.toLocaleDateString() : 'Seleccione una fecha'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={calendarOpen}
            mode="date"
            onConfirm={date => {
              setSelectedDate(date);
              setCalendarOpen(false);
            }}
            onCancel={() => setCalendarOpen(false)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Horas disponibles:</Text>
          <View style={styles.hourGrid}>
            {availableHours.map((hour) => {
              if (filteredCitas.length > 0) {
                if (!filteredCitas.includes(hour)) {
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
              } else {
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
            })}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Agendar cita</Text>
        </TouchableOpacity>
      </View>
      {showModal && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>¿Para quién es la cita?</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleModalButtonClick(true)}
            >
              <Text>Para mí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleModalButtonClick(false)}
            >
              <Text>Alguien más</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


      <Modal visible={isModalVisible} animationType="none">
        <View style={styles.container}>
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
      </Modal>

    </View>
  );
};

const styles = {
  formGroup: {
    // Estilos para el contenedor del formulario
    // backgroundColor: '#249bad',
  },
  hourGrid: {
    // Estilos para el contenedor de las horas
    // backgroundColor: '#249bad',
  },
  hourButton: {
    // Estilos para los botones de las horas
    // backgroundColor: '#249bad',
  },
  selected: {
    // Estilos para la hora seleccionada
    backgroundColor: '#249bad',
  },
}

export default Prueba;
