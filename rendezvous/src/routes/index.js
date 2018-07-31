import { 
    createSwitchNavigator,
    createStackNavigator, 
    createBottomTabNavigator } from 'react-navigation'

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';

const TabStack = createBottomTabNavigator({
    Home: HomeScreen
});

const AppStack = createStackNavigator({
    Main: TabStack
});

const AuthStack = createStackNavigator({
    Auth: AuthScreen
});

export default createSwitchNavigator({
    Splash: SplashScreen,
    App: AppStack,
    Auth: AuthStack
});