import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import useStore from '../store/useStore';
import SummaryCard from '../components/SummaryCard';
import Button from '../components/Button';
import { Appointment } from '../types';

export default function ExistingAppointmentManagementScreen() {
  const navigation = useNavigation();

  const {
    selectedMedicalSpecialty,
    selectedDateSlot,
    selectedTime,
    setSelectedDateSlot,
    setSelectedMedicalSpecialty,
    setSelectedTime,
    userName,
  } = useStore(state => state);

  async function handleOnRemoveAppointmentPress() {
    const appointmentsJson = await AsyncStorage.getItem('@appointments');
    const appointments: Appointment[] = appointmentsJson
      ? JSON.parse(appointmentsJson)
      : [];

    const newAppointments = appointments.filter(a => a.userName !== userName);

    await AsyncStorage.setItem(
      '@appointments',
      JSON.stringify(newAppointments),
    );

    setSelectedDateSlot(null);
    setSelectedMedicalSpecialty(null);
    setSelectedTime(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AppointmentBooking' }],
      }),
    );
  }

  async function handleCancelAppointment() {
    Alert.alert('האם ברצונך לבטל את התור?', '', [
      {
        text: 'כן',
        onPress: handleOnRemoveAppointmentPress,
      },
      { text: 'לא' },
    ]);
  }

  return (
    <View style={styles.container}>
      <SummaryCard
        medicalSpecialty={selectedMedicalSpecialty?.label || ''}
        dateSlot={`${selectedDateSlot?.date} ${selectedTime}`}
        patientName={userName}
      />
      <Button
        text="ביטול תור"
        variant="danger"
        onPress={handleCancelAppointment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  text: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
});
