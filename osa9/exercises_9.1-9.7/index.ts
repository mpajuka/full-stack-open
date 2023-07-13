import express from 'express';

const app = express();
import calculateBmi from './calculateBmi';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (height <= 0 || weight <= 0) {
      throw new Error;
    }
    res.status(200).send({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (error: unknown) {
    res.status(400).send({error: "malformatted parameters"});
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});