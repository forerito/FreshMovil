import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ComentarioComponent = ({ comentario }) => {
    return (
        <View style={styles.cardComentario}>
            <Text>{comentario}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardComentario: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});