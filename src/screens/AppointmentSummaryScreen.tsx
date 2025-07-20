import { StyleSheet, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import useStore from '../store/useStore';
import Button from '../components/Button';
import SummaryCard from '../components/SummaryCard';
import { saveAppointment } from '../services/StorageService';
import { Appointment } from '../types';

export default function AppointmentSummaryScreen() {
  const navigation = useNavigation();
  const {
    appointmentFormData,
    setUserAppointment,
    setAppointmentFormData,
    userName,
  } = useStore(state => state);

  async function handleApproveClick() {
    const newAppointment = {
      userName,
      medicalSpecialty: appointmentFormData?.specialty,
      dateSlot: appointmentFormData?.dateSlot,
      time: appointmentFormData?.time,
    } as Appointment;
    await saveAppointment(newAppointment);
    setUserAppointment(newAppointment);
    setAppointmentFormData(null);
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
        medicalSpecialty={appointmentFormData?.specialty?.label || ''}
        dateSlot={`${appointmentFormData?.dateSlot?.date} ${appointmentFormData?.time}`}
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
