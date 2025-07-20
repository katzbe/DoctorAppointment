import { create } from 'zustand';
import { Appointment, AppointmentFormData } from '../types';

type Store = {
  userName: string;
  userAppointment: Appointment | null;
  appointmentFormData: AppointmentFormData | null;
  setAppointmentFormData: (
    appointmentFormData: AppointmentFormData | null,
  ) => void;
  setUserAppointment: (appointment: Appointment | null) => void;
  setUserName: (userName: string) => void;
};

const useStore = create<Store>()(set => ({
  userName: '',
  userAppointment: null,
  appointmentFormData: null,
  setUserName: userName => set(() => ({ userName })),
  setAppointmentFormData: appointmentFormData =>
    set(() => ({
      appointmentFormData,
    })),
  setUserAppointment: appointment =>
    set(() => ({
      userAppointment: appointment,
    })),
}));

export default useStore;
