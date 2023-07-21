import diagnoseData from '../../data/diagnoses';

const diagnoses: Diagnose[] = diagnoseData;

import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
