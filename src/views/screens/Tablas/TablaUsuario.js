import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';

const TablaUsuario = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [especialistas, setEspecialistas] = useState({});
  const [procedimientos, setProcedimientos] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);

        const response = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas');
        const citasData = await response.json();

        const citasUsuario = citasData.filter(cita => cita.id_paciente === parseInt(storedUserId));
        setData(citasUsuario);

        const especialistasIds = [...new Set(citasUsuario.map(cita => cita.id_especialista))];

        const especialistasResponses = await Promise.all(
          especialistasIds.map(id =>
            fetch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${id}`)
              .then(response => response.json())
          )
        );

        const especialistasMap = {};
        especialistasResponses.forEach(especialista => {
          especialistasMap[especialista.identificacion_especialista] = especialista.nombre_completo;
        });
        setEspecialistas(especialistasMap);

        const procedimientosIds = [...new Set(citasUsuario.map(cita => cita.id_procedimiento))];

        const procedimientosResponse = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos');
        const procedimientosData = await procedimientosResponse.json();

        const procedimientosFiltrados = procedimientosData.filter(procedimiento =>
          procedimientosIds.includes(procedimiento.identificacion_procedimientos)
        );


        const procedimientosMap = {};
        procedimientosFiltrados.forEach(procedimiento => {
          procedimientosMap[procedimiento.identificacion_procedimientos] = {
            nombre: procedimiento.nombre,
            costo: procedimiento.costo
          };
        });
        setProcedimientos(procedimientosMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    
    const interval = setInterval(fetchData, 120000);

    
    return () => clearInterval(interval);
  }, []);

  const formatFechaCreacion = fecha => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const modificarEstadoCita = async (idCita) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const updatedData = data.map(cita => {
        if (cita.identificacion_citas === idCita) {
          
          return { ...cita, estado_cita: 'Cancelada' };
        }
        return cita;
      });

      setData(updatedData);

      // Realizar la solicitud PUT a la API para actualizar el estado de la cita
      const response = await fetch(`https://freshsmile.azurewebsites.net/FreshSmile/ModificarCita/${idCita}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado_cita: 'Cancelada' })
      });

      if (response.ok) {

        Alert.alert('Cita cancelada', 'La cita ha sido cancelada exitosamente');
      } else {

        Alert.alert('Error', 'Ocurrió un error al cancelar la cita');

        setData(data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al cancelar la cita');

      setData(data);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
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

              <TouchableOpacity onPress={() => navigation.navigate("AgendarCita")}>
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

              <TouchableOpacity onPress={() => navigation.navigate("Especialistas")}>
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

            </View>
          )}
        </View>

        <ScrollView horizontal>
          <View style={styles.container}>
            <View style={styles.table}>

              <View style={styles.tableBody}>
                {data.length === 0 ? (
                  <Text style={styles.titleText1}>No tienes citas agendadas</Text>
                ) : (
                  data.map((item, index) => (
                    <View key={index} style={styles.citaContainer}>
                      <View key={index} style={styles.tableRow}>
                        <View style={styles.titleColumn}>
                          {/* <Text style={styles.titleText}>IDENTIFICACIÓN DE LA CITA</Text> */}
                          <Text style={styles.titleText}>NÚMERO DE DOCUMENTO</Text>
                          <Text style={styles.titleText}>NOMBRE COMPLETO</Text>
                          <Text style={styles.titleText}>TIPO DE DOCUMENTO</Text>
                          <Text style={styles.titleText}>FECHA</Text>
                          <Text style={styles.titleText}>HORA</Text>
                          <Text style={styles.titleText}>ESPECIALISTA</Text>
                          <Text style={styles.titleText}>IDENTIFICACIÓN PACIENTE</Text>
                          <Text style={styles.titleText}>MOTIVO</Text>
                          <Text style={styles.titleText}>FECHA DE CREACIÓN</Text>
                          <Text style={styles.titleText}>ESTADO CITA</Text>
                          <Text style={styles.titleText}>VALOR CITA</Text>
                          <Text style={styles.titleText}>ACCIONES</Text>
                        </View>
                        <View style={styles.textColumn}>
                          {/* <Text style={styles.titleText2}>{item.identificacion_citas}</Text> */}
                          <Text style={styles.titleText2}>{item.numero_documento}</Text>
                          <Text style={styles.titleText2}>{item.nombre_completo}</Text>
                          <Text style={styles.titleText2}>{item.tipo_documento}</Text>
                          <Text style={styles.titleText2}>{item.fecha}</Text>
                          <Text style={styles.titleText2}>{item.hora}</Text>
                          <Text style={styles.titleText2}>{especialistas[item.id_especialista]}</Text>
                          <Text style={styles.titleText2}>{item.id_paciente}</Text>
                          <Text style={styles.titleTextmotivo}>{procedimientos[item.id_procedimiento]?.nombre}</Text>
                          <Text style={styles.titleText2}>{formatFechaCreacion(item.fecha_de_creacion)}</Text>
                          <Text style={styles.titleText2}>{item.estado_cita}</Text>
                          <Text style={styles.titleText2}>{procedimientos[item.id_procedimiento]?.costo?.toFixed(3)}</Text>

                          <View>
                            {item.estado_cita === 'Programada' ? (
                              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => modificarEstadoCita(item.identificacion_citas)}>
                                <View style={{ marginRight: 8, backgroundColor: '#249bad', borderRadius: 5 }}>
                                  <Icon name="trash" size={16} style={{ padding: 5, color: 'white' }} />
                                </View>
                                <Text style={{ fontSize: 15 }}>cancelar cita</Text>
                              </TouchableOpacity>
                            ) : (
                              <Text style={styles.titleText2}>No hay acciones</Text>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                )}
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
  tableBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 7,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  citaContainer: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 15,
    borderColor: "#249bad",
    backgroundColor: "#D3D3D3",
    borderWidth: 3,
    padding: 10,
  },
  titleColumn: {
    marginRight: 10,
  },
  textColumn: {
    // marginBottom: 15,
  },
  titleText1: {
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 25,
  },
  titleTextmotivo: {
    fontSize: 12,
    lineHeight: 25,
    textAlign: 'center',
  },
  titleText2: {
    lineHeight: 25,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 4,
  },
  table: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'column',
    backgroundColor: 'lightgray',
  },
});

export default TablaUsuario;