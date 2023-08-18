import patientData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();

const getPatients = (): NonSensitivePatient[] => {
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

const getPatientById = ( id: string ): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientById
};
