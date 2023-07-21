import patientData from '../../data/patients';

import { PatientExcludingSSN } from '../types';

const getPatients = (): PatientExcludingSSN[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients
};
