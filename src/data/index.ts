import { MedicalSpecialty, RecommendedCalendar } from '../types';

export const MEDICAL_SPECIALTIES = [
  { label: 'רפואה משפחה', value: 'family' },
  { label: 'רופא עור', value: 'dermatologist' },
  { label: 'רופאת נשים', value: 'gynecologist' },
] as MedicalSpecialty[];

export const RECOMMENDED_CALENDARS: RecommendedCalendar[] = [
  {
    specialty: 'family',
    slots: [
      { date: '2025-07-15', times: ['09:00', '10:30', '14:00'] },
      { date: '2025-07-16', times: ['08:30', '11:00', '15:30'] },
      { date: '2025-07-17', times: ['08:30', '11:00', '20:30'] },
      { date: '2025-07-18', times: ['08:30', '09:00', '15:30'] },
      { date: '2025-07-19', times: ['09:30', '11:00', '15:30'] },
      { date: '2025-07-20', times: ['07:30', '11:00', '17:30'] },
    ],
  },
  {
    specialty: 'dermatologist',
    slots: [
      { date: '2025-07-16', times: ['09:00', '11:30', '15:00'] },
      { date: '2025-07-18', times: ['10:30', '13:00', '16:30'] },
      { date: '2025-07-20', times: ['08:00', '12:00', '14:30'] },
      { date: '2025-07-22', times: ['09:15', '11:45', '17:00'] },
      { date: '2025-07-23', times: ['08:30', '13:30', '16:00'] },
      { date: '2025-07-24', times: ['09:45', '12:15', '15:30'] },
      { date: '2025-07-25', times: ['10:00', '13:00', '14:45'] },
      { date: '2025-07-26', times: ['08:15', '11:00', '16:15'] },
      { date: '2025-07-28', times: ['09:00', '12:00', '14:00'] },
      { date: '2025-07-29', times: ['10:30', '13:15', '15:45'] },
    ],
  },
  {
    specialty: 'gynecologist',
    slots: [
      { date: '2025-07-19', times: ['08:00', '11:30', '14:30'] },
      { date: '2025-07-20', times: ['09:00', '13:00', '16:30'] },
    ],
  },
];
