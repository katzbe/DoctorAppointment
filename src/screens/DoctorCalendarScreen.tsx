import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Picker from '../components/Picker';
import { RECOMMENDED_CALENDARS } from '../data';
import useStore from '../store/useStore';

export default function DoctorCalendarScreen() {
  const navigation = useNavigation();

  const {
    selectedMedicalSpecialty,
    selectedDateSlot,
    selectedTime,
    setSelectedDateSlot,
    setSelectedTime,
  } = useStore(state => state);

  const calendar = RECOMMENDED_CALENDARS.find(
    item => item.specialty === selectedMedicalSpecialty?.value,
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.datePicker}
        contentContainerStyle={styles.datePickerContainer}
        horizontal
        data={calendar?.slots}
        keyExtractor={({ date }) => date}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setSelectedDateSlot(item);
              setSelectedTime('');
            }}
          >
            <Text>{item.date}</Text>
          </Pressable>
        )}
      />
      <View style={styles.timePicker}>
        {selectedDateSlot?.times.map(time => (
          <Picker
            key={time}
            title={time}
            isSelected={time === selectedTime}
            onPress={() => setSelectedTime(time)}
          />
        ))}
      </View>
      <Text>{selectedMedicalSpecialty?.label}</Text>
      <Text>{selectedMedicalSpecialty?.value}</Text>
      <Button
        title="זימון תור"
        disabled={!selectedDateSlot || !selectedTime}
        onPress={() => navigation.navigate('AppointmentSummary')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  datePicker: { maxHeight: 60, marginVertical: 20 },
  datePickerContainer: {
    gap: 15,
    paddingVertical: 20,
  },
  timePicker: {},
});
