import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';

const TablaAdmin = () => {
//   const [data, setData] = useState([]);
//   const [especialistas, setEspecialistas] = useState({});
//   const [procedimientos, setProcedimientos] = useState({});
//   const userId = AsyncStorage.getItem('userId');
//   const [isEditing, setIsEditing] = useState(false);
//   const [citaEditando, setCitaEditando] = useState(null);
//   const [campoEditando, setCampoEditando] = useState(null);
//   const [citasProgramadas, setCitasProgramadas] = useState([]);
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());
//   const [error, setError] = useState(false);
//   const [showError, setShowError] = useState(false);

//   const handleCancelarEdicion = () => {
//     setIsEditing(false);
//     setCitaEditando(null);
//   };

//   const EstadoCitaEnum = {
//     REALIZADA: 'Realizada',
//     PROGRAMADA: 'Programada',
//     CANCELADA: 'Cancelada',
//     AUSENCIA: 'Ausencia',
//   };

//   useEffect(() => {
//     fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas')
//       .then(response => response.json())
//       .then(data => {
//         // console.log(data); 
//         // Filtrar las citas por el id_paciente que coincida con userId
//         const citasUsuario = data.filter(cita => cita.id_especialista === parseInt(userId));
//         setData(citasUsuario);

//         // Obtener una lista de identificaciones de especialistas únicos en las citas
//         const especialistasIds = [...new Set(citasUsuario.map(cita => cita.id_especialista))];

//         // Realizar una solicitud para obtener los nombres de los especialistas
//         Promise.all(
//           especialistasIds.map(id =>
//             fetch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${id}`)
//               .then(response => response.json())
//           )
//         )
//           .then(especialistasData => {
//             // Crear un objeto con las identificaciones de los especialistas como clave y sus nombres como valor
//             const especialistasMap = {};
//             especialistasData.forEach(especialista => {
//               especialistasMap[especialista.identificacion_especialista] = especialista.nombre_completo;
//             });
//             setEspecialistas(especialistasMap);
//           })
//           .catch(error => console.error(error));

//         // Obtener una lista de identificaciones de procedimientos únicos en las citas
//         const procedimientosIds = [...new Set(citasUsuario.map(cita => cita.id_procedimiento))];

//         fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos')
//           .then(response => response.json())
//           .then(procedimientosData => {
//             // Filtrar los procedimientos por los ids coincidentes
//             const procedimientosFiltrados = procedimientosData.filter(procedimiento =>
//               procedimientosIds.includes(procedimiento.identificacion_procedimientos)
//             );

//             // Crear un objeto con las identificaciones de los procedimientos como clave, 
//             // sus nombres y costos como valores
//             const procedimientosMap = {};
//             procedimientosFiltrados.forEach(procedimiento => {
//               procedimientosMap[procedimiento.identificacion_procedimientos] = {
//                 nombre: procedimiento.nombre,
//                 costo: procedimiento.costo
//               };
//             });
//             setProcedimientos(procedimientosMap);
//           })
//       })
//       .catch(error => console.error(error));
//   }, [userId]);

//   const formatFechaCreacion = (fecha) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(fecha).toLocaleDateString(undefined, options);
//   };

//   const handleEditarCita = async (citaEditada) => {
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const currentDate = new Date();
//       const fechaCita = new Date(citaEditada.fecha);
//       const horaCita = new Date(`${citaEditada.fecha}T${citaEditada.hora}`);

//       if (fechaCita > currentDate) {
//         swal('Error', 'No puedes cambiar la fecha de una cita que aún no ha llegado', 'error');
//         return;
//       }
//       if (
//         citaEditada.estado_cita === EstadoCitaEnum.PROGRAMADA &&
//         isFechaPasada // Verificar si la fecha de la cita ha pasado
//       ) {
//         // Mostrar una alerta con botón de cancelar
//         swal({
//           title: 'Error',
//           text: 'No puedes establecer el estado como "Programada" si la fecha de la cita ya ha pasado',
//           icon: 'error',
//           buttons: {
//             cancel: {
//               text: 'Cancelar',
//               value: null,
//               visible: true,
//               closeModal: true,
//             },
//           },
//         }).then((value) => {
//           if (value === null) {
//             // El usuario ha cancelado, no se realiza ningún cambio
//             setIsEditing(false);
//             setCitaEditando(null);
//           }
//         });

//         return;
//       }
//       const estadoCitaActual = citaEditada.estado_cita;

//       if (estadoCitaActual !== EstadoCitaEnum.REALIZADA && estadoCitaActual !== EstadoCitaEnum.AUSENCIA) {
//         citaEditada.estado_cita = EstadoCitaEnum.REALIZADA; // Establecer el estado como "Realizada"
//       }
//       const response = await axios.put(
//         `https://freshsmile.azurewebsites.net/FreshSmile/ModificarCita/${citaEditada.identificacion_citas}`,
//         citaEditada,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         setIsEditing(false);
//         setCitaEditando(null);
//         swal('Cita actualizada', 'La cita ha sido actualizada correctamente', 'success');
//       } else {
//         swal('Error', 'Hubo un problema al actualizar la cita', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       setError(true);
//       setShowError(true);
//       alert('Error', 'Hubo un problema al actualizar la cita', 'error');
//     }


//   };
//   const actualizarEstadoCita = () => {
//     const currentDate = new Date();
//     setCurrentDateTime(new Date());

//     const citasActualizadas = data.map(cita => {
//       const fechaCita = new Date(cita.fecha);
//       const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

//       // Verificar si ha pasado un día completo después de la fecha y hora programadas
//       if (
//         cita.estado_cita !== EstadoCitaEnum.REALIZADA &&
//         currentDate > fechaCita &&
//         currentDate.getTime() - fechaCita.getTime() >= 24 * 60 * 60 * 1000 &&
//         currentDate > horaCita
//       ) {
//         return {
//           ...cita,
//           estado_cita: EstadoCitaEnum.AUSENCIA
//         };
//       }

//       return cita;
//     });

//     setData(citasActualizadas);
//   };

//   // useEffect(() => {
//   //   // Llamar a la función actualizarEstadoCita cada vez que se renderice el componente
//   //   actualizarEstadoCita();
//   // }, [userId]);

//   const getEstadoCita = (cita) => {
//     const currentDate = currentDateTime;
//     const fechaCita = new Date(cita.fecha);
//     const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

//     if (currentDate > fechaCita && currentDate.getDate() - fechaCita.getDate() === 1) {
//       if (cita.estado_cita === EstadoCitaEnum.AUSENCIA || cita.estado_cita === EstadoCitaEnum.REALIZADA) {
//         return cita.estado_cita;
//       } else {
//         return EstadoCitaEnum.AUSENCIA;
//       }
//     }

//     if (currentDate >= horaCita && currentDate.getHours() < 17 && cita.estado_cita === EstadoCitaEnum.PROGRAMADA) {
//       return EstadoCitaEnum.PROGRAMADA;
//     }

//     return cita.estado_cita;
//   };


//   const handleEditCitaClick = (cita) => {
//     setIsEditing(true);
//     setCitaEditando(cita.identificacion_citas);
//   };

//   const handleGuardarCitaClick = async (cita) => {
//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       const currentDate = new Date();
//       const fechaCita = new Date(cita.fecha);
//       const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

//       if (fechaCita > currentDate) {
//         swal('Error', 'No puedes cambiar la fecha de una cita que aún no ha llegado', 'error');
//         return;
//       }
//       if (
//         cita.estado_cita === EstadoCitaEnum.PROGRAMADA &&
//         isFechaPasada // Verificar si la fecha de la cita ha pasado
//       ) {
//         // Mostrar una alerta con botón de cancelar
//         swal({
//           title: 'Error',
//           text: 'No puedes establecer el estado como "Programada" si la fecha de la cita ya ha pasado',
//           icon: 'error',
//           buttons: {
//             cancel: {
//               text: 'Cancelar',
//               value: null,
//               visible: true,
//               closeModal: true,
//             },
//           },
//         }).then((value) => {
//           if (value === null) {
//             // El usuario ha cancelado, no se realiza ningún cambio
//             setIsEditing(false);
//             setCitaEditando(null);
//           }
//         });

//         return;
//       }
//       const estadoCitaActual = cita.estado_cita;

//       if (estadoCitaActual !== EstadoCitaEnum.REALIZADA && estadoCitaActual !== EstadoCitaEnum.AUSENCIA) {
//         cita.estado_cita = EstadoCitaEnum.REALIZADA; // Establecer el estado como "Realizada"
//       }
//       const response = await axios.put(
//         `https://freshsmile.azurewebsites.net/FreshSmile/ModificarCita/${cita.identificacion_citas}`,
//         cita,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         setIsEditing(false);
//         setCitaEditando(null);
//         swal('Cita actualizada', 'La cita ha sido actualizada correctamente', 'success');
//       } else {
//         swal('Error', 'Hubo un problema al actualizar la cita', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       swal('Error', 'Hubo un problema al actualizar la cita', 'error');
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

//         <Header />

//         <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
//           <View style={styles.container}>
//           <Text style={styles.text}>item.hora</Text>
//             {data.map((item, index) => (
//               <View key={index}>
//                 <View key={index}>
//                   <Text style={styles.text}>{item.identificacion_citas}</Text>
//                   <Text style={styles.text}>{item.numero_documento}</Text>
//                   <Text style={styles.text}>{item.nombre_completo}</Text>
//                   <Text style={styles.text}>{item.tipo_documento}</Text>
//                   <Text style={styles.text}>{item.fecha}</Text>
//                   <Text style={styles.text}>{item.fecha}</Text>
//                   <Text style={styles.text}>{item.hora}</Text>
//                   <Text style={styles.text}>{item.id_paciente}</Text>
//                   <Text>
//                     {isEditing && citaEditando === item.identificacion_citas ? (
//                       campoEditando === 'estado_cita' ? (
//                         <TextInput
//                           value={item.estado_cita}
//                           onChangeText={(text) => {
//                             const newState = [...data];
//                             newState[index].estado_cita = text;
//                             setData(newState);
//                           }}
//                         />
//                       ) : (
//                         getEstadoCita(item)
//                       )
//                     ) : (
//                       getEstadoCita(item)
//                     )}
//                   </Text>
//                   <Text>{procedimientos[item.id_procedimiento]?.costo?.toFixed(3)}</Text>
//                   {/* <View>
//                     {item.estado_cita && !isEditing && !error ? (
//                       <TouchableOpacity
//                         style={styles.button}
//                         onPress={() => {
//                           setIsEditing(true);
//                           setCampoEditando('estado_cita');
//                           setCitaEditando(item.identificacion_citas);
//                         }}
//                       >
//                         <Text>Editar</Text>
//                       </TouchableOpacity>
//                     ) : (
//                       <View>
//                         <TouchableOpacity
//                           style={styles.button}
//                           onPress={() => {
//                             handleGuardarCitaClick(item);
//                           }}
//                         >
//                           <Text>Guardar</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={styles.button}
//                           onPress={() => {
//                             handleCancelarEdicion();
//                           }}
//                         >
//                           <Text>Cancelar</Text>
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                   </View> */}
//                 </View>
//               </View>
//             ))}
//           </View>


//         </ScrollView>
//       </ScrollView>
//     </SafeAreaView>
//   );
};

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     marginBottom: 10,
//     width: '100%'
//   },
//   itemContainer: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#eaeaea',
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


export default TablaAdmin;