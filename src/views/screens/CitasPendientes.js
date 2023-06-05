// import React, { useState } from 'react';
// import { View, TextInput, ScrollView } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import DateTimePicker from '@react-native-community/datetimepicker';

// const CitasPendientes = () => {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowPicker(false);
//     setDate(currentDate);
//   };

//   const showDatePicker = () => {
//     setShowPicker(true);
//   };

//   return (
//     <SafeAreaView className="flex-1 ">

//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

//     <View>
//       <TextInput
//         value={date.toLocaleDateString()} // Mostrar la fecha seleccionada en el input
//         placeholder="Selecciona una fecha"
//         onFocus={showDatePicker} // Mostrar el DateTimePicker cuando se hace clic en el input
//       />
//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           onChange={handleDateChange}
//         />
//       )}
//     </View>

//     </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CitasPendientes;

import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

const CitasPendientes = () => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nombres</Text>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Apellido 1</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Apellido 2</Text>
          </View>
          {/* ... Agregar más columnas de apellidos aquí ... */}
        </View>
        {/* Renderizar las filas */}
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <Text style={styles.cell}>{`Nombre ${rowIndex + 1}`}</Text>
            {/* Renderizar las celdas de apellido */}
            {Array.from({ length: 10 }).map((_, colIndex) => (
              <View key={colIndex} style={styles.cell}>
                <Text>{`Apellido ${colIndex + 1}`}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderText: {
    fontWeight: 'bold',
  },
});

export default CitasPendientes;