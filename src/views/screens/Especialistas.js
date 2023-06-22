import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from 'axios';
import DoctorCard from './DoctorCard';
import Header from './Header';
import Footer from '../layouts/Footer';

function Especialistas({ navigation }) {
    const [especialistas, setEspecialistas] = useState([]);
    const [especialistasVC, setEspecialistasVC] = useState([]);

    const getEspecialistas = () => {
        axios.get("https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarEspecialista")
            .then(res => setEspecialistas(res.data));
    };

    const getEspecialistasVC = () => {
        axios.get("https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarRating")
            .then(res => setEspecialistasVC(res.data));
    };

    useEffect(() => {
        getEspecialistas();
        getEspecialistasVC();
    }, []);

    useEffect(() => {
        console.log(especialistasVC);
        console.log(especialistas);
    }, [especialistasVC, especialistas]);

    const [menuOpen, setMenuOpen] = useState(false);

    const handlePress = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

                <Header />

                <View style={{ backgroundColor: "black", marginLeft: 5, marginRight: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 340, marginTop: -43 }}>
                        <TouchableOpacity onPress={handlePress}>
                            <Icon name="bars" size={24} color="#5FFDFF" />
                        </TouchableOpacity>
                    </View>

                    {menuOpen && (
                        <View style={{ marginTop: 8 }}>
                            <TouchableOpacity onPress={handleClose}>
                                <View style={styles.contentMenuCerrar}>
                                    <Icon name="window-close" size={24} color="white" />
                                    <Text style={{ marginLeft: 8, color: 'white' }}>Cerrar</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="home" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Inicio</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("NosotrosScreen")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="users" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Nosotros</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("ProcedimientosScreen")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="tooth" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Procedimientos</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("AgendarCita")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="user-clock" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Agendar</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("TablaUsuario")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="calendar-alt" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Citas</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Ranking")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="trophy" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Ranking</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Especialistas")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="user-check" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Especialistas</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("ContactoScreen")}>
                                <View style={styles.contentMenuItems}>
                                    <Icon name="comments" size={24} color="white" />
                                    <Text style={styles.contentMenuText}>Contacto</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text>Contacto</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.title}>Nuestros especialistas</Text>
                    <View>
                        {especialistasVC.length > 0 && especialistas.map((especialista, i) => {
                            return (
                                <DoctorCard
                                    key={i}
                                    data={especialista}
                                    valoracion={especialistasVC.find(esp => esp.identificacion_especialista == especialista.identificacion_especialista).valoracion}
                                    comentarios={especialistasVC.find(esp => esp.identificacion_especialista == especialista.identificacion_especialista).comentarios}
                                    votos={especialistasVC.find(esp => esp.identificacion_especialista == especialista.identificacion_especialista).votos}
                                    ratingId={especialistasVC.find(esp => esp.identificacion_especialista == especialista.identificacion_especialista).id}
                                />
                            );
                        })}
                    </View>
                </View>

                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentMenuCerrar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 300,
        marginBottom: 5,
    },
    contentMenuItems: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    contentMenuText: {
        marginLeft: 8,
        color: 'white',
        fontSize: 16,
    },
    title: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
    },
});

export default Especialistas;