import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import { Spinner } from '../components';
import { fetchMeetings } from '../actions';

class HomeScreen extends Component {

    componentWillMount() {
        this.props.fetchMeetings();
    }

    render() {
        if (this.props.fetching) return <Spinner />;
        
        const firstMeeting = this.props.result[0];
        const initialRegion = {
            latitude: firstMeeting.location.latitude,
            longitude: firstMeeting.location.longitude,
            latitudeDelta: 0.048,
            longitudeDelta: 0.048
        };
        return (
            <View style={styles.container}>
                <View style={styles.cardWrap}>
                    <ScrollView horizontal>
                        { this.props.result.map((meeting, index) => {
                            return <Text>{ meeting.title }</Text>;
                        })}
                    </ScrollView>
                </View>

                <MapView 
                    style={styles.container}
                    initialRegion={initialRegion}
                >
                {this.props.result.map((meeting, index) => {
                    return (
                        <MapView.Marker 
                            key={index}
                            coordinate={meeting.location}
                        />
                    );
                })}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardWrap: {
        position: 'absolute',
        top: 20,
        zIndex: 1
    }
});

const mapStateToProps = ({ meetings }) => {
    return {
        fetching: meetings.fetching,
        result: meetings.result
    };
};
export default connect(mapStateToProps, { fetchMeetings })(HomeScreen);
