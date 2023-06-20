import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const Header2 = () => {

  return (
    <View style={styles.header}>
      <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465073/favicon_rkh0rr.png" }} style={styles.leftImage} />
      <Text style={styles.titleblue}>   FRESH</Text>
      <Text style={styles.title}> SMILE</Text>
      <Text style={styles.titleblue2}> CMILLS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'black',
  },
  header2: {
    marginLeft: 20,
  },
  leftImage: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  titleblue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5FFDFF",
    marginLeft: 22,
  },
  titleblue2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5FFDFF",
  },
});

export default Header2;