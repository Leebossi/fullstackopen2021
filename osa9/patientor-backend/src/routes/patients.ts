import express from "express";
import patientService from "../services/patientService";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  const { name, gender, occupation, dateOfBirth, ssn } = req.body;
  const newPatient = patientService.addPatient({
    name,
    gender,
    occupation,
    dateOfBirth,
    ssn
  });
  res.json(newPatient);
});

export default router;
