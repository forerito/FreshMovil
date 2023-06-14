// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import { SafeAreaView } from "react-native-safe-area-context";


// const TablaUsuario = ({ navigation }) => {
//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await axios.get('https://freshsmile.azurewebsites.net/FreshSmile/paciente');
//   //     setData(response.data);
//   //   } catch (error) {
//   //     console.error('Error al obtener los datos:', error);
//   //     Alert.alert('Error al obtener los datos', 'Hubo un problema al obtener los datos de la API');
//   //   }
//   // };

//   // const handleDelete = async (id) => {
//   //   Alert.alert(
//   //     'Eliminar cita',
//   //     '¿Estás seguro que deseas eliminar esta cita?',
//   //     [
//   //       {
//   //         text: 'No',
//   //         style: 'cancel',
//   //       },
//   //       {
//   //         text: 'Sí',
//   //         onPress: async () => {
//   //           try {
//   //             await axios.delete(`URL_DE_TU_API/${id}`);
//   //             fetchData();
//   //             Alert.alert('Cita eliminada', 'Tu cita se ha eliminado correctamente');
//   //           } catch (error) {
//   //             console.error(error);
//   //             Alert.alert('Error al eliminar la cita', 'Hubo un problema al eliminar la cita');
//   //           }
//   //         },
//   //       },
//   //     ],
//   //     { cancelable: true }
//   //   );
//   // };

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
//         <View style={styles.container}>
//           <Text style={styles.title}>Mis citas</Text>
//           <ScrollView horizontal={true} style={styles.tableContainer}>
//             <View>
//               <View style={styles.tableHeader}>
//                 <Text style={styles.columnHeader}>ID</Text>
//                 <Text style={styles.columnHeader}>Tipo de cita</Text>
//                 <Text style={styles.columnHeader}>Nombre del doctor</Text>
//                 <Text style={styles.columnHeader}>Fecha</Text>
//                 <Text style={styles.columnHeader}>Hora</Text>
//                 <Text style={styles.columnHeader}>Email</Text>
//                 <Text style={styles.columnHeader}>Acciones</Text>
//               </View>
//               {/* {data.map((item) => ( */}

//                 <View  style={styles.tableHeader}>
//                   <Text style={styles.column}>1</Text>
//                   <Text style={styles.column1}>Limpieza</Text>
//                   <Text style={styles.column2}>Camilo A Forero</Text>
//                   <Text style={styles.column3}>7/06/2023</Text>
//                   <Text style={styles.column4}>12:28 p.m.</Text>
//                   <Text style={styles.column5}>forero5515@gmail.com</Text>
//                   {/* <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
//                     <Text style={styles.deleteButtonText}>Cancelar cita</Text>
//                   </TouchableOpacity> */}
//                 </View>

//                 <View  style={styles.tableHeader}>
//                   <Text style={styles.column}>1</Text>
//                   <Text style={styles.column1}>Limpieza</Text>
//                   <Text style={styles.column2}>Camilo A Forero</Text>
//                   <Text style={styles.column3}>7/06/2023</Text>
//                   <Text style={styles.column4}>12:28 p.m.</Text>
//                   <Text style={styles.column5}>forero5515@gmail.com</Text>
//                   {/* <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
//                     <Text style={styles.deleteButtonText}>Cancelar cita</Text>
//                   </TouchableOpacity> */}
//                 </View>

//                 <View  style={styles.tableHeader}>
//                   <Text style={styles.column}>10</Text>
//                   <Text style={styles.column1}>Limpieza</Text>
//                   <Text style={styles.column2}>Camilo A Forero</Text>
//                   <Text style={styles.column3}>7/06/2023</Text>
//                   <Text style={styles.column4}>12:28 p.m.</Text>
//                   <Text style={styles.column5}>forero5515@gmail.com</Text>
//                   <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
//                     <Text style={styles.deleteButtonText}>Cancelar cita</Text>
//                   </TouchableOpacity>
//                 </View>
//               {/* // ))} */}
//             </View>
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 20,
//     paddingHorizontal: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   tableContainer: {
//     borderColor: 'black',
//     borderWidth: 2,
//     borderRadius: 5,
//     padding: 10,
//   },
//   tableHeader: {
//     color: 'black',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 10,
//   },
//   columnHeader: {
//     padding: 20,
//     color: 'black',
//     textAlign: 'center',
//   },
//   tableRow: {
//     // flex: 1,
//     color: 'black',
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 10,
//   },
//   column: {
//     marginLeft: 25,
//     color: 'black',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
//   column1: {
//     marginLeft: 47,
//     color: 'black',
//     textAlign: 'center',
//   },
//   column2: {
//     marginLeft: 60,
//     color: 'black',
//     textAlign: 'center',
//   },
//   column3: {
//     marginLeft: 35,
//     color: 'black',
//     textAlign: 'center',
//   },
//   column4: {
//     marginLeft: 15,
//     color: 'black',
//     textAlign: 'center',
//   },
//   column5: {
//     marginLeft: 25,
//     color: 'black',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default TablaUsuario;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';

const TablaUsuario = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [especialistas, setEspecialistas] = useState({});
  const [procedimientos, setProcedimientos] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Alert.alert('Hola', '¡Aquí puedes ver tus citas!', [
    //   { text: 'OK', onPress: () => { } }
    // ]);

    AsyncStorage.getItem('userId')
      .then(value => {
        if (value) {
          setUserId(value);
          fetchCitasUsuario(value);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const fetchCitasUsuario = (userId) => {
    axios.get('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas')
      .then(response => response.data)
      .then(data => {
        // Filtrar las citas por el id_paciente que coincida con userId
        const citasUsuario = data.filter(cita => cita.id_paciente === parseInt(userId));
        setData(citasUsuario);

        // Obtener una lista de identificaciones de especialistas únicos en las citas
        const especialistasIds = [...new Set(citasUsuario.map(cita => cita.id_especialista))];

        // Realizar una solicitud para obtener los nombres de los especialistas
        Promise.all(
          especialistasIds.map(id =>
            axios.get(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${id}`)
              .then(response => response.data)
          )
        )
          .then(especialistasData => {
            // Crear un objeto con las identificaciones de los especialistas como clave y sus nombres como valor
            const especialistasMap = {};
            especialistasData.forEach(especialista => {
              especialistasMap[especialista.identificacion_especialista] = especialista.nombre_completo;
            });
            setEspecialistas(especialistasMap);
          })
          .catch(error => console.error(error));

        // Obtener una lista de identificaciones de procedimientos únicos en las citas
        const procedimientosIds = [...new Set(citasUsuario.map(cita => cita.id_procedimiento))];

        // Realizar una solicitud para obtener los procedimientos
        axios.get('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos')
          .then(response => response.data)
          .then(procedimientosData => {
            // Filtrar los procedimientos por los ids coincidentes
            const procedimientosFiltrados = procedimientosData.filter(procedimiento =>
              procedimientosIds.includes(procedimiento.identificacion_procedimientos)
            );

            // Crear un objeto con las identificaciones de los procedimientos como clave y sus nombres como valor
            const procedimientosMap = {};
            procedimientosFiltrados.forEach(procedimiento => {
              procedimientosMap[procedimiento.identificacion_procedimientos] = procedimiento.nombre;
            });
            setProcedimientos(procedimientosMap);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  const formatFechaCreacion = (fecha) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <SafeAreaView className="flex-1">
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

              <TouchableOpacity onPress={() => navigation.navigate("Prueba")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agendar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("TablaUsuario")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="calendar-alt" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Citas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Ranking")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="trophy" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Ranking</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("DoctorCard")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="user-check" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Especialistas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
                <View style={styles.contentMenuItems}>
                  <Icon name="comments" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Contacto</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text>Contacto</Text>
              </TouchableOpacity>

              {/* <Button title='Salir' onPress={logout} /> */}

            </View>
          )}
        </View>

        <ScrollView horizontal>
          <View style={styles.container}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>IDENTIFICACIÓN DE LA CITA</Text>
                <Text style={styles.headerTextNd}>NÚMERO DE DOCUMENTO</Text>
                <Text style={styles.headerTextNombreComple}>NOMBRE COMPLETO	</Text>
                <Text style={styles.headerTextTipodo}>TIPO DE DOCUMENTO</Text>
                <Text style={styles.headerTextFecha}>FECHA</Text>
                <Text style={styles.headerTextHora}>HORA</Text>
                <Text style={styles.headerTextEspecialista}>ESPECIALISTA</Text>
                <Text style={styles.headerTextIdPa}>IDENTIFICACIÓN PACIENTE</Text>
                <Text style={styles.headerTextMotiv}>MOTIVO</Text>
                <Text style={styles.headerTextFechacre}>FECHA DE CREACIÓN</Text>
                <Text style={styles.headerTextEstado}>ESTADO</Text>
              </View>
              <View style={styles.tableBody}>
                {data.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell1}>{item.identificacion_citas}</Text>
                    <Text style={styles.tableCell2}>{item.numero_documento}</Text>
                    <Text style={styles.tableCell3}>{item.nombre_completo}</Text>
                    <Text style={styles.tableCell4}>{item.tipo_documento}</Text>
                    <Text style={styles.tableCell5}>{item.fecha}</Text>
                    <Text style={styles.tableCell6}>{item.hora}</Text>
                    <Text style={styles.tableCell7}>{especialistas[item.id_especialista]}</Text>
                    <Text style={styles.tableCell8}>{item.id_paciente}</Text>
                    <Text style={styles.tableCell9}>{procedimientos[item.id_procedimiento]}</Text>
                    <Text style={styles.tableCell10}>{formatFechaCreacion(item.fecha_de_creacion)}</Text>
                    <Text style={styles.tableCell11}>{item.estado}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
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
  container: {
    marginTop: 100,
    marginLeft: 5,
    marginRight: 5,
  },
  table: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#D3D3D3',
    borderColor: 'black',
  },
  headerText: {
    padding: 10,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextNd: {
    padding: 10,
    marginLeft: 80,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextNombreComple: {
    padding: 10,
    marginLeft: 100,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextTipodo: {
    padding: 10,
    marginLeft: 70,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextFecha: {
    padding: 10,
    marginLeft: 100,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextHora: {
    padding: 10,
    marginLeft: 100,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextEspecialista: {
    padding: 10,
    marginLeft: 120,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextIdPa: {
    padding: 10,
    marginLeft: 100,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextMotiv: {
    padding: 10,
    marginLeft: 100,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextFechacre: {
    padding: 10,
    marginLeft: 80,
    fontWeight: 'bold',
    // flex: 1,
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  headerTextEstado: {
    padding: 10,
    marginLeft: 80,
    fontWeight: 'bold',
    backgroundColor: '#D3D3D3',
    textAlign: 'center',
  },
  tableBody: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row', // Agregado
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',

    textAlign: 'center',
  },
  tableCell1: {
    padding: 10,
    flex: 1,
    marginLeft: 90,
  },
  tableCell2: {
    padding: 10,
    flex: 1,
    marginLeft: 235,
  },
  tableCell3: {
    padding: 10,
    flex: 1,
    marginLeft: 200,
  },
  tableCell4: {
    padding: 10,
    flex: 1,
    marginLeft: 110,
  },
  tableCell5: {
    padding: 10,
    flex: 1,
    marginLeft: 85,
  },
  tableCell6: {
    padding: 10,
    flex: 1,
    marginLeft: 70,
  },
  tableCell7: {
    padding: 10,
    flex: 1,
    marginLeft: 110,
  },
  tableCell8: {
    padding: 10,
    // flex: 1,
    marginLeft: 140,
  },
  tableCell9: {
    padding: 10,
    flex: 1,
    marginLeft: 160,
  },
  tableCell10: {
    padding: 10,
    flex: 1,
    marginLeft: 50,
  },
  tableCell11: {
    padding: 10,
    // flex: 1,
    marginLeft: 80,
  },
});

export default TablaUsuario;