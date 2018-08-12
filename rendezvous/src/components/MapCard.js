import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Colors from '../constants/Colors';

class MapCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertial: 10 
    },
    card: {
        height: 70,
        backgroundColor: Colors.white,
        padding: 10,
        flexDirection: 'row'
    }
});

export { MapCard };
