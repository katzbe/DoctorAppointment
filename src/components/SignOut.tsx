import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

import useStore from '../store/useStore';
import { removeUser } from '../services/StorageService';

export default function SignOut() {
  const navigation = useNavigation();

  const { setAppointmentFormData, setUserName } = useStore();

  async function handlePress() {
    removeUser();
    setAppointmentFormData(null);
    setUserName('');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return <Button onPress={handlePress} title="יציאה" color="#007aff" />;
}
