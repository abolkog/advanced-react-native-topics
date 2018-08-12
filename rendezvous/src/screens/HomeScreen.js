import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

import { Spinner } from '../components';
import { fetchMeetings } from '../actions';
import Colors from '../constants/Colors';

class HomeScreen extends Component {

    componentWillMount() {
        this.props.fetchMeetings();
    }

    showMeetingMarker(meeting) {
        
        this.map.animateToRegion(
            {
                latitude: meeting.location.latitude,
                longitude: meeting.location.longitude

            }, 350
        );
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
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        { this.props.result.map((meeting, index) => {
                            return (
                                <View key={index} style={styles.card}>
                                    <ListItem 
                                        roundAvatar
                                        avatar={{ uri: meeting.profile.photoURL }}
                                        title={meeting.title}
                                        subtitle={meeting.location.address}
                                        onPress={this.showMeetingMarker.bind(this, meeting)}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                <MapView 
                    ref={map => this.map = map }
                    style={styles.container}
                    initialRegion={initialRegion}
                >
                {this.props.result.map((meeting, index) => {
                    return (
                        <MapView.Marker 
                            key={index}
                            coordinate={meeting.location}
                            onPress={() => this.props.navigation.navigate('Details')}
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
    },
    card: {
        marginHorizontal: 5,
        backgroundColor: Colors.white,
        height: 50,
        width: 200
    }
});

const mapStateToProps = ({ meetings }) => {
    return {
        fetching: meetings.fetching,
        result: meetings.result
    };
};
export default connect(mapStateToProps, { fetchMeetings })(HomeScreen);
