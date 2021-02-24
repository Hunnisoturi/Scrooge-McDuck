const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3002;

const uploadRouter = require('./routes/upload');

app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}))

app.disable('x-powered-by');
app.use('/upload', uploadRouter);
app.get('*', (_req, res) => res.status(404).end());

app.listen(port, () => console.log(`Backend listening on port ${port}`));