import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

type Body = {
  daily_exercises: number[];
  target: number;
};

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

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as Body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameteres missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(target) ||
    !daily_exercises.every((x) => typeof x === "number")
  ) {
    return res.status(400).json({ error: "parameters malformatted" });
  }

  const result = calculateExercise(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
