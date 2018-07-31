import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements' ;

class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>SplashScreen</Text>
                <Button 
                    title='Nav'
                    onPress={() => this.props.navigation.navigate('Auth')}
                />
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
});

export default SplashScreen;
