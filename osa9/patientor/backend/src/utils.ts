import { NewPatientEntry, Gender } from "./types";

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing social security number');
  }
  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Invalid or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation; 
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Invalid or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object
        && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [] 
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;