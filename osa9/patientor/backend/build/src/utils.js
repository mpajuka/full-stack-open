"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Invalid or missing name');
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Invalid or missing social security number');
    }
    return ssn;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Invalid or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid or missing occupation');
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Invalid or missing gender: ' + gender);
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object
        && 'gender' in object && 'occupation' in object) {
        const newEntry = {
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
exports.default = toNewPatientEntry;
