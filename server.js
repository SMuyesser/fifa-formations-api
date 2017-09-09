const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const {CLIENT_ORIGIN, PORT, DATABASE_URL} = require('./config');
const {Formation} = require('./models/formationSchema');

const app = express();

mongoose.Promise = global.Promise;

// Logging
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

//catch all if with 404 not found
app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});



/******************************************************************
	Endpoints
******************************************************************/

//get formation info
app.get('/:formation', (req, res) => {
  Formation.findOne({'formation':req.params.formation}, function (err, formation) {  
      if (err) {
          res.status(500).send(err);
      } else {
          res.status(200).send(formation);
      }
  })
});



/******************************************************************
	Server
******************************************************************/

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      useMongoClient: true,
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};