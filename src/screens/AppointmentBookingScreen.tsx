import { Button, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Picker from '../components/Picker';
import { MEDICAL_SPECIALTIES } from '../data';
import useStore from '../store/useStore';

export default function AppointmentBookingScreen() {
  const navigation = useNavigation();

  const { selectedMedicalSpecialty, setSelectedMedicalSpecialty } = useStore(
    state => state,
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        {MEDICAL_SPECIALTIES.map(item => (
          <Picker
            key={item.label}
            title={item.label}
            onPress={() => setSelectedMedicalSpecialty(item)}
            isSelected={item.label === selectedMedicalSpecialty?.label}
          />
        ))}
      </View>
      <Button
        disabled={!selectedMedicalSpecialty}
        title="חיפוש יומנים"
        onPress={() => {
          navigation.navigate('DoctorCalendar');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  pickerContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
