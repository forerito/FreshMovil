import React, { useState } from 'react';
import { View, Button, Modal, TextInput } from 'react-native';

const Prueba = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formEnabled, setFormEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleYesButtonPress = () => {
    setFormEnabled(true);
    setModalVisible(false);
  };

  const handleNoButtonPress = () => {
    setFormEnabled(false);
    setModalVisible(false);
  };

  const handleFormSubmit = () => {
    // Aquí puedes realizar cualquier acción con los datos del formulario
    console.log('Valor del campo de texto:', inputValue);
  };

  return (
    <View>
      <Button
        title="Abrir modal"
        onPress={() => setModalVisible(true)}
      />

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Button
            title="SI"
            onPress={handleYesButtonPress}
          />
          <Button
            title="NO"
            onPress={handleNoButtonPress}
          />
        </View>
      </Modal>

      {formEnabled && (
        <View>
          <TextInput
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            editable={formEnabled}
          />
          <Button
            title="Enviar"
            onPress={handleFormSubmit}
          />
        </View>
      )}
    </View>
  );
};

export default Prueba;