import express from 'express';

const app = express();
app.use(express.json());
import calculateBmi from './calculateBmi';
import calculateExercises from './exerciseCalculator';


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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({error: "parameters missing"});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exerciseNumArr: number[] = daily_exercises;
  if (isNaN(Number(target)) || !Array.isArray(exerciseNumArr)) {
    res.status(400).send({error: "malformatted parameters"});
  }
  for (let i = 0; i < exerciseNumArr.length; ++i) {
    if (isNaN(exerciseNumArr[i])) {
      res.status(400).send({error: "malformatted parameters"});
    }
  }

  const result = calculateExercises(exerciseNumArr, Number(target));
  res.status(200).json(result);

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});