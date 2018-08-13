import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';
import Colors from '../constants/Colors';

const APP_LOGO = '../../assets/app_logo.png';

class Logo extends Component {
   
    state = {
        position: new Animated.ValueXY(0, 0),
        fadeAnim: new Animated.Value(0),
        springAnim: new Animated.Value(0)
    }

    componentWillMount() {
        const { position, fadeAnim, springAnim } = this.state;
        
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000
            }),
            Animated.timing(position, {
                toValue: { x: 0, y: -20 },
                duration: 1500
            })
        ]).start();

        Animated.spring(springAnim, {
            toValue: 1
        }).start();

    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[this.state.position.getLayout(), { opacity: this.state.fadeAnim }]}>
                    <Image source={require(APP_LOGO)} style={styles.logoStyle} />
                </Animated.View>
                
                <Animated.View style={{ transform: [{ scale: this.state.springAnim }] }}>
                    <Text style={styles.logoText}>Rendezvous</Text>
                </Animated.View>

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
        height: 150,
    },
    logoText: {
        fontSize: 40,
        color: Colors.red,
        fontFamily: 'montserratBold'

    }
});

export default Logo;
