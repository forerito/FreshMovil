import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpecialistCards = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          'https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarRating',
          { headers }
        );
        setData(response.data);
      } catch (error) {
        console.log('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const fetchAllPatientData = async () => {
    if (data) {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const updatedData = await Promise.all(
          data.map(async (especialista) => {
            const response = await axios.get(
              `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${especialista.identificacion_especialista}`,
              { headers }
            );
            const patientData = response.data;

            return {
              ...especialista,
              patientData,
            };
          })
        );

        setData(updatedData);
      } catch (error) {
        console.log('Error al obtener los datos del paciente:', error);
      }
    }
  };

  useEffect(() => {
    fetchAllPatientData();
  }, [data]);

  const filteredData = data
    ? data.filter(
        (especialista, index, self) =>
          index ===
          self.findIndex(
            (e) => e.identificacion_especialista === especialista.identificacion_especialista
          )
      )
    : null;

  const renderRatingStars = (valoracion) => {
    const roundedValoracion = Math.round(valoracion);
    const stars = [];

    for (let i = 0; i < roundedValoracion; i++) {
      stars.push(<Icon key={i} name="star" style={styles.starIcon} />);
    }

    return stars;
  };

  return (
    <View style={styles.cardContainer}>
      {filteredData ? (
        filteredData.map((especialista) => (
          <View key={especialista.id} style={styles.card}>
            <View style={styles.icon}>
              <Icon name="user" style={styles.iconLarge} />
            </View>
            <Text>Identificación del especialista: {especialista.identificacion_especialista}</Text>
            {especialista.patientData && (
              <View>
                <Text>Nombre del paciente: {especialista.patientData.nombre_completo}</Text>
                <Text>Correo del paciente: {especialista.patientData.correo}</Text>
                <Text>Especialidad: {especialista.patientData.especialidad}</Text>
              </View>
            )}
            <Text>Valoración: {renderRatingStars(especialista.valoracion)}</Text>
            <Text>Votos: {especialista.votos ? especialista.votos.length : 0}</Text>
            <View style={styles.comentarios}>
              <Text>Comentarios:</Text>
              {especialista.comentarios && especialista.comentarios.length > 0 ? (
                especialista.comentarios.map((comentario, index) => (
                  <View key={index}>
                    <Text>
                      {comentario.userId}: {comentario.comentario}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>No hay comentarios.</Text>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = {
  cardContainer: {
    flex: 1,
    // Add your styles here
  },
  card: {
    // Add your styles here
  },
  icon: {
    // Add your styles here
  },
  iconLarge: {
    // Add your styles here
  },
  starIcon: {
    // Add your styles here
  },
  comentarios: {
    // Add your styles here
  },
};

export default SpecialistCards;