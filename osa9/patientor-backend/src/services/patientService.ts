import patientData from '../../data/patients.json';

import { Patient, NonSensitivePatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};