import express from 'express';
import calculateBmi from './calculateBmi'
const app = express();

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
  } catch (e) {
    res.send({error: e.message});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});