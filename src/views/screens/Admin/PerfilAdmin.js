import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../Header";

const PerfilAdmin = ({ navigation }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

        <Header />

        

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default PerfilAdmin;