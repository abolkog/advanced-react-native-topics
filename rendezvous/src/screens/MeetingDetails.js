import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MeetingDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MeetingDetails</Text>
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

export default MeetingDetails;
