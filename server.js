import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'twig');

app.use('/build', express.static(path.join(__dirname, 'public/build')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

app.use('/', router);

app.listen(3000, () => {
  console.log('🚀 App is running on http://localhost:3000');
});
