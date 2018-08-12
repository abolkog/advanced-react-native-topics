import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
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
               <View style={styles.useWrap}>
                    <ListItem
                        roundAvatar
                        avatar={{ uri: profile.photoURL }}
                        title={profile.displayName}
                    />
               </View>

               <View>
                    <ListItem
                        title={location.address}
                        rightIcon={<Icon name='ios-pin' type='ionicon' size={25} color={Colors.grey} />}
                        containerStyle={styles.useWrap}
                    />
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
    useWrap: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginTop: 10
    }
});

export default MeetingDetails;
