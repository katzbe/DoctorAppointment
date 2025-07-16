import { create } from 'zustand';
import { DateSlot, MedicalSpecialty } from '../types';

type Store = {
  userName: string;
  selectedTime: string | null;
  selectedMedicalSpecialty: MedicalSpecialty | null;
  selectedDateSlot: DateSlot | null;
  setUserName: (userName: string) => void;
  setSelectedTime: (time: string | null) => void;
  setSelectedDateSlot: (dataSlot: DateSlot | null) => void;
  setSelectedMedicalSpecialty: (
    medicalSpecialty: MedicalSpecialty | null,
  ) => void;
};

const useStore = create<Store>()(set => ({
  userName: '',
  selectedTime: null,
  selectedDateSlot: null,
  selectedMedicalSpecialty: null,
  setUserName: userName => set(() => ({ userName })),
  setSelectedTime: time =>
    set(() => ({
      selectedTime: time,
    })),
  setSelectedDateSlot: dataSlot => set(() => ({ selectedDateSlot: dataSlot })),
  setSelectedMedicalSpecialty: medicalSpecialty =>
    set(() => ({
      selectedMedicalSpecialty: medicalSpecialty,
    })),
}));

export default useStore;
