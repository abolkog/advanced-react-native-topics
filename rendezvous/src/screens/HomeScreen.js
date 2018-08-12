import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../components';

import { fetchMeetings } from '../actions';

class HomeScreen extends Component {

    componentDidMount() {
        this.props.fetchMeetings();
    }

    render() {
        if (this.props.fetching) return <Spinner />;
        console.log(this.props.result);
        return (
            <View style={styles.container}>
                <Text>HomeScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = ({ meetings }) => {
    return {
        fetching: meetings.fetching,
        result: meetings.result
    }
};
export default connect(mapStateToProps, { fetchMeetings })(HomeScreen);
