import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { MapView, Location } from 'expo';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements';
import axios from 'axios';

import FbConfig from '../FbConfig';
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

    search = async () => {

        let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint += this.state.query;
        endPoint += `&key=${FbConfig.mapAPIKey}`;

        try {
            const { data } = await axios.get(endPoint);
            this.setState({ searchResult: data.results });
        } catch (e) {
            console.log(e);
        }
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
                            subtitle={item.formatted_address}
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
        const { geometry: { location } } = item;
       
        const formattedItem = {
            name: item.name,
            address: item.formatted_address,
            latitude: location.lat,
            longitude: location.lng
        };

        this.setState({ searchResult: null, selectedLocation: formattedItem, btnDisabled: false });

        this.map.animateToRegion(
            {
                latitude: formattedItem.latitude,
                longitude: formattedItem.longitude
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

    onLocationSelected() {
        const { navigation } = this.props;
        navigation.state.params.onGoBack(this.state.selectedLocation);
        navigation.goBack();
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
                        ref={(map) => { this.map = map; }}
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
                    onPress={this.onLocationSelected.bind(this)}
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
