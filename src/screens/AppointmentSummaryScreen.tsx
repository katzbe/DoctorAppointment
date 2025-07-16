import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';

import useStore from '../store/useStore';

export default function AppointmentSummaryScreen() {
  const navigation = useNavigation();
  const { selectedMedicalSpecialty, selectedDateSlot, selectedTime, userName } =
    useStore(state => state);

  async function handleApproveClick() {
    await AsyncStorage.setItem(
      'appointment',
      JSON.stringify({
        selectedMedicalSpecialty,
        selectedDateSlot,
        selectedTime,
      }),
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
      <Button title="אישור הזימון" onPress={handleApproveClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
});
