import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { awsData, awsHourData } from './data.js';
import router from './auth.js';
import loginRouter from './routes/loginRouter.js';
import signupRouter from './routes/signupRouter.js';
import authenticateToken from './controllers/authMiddleware.js';
import Awsrouter from './routes/ApiRoutes.js';
const port = 3000;
const app = express();

const __dirname =
  path.dirname(fileURLToPath(import.meta.url)) || path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

//CAN BE DELETED, WAS ONCE A TEST ROUTER
app.use('/auth', router);
app.use('/aws_services', Awsrouter);

//TEST ROUTE, can be deleted
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', user: req.user });
});

//CAN BE DELETED
// ROUTES ORIGINALLY SET UP TO SEND USER TO login or signup page
// app.use('/signup', signupRouter);
// app.use('/login', loginRouter);

//VITE CONFIG file allows for this to be just /data instead of /Home/data
app.get('/data', async (req, res) => {
  let data = await awsHourData();
  res.status(200).json(data);
});

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json('Success, accessed a protected route');
});



app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

//default global error handler
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

// app.use(express.static(path.resolve(__dirname, '../src')));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
