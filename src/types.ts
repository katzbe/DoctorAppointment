export type MedicalSpecialty = {
  label: string;
  value: string;
};

export type DateSlot = {
  date: string;
  times: string[];
};

export type RecommendedCalendar = {
  specialty: string;
  slots: DateSlot[];
};

export type AppointmentFormData = {
  specialty?: MedicalSpecialty;
  dateSlot?: DateSlot;
  time?: string;
};

export type Appointment = {
  userName: string;
  medicalSpecialty: MedicalSpecialty;
  dateSlot: DateSlot;
  time: string;
};
