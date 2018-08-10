import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { MapView, Location } from 'expo';
import { Spinner } from '../components';

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
            userLocation: {}
        };
    }

    async componentDidMount() {
        //getCurrentPositionAsync. 
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude, longitude };
        this.setState({ initMap: false, userLocation });
    }

    render() {
        if (this.state.initMap) {
            return <Spinner />;
        }

        const { userLocation } = this.state;
        return (
            <View style={styles.container}>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default SetLocationScreen;
