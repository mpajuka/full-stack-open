import patientData from '../../data/patients';
import { NewPatientEntry, Patient, PatientExcludingSSN } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();

const getPatients = (): PatientExcludingSSN[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: id,
    ...entry
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};
