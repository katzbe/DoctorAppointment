import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Picker from '../components/Picker';
import { RECOMMENDED_CALENDARS } from '../data';
import useStore from '../store/useStore';
import Button from '../components/Button';

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
      <View style={styles.specialtyLabelCard}>
        <Text style={styles.specialtyLabelText}>
          {selectedMedicalSpecialty?.label}
        </Text>
      </View>
      <FlatList
        inverted
        showsHorizontalScrollIndicator={false}
        style={styles.datePicker}
        contentContainerStyle={styles.datePickerContainer}
        horizontal
        data={calendar?.slots}
        keyExtractor={({ date }) => date}
        renderItem={({ item }) => (
          <Pressable
            style={styles.dataPickerItem}
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
      <Button
        containerStyle={styles.button}
        text="זימון תור"
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
  specialtyLabelCard: {
    padding: 20,
    width: '100%',
    backgroundColor: '#F3FAF8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialtyLabelText: {
    fontSize: 18,
    color: '#333',
  },
  datePicker: {
    maxHeight: 80,
    marginVertical: 20,
  },
  dataPickerItem: {
    padding: 10,
    backgroundColor: '#C0E8FF',
    borderRadius: 15,
  },
  datePickerContainer: {
    gap: 15,
    flexGrow: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { width: 200 },
  timePicker: { gap: 10, marginBottom: 20 },
});
