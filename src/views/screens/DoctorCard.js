import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const defaultPhoto =
  'https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852209/Fresh_Smile_Cmills/cards4_r5phfs.jpg';

const DoctorCard = ({ name, specialty, photo }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    // Aquí puedes enviar la valoración y el comentario al servidor
    // y realizar cualquier lógica adicional
    console.log('Valoración:', rating);
    console.log('Comentario:', comment);
    setRating(0);
    setComment('');
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{ uri: photo || defaultPhoto }} style={styles.photo} />
            <View style={styles.details}>
              <Text style={styles.name}>{name}</Text>
              <Text>Especialidad: {specialty}</Text>
            </View>
            <View style={styles.rating}>
              <Text>Valoración:</Text>
              <View style={styles.starRating}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.star,
                      value <= (hoverRating || rating) ? styles.selectedStar : null,
                    ]}
                    onPress={() => handleRatingClick(value)}
                    onMouseEnter={() => handleRatingHover(value)}
                    onMouseLeave={handleRatingLeave}
                  >
                    <Text>{value % 1 === 0.5 ? '★½' : '★'}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.comments}>
              <Text>Comentario:</Text>
              <TextInput
                value={comment}
                onChangeText={handleCommentChange}
                style={styles.commentInput}
                // multiline
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    marginBottom: 8,
  },
  starRating: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 4,
  },
  selectedStar: {
    color: 'gold',
  },
  comments: {
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
};

export default DoctorCard;