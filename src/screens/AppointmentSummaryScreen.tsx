import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';

import useStore from '../store/useStore';
import Button from '../components/Button';
import SummaryCard from '../components/SummaryCard';
import { Appointment } from '../types';

export default function AppointmentSummaryScreen() {
  const navigation = useNavigation();
  const { selectedMedicalSpecialty, selectedDateSlot, selectedTime, userName } =
    useStore(state => state);

  async function handleApproveClick() {
    const storedAppointments = await AsyncStorage.getItem('@appointments');
    const appointments: Appointment[] = storedAppointments
      ? JSON.parse(storedAppointments)
      : [];

    const newAppointment = {
      userName,
      medicalSpecialty: selectedMedicalSpecialty,
      dateSlot: selectedDateSlot,
      time: selectedTime,
    };

    const updatedAppointments = [...appointments, newAppointment];
    await AsyncStorage.setItem(
      '@appointments',
      JSON.stringify(updatedAppointments),
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'ExistingAppointmentManagement' }],
      }),
    );
  }

  return (
    <View style={styles.container}>
      <SummaryCard
        medicalSpecialty={selectedMedicalSpecialty?.label || ''}
        dateSlot={`${selectedDateSlot?.date} ${selectedTime}`}
        patientName={userName}
      />
      <Button
        containerStyle={styles.button}
        text="אישור הזימון"
        onPress={handleApproveClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  button: { width: 200, marginTop: 25 },
});
