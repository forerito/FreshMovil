import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

const MapaArmenia = () => {
  const odontologias = [
    { lat: 4.537163, lng: -75.675416, nombre: "Odontología 1" },
    { lat: 4.537874, lng: -75.677238, nombre: "Odontología 2" },
    { lat: 4.534769, lng: -75.67548, nombre: "Odontología 3" },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Header />
        </View>
      </SafeAreaView>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 4.537,
          longitude: -75.665,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {odontologias.map((odontologia) => (
          <Marker
            key={odontologia.nombre}
            coordinate={{
              latitude: odontologia.lat,
              longitude: odontologia.lng,
            }}
            title={odontologia.nombre}
            image={{
              uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465012/maps-footer_wgu1et.png",
            }} // Asegúrate de tener la imagen en la ruta correcta
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapaArmenia;