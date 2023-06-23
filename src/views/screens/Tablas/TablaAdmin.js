import React, { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TableAdmin = () => {
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
    const fetchCitas = async () => {
      try {
        const response = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas');
        const data = await response.json();

        // Filtrar las citas por el id_paciente que coincida con userId
        const citasUsuario = data.filter(cita => cita.id_especialista === parseInt(userId));

        // Ordenar las citas por mes y día
        const citasOrdenadas = sortCitas(citasUsuario);

        setData(citasOrdenadas);

        // Obtener una lista de identificaciones de especialistas únicos en las citas
        const especialistasIds = [...new Set(citasUsuario.map(cita => cita.id_especialista))];

        // Realizar una solicitud para obtener los nombres de los especialistas
        Promise.all(
          especialistasIds.map(id =>
            fetch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${id}`)
              .then(response => response.json())
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

    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
      } catch (error) {
        console.error(error);
      }
    };

    getUserId();
    fetchCitas();
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
        Alert.alert('Error', 'No puedes cambiar la fecha de una cita que aún no ha llegado');
        return;
      }
      if (
        citaEditada.estado_cita === EstadoCitaEnum.PROGRAMADA &&
        isFechaPasada // Verificar si la fecha de la cita ha pasado
      ) {
        Alert.alert(
          'Error',
          'No puedes establecer el estado como "Programada" si la fecha de la cita ya ha pasado',
          [
            {
              text: 'Cancelar',
              onPress: () => {
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
        Alert.alert('Cita actualizada', 'La cita ha sido actualizada correctamente');
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar la cita');
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowError(true);
      Alert.alert('Error', 'Hubo un problema al actualizar la cita');
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
        return {
          ...cita,
          estado_cita: EstadoCitaEnum.AUSENCIA
        };
      }

      return cita;
    });

    setData(citasActualizadas);
  };

  useEffect(() => {
    actualizarEstadoCita();
  }, []);

  const getEstadoCita = (cita) => {
    const currentDate = currentDateTime;
    const fechaCita = new Date(cita.fecha);
    const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

    if (currentDate > fechaCita && currentDate.getDate() - fechaCita.getDate() === 1) {
      if (cita.estado_cita === EstadoCitaEnum.AUSENCIA || cita.estado_cita === EstadoCitaEnum.REALIZADA) {
        return cita.estado_cita;
      } else {
        return EstadoCitaEnum.AUSENCIA;
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
      const accessToken = localStorage.getItem('accessToken');
      const currentDate = new Date();
      const fechaCita = new Date(cita.fecha);
      const horaCita = new Date(`${cita.fecha}T${cita.hora}`);

      if (fechaCita > currentDate) {
        swal('Error', 'No puedes cambiar la fecha de una cita que aún no ha llegado', 'error');
        return;
      }
      if (
        cita.estado_cita === EstadoCitaEnum.PROGRAMADA &&
        currentDate > fechaCita // Verificar si la fecha de la cita ha pasado
      ) {
        swal({
          title: 'Error',
          text: 'No puedes establecer el estado como "Programada" si la fecha de la cita ya ha pasado',
          icon: 'error',
          buttons: {
            cancel: {
              text: 'Cancelar',
              value: null,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value === null) {
            setIsEditing(false);
            setCitaEditando(null);
          }
        });

        return;
      }

      const estadoCitaActual = cita.estado_cita;

      if (estadoCitaActual !== EstadoCitaEnum.REALIZADA && estadoCitaActual !== EstadoCitaEnum.AUSENCIA) {
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
        swal('Cita actualizada', 'La cita ha sido actualizada correctamente', 'success');
      } else {
        swal('Error', 'Hubo un problema al actualizar la cita', 'error');
      }
    } catch (error) {
      console.error(error);
      swal('Error', 'Hubo un problema al actualizar la cita', 'error');
    }
  };

  useEffect(() => {
    if (showError) {
      window.location.reload();
    }
  }, [showError]);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>No hay citas</Text>
      ) : (
        <>
          <Text>Identificación de la cita</Text>
          <Text>Número de Documento</Text>
          <Text>Nombre del Paciente</Text>
          <Text>Tipo de Documento Paciente</Text>
          <Text>Fecha</Text>
          <Text>Hora</Text>
          <Text>Especialista</Text>
          <Text>Identificacion Paciente</Text>
          <Text>Motivo</Text>
          <Text>Fecha de Creacion</Text>
          <Text>Estado</Text>
          <Text>Valor cita</Text>
          <Text>Acciones</Text>
          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text>{item.identificacion_citas}</Text>
              <Text>{item.numero_documento}</Text>
              <Text>{item.nombre_completo}</Text>
              <Text>{item.tipo_documento}</Text>
              <Text>{item.fecha}</Text>
              <Text>{item.hora}</Text>
              <Text>{especialistas[item.id_especialista]}</Text>
              <Text>{item.id_paciente}</Text>
              <Text>{procedimientos[item.id_procedimiento]?.nombre}</Text>
              <Text>{formatFechaCreacion(item.fecha_de_creacion)}</Text>
              <Text>
                {isEditing && citaEditando === item.identificacion_citas ? (
                  campoEditando === 'estado_cita' ? (
                    <TextInput
                      value={item.estado_cita}
                      onChangeText={(text) => {
                        const newState = [...data];
                        newState[index].estado_cita = text;
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
              <Text>{procedimientos[item.id_procedimiento]?.costo?.toFixed(3)}</Text>
              {item.estado_cita && !isEditing && !error ? (
                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() => {
                    setIsEditing(true);
                    setCampoEditando('estado_cita');
                    setCitaEditando(item.identificacion_citas);
                  }}
                >
                  <Text>Editar</Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={() => {
                      handleGuardarCitaClick(item);
                    }}
                  >
                    <Text>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonCancel}
                    onPress={() => {
                      handleCancelarEdicion();
                    }}
                  >
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </>
      )}
    </View>

  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  buttonEdit: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonCancel: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
};

export default TableAdmin;