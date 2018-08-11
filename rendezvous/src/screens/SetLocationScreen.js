import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { MapView, Location } from 'expo';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import { Spinner } from '../components';
import Colors from '../constants/Colors';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.048;
const LONG_DELTA = LAT_DELTA * ASPECT_RATIO;

class SetLocationScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Set Location'
    }

    constructor(props) {
        super(props);
        this.state = {
            initMap: true,
            userLocation: {},
            query: '',
            searchResult: null,
            btnDisabled: true
        };
    }

    async componentDidMount() {
        //getCurrentPositionAsync. 
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude, longitude };
        this.setState({ initMap: false, userLocation });
    }

    search() {

    }

    toggleSearchResult() {
        if (!this.state.searchResult) return;
    }

    render() {
        if (this.state.initMap) {
            return <Spinner />;
        }

        const { userLocation } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <FormLabel>Enter Location Name</FormLabel>
                    <FormInput
                        onChangeText={(query) => this.setState({ query })}
                        onSubmitEditing={() => this.search()}
                    />
                </View>

                { this.toggleSearchResult() }

                <View style={{ height: 400, marginHorizontal: 15 }} >
                    <MapView 
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LONG_DELTA
                        }}
                    />
                </View>

                <Button 
                    raised
                    title='Confirm Location'
                    containerViewStyle={{ marginTop: 10 }}
                    buttonStyle={{ backgroundColor: Colors.red }}
                    disabled={this.state.btnDisabled}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
});

export default SetLocationScreen;
