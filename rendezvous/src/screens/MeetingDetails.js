import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import Colors from '../constants/Colors';

class MeetingDetails extends Component {
    static navigationOptions = {
        headerTitle: 'Meeting Details'
    }

    render() {
        const selectedMeeting = this.props.navigation.getParam('selectedMeeting');
        const { profile, location } = selectedMeeting;
        const initialRegion = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.048,
            longitudeDelta: 0.048,
        }
        return (
            <ScrollView style={styles.container}>
                <View style={[styles.userWrap, { height: 60 }]}>
                    <View style={{ marginLeft: 15 }}>
                        <Avatar
                            small
                            rounded
                            source={{ uri: profile.photoURL }}
                        />
                    </View>
                    <Text style={styles.userTextStyle}> {profile.displayName}</Text>
               </View>

                <View style={styles.userWrap}>
                    <Text style={{ padding: 10 }}> {selectedMeeting.description}</Text>
                </View>
                
                <View style={styles.userWrap}>
                    <Text style={{ padding: 10 }}> {location.address}</Text>
                </View>

               <View style={{ flex: 1, height: 300, marginHorizontal: 20, marginTop: 30 }}>
                <MapView 
                    style={{ flex: 1 }}
                    initialRegion={initialRegion}
                    cacheEnabled
                    scrollEnabled={false}
                >
                    <MapView.Marker 
                        coordinate={initialRegion}
                    />
                </MapView>
               </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userWrap: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: Colors.white,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    userTextStyle: {
        fontSize: 15,
        marginLeft: 10,
        color: Colors.grey
    }
});

export default MeetingDetails;
