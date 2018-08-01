import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Facebook } from 'expo';

import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import FbConfig from '../FbConfig';

class AuthScreen extends Component {

    async testFacebookLogin() {
        const { token, type } = await Facebook.logInWithReadPermissionsAsync(FbConfig.appId, 
            { permissions: ['public_profile'] });
        if (type === 'cancel') {
            console.log('canceled');
            return;
        }

        console.log(token);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoText} >Rendezvous</Text>
                <Text style={styles.logoSubText}>Organize your meeting today!</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={this.testFacebookLogin.bind(this)}
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
