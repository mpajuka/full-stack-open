import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseRouter';
const app = express();
app.use(express());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});