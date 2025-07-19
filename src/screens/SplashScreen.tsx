import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useStore from '../store/useStore';
import { Appointment } from '../types';

export default function SplashScreen() {
  const navigation = useNavigation();

  const {
    setUserName,
    setSelectedDateSlot,
    setSelectedMedicalSpecialty,
    setSelectedTime,
  } = useStore();

  useEffect(() => {
    (async () => {
      const loggedUser = await AsyncStorage.getItem('@logged_user');
      if (!loggedUser) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }

      setUserName(loggedUser);

      const appointmentsJson = await AsyncStorage.getItem('@appointments');
      const appointments: Appointment[] = appointmentsJson
        ? JSON.parse(appointmentsJson)
        : [];

      const userAppointment = appointments.find(a => a.userName === loggedUser);

      if (userAppointment) {
        setSelectedDateSlot(userAppointment.dateSlot);
        setSelectedMedicalSpecialty(userAppointment.medicalSpecialty);
        setSelectedTime(userAppointment.time);
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
  }, [
    navigation,
    setUserName,
    setSelectedDateSlot,
    setSelectedMedicalSpecialty,
    setSelectedTime,
  ]);

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
