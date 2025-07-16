import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';
import DoctorCalendarScreen from '../screens/DoctorCalendarScreen';
import AppointmentSummaryScreen from '../screens/AppointmentSummaryScreen';
import ExistingAppointmentManagementScreen from '../screens/ExistingAppointmentManagementScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screenOptions: {
    contentStyle: {
      backgroundColor: 'white',
    },
  },
  screens: {
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
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
