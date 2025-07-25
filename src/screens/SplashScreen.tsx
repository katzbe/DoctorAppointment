import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useStore from '../store/useStore';
import { getUser, getUserAppointment } from '../services/StorageService';

export default function SplashScreen() {
  const navigation = useNavigation();

  const { setUserName, setUserAppointment } = useStore();

  useEffect(() => {
    (async () => {
      const loggedUser = await getUser();
      if (!loggedUser) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      setUserName(loggedUser);
      const userAppointment = await getUserAppointment(loggedUser);

      if (userAppointment) {
        setUserAppointment(userAppointment);
        navigation.reset({
          index: 0,
          routes: [{ name: 'ExistingAppointmentManagement' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppointmentBooking' }],
        });
      }
    })();
  }, [navigation, setUserName, setUserAppointment]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Appointment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
