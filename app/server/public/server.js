//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbConfig = require('../config/database.config');
const branches = require('../routes/branch.routes');
let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../../build')));
app.use('/branches',  branches);

const port = process.env.PORT;

mongoose.connect(dbConfig.url,  { useNewUrlParser: true, useFindAndModify: false });
app.get('/', (req, res) => {
  res.send("Hiiii");
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
});

app.listen(port, _=> console.log(`The server is listening on port ${port}`));