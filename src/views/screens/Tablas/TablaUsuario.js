// import React from "react";
// import { View, StyleSheet, Text, Image } from "react-native";

// const TablaUsuario = ({ navigation }) => {

//     return (
//         <View style={styles.header}>
//             <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465073/favicon_rkh0rr.png" }} style={styles.leftImage} />
//             <Text style={styles.titleblue}> FRESH</Text>
//             <Text style={styles.title}>SMILE</Text>
//             <Text style={styles.titleblue2}>CMILLS</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     header: {
//         height: 60,
//         backgroundColor: "black",
//         paddingHorizontal: 16,
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     header2: {
//         marginLeft: 20,
//     },
//     leftImage: {
//         width: 24,
//         height: 24,
//         position: "absolute",
//         left: 16,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "white",
//     },
//     titleblue: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#5FFDFF",
//         marginLeft: 22,
//     },
//     titleblue2: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#5FFDFF",
//     },
// });

// export default TablaUsuario;

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class TablaUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [] // Inicialmente, no hay datos
    };
  }

  componentDidMount() {
    axios.get('https://backfresh.azurewebsites.net/FreshSmile/ConsultarAdministradores')
      .then((response) => {
        this.setState({ datos: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        {this.state.datos.map((dato, index) => (
          <Text key={index}>{dato}</Text>
        ))}
      </View>
    );
  }
}

export default TablaUsuario;