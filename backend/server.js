import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { awsData } from './data.js';
import router from './auth.js';
import loginRouter from './routes/loginRouter.js';
import signupRouter from './routes/signupRouter.js';
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router);

app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.get('/data', async (req, res) => {
  let data = await awsData();
  //console.log(data);
  res.status(200).json({ data });
});

app.use('/hi', (req, res) => {
  console.log('in server!');
  return res.status(200).send('hi');
});

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.use(express.static(path.resolve(__dirname, '../src')));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
