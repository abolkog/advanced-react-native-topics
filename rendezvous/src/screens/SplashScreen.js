import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { Spinner } from '../components';

const FONT_PATH = '../../assets/fonts/Montserrat-Bold.ttf';
const APP_LOGO = '../../assets/app_logo.png';

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
            
            const token = await AsyncStorage.getItem('fb_token');
            if (token) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
            
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
                <Image source={require(APP_LOGO)} style={styles.logoStyle} />
                <Spinner />
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
    }
});

export default SplashScreen;
