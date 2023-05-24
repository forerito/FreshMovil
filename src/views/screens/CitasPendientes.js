import React, { useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';

const CitasPendientes = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "white" }}>

      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

    <View>
      <TextInput
        value={date.toLocaleDateString()} // Mostrar la fecha seleccionada en el input
        placeholder="Selecciona una fecha"
        onFocus={showDatePicker} // Mostrar el DateTimePicker cuando se hace clic en el input
      />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </View>

    </ScrollView>
    </SafeAreaView>
  );
};

export default CitasPendientes;