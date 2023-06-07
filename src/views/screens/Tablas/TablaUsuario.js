import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";


const TablaUsuario = ({ navigation }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://freshsmile.azurewebsites.net/FreshSmile/paciente');
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error al obtener los datos:', error);
  //     Alert.alert('Error al obtener los datos', 'Hubo un problema al obtener los datos de la API');
  //   }
  // };

  // const handleDelete = async (id) => {
  //   Alert.alert(
  //     'Eliminar cita',
  //     '¿Estás seguro que deseas eliminar esta cita?',
  //     [
  //       {
  //         text: 'No',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Sí',
  //         onPress: async () => {
  //           try {
  //             await axios.delete(`URL_DE_TU_API/${id}`);
  //             fetchData();
  //             Alert.alert('Cita eliminada', 'Tu cita se ha eliminado correctamente');
  //           } catch (error) {
  //             console.error(error);
  //             Alert.alert('Error al eliminar la cita', 'Hubo un problema al eliminar la cita');
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Mis citas</Text>
          <ScrollView horizontal={true} style={styles.tableContainer}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={styles.columnHeader}>ID</Text>
                <Text style={styles.columnHeader}>Tipo de cita</Text>
                <Text style={styles.columnHeader}>Nombre del doctor</Text>
                <Text style={styles.columnHeader}>Fecha</Text>
                <Text style={styles.columnHeader}>Hora</Text>
                <Text style={styles.columnHeader}>Email</Text>
                <Text style={styles.columnHeader}>Acciones</Text>
              </View>
              {/* {data.map((item) => ( */}

                <View  style={styles.tableHeader}>
                  <Text style={styles.column}>1</Text>
                  <Text style={styles.column1}>Limpieza</Text>
                  <Text style={styles.column2}>Camilo A Forero</Text>
                  <Text style={styles.column3}>7/06/2023</Text>
                  <Text style={styles.column4}>12:28 p.m.</Text>
                  <Text style={styles.column5}>forero5515@gmail.com</Text>
                  {/* <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Cancelar cita</Text>
                  </TouchableOpacity> */}
                </View>

                <View  style={styles.tableHeader}>
                  <Text style={styles.column}>1</Text>
                  <Text style={styles.column1}>Limpieza</Text>
                  <Text style={styles.column2}>Camilo A Forero</Text>
                  <Text style={styles.column3}>7/06/2023</Text>
                  <Text style={styles.column4}>12:28 p.m.</Text>
                  <Text style={styles.column5}>forero5515@gmail.com</Text>
                  {/* <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Cancelar cita</Text>
                  </TouchableOpacity> */}
                </View>

                <View  style={styles.tableHeader}>
                  <Text style={styles.column}>10</Text>
                  <Text style={styles.column1}>Limpieza</Text>
                  <Text style={styles.column2}>Camilo A Forero</Text>
                  <Text style={styles.column3}>7/06/2023</Text>
                  <Text style={styles.column4}>12:28 p.m.</Text>
                  <Text style={styles.column5}>forero5515@gmail.com</Text>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Cancelar cita</Text>
                  </TouchableOpacity>
                </View>
              {/* // ))} */}
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  tableContainer: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  tableHeader: {
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  columnHeader: {
    padding: 20,
    color: 'black',
    textAlign: 'center',
  },
  tableRow: {
    // flex: 1,
    color: 'black',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  column: {
    marginLeft: 25,
    color: 'black',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  column1: {
    marginLeft: 47,
    color: 'black',
    textAlign: 'center',
  },
  column2: {
    marginLeft: 60,
    color: 'black',
    textAlign: 'center',
  },
  column3: {
    marginLeft: 35,
    color: 'black',
    textAlign: 'center',
  },
  column4: {
    marginLeft: 15,
    color: 'black',
    textAlign: 'center',
  },
  column5: {
    marginLeft: 25,
    color: 'black',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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