import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: LoginScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
