import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, View } from 'react-native';
import useStore from '../store/useStore';
import { CommonActions, useNavigation } from '@react-navigation/native';
import SummaryCard from '../components/SummaryCard';
import Button from '../components/Button';

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

  async function handleCancelAppointment() {
    Alert.alert('האם ברצונך לבטל את התור?', '', [
      {
        text: 'כן',
        onPress: async () => {
          await AsyncStorage.removeItem('appointment');
          setSelectedDateSlot(null);
          setSelectedMedicalSpecialty(null);
          setSelectedTime(null);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'AppointmentBooking' }],
            }),
          );
        },
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
