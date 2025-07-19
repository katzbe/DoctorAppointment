import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateSlot, MedicalSpecialty } from '../types';

const LOGGED_USER_KEY = '@logged_user';
const APPOINTMENTS_KEY = '@appointments';

export type Appointment = {
  userName: string;
  medicalSpecialty: MedicalSpecialty;
  dateSlot: DateSlot;
  time: string;
};

export async function saveUser(userName: string) {
  await AsyncStorage.setItem(LOGGED_USER_KEY, userName);
}

export async function getUser() {
  return await AsyncStorage.getItem(LOGGED_USER_KEY);
}

export async function removeUser() {
  await AsyncStorage.removeItem('@logged_user');
}

export async function saveAppointment(newAppointment: Appointment) {
  const appointments = await getAppointments();
  const updatedAppointments = [...appointments, newAppointment];
  await AsyncStorage.setItem(
    '@appointments',
    JSON.stringify(updatedAppointments),
  );
}

export async function removeAppointment(userName: string) {
  const appointments = await getAppointments();
  const newAppointments = appointments.filter(a => a.userName !== userName);
  await AsyncStorage.setItem('@appointments', JSON.stringify(newAppointments));
}

export async function getAppointments(): Promise<Appointment[]> {
  const json = await AsyncStorage.getItem(APPOINTMENTS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function getUserAppointment(
  userName: string,
): Promise<Appointment | undefined> {
  const all = await getAppointments();
  return all.find(a => a.userName === userName);
}
