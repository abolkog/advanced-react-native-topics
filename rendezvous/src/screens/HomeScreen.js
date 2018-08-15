import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { MapView, Notifications } from 'expo';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

import { Spinner } from '../components';
import { fetchMeetings } from '../actions';
import Colors from '../constants/Colors';
import { registerForPushNotificationsAsync } from '../services';


class HomeScreen extends Component {

    componentWillMount() {
        this.props.fetchMeetings();
    }

    componentDidMount() {
        const { profile } = this.props;
        registerForPushNotificationsAsync(profile.uid);

        Notifications.addListener(this.handleNotification);
    }

    handleNotification = (notification) => {
        console.log(notification);
        if (notification && notification.origin === 'received') {
            //User is in forground
            //Handle here alert();
            Alert.alert('New Message');
        }
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
                    ref={(map) => { this.map = map; }}
                    style={styles.container}
                    initialRegion={initialRegion}
                >
                {this.props.result.map((meeting, index) => {
                    return (
                        <MapView.Marker 
                            key={index}
                            coordinate={meeting.location}
                            onPress={() => this.props.navigation.navigate('Details', { meetingId: meeting.id })}
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

const mapStateToProps = ({ meetings, auth }) => {
    return {
        fetching: meetings.fetching,
        result: meetings.result,
        profile: auth.profile
    };
};
export default connect(mapStateToProps, { fetchMeetings })(HomeScreen);
