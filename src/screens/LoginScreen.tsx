import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

import useStore from '../store/useStore';
import { useState } from 'react';
import Button from '../components/Button';
import { getUserAppointment, saveUser } from '../services/StorageService';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    userName,
    setUserName,
    setSelectedDateSlot,
    setSelectedMedicalSpecialty,
    setSelectedTime,
  } = useStore(state => state);

  const [password, setPassword] = useState('');

  async function handleSubmit() {
    await saveUser(userName);
    const userAppointment = await getUserAppointment(userName);
    if (userAppointment) {
      setSelectedDateSlot(userAppointment.dateSlot);
      setSelectedMedicalSpecialty(userAppointment.medicalSpecialty);
      setSelectedTime(userAppointment.time);
      navigation.reset({
        index: 0,
        routes: [{ name: 'ExistingAppointmentManagement' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppointmentBooking' }],
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ברוך הבא</Text>
        <TextInput
          style={styles.input}
          value={userName}
          placeholder="שם משתמש"
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="סיסמה"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button
          variant="primary"
          disabled={!userName || !password}
          text="כניסה"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#fff',
    padding: 24,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: 16,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
});
