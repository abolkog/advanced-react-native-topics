import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../constants/Colors';

const APP_LOGO = '../../assets/app_logo.png';

class Logo extends Component {
   
    render() {
        return (
            <View style={styles.container}>
                <Image source={require(APP_LOGO)} style={styles.logoStyle} />
                <Text style={styles.logoText}>Rendezvous</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        width: 150,
        height: 150
    },
    logoText: {
        fontSize: 40,
        color: Colors.red,
        fontFamily: 'montserratBold'

    }
});

export default Logo;
