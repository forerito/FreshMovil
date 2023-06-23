import React, { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, Text, ScrollView, Button, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import axios from 'axios';

const TableAdmin = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [especialistas, setEspecialistas] = useState({});
  const [procedimientos, setProcedimientos] = useState({});
  const [userId, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [citaEditando, setCitaEditando] = useState(null);
  const [campoEditando, setCampoEditando] = useState(null);
  const [citasProgramadas, setCitasProgramadas] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCancelarEdicion = () => {
    setIsEditing(false);
    setCitaEditando(null);
  };

  const EstadoCitaEnum = {
    REALIZADA: 'Realizada',
    PROGRAMADA: 'Programada',
    CANCELADA: 'Cancelada',
    AUSENCIA: 'Ausencia',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');

        const response = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas');
        const data = await response.json();

        // Filtrar las citas por el id_paciente que coincida con userId
        const citasUsuario = data.filter(cita => cita.id_especialista === parseInt(storedUserId));

        // Ordenar las citas por mes y día
        const citasOrdenadas = sortCitas(citasUsuario);

        setData(citasOrdenadas);


        // Obtener una lista de identificaciones de especialistas únicos en las citas
        const especialistasIds = [...new Set(citasUsuario.map(cita => cita.id_especialista))];

        // Realizar una solicitud para obtener los nombres de los especialistas
        const especialistasData = await Promise.all(
          especialistasIds.map(id =>
            fetch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${id}`)
              .then(response => response.json())
          )
        );

        // Crear un objeto con las identificaciones de los especialistas como clave y sus nombres como valor
        const especialistasMap = {};
        especialistasData.forEach(especialista => {
          especialistasMap[especialista.identificacion_especialista] = especialista.nombre_completo;
        });
        setEspecialistas(especialistasMap);

        // Obtener una lista de identificaciones de procedimientos únicos en las citas
        const procedimientosIds = [...new Set(citasUsuario.map(cita => cita.id_procedimiento))];

        const procedimientosResponse = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos');
        const procedimientosData = await procedimientosResponse.json();

        // Filtrar los procedimientos por los ids coincidentes
        const procedimientosFiltrados = procedimientosData.filter(procedimiento =>
          procedimientosIds.includes(procedimiento.identificacion_procedimientos)
        );

        // Crear un objeto con las identificaciones de los procedimientos como clave,
        // sus nombres y costos como valores
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
  }, []);

  const sortCitas = (citas) => {
    citas.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      if (fechaA.getMonth() === fechaB.getMonth()) {
        return fechaA.getDate() - fechaB.getDate();
      }
      return fechaA.getMonth() - fechaB.getMonth();
    });
    return citas;
  };

  const formatFechaCreacion = (fecha) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };


  const handleEditarCita = async (citaEditada) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const currentDate = new Date();
      const fechaCita = new Date(citaEditada.fecha);
      const horaCita = new Date(`${citaEditada.fecha}T${citaEditada.hora}`);

      if (fechaCita > currentDate) {
        Alert.alert('Error', 'No puedes cambiar la fecha de una cita que aún no ha llegado', [{ text: 'OK' }]);
        return;
      }
      if (
        citaEditada.estado_cita === EstadoCitaEnum.PROGRAMADA &&
        isFechaPasada // Verificar si la fecha de la cita ha pasado
      ) {
        // Mostrar una alerta con botón de cancelar
        Alert.alert(
          'Error',
          'No puedes establecer el estado como "Programada" si la fecha de la cita ya ha pasado',
          [
            {
              text: 'Cancelar',
              onPress: () => {
                // El usuario ha cancelado, no se realiza ningún cambio
                setIsEditing(false);
                setCitaEditando(null);
              },
              style: 'cancel',
            },
          ]
        );

        return;
      }
      const estadoCitaActual = citaEditada.estado_cita;

      if (estadoCitaActual !== EstadoCitaEnum.REALIZADA && estadoCitaActual !== EstadoCitaEnum.AUSENCIA) {
        citaEditada.estado_cita = EstadoCitaEnum.REALIZADA; // Establecer el estado como "Realizada"
      }
      const response = await axios.put(
        `https://freshsmile.azurewebsites.net/FreshSmile/ModificarCita/${citaEditada.identificacion_citas}`,
        citaEditada,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setCitaEditando(null);
        Alert.alert('Cita actualizada', 'La cita ha sido actualizada correctamente', [{ text: 'OK' }]);
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar la cita', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowError(true);
      Alert.alert('Error', 'Hubo un problema al actualizar la cita', [{ text: 'OK' }]);
    }
  };


  const actualizarEstadoCita = () => {
    const currentDate = new Date();
    setCurrentDateTime(new Date());

    const citasActualizadas = data.map(cita => {
      const fechaCita = new Date(cita.fecha);
      const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

      // Verificar si ha pasado un día completo después de la fecha y hora programadas
      if (
        cita.estado_cita !== EstadoCitaEnum.REALIZADA &&
        currentDate > fechaCita &&
        currentDate.getTime() - fechaCita.getTime() >= 24 * 60 * 60 * 1000 &&
        currentDate > horaCita
      ) {
        // Actualizar el estado de la cita aquí
      }

      return cita;
    });

    setData(citasActualizadas);
  };

  useEffect(() => {
    // Llamar a la función actualizarEstadoCita cada vez que se renderice el componente
    actualizarEstadoCita();
  }, [userId]);

  const getEstadoCita = (cita) => {
    const currentDate = currentDateTime;
    const fechaCita = new Date(cita.fecha);
    const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

    if (currentDate > fechaCita && currentDate.getDate() - fechaCita.getDate() === 1) {
      if (cita.estado_cita === EstadoCitaEnum.REALIZADA) {
        return cita.estado_cita;
      }
    }

    if (currentDate >= horaCita && currentDate.getHours() < 17 && cita.estado_cita === EstadoCitaEnum.PROGRAMADA) {
      return EstadoCitaEnum.PROGRAMADA;
    }

    return cita.estado_cita;
  };

  const handleEditCitaClick = (cita) => {
    setIsEditing(true);
    setCitaEditando(cita.identificacion_citas);
  };

  const handleGuardarCitaClick = async (cita) => {
    try {
      const accessToken = AsyncStorage.getItem('accessToken');
      const currentDate = new Date();
      const fechaCita = new Date(cita.fecha);
      const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

      if (fechaCita > currentDate) {
        Alert.alert('Error', 'No puedes cambiar la fecha de una cita que aún no ha llegado', [
          { text: 'OK' },
        ]);
        return;
      }

      if (
        cita.estado_cita === EstadoCitaEnum.PROGRAMADA &&
        isFechaPasada // Verificar si la fecha de la cita ha pasado
      ) {
        Alert.alert(
          'Error',
          'No puedes establecer el estado como "Programada" si la fecha de la cita ya ha pasado',
          [{ text: 'Cancelar' }]
        ).then((value) => {
          if (value === null) {
            setIsEditing(false);
            setCitaEditando(null);
          }
        });

        return;
      }

      const estadoCitaActual = cita.estado_cita;

      if (estadoCitaActual !== EstadoCitaEnum.REALIZADA && estadoCitaActual) {
        cita.estado_cita = EstadoCitaEnum.REALIZADA; // Establecer el estado como "Realizada"
      }

      const response = await axios.put(
        `https://freshsmile.azurewebsites.net/FreshSmile/ModificarCita/${cita.identificacion_citas}`,
        cita,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setCitaEditando(null);
        Alert.alert('Cita actualizada', 'La cita ha sido actualizada correctamente', [
          { text: 'OK' },
        ]);
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar la cita', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al actualizar la cita', [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    if (showError) {
      // Reemplaza esta línea por la lógica que necesites en React Native para recargar la pantalla.
      // Por ejemplo, puedes utilizar una función para actualizar los datos en la pantalla.
    }
  }, [showError]);


  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        <View
          style={{ backgroundColor: "black", marginLeft: 5, marginRight: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 340,
              marginTop: -43,
            }}
          >
            <TouchableOpacity onPress={handlePress}>
              <Icon name="bars" size={24} color="#5FFDFF" />
            </TouchableOpacity>
          </View>

          {menuOpen && (
            <View style={{ marginTop: 8 }}>

              <TouchableOpacity
                onPress={() => navigation.navigate("HomeEspecialista")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="home" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Inicio</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("NosotrosAdmin")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="users" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Nosotros</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ProcedimientosAdmin")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="tooth" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Procedimientos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("TablaAdmin")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="user-clock" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Agenda</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("SpecialistCards")}
              >
                <View style={styles.contentMenuItems}>
                  <Icon name="star" size={24} color="white" />
                  <Text style={styles.contentMenuText}>Valoraciones</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>Contacto</Text>
              </TouchableOpacity>

            </View>
          )}
        </View>


<View style={styles.container}> 

<Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 20 }}>No tiene citas programadas</Text>

</View>

        {/* <View style={styles.container}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.title}>Identificación de la cita</Text>
              <Text style={styles.title}>Número de Documento</Text>
              <Text style={styles.title}>Nombre del Paciente</Text>
              <Text style={styles.title}>Tipo de Documento Paciente</Text>
              <Text style={styles.title}>Fecha</Text>
              <Text style={styles.title}>Hora</Text>
              <Text style={styles.title}>Especialista</Text>
              <Text style={styles.title}>Identificacion Paciente</Text>
              <Text style={styles.title}>Motivo</Text>
              <Text style={styles.title}>Fecha de Creacion</Text>
              <Text style={styles.title}>Estado</Text>
              <Text style={styles.title}>Valor cita</Text>
              <Text style={styles.title}>Acciones</Text>
            </View>
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow2}>
                <View style={styles.tableRow1}>
                  <Text style={styles.item}>{item.identificacion_citas}</Text>
                  <Text style={styles.item}>{item.numero_documento}</Text>
                  <Text style={styles.item}>{item.nombre_completo}</Text>
                  <Text style={styles.item}>{item.tipo_documento}</Text>
                  <Text style={styles.item}>{item.fecha}</Text>
                  <Text style={styles.item}>{item.hora}</Text>
                  <Text style={styles.item}>{especialistas[item.id_especialista]}</Text>
                  <Text style={styles.item}>{item.id_paciente}</Text>
                  <Text style={styles.item}>{procedimientos[item.id_procedimiento]?.nombre}</Text>
                  <Text style={styles.item}>{formatFechaCreacion(item.fecha_de_creacion)}</Text>
                </View>
                <View style={styles.tableRow2}>
                  <Text style={styles.item}>
                    {isEditing && citaEditando === item.identificacion_citas ? (
                      campoEditando === 'estado_cita' ? (
                        <TextInput
                          value={item.estado_cita}
                          onChangeText={(value) => {
                            const newState = [...data];
                            newState[index].estado_cita = value;
                            setData(newState);
                          }}
                        />
                      ) : (
                        getEstadoCita(item)
                      )
                    ) : (
                      getEstadoCita(item)
                    )}
                  </Text>
                  <Text style={styles.item}>{procedimientos[item.id_procedimiento]?.costo?.toFixed(3)}</Text>
                  <View>
                    {item.estado_cita && !isEditing && !error ? (
                      <Button
                        title="Editar"
                        onPress={() => {
                          setIsEditing(true);
                          setCampoEditando('estado_cita');
                          setCitaEditando(item.identificacion_citas);
                        }}
                      />
                    ) : (
                      <View>
                        <Button
                          title="Guardar"
                          onPress={() => {
                            handleGuardarCitaClick(item);
                          }}
                        />
                        <Button
                          title="Cancelar"
                          onPress={() => {
                            handleCancelarEdicion();
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View> */}


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
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  tableRow: {
    backgroundColor: 'lightgray',
  },
  tableRow1: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableRow2: {
    flex: 1,
    padding: 5,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
  },
  item: {
    flex: 1,
    padding: 5,
  },
});

export default TableAdmin;