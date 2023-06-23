import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { ComentarioComponent } from "../layouts/ComentarioComponent";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DoctorCard = ({ valoracion, votos, comentarios, data, ratingId }) => {
  const [userId, setUserId] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentsCant, setCantComments] = useState(1);
  const [actualComments, setActualComments] = useState(comentarios);
  const [actualVotos, setActualVotos] = useState(votos);
  const [actualValoration, setActualValoration] = useState(valoracion);
  const commentInput = useRef(null);
  const commentButton = useRef(null);

  const handleVote = async (value) => {
    if (actualVotos.some((elem) => elem.userId === userId)) {
      Alert.alert(
        "Usted ya votó en este especialista",
        "",
        [{ text: "Cerrar", onPress: () => { } }],
        { cancelable: true }
      );
      return;
    }

    const accessToken = await AsyncStorage.getItem("accessToken");

    Alert.alert(
      "Quiere votar por este especialista?",
      `Su voto: ${value}`,
      [
        {
          text: "Votar",
          onPress: () => {
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            axios
              .patch(
                `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/añadirVoto/${ratingId}?vote=${value}`,
                null,
                {
                  headers: headers,
                }
              )
              .then((res) => {
                Alert.alert(
                  "Su voto fue registrado correctamente",
                  "",
                  [
                    {
                      text: "Cerrar",
                      onPress: () => {
                        setActualVotos(res.data.votos);
                        setActualValoration(res.data.valoracion);
                      },
                    },
                  ],
                  { cancelable: true }
                );
              })
              .catch((err) => {
                Alert.alert(
                  "Hubo un error, intentelo más tarde",
                  "",
                  [{ text: "Cerrar", onPress: () => { } }],
                  { cancelable: true }
                );
              });
          },
        },
        {
          text: "No votar",
          onPress: () => { },
        },
      ],
      { cancelable: true }
    );
  };

  const handleComment = async () => {
    const comment = commentInput.current.value;

    const data = {
      Comentario: comment,
    };

    commentInput.current.disabled = true;
    commentButton.current.disabled = true;

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        Alert.alert("Token de acceso no encontrado", "", [{ text: "Cerrar" }]);
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.patch(
        `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/comentar/${ratingId}`,
        data,
        {
          headers: headers,
        }
      );

      setActualComments(response.data.comentarios);
      Alert.alert("Especialista comentado correctamente", "", [
        { text: "Cerrar" },
      ]);
      setIsCommenting(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error al realizar el comentario", "", [{ text: "Cerrar" }]);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value);
    });
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setImageLoaded(true);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.doctorCard}>
        <View style={styles.divPictureRating}>
          <View style={styles.pictureContainer}>
            {!imageLoaded ? (
              <ActivityIndicator size="large" color="#249bad" />
            ) : (
              <Image
                source={{
                  uri: data.foto_perfil
                }}
                style={styles.doctorImage}
                resizeMode="stretch"
              />
            )}
          </View>
          <View style={styles.doctorRating}>
            <View style={styles.starRating}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleVote(value)}
                  style={[
                    styles.star,
                    value <= actualValoration ? styles.selected : null,
                  ]}
                  underlayColor="transparent"
                >
                  <Text
                    style={[
                      styles.starText,
                      value <= actualValoration ? styles.selected : null,
                    ]}
                  >
                    {value % 1 === 0.5 ? "★½" : "★"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.votesContainer}>
              <Text style={styles.votesText}>{actualVotos.length} votos</Text>
              {actualVotos.some((elem) => elem.userId === userId) && (
                <Text style={styles.voteAdvise}>
                  Usted ya votó en este especialista
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.div2Details}>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{data.nombre_completo}</Text>
            <Text style={styles.detailText}>
              Especialidad:{" "}
              <Text style={styles.doctorSpecialty}>{data.especialidad}</Text>
            </Text>
            <Text style={styles.detailText}>
              Correo electrónico:{" "}
              <Text
                style={styles.spanEmail}
                onPress={() => Linking.openURL(`mailto:${data.correo}`)}
              >
                {data.correo}
              </Text>
            </Text>
            <Text style={styles.detailText}>
              Descripción:{" "}
              <Text>
                {data.descripcion ||
                  "El especialista no tiene una descripción registrada"}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.div1Comment}>
          <Text style={{ fontWeight: 'bold' }}>Comentarios:</Text>
          {!actualComments.some((elem) => elem.userId === userId) ? (
            <TouchableOpacity
              onPress={() => setIsCommenting(!isCommenting)}
              underlayColor="transparent"
              style={styles.button2}
            >
              <Text>Comentar</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.commented}>Usted ya comentó acá</Text>
          )}
        </View>
        {isCommenting && (
          <View style={styles.commentForm}>
            <Text>Ingresa tu comentario:</Text>
            <TextInput ref={commentInput} placeholder="Escribe tu comentario" onChangeText={text => commentInput.current.value = text} style={styles.input} />
            <TouchableOpacity
              ref={commentButton}
              onPress={handleComment}
              underlayColor="transparent"
              style={styles.button}
            >
              <Text>Enviar comentario</Text>
            </TouchableOpacity>
          </View>
        )}
        {actualComments.length > 0 ? (
          actualComments.map(
            (coment, i) =>
              i < commentsCant && (
                <ComentarioComponent key={i} comentario={coment.comentario} />
              )
          )
        ) : (
          <Text>El especialista no tiene comentarios aún</Text>
        )}
        <View style={styles.commentsButtons}>
          {commentsCant > 1 && (
            <TouchableOpacity
              onPress={() => setCantComments(commentsCant - 2)}
              underlayColor="transparent"
            >
              <Text>Ver menos</Text>
            </TouchableOpacity>
          )}
          {actualComments.length >= commentsCant && (
            <TouchableOpacity
              onPress={() => setCantComments(commentsCant + 2)}
              underlayColor="transparent"
            >
              <Text>Ver más</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  doctorCard: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 3,
    borderColor: '#d3d3d3',
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  divPictureRating: {
    alignItems: "center",
    marginBottom: 16,
  },
  pictureContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 8,
  },
  doctorImage: {
    width: "100%",
    height: "100%",
  },
  doctorRating: {
    flexDirection: "column",
    alignItems: "center",
  },
  starRating: {
    flexDirection: "row",
    marginBottom: 8,
  },
  star: {
    marginHorizontal: 4,
    color: "gold",
  },
  starText: {
    fontSize: 20,
  },
  selected: {
    color: "gold",
  },
  votesContainer: {
    alignItems: "center",
  },
  votesText: {
    textAlign: "center",
  },
  voteAdvise: {
    marginTop: 8,
    textAlign: "center",
    color: "red",
  },
  div2Details: {
    marginBottom: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailText: {
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontWeight: "bold",
  },
  spanEmail: {
    color: "blue",
  },
  div1Comment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commented: {
    color: "red",
  },
  commentForm: {
    marginBottom: 16,
  },
  commentsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#249bad",
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  button2: {
    height: 40,
    width: "35%",
    backgroundColor: "#249bad",
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: -10,
  },
});

export default DoctorCard;