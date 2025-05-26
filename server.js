const express = require('express');
//const bodyParser = require('body-parser');
//const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/', require('./routes'));
//app.use(bodyParser.json());