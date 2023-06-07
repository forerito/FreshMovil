import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Footer from "../layouts/Footer";

const Ranking = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://freshsmile.azurewebsites.net/FreshSmile/CrearAdministradores');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const calculateStars = (valoracion) => {
        const roundedValoracion = Math.round(valoracion);
        return "⭐".repeat(roundedValoracion);
    };

    const sortedData = data
        .sort((a, b) => b.valoracion - a.valoracion)
        .slice(0, 5);

    return (
        <SafeAreaView className="flex-1 ">
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

                <Header />

                <View style={styles.container}>
                    <Text style={styles.title}>Ranking</Text>
                    <Text style={styles.subtitle}>Fresh Smile Cmills</Text>
                    <View>
                        <View style={styles.rowContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.text}>Puesto</Text>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.text}>Nombre</Text>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.text}>Valoración</Text>
                            </View>
                        </View>
                        {sortedData.map((item, index) => (
                            <View key={item.id} style={index === 0 ? styles.firstPlace : null}>
                                <View style={styles.rowContainer}>
                                    <Text>{index + 1}</Text>
                                    <View>
                                        <Image source={{ uri: item.foto }} style={styles.profilePic} />
                                        {index === 0 && (
                                            <Image
                                                source={{
                                                    uri:
                                                        'https://res.cloudinary.com/dexfjrgyw/image/upload/v1685893707/corona_ysuxhw.png',
                                                }}
                                                style={styles.crownIcon}
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.text}>{item.nombre}</Text>
                                    <Text style={styles.text}>{calculateStars(item.valoracion)}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = {
    container: {
        backgroundColor: '#f5f5f5;',
        borderRadius: 8,
        marginTop: 25,
        marginBottom: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#5FFDFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    crownIcon: {
        width: 20,
        height: 20,
    },
    text: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 20,
        fontWeight: 'bold',
    },
    titleContainer: {
        padding: 5,
        marginRight: 10,
    },
};

export default Ranking;