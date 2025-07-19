import { MedicalSpecialty, RecommendedCalendar } from '../types';
import { createDate } from '../utils';

export const MEDICAL_SPECIALTIES = [
  { label: 'רפואה משפחה', value: 'family' },
  { label: 'רופא עור', value: 'dermatologist' },
  { label: 'רופאת נשים', value: 'gynecologist' },
] as MedicalSpecialty[];

export const RECOMMENDED_CALENDARS: RecommendedCalendar[] = [
  {
    specialty: 'family',
    slots: [
      {
        date: createDate(3),
        times: [
          '07:00',
          '07:30',
          '08:00',
          '08:30',
          '09:00',
          '09:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
        ],
      },
      { date: createDate(5), times: ['08:30', '11:00', '15:30'] },
      { date: createDate(7), times: ['08:30', '11:00', '20:30'] },
    ],
  },
  {
    specialty: 'dermatologist',
    slots: [
      { date: createDate(1), times: ['09:00', '10:30', '14:00'] },
      { date: createDate(3), times: ['08:30', '11:00', '15:30'] },
      { date: createDate(9), times: ['08:30', '11:00', '20:30'] },
    ],
  },
  {
    specialty: 'gynecologist',
    slots: [
      { date: createDate(2), times: ['09:00', '10:30', '14:00'] },
      { date: createDate(4), times: ['08:30', '11:00', '15:30'] },
      { date: createDate(8), times: ['08:30', '11:00', '20:30'] },
    ],
  },
];
