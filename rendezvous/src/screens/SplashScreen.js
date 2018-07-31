import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { Button } from 'react-native-elements';

const FONT_PATH = '../../assets/fonts/Montserrat-Bold.ttf';
class SplashScreen extends Component {
    
    constructor(props) {
        super(props);
        this.loadFontAsync();
        this.state = {
            fontLoaded: false
        };
    }

    async loadFontAsync() {
        try {
            await Font.loadAsync({ montserratBold: require(FONT_PATH) });
            this.setState({ fontLoaded: true });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        if (!this.state.fontLoaded) {
            return <View />;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.fontTest}>SplashScreen</Text>
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
    fontTest: {
        fontFamily: 'montserratBold'
    }
});

export default SplashScreen;
