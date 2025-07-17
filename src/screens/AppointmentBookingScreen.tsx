import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Picker from '../components/Picker';
import { MEDICAL_SPECIALTIES } from '../data';
import useStore from '../store/useStore';
import Button from '../components/Button';

export default function AppointmentBookingScreen() {
  const navigation = useNavigation();

  const { selectedMedicalSpecialty, setSelectedMedicalSpecialty } = useStore(
    state => state,
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>בחרו מקצוע רפאוי</Text>
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
        containerStyle={styles.button}
        disabled={!selectedMedicalSpecialty}
        text="חיפוש יומנים"
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
    padding: 20,
    alignItems: 'center',
  },
  pickerContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    width: 200,
  },
});
