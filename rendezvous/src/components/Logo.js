import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Colors from '../constants/Colors';

class Logo extends Component {
    state = {
        position: new Animated.ValueXY(0, 0)
    }

    componentWillMount() {
        Animated.spring(this.state.position, {
            toValue: { x: 300, y: 500 }
        }).start();
    }
    render() {
        return (
            <Animated.View style={this.state.position.getLayout()}>
                <View style={styles.ball} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    ball: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.red
    },
});

export default Logo;
