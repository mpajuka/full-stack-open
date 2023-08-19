import diagnoseData from '../../data/diagnoses';

const diagnoses: Diagnosis[] = diagnoseData;

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
