import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { MapView } from 'expo';
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
            initMap: true
        };
    }

    componentDidMount() {
        this.setState({ initMap: false });
    }

    render() {
        if (this.state.initMap) {
            return <Spinner />;
        }

        return (
            <View style={styles.container}>
                <MapView 
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 48.85,
                        longitude: 2.29,
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
