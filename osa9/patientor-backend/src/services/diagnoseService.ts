import diagnoseData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getEntries = (): Array<Diagnose> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

export default {
  getEntries
};