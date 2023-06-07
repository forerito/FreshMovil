import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';

const TablaUsuario = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://freshsmile.azurewebsites.net/FreshSmile/paciente');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      Alert.alert('Error al obtener los datos', 'Hubo un problema al obtener los datos de la API');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Eliminar cita',
      '¿Estás seguro que deseas eliminar esta cita?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              await axios.delete(`URL_DE_TU_API/${id}`);
              fetchData();
              Alert.alert('Cita eliminada', 'Tu cita se ha eliminado correctamente');
            } catch (error) {
              console.error(error);
              Alert.alert('Error al eliminar la cita', 'Hubo un problema al eliminar la cita');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Mis citas</Text>
          <ScrollView horizontal={true} style={styles.tableContainer}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={styles.columnHeader}>ID:</Text>
                <Text style={styles.columnHeader}>Tipo de cita:</Text>
                <Text style={styles.columnHeader}>Nombre del doctor:</Text>
                <Text style={styles.columnHeader}>Fecha:</Text>
                <Text style={styles.columnHeader}>Hora:</Text>
                <Text style={styles.columnHeader}>Email:</Text>
                <Text style={styles.columnHeader}>Acciones:</Text>
              </View>
              {data.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.column}>{item.id}</Text>
                  <Text style={styles.column}>{item.tipoCita}</Text>
                  <Text style={styles.column}>{item.nombreDoctor}</Text>
                  <Text style={styles.column}>{item.fecha}</Text>
                  <Text style={styles.column}>{item.hora}</Text>
                  <Text style={styles.column}>{item.email}</Text>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Cancelar cita</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    maxHeight: 200,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  column: {
    width: '14%',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TablaUsuario;