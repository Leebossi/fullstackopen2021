import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender;
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn " + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown) => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation " + occupation);
  }
  return occupation;
};

type Fields = {
  name: unknown;
  gender: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  gender,
  dateOfBirth,
  ssn,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
  };

  return newPatient;
};
