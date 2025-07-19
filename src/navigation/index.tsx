import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';
import DoctorCalendarScreen from '../screens/DoctorCalendarScreen';
import AppointmentSummaryScreen from '../screens/AppointmentSummaryScreen';
import ExistingAppointmentManagementScreen from '../screens/ExistingAppointmentManagementScreen';
import SplashScreen from '../screens/SplashScreen';
import SignOut from '../components/SignOut';

export const RootStack = createNativeStackNavigator({
  initialRouteName: 'SplashScreen',
  screenOptions: {
    contentStyle: {
      backgroundColor: 'white',
    },
  },
  screens: {
    SplashScreen: {
      screen: SplashScreen,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    AppointmentBooking: {
      screen: AppointmentBookingScreen,
      options: {
        headerTitle: 'זימון תור',
        headerRight: SignOut,
      },
    },
    DoctorCalendar: {
      screen: DoctorCalendarScreen,
      options: {
        headerTitle: 'יומן רופא',
      },
    },
    AppointmentSummary: {
      screen: AppointmentSummaryScreen,
      options: {
        headerTitle: 'סיכום זימון',
      },
    },
    ExistingAppointmentManagement: {
      screen: ExistingAppointmentManagementScreen,
      options: {
        headerTitle: 'ניהול תור קיים',
        headerRight: SignOut,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
