import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

import useStore from '../store/useStore';

export default function SignOut() {
  const navigation = useNavigation();

  const {
    setSelectedDateSlot,
    setSelectedMedicalSpecialty,
    setSelectedTime,
    setUserName,
  } = useStore();

  async function handlePress() {
    await AsyncStorage.removeItem('@logged_user');
    setSelectedDateSlot(null);
    setSelectedMedicalSpecialty(null);
    setSelectedTime(null);
    setUserName('');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return <Button onPress={handlePress} title="יציאה" color="#007aff" />;
}
