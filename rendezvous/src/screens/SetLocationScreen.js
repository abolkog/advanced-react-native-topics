import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';


class SetLocationScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Set Location'
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={{ flex: 1 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default SetLocationScreen;
