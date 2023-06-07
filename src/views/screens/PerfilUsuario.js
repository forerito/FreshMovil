import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Footer from "../layouts/Footer";

const PerfilUsuario = ({ navigation }) => {

    return (
        <SafeAreaView className="flex-1 ">
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

                <Header />





                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = {

};

export default PerfilUsuario;