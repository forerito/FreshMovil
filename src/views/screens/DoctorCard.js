// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ComentarioComponent } from '../layouts/ComentarioComponent';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const DoctorCard = ({ valoracion, votos, comentarios, data, ratingId }) => {
//   const [userId, setUserId] = useState("");
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [commentsCant, setCantComments] = useState(1);
//   const [actualComments, setActualComments] = useState(comentarios);
//   const [actualVotos, setActualVotos] = useState(votos);
//   const [actualValoration, setActualValoration] = useState(valoracion);
//   const commentInput = useRef(null);
//   const commentButton = useRef(null);

//   const handleVote = async (value) => {
//     if (actualVotos.some(elem => elem.userId === userId)) {
//       Alert.alert(
//         'Usted ya votó en este especialista',
//         '',
//         [{ text: 'Cerrar', onPress: () => { } }],
//         { cancelable: true }
//       );
//       return;
//     }

//     const accessToken = await AsyncStorage.getItem('accessToken');

//     Alert.alert(
//       'Quiere votar por este especialista?',
//       `Su voto: ${value}`,
//       [
//         {
//           text: 'Votar',
//           onPress: () => {
//             const headers = {
//               Authorization: `Bearer ${accessToken}`
//             };
//             console.log(headers);
//             axios.patch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/añadirVoto/${ratingId}?vote=${value}`, null, {
//               headers: headers
//             }).then(res => {
//               Alert.alert(
//                 'Su voto fue registrado correctamente',
//                 '',
//                 [
//                   {
//                     text: 'Cerrar',
//                     onPress: () => {
//                       setActualVotos(res.data.votos);
//                       setActualValoration(res.data.valoracion);
//                     }
//                   }
//                 ],
//                 { cancelable: true }
//               );
//             }).catch(err => {
//               Alert.alert(
//                 'Hubo un error, intentelo más tarde',
//                 '',
//                 [{ text: 'Cerrar', onPress: () => { } }],
//                 { cancelable: true }
//               );
//             });
//           }
//         },
//         {
//           text: 'No votar',
//           onPress: () => { }
//         }
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleComment = async () => {
//     try {
//       commentInput.current.disabled = true;
//       commentButton.current.disabled = true;

//       const data = {
//         Comentario: commentInput.current.value,
//       };

//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const res = await axios.patch(
//         `https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/comentar/${ratingId}`,
//         data,
//         {
//           headers: headers,
//         }
//       );

//       setActualComments(res.data.comentarios);
//       Swal.fire({
//         title: 'Especialista comentado correctamente',
//         icon: 'success',
//       });
//       setIsCommenting(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     setUserId(AsyncStorage.getItem('userId'));
//   }, [])

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView className="h-full" showsVerticalScrollIndicator={false}>



//         <View style={styles.doctorCard}>
//           <View style={styles.doctorSection1}>
//             <View style={styles.divPictureRating}>
//               <View style={styles.pictureContainer}>
//                 <Image
//                   source={{ uri: "https://fresh-smile.netlify.app/assets/user-d6ab4092.webp" }}
//                   style={styles.doctorImage}
//                 />
//               </View>
//               <View style={styles.doctorRating}>
//                 <View style={styles.starRating}>
//                   {[1, 2, 3, 4, 5].map((value) => (
//                     <TouchableOpacity
//                       key={value}
//                       onPress={() => handleVote(value)}
//                       style={[styles.star, value <= actualValoration ? styles.selected : null]}
//                     >
//                       <Text style={[styles.starText, value <= actualValoration ? styles.selectedText : null]}>
//                         {value % 1 === 0.5 ? "★½" : "★"}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//                 <View style={styles.votesContainer}>
//                   <Text>{actualVotos.length} votos</Text>
//                   {actualVotos.some((elem) => elem.userId === userId) && (
//                     <Text style={styles.voteAdvise}>Usted ya votó en este especialista</Text>
//                   )}
//                 </View>
//               </View>
//             </View>
//             <View style={styles.div2Details}>
//               <View style={styles.doctorDetails}>
//                 <Text style={styles.doctorName}>{data.nombre_completo}</Text>
//                 <Text style={styles.detailText}>
//                   Especialidad: <Text style={styles.span}>{data.especialidad}</Text>
//                 </Text>
//                 <Text style={styles.detailText}>
//                   Correo electrónico: <Text style={styles.spanEmail}>{data.correo}</Text>
//                 </Text>
//                 <Text style={styles.detailText}>
//                   Descripción:{" "}
//                   <Text style={styles.span}>
//                     {data.descripcion || "El especialista no tiene una descripción registrada"}
//                   </Text>
//                 </Text>


//                 <View style={styles.div1Coment}>
//                   <Text style={styles.comentariosTitle}>Comentarios:</Text>
//                   {!actualComments.map((elem) => elem.userId).includes(userId) ? (
//                     <TouchableOpacity onPress={(e) => setIsCommenting(!isCommenting)} style={styles.button}>
//                       <Text style={styles.comentarButton}>Comentar</Text>
//                     </TouchableOpacity>
//                   ) : (
//                     <Text style={styles.yaComentoText}>Usted ya comentó acá</Text>
//                   )}
//                 </View>



//                 {isCommenting && (
//                   <View style={styles.commentForm}>
//                     <Text style={styles.commentLabel}>Ingresa tu comentario</Text>
//                     <TextInput ref={commentInput} name="Comentario" type="text" style={styles.commentInput} />
//                     <TouchableOpacity onPress={handleComment}>
//                       <Text style={styles.commentButton}>Comentar</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//                 {actualComments.length > 0 ? (
//                   actualComments.map((coment, i) => i < commentsCant && <ComentarioComponent key={i} comentario={coment.comentario} />)
//                 ) : (
//                   <Text style={styles.noCommentsText}>El especialista no tiene comentarios aún</Text>
//                 )}
//                 <View style={styles.commentsButtons}>
//                   {commentsCant > 1 && (
//                     <TouchableOpacity onPress={() => setCantComments(commentsCant - 2)}>
//                       <Text style={styles.btnComm}>Ver menos</Text>
//                     </TouchableOpacity>
//                   )}
//                   {actualComments.length >= commentsCant && (
//                     <TouchableOpacity onPress={() => setCantComments(commentsCant + 2)}>
//                       <Text style={[styles.btnComm, styles.alwaysEnd]}>Ver más</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>



//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // starRating: {
//   //   flexDirection: 'row',
//   // },
//   // star: {
//   //   padding: 5,
//   // },
//   // selected: {
//   //   // backgroundColor: 'red',
//   // },
//   // selectedText: {
//   //   color: 'yellow',
//   // },
//   // starText: {
//   //   fontSize: 20,
//   // },
//   // doctorImage: {
//   //   padding: 5,
//   //   width: 100,
//   //   height: 100,
//   // },

//   doctorCard: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 10,
//     borderRadius: 5,
//     margin: 10, // Agregar margen de 10 unidades en todos los lados
//   },
//   doctorSection1: {
//     flexDirection: "column", // Cambiado a "column" para apilar la foto y el texto
//   },
//   divPictureRating: {
//     marginBottom: 10,
//     alignItems: "center", // Añadido para centrar la foto y las estrellas horizontalmente
//   },
//   pictureContainer: {},
//   doctorImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   doctorRating: {
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   starRating: {
//     flexDirection: "row",
//   },
//   star: {
//     marginHorizontal: 2,
//   },
//   selected: {
//     // backgroundColor: "yellow",
//   },
//   starText: {
//     fontSize: 20,
//   },
//   selectedText: {
//     fontWeight: "bold",
//     color: "gold",
//   },
//   votesContainer: {
//     alignItems: "center",
//   },
//   voteAdvise: {
//     color: "red",
//   },
//   div2Details: {},
//   doctorDetails: {
//     marginLeft: 10,
//   },
//   doctorName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   detailText: {
//     marginBottom: 5,
//   },
//   span: {
//     fontWeight: "bold",
//   },
//   spanEmail: {
//     fontStyle: "italic",
//     fontWeight: "bold",
//   },
//   doctorSection2: {
//     marginLeft: 20, // Añadido margen izquierdo para separar la sección de comentarios del texto
//   },
//   div1Coment: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   comentariosTitle: {
//     fontWeight: "bold",
//   },
//   comentarButton: {
//     color: "blue",
//   },
//   yaComentoText: {
//     fontStyle: "italic",
//   },
//   commentForm: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   commentLabel: {
//     fontWeight: "bold",
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: "gray",
//     marginBottom: 10,
//     padding: 5,
//   },
//   commentButton: {
//     backgroundColor: "blue",
//     color: "white",
//     padding: 10,
//     textAlign: "center",
//     borderRadius: 5,
//   },
//   noCommentsText: {
//     fontStyle: "italic",
//   },
//   commentsButtons: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   btnComm: {
//     color: "blue",
//     marginLeft: 5,
//   },
//   alwaysEnd: {
//     alignSelf: "flex-end",
//   },
// });


// export default DoctorCard;

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { ComentarioComponent } from '../layouts/ComentarioComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorCard = ({ valoracion, votos, comentarios, data, ratingId }) => {
  const [userId, setUserId] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentsCant, setCantComments] = useState(1);
  const [actualComments, setActualComments] = useState(comentarios);
  const [actualVotos, setActualVotos] = useState(votos);
  const [actualValoration, setActualValoration] = useState(valoracion);
  const commentInput = useRef(null);
  const commentButton = useRef(null);


  const handleVote = async (value) => {
    if (actualVotos.some(elem => elem.userId === userId)) {
      Alert.alert(
        'Usted ya votó en este especialista',
        '',
        [{ text: 'Cerrar', onPress: () => { } }],
        { cancelable: true }
      );
      return;
    }

    const accessToken = await AsyncStorage.getItem('accessToken');

    Alert.alert(
      'Quiere votar por este especialista?',
      `Su voto: ${value}`,
      [
        {
          text: 'Votar',
          onPress: () => {
            const headers = {
              Authorization: `Bearer ${accessToken}`
            };
            console.log(headers);
            axios.patch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/añadirVoto/${ratingId}?vote=${value}`, null, {
              headers: headers
            }).then(res => {
              Alert.alert(
                'Su voto fue registrado correctamente',
                '',
                [
                  {
                    text: 'Cerrar',
                    onPress: () => {
                      setActualVotos(res.data.votos);
                      setActualValoration(res.data.valoracion);
                    }
                  }
                ],
                { cancelable: true }
              );
            }).catch(err => {
              Alert.alert(
                'Hubo un error, intentelo más tarde',
                '',
                [{ text: 'Cerrar', onPress: () => { } }],
                { cancelable: true }
              );
            });
          }
        },
        {
          text: 'No votar',
          onPress: () => { }
        }
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
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        Alert.alert('Token de acceso no encontrado', '', [{ text: 'Cerrar' }]);
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.patch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/comentar/${ratingId}`, data, {
        headers: headers,
      });

      setActualComments(response.data.comentarios);
      Alert.alert('Especialista comentado correctamente', '', [{ text: 'Cerrar' }]);
      setIsCommenting(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error al realizar el comentario', '', [{ text: 'Cerrar' }]);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('userId').then((value) => {
      setUserId(value);
    });
  }, []);

  return (
    <View style={styles.doctorCard}>
      <View style={styles.doctorSection1}>
        <View style={styles.divPictureRating}>
          <Image
            source={{ uri: "https://fresh-smile.netlify.app/assets/user-d6ab4092.webp" }}
            style={styles.profilePicture}
          />
          <View style={styles.doctorRating}>
            <View style={styles.starRating}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  title={value % 1 === 0.5 ? '★½' : '★'}
                  onPress={() => handleVote(value)}
                  style={[styles.star, value <= actualValoration ? styles.selected : null]}
                />
              ))}
            </View>
            <View>
              <Text style={{ marginLeft: 40 }}>{actualVotos.length} votos</Text>
              {actualVotos.some((elem) => elem.userId === userId) && (
                <Text style={styles.voteAdvise}>Usted ya votó en este especialista</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.div2Details}>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{data.nombre_completo}</Text>
            <Text>Especialidad: <Text style={styles.doctorSpecialty}>{data.especialidad}</Text></Text>
            <Text>Correo electrónico: <Text style={styles.doctorEmail} onPress={() => Linking.openURL(`mailto:${data.correo}`)}>{data.correo}</Text></Text>
            <Text>Descripción: <Text>{data.descripcion || 'El especialista no tiene una descripción registrada'}</Text></Text>
          </View>
        </View>
      </View>
      <View style={styles.doctorSection2}>
        <View style={styles.div1Comment}>
          <Text>Comentarios:</Text>
          {!actualComments.some((elem) => elem.userId === userId) ? (
            <Button title="Comentar" onPress={() => setIsCommenting(!isCommenting)} />
          ) : (
            <Text style={styles.commented}>Usted ya comentó acá</Text>
          )}
        </View>
        {isCommenting && (
          <View style={styles.commentForm}>
            <Text>Ingresa tu comentario</Text>
            <TextInput ref={commentInput} name="Comentario" type="text" />
            <Button ref={commentButton} title="Comentar" onPress={handleComment} />
          </View>
        )}
        {actualComments.length > 0 ? (
          actualComments.map((coment, i) => i < commentsCant && <ComentarioComponent key={i} comentario={coment.comentario} />)
        ) : (
          <Text>El especialista no tiene comentarios aún</Text>
        )}
        <View style={styles.commentsButtons}>
          {commentsCant > 1 && <Button title="Ver menos" onPress={() => setCantComments(commentsCant - 2)} />}
          {actualComments.length >= commentsCant && (
            <Button title="Ver más" onPress={() => setCantComments(commentsCant + 2)} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // starRating: {
  //   flexDirection: 'row',
  // },
  // star: {
  //   padding: 5,
  // },
  // selected: {
  //   // backgroundColor: 'red',
  // },
  // selectedText: {
  //   color: 'yellow',
  // },
  // starText: {
  //   fontSize: 20,
  // },
  // doctorImage: {
  //   padding: 5,
  //   width: 100,
  //   height: 100,
  // },

  doctorCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    margin: 10, // Agregar margen de 10 unidades en todos los lados
  },
  doctorSection1: {
    flexDirection: "column", // Cambiado a "column" para apilar la foto y el texto
  },
  divPictureRating: {
    marginBottom: 10,
    alignItems: "center", // Añadido para centrar la foto y las estrellas horizontalmente
  },
  pictureContainer: {},
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  doctorRating: {
    alignItems: "center",
    marginBottom: 10,
  },
  starRating: {
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 2,
  },
  selected: {
    // backgroundColor: "yellow",
  },
  starText: {
    fontSize: 20,
  },
  selectedText: {
    fontWeight: "bold",
    color: "gold",
  },
  votesContainer: {
    alignItems: "center",
  },
  voteAdvise: {
    color: "red",
  },
  div2Details: {},
  doctorDetails: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    marginBottom: 5,
  },
  span: {
    fontWeight: "bold",
  },
  spanEmail: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  doctorSection2: {
    marginLeft: 20, // Añadido margen izquierdo para separar la sección de comentarios del texto
  },
  div1Coment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  comentariosTitle: {
    fontWeight: "bold",
  },
  comentarButton: {
    color: "blue",
  },
  yaComentoText: {
    fontStyle: "italic",
  },
  commentForm: {
    marginTop: 10,
    marginBottom: 10,
  },
  commentLabel: {
    fontWeight: "bold",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 5,
  },
  commentButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
  },
  noCommentsText: {
    fontStyle: "italic",
  },
  commentsButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnComm: {
    color: "blue",
    marginLeft: 5,
  },
  alwaysEnd: {
    alignSelf: "flex-end",
  },
});

export default DoctorCard;