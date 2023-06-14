// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ScrollView, ImageBackground } from 'react-native';
// import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Header from './Header';
// import Icon from "react-native-vector-icons/FontAwesome5";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AgendarCita = ({ navigation }) => {

//   const [menuOpen, setMenuOpen] = useState(false);

//     const handlePress = () => {
//       setMenuOpen(!menuOpen);
//     };
  
//     const handleClose = () => {
//       setMenuOpen(false);
//     };

//   const [tipoDocumento, setTipoDocumento] = useState('');
//   const [numeroDocumento, setNumeroDocumento] = useState('');
//   const [nombrePaciente, setNombrePaciente] = useState('');
//   const [telefonoCita, setTelefonoCita] = useState('');
//   const [correoCita, setCorreoCita] = useState('');
//   const [fechaCita, setFechaCita] = useState('');
//   const [disponibilidadCita, setDisponibilidadCita] = useState('');
//   const [tipoCita, setTipoCita] = useState('');
//   const [sede, setSede] = useState('');

//   const handleGuardar = async () => {
//     if (
//       !tipoDocumento ||
//       !numeroDocumento ||
//       !nombrePaciente ||
//       !telefonoCita ||
//       !correoCita ||
//       !fechaCita ||
//       !disponibilidadCita ||
//       !tipoCita ||
//       !sede
//     ) {
//       Alert.alert('Error', 'Por favor, completa todos los campos', [{ text: 'Cerrar' }]);
//       return;
//     }


//     const citasGuardadas = await AsyncStorage.getItem('citas');
//     let citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];

//     const horaExistente = citas.find((cita) => cita.disponibilidadCita === disponibilidadCita);
//     if (horaExistente) {
//       Alert.alert('Error', 'La hora seleccionada ya está en uso', [{ text: 'Cerrar' }]);
//       return;
//     }

//     const nuevaCita = {
//       tipoDocumento,
//       numeroDocumento,
//       nombrePaciente,
//       telefonoCita,
//       correoCita,
//       fechaCita,
//       disponibilidadCita,
//       tipoCita,
//       sede,
//     };
//     citas.push(nuevaCita);
//     await AsyncStorage.setItem('citas', JSON.stringify(citas));
//     Alert.alert('Felicidades', '¡Tu cita ha sido agendada!', [{ text: 'Cerrar' }]);

//     setTipoDocumento('');
//     setNumeroDocumento('');
//     setNombrePaciente('');
//     setTelefonoCita('');
//     setCorreoCita('');
//     setFechaCita('');
//     setDisponibilidadCita('');
//     setTipoCita('');
//     setSede('');

//   };

//   return (
//     <SafeAreaView className="flex-1 ">

//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

//         <Header />

//         <View style={{ backgroundColor: "black", marginLeft: 5, marginRight: 5 }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 340, marginTop: -43 }}>
//             <TouchableOpacity onPress={handlePress}>
//               <Icon name="bars" size={24} color="#5FFDFF" />
//             </TouchableOpacity>
//           </View>

//           {menuOpen && (
//             <View style={{ marginTop: 8 }}>
//               <TouchableOpacity onPress={handleClose}>
//                 <View style={styles.contentMenuCerrar}>
//                   <Icon name="window-close" size={24} color="white" />
//                   <Text style={{ marginLeft: 8, color: 'white' }}>Cerrar</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="home" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Inicio</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("NosotrosScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="users" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Nosotros</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("ProcedimientosScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="tooth" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Procedimientos</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("SedesScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="globe-americas" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Sedes</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="comments" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Contacto</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("CitasAgendadas")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="calendar-alt" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Mis citas</Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("CitasPendientes")}>
//                 <View style={styles.contentMenuItems}>
//                   <Icon name="user-clock" size={24} color="white" />
//                   <Text style={styles.contentMenuText}>Agendamiento</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         <ImageBackground
//           source={{ uri: "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852207/Fresh_Smile_Cmills/galeria8_g8lbub.jpg" }}
//           resizeMode={"stretch"}
//           style={styles.fondoContainer}
//         >

//           <View style={styles.formContainertitulo}>
//             <Text style={styles.formTitle}>Agenda aquí tu cita</Text>
//             <Text style={styles.formText}>Llena este formulario para agendar tu cita</Text>
//           </View>

//           <AlertNotificationRoot>
//             <View style={styles.formContainer}>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Tipo de documento:" value={tipoDocumento} onChangeText={setTipoDocumento} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Número de documento:" value={numeroDocumento} onChangeText={setNumeroDocumento} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Nombre completo:" value={nombrePaciente} onChangeText={setNombrePaciente} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Teléfono" value={telefonoCita} onChangeText={setTelefonoCita} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Correo electrónico" value={correoCita} onChangeText={setCorreoCita} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Fecha de nacimiento</Text>
//                 <TextInput style={styles.input} placeholder="dd/mm/aaaa" value={fechaCita} onChangeText={setFechaCita} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Disponibilidad</Text>
//                 <TextInput style={styles.input} placeholder="hora" value={disponibilidadCita} onChangeText={setDisponibilidadCita} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Tipo de cita:" value={tipoCita} onChangeText={setTipoCita} />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput style={styles.input} placeholder="Sede Armenia, Tebaida, Genová" value={sede} onChangeText={setSede} />
//               </View>

//               <View style={styles.containerButton}>
//                 <TouchableOpacity style={styles.button} onPress={handleGuardar}>
//                   <Text style={styles.buttonText}>Agendar cita</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.containerButton}>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CitasAgendadas")}>
//                   <Text style={styles.buttonText}>Ver mis citas</Text>
//                 </TouchableOpacity>
//               </View>

//             </View>
//           </AlertNotificationRoot>


//         </ImageBackground>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   contentMenuCerrar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 300,
//     marginBottom: 5,
//   },
//   contentMenuItems: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'black',
//     padding: 10,
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   contentMenuText: {
//     marginLeft: 8,
//     color: 'white',
//     fontSize: 16,
//   },
//   fondoContainer: {
//     marginTop: 0,
//     opacity: 0.9,
//   },
//   formContainertitulo: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   formTitle: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'white',
//   },
//   formText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//     color: 'white',
//   },
//   inputContainer: {
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 1,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderBottomColor: '#b1a1a1',
//     borderBottomWidth: 3,
//     borderRadius: 10,
//     padding: 10,
//     backgroundColor: "lightgray",
//   },
//   containerButton: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#249bad',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { isSameDay } from "date-fns";

const tiposDocumento = [
  "Cédula de ciudadanía",
  "Tarjeta de identidad",
  "Cédula de extranjería",
  "Pasaporte",
];

const AgendarCita = ({ navigation }) => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [tipoCita, setTipoCita] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const handleSubmit = () => {
    // Crear el objeto de datos a enviar al backend
    const data = {
      tipoDocumento,
      numeroDocumento,
      nombre,
      telefono,
      email,
      tipoCita,
      selectedDate,
      selectedHour,
    };

    // Realizar la solicitud POST al backend
    // ...
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    setShowDatePicker(true);

    }
    setShowDatePicker(false);
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Agenda tu cita</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de documento:</Text>
        <Picker
          selectedValue={tipoDocumento}
          onValueChange={(value) => setTipoDocumento(value)}
        >
          <Picker.Item label="Seleccione un tipo de documento" value="" />
          {tiposDocumento.map((tipo) => (
            <Picker.Item key={tipo} label={tipo} value={tipo} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de documento:</Text>
        <TextInput
          style={styles.input}
          value={numeroDocumento}
          onChangeText={(text) => setNumeroDocumento(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={(text) => setTelefono(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de cita:</Text>
        <Picker
          selectedValue={tipoCita}
          onValueChange={(value) => setTipoCita(value)}
        >
          <Picker.Item label="Seleccione un tipo de cita" value="" />
          <Picker.Item label="Consulta" value="Consulta" />
          <Picker.Item label="Control" value="Control" />
          <Picker.Item label="Emergencia" value="Emergencia" />
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha disponible:</Text>
        <Button title="Seleccionar fecha" onPress={showDateTimePicker} />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          value={selectedDate.toLocaleDateString()}
          editable={false}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Horas disponibles:</Text>
        <View style={styles.hourGrid}>
          <Button
            title="9:00 AM"
            onPress={() => handleHourSelect("9:00 AM")}
          />
          <Button
            title="10:00 AM"
            onPress={() => handleHourSelect("10:00 AM")}
          />
          <Button
            title="11:00 AM"
            onPress={() => handleHourSelect("11:00 AM")}
          />
          {/* Agrega más botones de hora según tu necesidad */}
        </View>
      </View>
      <View style={styles.formGroup}>
        <Button title="Agendar cita" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  hourGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
};

export default AgendarCita;