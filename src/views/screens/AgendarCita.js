import React from 'react';
import { Button, Image, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

const AgendarCita = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then(image => {
        setSelectedImage({ uri: image.path });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Seleccionar imagen" onPress={openImagePicker} />
    </View>
  );
};


export default AgendarCita;