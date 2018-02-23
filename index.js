const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require('mustache-express');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// This can be placed under your imports
app.use(express.static(__dirname + '/public/build'));

const reactagramAPIRouter = require('./Controllers/API/reactagram.js');

app.use('/API/reactagram', reactagramAPIRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
});

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});

app.listen(PORT, () => { console.log("Server started on " + PORT); });