import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

class ConfirmPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifying: false,
            value: '',
            loading: false,
        };
    }

    getConde() {
        this.setState({ verifying: true });
    }

    verifyCode() {

    }
    render() {
        const { verifying, loading } = this.state;
        const title = verifying ? 'Enter Code' : 'Enter Phone Number';
        const btnTxt = verifying ? 'Verify Number' : 'Get Verification Code';
        const disabled = loading || !this.state.value;
        const action = verifying ? this.verifyCode : this.getConde;
        return (
            <View style={styles.container}>
                <FormLabel>{title}</FormLabel>
                <FormInput 
                    value={this.state.value}
                    onChangeText={(value) => this.setState({ value })}
                    keyboardType='phone-pad'
                />
                <Button 
                    title={btnTxt}
                    containerViewStyle={{ marginTop: 10 }}
                    disabled={disabled}
                    loading={loading}
                    onPress={action.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default ConfirmPhoneScreen;
