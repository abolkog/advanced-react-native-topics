import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';

class SettingScreen extends Component {
    
    async logout() {
        await AsyncStorage.removeItem('fb_token');
        this.props.navigation.navigate('Auth');
    }

    render() {
        const { profile } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Avatar
                        rounded
                        xlarge
                        source={{ uri: `${profile.photoURL}?height=150` }}
                        containerStyle={{ marginBottom: 20 }}
                    />
                    <Text style={styles.textStyle} > {profile.displayName} </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        raised
                        title='Logout'
                        buttonStyle={styles.buttonStyle}
                        onPress={this.logout.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        position: 'absolute', 
        bottom: 20,
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.red,
        borderRadius: 5,
        width: 300
    },
    infoContainer: {
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    }

});


const maptStateToProps = ({ auth }) => {
    return {
        profile: auth.profile
    };
};

export default connect(maptStateToProps)(SettingScreen);
