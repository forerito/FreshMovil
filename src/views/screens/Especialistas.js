import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import DoctorCard from './DoctorCard';
import Header from './Header';

function Especialistas() {
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

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

                <Header />
                <View>
                    <Text>Nuestros especialistas</Text>
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
            </ScrollView>
        </SafeAreaView>
    );
}

export default Especialistas;