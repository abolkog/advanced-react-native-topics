import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button, ListItem, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

class OrganizeMeetingScreen extends Component {
    state = {
        title: '',
        description: '',
        location: null,
        btnDisabled: true
    };

    render() {
        return (
            <View style={styles.container}>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={(title) => this.setState({ title })} />

                <FormLabel>Description</FormLabel>
                <FormInput 
                    multiline
                    onChangeText={(description) => this.setState({ description })} 
                />

                <FormLabel>Location</FormLabel>
                <ListItem 
                    title='Set Location'
                    rightIcon={<Icon name='ios-pin' type='ionicon' size={25} color={Colors.grey} />}
                    containerStyle={{ marginTop: 20, marginHorizontal: 5 }}
                    onPress={() => this.props.navigation.navigate('Location')}
                />

                <View style={styles.btnContainer}>
                    <Button
                        title='Organize Meeting'
                        raised
                        buttonStyle={styles.buttonStyle}
                        disabled={this.state.btnDisabled}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    btnContainer: {
        alignItems: 'center',
        marginTop: 20,
        flex: 1
    },
    buttonStyle: {
        backgroundColor: Colors.red,
        width: 300,
        borderRadius: 5
    }
});

export default OrganizeMeetingScreen;
