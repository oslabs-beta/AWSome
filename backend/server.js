import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.resolve(__dirname, '../src')));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
