import { Alert, StyleSheet, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import useStore from '../store/useStore';
import SummaryCard from '../components/SummaryCard';
import Button from '../components/Button';
import { removeAppointment } from '../services/StorageService';

export default function ExistingAppointmentManagementScreen() {
  const navigation = useNavigation();

  const { userName, userAppointment, setUserAppointment } = useStore(
    state => state,
  );

  async function handleOnRemoveAppointmentPress() {
    await removeAppointment(userName);
    setUserAppointment(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AppointmentBooking' }],
      }),
    );
  }

  async function handleCancelAppointment() {
    Alert.alert('האם ברצונך לבטל את התור?', '', [
      {
        text: 'כן',
        onPress: handleOnRemoveAppointmentPress,
      },
      { text: 'לא' },
    ]);
  }

  return (
    <View style={styles.container}>
      <SummaryCard
        medicalSpecialty={userAppointment?.medicalSpecialty.label || ''}
        dateSlot={`${userAppointment?.dateSlot?.date} ${userAppointment?.time}`}
        patientName={userName}
      />
      <Button
        text="ביטול תור"
        variant="danger"
        onPress={handleCancelAppointment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  text: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
});
