import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

import express from 'express';
import path from 'path';
import router from './src/renderers.js';

const app = express();
app.use('/assets', express.static(path.resolve('public')));

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
