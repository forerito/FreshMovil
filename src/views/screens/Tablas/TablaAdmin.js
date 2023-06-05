import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

const TablaAdmin = () => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nombres</Text>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Apellido 1</Text>
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
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
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

export default TablaAdmin;