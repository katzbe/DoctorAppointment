import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar, type DateData } from 'react-native-calendars';
import { useCallback, useMemo, useState } from 'react';

import Picker from '../components/Picker';
import { RECOMMENDED_CALENDARS } from '../data';
import useStore from '../store/useStore';
import Button from '../components/Button';

const INITIAL_DATE = new Date().toISOString().split('T')[0];

export default function DoctorCalendarScreen() {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(INITIAL_DATE);

  const { appointmentFormData, setAppointmentFormData } = useStore(
    state => state,
  );

  const getMarkedDates = useCallback(() => {
    const slots = RECOMMENDED_CALENDARS.find(
      item => item.specialty === appointmentFormData?.specialty?.value,
    )?.slots;

    if (!slots) return {};

    return slots.reduce<Record<string, { marked: boolean }>>((acc, date) => {
      acc[date.date] = { marked: true };
      return acc;
    }, {});
  }, [appointmentFormData]);

  const marked = useMemo(() => {
    return {
      ...getMarkedDates(),
      [selected || '']: {
        selected: true,
      },
    };
  }, [selected, getMarkedDates]);

  const handleDayPress = useCallback(
    (day: DateData) => {
      setSelected(day.dateString);

      const dateSlot = RECOMMENDED_CALENDARS.find(
        item => item.specialty === appointmentFormData?.specialty?.value,
      )?.slots.find(date => date.date === day.dateString);

      setAppointmentFormData({ ...appointmentFormData, time: '', dateSlot });
    },
    [appointmentFormData, setAppointmentFormData],
  );

  return (
    <View style={styles.container}>
      <View style={styles.specialtyLabelCard}>
        <Text style={styles.specialtyLabelText}>
          {appointmentFormData?.specialty?.label}
        </Text>
      </View>
      <Calendar
        style={styles.calendar}
        initialDate={selected}
        disableAllTouchEventsForDisabledDays
        minDate={INITIAL_DATE}
        onDayPress={handleDayPress}
        markedDates={marked}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timePickerContainer}
        style={styles.timePicker}
        horizontal
        inverted
        data={appointmentFormData?.dateSlot?.times}
        renderItem={({ item }) => (
          <Picker
            key={item}
            title={item}
            isSelected={item === appointmentFormData?.time}
            onPress={() =>
              setAppointmentFormData({ ...appointmentFormData, time: item })
            }
          />
        )}
      />
      <Button
        containerStyle={styles.button}
        text="זימון תור"
        disabled={!appointmentFormData?.dateSlot || !appointmentFormData.time}
        onPress={() => navigation.navigate('AppointmentSummary')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  specialtyLabelCard: {
    padding: 20,
    width: '100%',
    backgroundColor: '#F3FAF8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  specialtyLabelText: {
    fontSize: 18,
    color: '#333',
  },
  calendar: {
    marginBottom: 20,
  },
  timePickerContainer: {
    gap: 10,
    alignItems: 'center',
  },
  timePicker: {
    maxHeight: 120,
    marginBottom: 40,
  },

  button: { width: 200, alignSelf: 'center' },
});
