import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import axios from 'axios';

class ConfirmPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifying: false,
            value: '',
            loading: false,
        };
    }

    getCode = async () => {
        this.setState({ loading: true });
        const url = 'https://us-central1-rendezvous-521e6.cloudfunctions.net/genCode';
        const profile = this.props.navigation.getParam('profile');
        const phone = this.state.value;

        try {
            const { data } = await axios.post(url, { phone, uid: profile.uid });
            if (data.success) {
                this.setState({ loading: false, value: '', verifying: true });
            } else {
                Alert.alert('Failed to get code');
            }
        } catch (e) {
            console.log(e);
        }
    }

    verifyCode() {
        const url = 'https://us-central1-rendezvous-521e6.cloudfunctions.net/verifyCode';
    }
    render() {
        const { verifying, loading } = this.state;
        const title = verifying ? 'Enter Code' : 'Enter Phone Number';
        const btnTxt = verifying ? 'Verify Number' : 'Get Verification Code';
        const disabled = loading || !this.state.value;
        const action = verifying ? this.verifyCode : this.getCode;
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
