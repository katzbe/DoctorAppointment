import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import useStore from '../store/useStore';
import { CommonActions, useNavigation } from '@react-navigation/native';

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
      <Text style={styles.text}>
        <Text style={styles.textBold}>מקצוע רפואי: </Text>
        {selectedMedicalSpecialty?.label}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.textBold}>תאריך ושעה: </Text>
        {selectedDateSlot?.date} {selectedTime}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.textBold}>שם המטופל: </Text>
        {userName}
      </Text>
      <Button title="ביטול תור" onPress={handleCancelAppointment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
});
