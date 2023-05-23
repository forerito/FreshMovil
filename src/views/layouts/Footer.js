import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Linking } from "react-native";

const Footer = () => {

  const handleFacebookPress = async () => {
    await Linking.openURL("https://www.facebook.com/");
  }

  const handleInstagramPress = async () => {
    await Linking.openURL("https://www.instagram.com/");
  }

  return (
    <View>
      <View style={styles.footerContainer}>
        <Text style={styles.title}>FRESH SMILE CMILLS</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.icon}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465012/maps-footer_wgu1et.png" }}
              style={styles.iconImage}
            />
            <Text style={styles.iconText}>
              Dirección: Cra 21a, calle 9na #099
            </Text>
          </View>
          <View style={styles.icon}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465010/email-footer_ppvsxa.png" }} style={styles.iconImage} />
            <Text style={styles.iconText}>
              Email: freshsmilecmills@gmail.com
            </Text>
          </View>
          <View style={styles.icon}>
            <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465014/phone-footer_dxehqg.png" }} style={styles.iconImage} />
            <Text style={styles.iconText}>Teléfono: 3204415807</Text>
          </View>
        </View>

        <View style={styles.containerRedes}>
          <View style={styles.containerTitleRedes}>
            <Text style={styles.titleRedes}>Redes sociales</Text>
          </View>
          <View style={styles.imageContainerRedes}>
            <TouchableOpacity onPress={handleFacebookPress}>
              <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465009/facebook_bz0iwc.png" }} style={styles.imageRedes} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInstagramPress}>
              <Image source={{ uri: "https://res.cloudinary.com/dsot09sfy/image/upload/v1684465004/instagram_h15nc8.png" }} style={styles.imageRedes} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <View style={styles.icon2}>
        <Text style={styles.footerText}>
          Los mejores servicios te los brinda nuestro consultorio.
        </Text>
        <Text style={styles.footerText}>© 2022 Fresh Smile Cmills</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    color: "white",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 10,
    padding: 10,
    left: 0,
    right: 0,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    color: "white",
  },
  icon2: {
    color: "black",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 5,
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  iconText: {
    fontSize: 15,
    color: "white",
  },
  footerText: {
    fontSize: 14,
    color: "black",
  },
  containerRedes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 230,
    marginBottom: 10,
  },
  containerTitleRedes: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  titleRedes: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 5,
  },
  imageContainerRedes: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
  },
  imageRedes: {
    width: 50,
    height: 50,
    margin: 3,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Footer;