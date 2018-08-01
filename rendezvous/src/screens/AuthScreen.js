import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

class AuthScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoText} >Rendezvous</Text>
                <Text style={styles.logoSubText}>Organize your meeting today!</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        raised
                        icon={{ name: 'facebook', type: 'font-awesome' }}
                        title='Continue With Facebook'
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    logoText: {
        fontSize: 40,
        color: Colors.red,
        fontFamily: 'montserratBold',
        marginBottom: 20
    },
    logoSubText: {
        color: Colors.grey,
        fontSize: 15
    },
    buttonContainer: {
        marginTop: 50
    },
    buttonStyle: {
        backgroundColor: Colors.facebook,
        borderRadius: 5
    }
});

export default AuthScreen;
