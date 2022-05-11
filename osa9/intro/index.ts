import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const request = req.query;
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(Number(height), Number(weight));

  if (!request.height || !request.weight) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
