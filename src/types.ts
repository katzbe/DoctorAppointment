export type MedicalSpecialty = {
  label: string;
  value: string;
};

export type TimeSlot = string;

export type DateSlot = {
  date: string;
  times: TimeSlot[];
};

export type RecommendedCalendar = {
  specialty: string;
  slots: DateSlot[];
};
