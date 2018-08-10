import React from 'react';
import { 
    createSwitchNavigator,
    createStackNavigator, 
    createBottomTabNavigator 
} from 'react-navigation';

import { Icon } from 'react-native-elements';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OrganizeMeetingScreen from '../screens/OrganizeMeetingScreen';
import Colors from '../constants/Colors';
import SettingScreen from '../screens/SettingScreen';
import ConfirmPhoneScreen from '../screens/ConfirmPhoneScreen';
import SetLocationScreen from '../screens/SetLocationScreen';

const TabStack = createBottomTabNavigator({
    Home: HomeScreen,
    Add: OrganizeMeetingScreen,
    Setting: SettingScreen
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;

            if (routeName === 'Home') {
                iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Add') {
                iconName = `ios-add-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'Setting') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }

            return <Icon type='ionicon' name={iconName} color={tintColor} size={25} />;
        }
    }),
    tabBarOptions: {
        activeTintColor: Colors.red,
        inactiveTintColor: Colors.grey
    }
});

const AppStack = createStackNavigator({
    Main: TabStack,
    Confirm: ConfirmPhoneScreen,
    Location: SetLocationScreen
}, {
    navigationOptions: ({ navigation }) => {
        let curentRoute; let title;
        try {
            curentRoute = navigation.state.routes[navigation.state.index].routeName;
            title = curentRoute;
            if (curentRoute === 'Home') {
                title = 'Home';
            }
            if (curentRoute === 'Add') {
                title = 'Organize Meeting';
            }
            if (curentRoute === 'Setting') {
                title = 'Settings';
            }
        } catch (e) {
            title = 'Randezvous';
        }

        return { title };
    }
});

const AuthStack = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            header: null
        }
    }
});

export default createSwitchNavigator({
    Splash: SplashScreen,
    App: AppStack,
    Auth: AuthStack
}, {
        initialRouteName: 'Splash'
});