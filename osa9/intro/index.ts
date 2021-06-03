import express from 'express';
import calculateBmi from './calculateBmi';
import exerciseCalculator from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (!height || !weight) {
      throw new Error('Not enough parameters!');
    } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('Malformatted parameters!');
    }

    const result = {
      height: req.query.height,
      weight: req.query.weight,
      bmi: calculateBmi(Number(height), Number(weight))
    };
    res.send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  } else if (isNaN(Number(target))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i]))) {
      return res.status(400).json({
        error: 'malformatted parameters'
      });
    }
  }

  return res.json(exerciseCalculator(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});