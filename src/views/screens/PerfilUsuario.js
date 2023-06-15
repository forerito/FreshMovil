import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Button, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
} from "react-native-alert-notification";

const PerfilUsuario = ({ navigation }) => {
    const [Documento, setTipoDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [Telefono, setTelefono] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [estado, setEstado] = useState("");
    const [Correo, setCorreo] = useState("");
    const [Contraseña, setContraseña] = useState("");
    const [fechaRegistro, setFechaRegistro] = useState("");
    const [paciente, setPaciente] = useState({});
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [identificacionPaciente, setIdentificacionPaciente] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);

    const handlePress = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };


    const images = [
        "https://img.freepik.com/free-vector/cute-girl-gaming-holding-joystick-with-hand-peace-cartoon-icon-illustration-people-technology-icon-concept-isolated-flat-cartoon-style_138676-2168.jpg?w=740&t=st=1686703355~exp=1686703955~hmac=c2666eef056d68fb3cf25e50dd516cec520f2ea66bcee38aff1dea8a3fd481ab",
        "https://img.freepik.com/free-vector/cute-gorilla-playing-game-virtual-reality-with-joystick-cartoon-vector-icon-illustration-animal_138676-6743.jpg?w=740&t=st=1686703668~exp=1686704268~hmac=f7c14344a573bfbc51293a459eea06f80ae7c48c82f168e79cbec4aa495439f9",
        "https://i.pinimg.com/564x/63/52/77/6352774cefd5f7d2450b120c2af1bcaa.jpg",
        "https://img.freepik.com/free-vector/cute-astronaut-with-rocket-bag-cartoon-vector-icon-illustration-technology-education-icon-isolated_138676-5828.jpg?w=740&t=st=1686703712~exp=1686704312~hmac=46d2c66efedb34251d87a12eb587577e6985622760112de67d666370e7bd16d9",
        "https://img.freepik.com/free-psd/samurai-online-video-games-3d-illustration_1419-2618.jpg?w=740&t=st=1686703405~exp=1686704005~hmac=b7d72099acf8b34e8e3e2bfb075bd9d0b7a357db5d9b3ef26490de684898cbe5",
    ];

    const [assignedImage, setAssignedImage] = useState(null);

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const fetchAssignedImage = async () => {
        try {
            let storedImage = await AsyncStorage.getItem('assignedImage');
            if (!storedImage) {
                storedImage = getRandomImage();
                await AsyncStorage.setItem('assignedImage', storedImage);
            }
            setAssignedImage(storedImage);
        } catch (error) {
            console.log('Error fetching assigned image:', error);
        }
    };

    useEffect(() => {
        fetchAssignedImage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");

                const response = await axios.get(
                    `https://freshsmile.azurewebsites.net/FreshSmile/BuscarPacientes/${userId}`
                );
                setPaciente(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            setTipoDocumento(paciente.tipo_documento);
            setNombre(paciente.nombre_completo);
            setTelefono(paciente.telefono);
            setDireccion(paciente.direccion);
            setCorreo(paciente.correo);
            setContraseña(paciente.contraseña);
            setFechaRegistro(paciente.fecha_registro);
            setEstado(paciente.estado);
            setIdentificacionPaciente(paciente.identificacion_paciente);

        }
    }, [loading, paciente]);

    const formattedFechaRegistro = moment(fechaRegistro).format(
        "DD/MM/YYYY HH:mm:ss"
    );

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSaveButtonClick = async () => {
        try {
            const datosPaciente = {
                tipo_documento: Documento,
                identificacion_paciente: identificacionPaciente,
                nombre_completo: nombre,
                telefono: Telefono,
                direccion: Direccion,
                correo: Correo,
                contraseña: Contraseña,
            };

            const accessToken = await AsyncStorage.getItem("accessToken");

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            await axios.put(
                "https://freshsmile.azurewebsites.net/FreshSmile/ModificarPacientes",
                datosPaciente,
                config
            );

            setEditMode(false);
            setLoading(true);
            // Alert.alert("¡Éxito! Datos modificados con éxito");
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "ÉXITO",
                textBody: "Datos modificados con éxito",
                button: "Cerrar",
            });
            return;
        } catch (error) {
            console.error(error.response);
            // Alert.alert("¡Error! Ocurrió un error al modificar los datos");
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "ERROR",
                textBody: "Ocurrió un error al modificar los datos",
                button: "Cerrar",
            });
            return;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AlertNotificationRoot>

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

                                <TouchableOpacity onPress={() => navigation.navigate("Prueba")}>
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

                                <TouchableOpacity onPress={() => navigation.navigate("DoctorCard")}>
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
                        {/* <View style={styles.bannerPrincipalAd}>
              <Text style={styles.tituloBanner}>¡Bienvenido a tu perfil!</Text>
            </View> */}
                        <View style={styles.containerUsuario}>
                            <View style={styles.tarjetaPerfilU}>

                                <Image
                                    style={styles.imagePerfilUsuario}
                                    source={{ uri: assignedImage }}
                                />
                                <View style={{ flex: 1, marginLeft: 10, marginTop: 10 }}>
                                    <Text style={styles.perfilTitulo}>Mi Perfil</Text>
                                    <Text style={styles.perfilInfo}>Revisa tu perfil</Text>
                                    {editMode ? (
                                        <TouchableOpacity
                                            onPress={handleSaveButtonClick}
                                            style={[styles.guardarBotonContainer, { flex: 1 }]}
                                        >
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Guardar</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => setEditMode(true)}
                                            style={[styles.editarBotonContainer, { flex: 1 }]}
                                        >
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Editar</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={styles.perfilTabla}>
                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Tipo de documento:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={Documento}
                                    onChangeText={setTipoDocumento}
                                    editable={false}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>
                                    Identificación del Paciente:
                                </Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={identificacionPaciente.toString()}
                                    onChangeText={setIdentificacionPaciente}
                                    editable={editMode}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Nombre:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={nombre}
                                    onChangeText={setNombre}
                                    editable={editMode}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Teléfono:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={Telefono}
                                    onChangeText={setTelefono}
                                    editable={editMode}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Dirección:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={Direccion}
                                    onChangeText={setDireccion}
                                    editable={editMode}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Correo:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={Correo}
                                    onChangeText={setCorreo}
                                    editable={editMode}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Contraseña:</Text>
                                <View style={styles.passwordInputContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        secureTextEntry={!showPassword}
                                        value={Contraseña}
                                        onChangeText={setContraseña}
                                        editable={editMode}
                                    />
                                    <View>

                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Icon
                                                name={showPassword ? 'eye-slash' : 'eye'}
                                                size={24}
                                                style={styles.passwordToggleIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Fecha de registro:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={formattedFechaRegistro}
                                    onChangeText={setFechaRegistro}
                                    editable={false}
                                />
                            </View>

                            <View style={styles.perfilRow}>
                                <Text style={styles.perfilDescripcion}>Estado:</Text>
                                <TextInput
                                    style={styles.perfilValor}
                                    value={estado}
                                    onChangeText={setEstado}
                                    editable={false}
                                />
                            </View>
                        </View>
                    </View>
                </AlertNotificationRoot>
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
    containerUsuario: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tarjetaPerfilU: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    imagePerfilUsuario: {
        marginTop: -20,
        width: 90,
        height: 90,
        borderRadius: 25,
    },
    perfilTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    perfilInfo: {
        fontSize: 16,
        marginBottom: 3,
    },
    guardarBotonContainer: {
        // flex: 1,
        width: "40%",
        alignItems: 'center',
        backgroundColor: '#249bad',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    guardarBoton: {
        // flex: 1,
    },
    editarBotonContainer: {
        // flex: 1,
        width: '40%',
        alignItems: 'center',
        backgroundColor: '#8fccd6',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    editarBoton: {
        // flex: 1,
    },
    bannerPrincipalAd: {
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    tituloBanner: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    perfilTabla: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 10,
    },
    perfilRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    perfilDescripcion: {
        width: 150,
        textAlign: 'center',
        marginRight: 10,
        fontWeight: 'bold',
    },
    perfilValor: {
        flex: 1,
        borderWidth: 2,
        padding: 10,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        padding: 10,
        width: '77%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'gray',
    },
    passwordToggleIcon: {
        position: 'absolute',
        right: 10,
        marginTop: -13,
    },
});

export default PerfilUsuario;