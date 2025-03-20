import express from 'express';
import path from 'path';

const app = express();
const __dirname = process.env.PWD;

app.use(process.env.BASE_UI_PATH, express.static('dist'));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, './dist/index.html')));

app.listen(process.env.UI_PORT || 3000, () => { console.info('Listening the PORT', process.env.UI_PORT || 3000); });
