import express from 'express';
import cors from 'cors';
import externalIdGenerator from './externalIDGenerator.js';
import MixedMetrix from './cloudwatch.js';
const port = 81;

const app = express();

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    preflightContinue: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/random', async (req, res) => {
  let id = await externalIdGenerator();
  return res.status(200).json({ id });
});

app.post('/data', async (req, res) => {
  const { graph, metric, data } = req.body;
  let result = await MixedMetrix({ graph, metric, data });
  return res.status(200).json({ result });
});

app.options('/data', async (req, res) => {
  const { graph, metric, data } = req.body;
  let result = await MixedMetrix({ graph, metric, data });
  return res.status(200).json({ result });
});

app.use((req, res) => res.status(404).send('No Data'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Something Went Wrong in server 2',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
