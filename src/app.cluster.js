import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';

/* if (cluster.isPrimary) {
  const numProcess = cpus().length;

  for (let i = 0; i < numProcess; i++) {
    cluster.fork();
  }
} else { */
const app = express();

app.get('/', (req, res) => {
  console.log(process.pid);

  res.json({
    status: 'success',
    message: `Peticion from worker ${process.pid}`,
  });
});

app.get('/simple', (req, res) => {
  console.log(process.pid);

  let sum = 0;
  for (let i = 0; i < 100; i++) {
    sum += i;
  }

  res.send({ sum });
});

app.get('/complex', (req, res) => {
  console.log(process.pid);
  let sum = 0;
  for (let i = 0; i < 5e8 * 10; i++) {
    sum += i;
  }

  res.send({
    status: 'success',
    message: `Peticion from worker ${process.pid}`,
    sum,
  });
});

app.listen(8080, () => console.log(`[${process.pid}] Listening...`));
/* } */
