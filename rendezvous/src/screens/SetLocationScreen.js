import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { MapView, Location } from 'expo';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements';

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
            selectedLocation: null,
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
        //Replace with Google API Later on 
        //Dummy Data
        let searchResult = [];
        for (let i = 0; i < 50; i++) {
            searchResult[i] = { name: `Name ${i}`, address: `Address ${i}`, latitude: 37.79203431960414, longitude: 126.70127335275188 };
        }

        this.setState({ searchResult });
    }

    toggleSearchResult() {
        if (!this.state.searchResult) return;

        return (
            <ScrollView style={{ height: 200, marginBottom: 20 }}>
                <List containerStyle={{ marginHorizontal: 15 }}>
                {
                    this.state.searchResult.map((item, i) => (
                        <ListItem 
                            key={i}
                            title={item.name}
                            subtitle={item.address}
                            leftIcon={{ name: 'ios-pin', type: 'ionicon' }}
                            onPress={this.setSelectedLocation.bind(this, item)}
                        />
                    ))
                }
                </List>
            </ScrollView>
        );
    }

    setSelectedLocation(item) {
        this.setState({ searchResult: null, selectedLocation: item });

        this.map.animateToRegion(
            {
                latitude: item.latitude,
                longitude: item.longitude
            },
            350
        );
    }

    showMapMarker() {
        if (!this.state.selectedLocation) return;
        const { latitude, longitude, name } = this.state.selectedLocation;
        return (
            <MapView.Marker 
                title={name}
                coordinate={{ latitude, longitude }}
            />
        );
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
                        ref={map => this.map = map }
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LONG_DELTA
                        }}
                    >
                        { this.showMapMarker() }

                    </MapView>
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
