import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ComentarioComponent = ({ comentario }) => {
    return (
        <View style={styles.cardContenedor}>
            <View style={styles.cardComentario}>
                <Text>{comentario}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContenedor: {
        backgroundColor: 'lightgray',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
    },
    cardComentario: {
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 10,
    },
});