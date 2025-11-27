const express = require('express');
const app = express();
const boardRouter = require('./routes/board');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/board', boardRouter);

app.listen(3000, () => {
  console.log('Server running: http://localhost:3000');
});
