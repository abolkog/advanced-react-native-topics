import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../components/Logo';

class TestScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Logo />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default TestScreen;
