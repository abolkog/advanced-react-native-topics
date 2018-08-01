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
import AddScreen from '../screens/AddScreen';
import Colors from '../constants/Colors';

const TabStack = createBottomTabNavigator({
    Home: HomeScreen,
    Add: AddScreen
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;

            if (routeName === 'Home') {
                iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Add') {
                iconName = `ios-add-circle${focused ? '' : '-outline'}`;
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
    Main: TabStack
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