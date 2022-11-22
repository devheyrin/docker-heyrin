const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const app = express();

app.use(morgan('dev'));

var db;
var databaseUrl = "mongodb+srv://admin:1234@cluster0.uzxwi96.mongodb.net/?retryWrites=true&w=majority";

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");

});

app.get('/things', (req, res) => {
  console.log(mongoClient)
  mongoClient.connect(databaseUrl, function(err, database) {
    if (err != null) {
      console.log(err);
      res.json({'count' : 0});
    } else {
      db = database.db('test');
      db.collection('movie').find({})
      .toArray(function(err, result) {
        if (err) throw err;
        console.log('result: ');
        console.log(result);
        res.json(JSON.stringify(result));
      });
    }
  });
});

module.exports = app;
