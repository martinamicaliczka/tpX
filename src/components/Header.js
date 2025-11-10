import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.safeArea}> 
        <View style={styles.container}>
            <Text style={styles.title}>X</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#1a1a1a', 
    },
    container: {
        height: 60, 
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    title: {
        color: 'white',
        fontSize: 37,
        fontWeight: 'bold',
    },
});