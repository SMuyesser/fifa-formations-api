const express = require('express');
const router = express.Router();
const app = express();

const {Formation} = require('../models/formationSchema');

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

//get a single formation's info
router.get('/:formation', (req, res) => {
	Formation.findOne({'formation':req.params.formation}, function (err, formation) {  
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(formation);
		}
	})
});

//get all formations' info
router.get('', (req, res) => {
	Formation.find(function (err, formations) {  
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(formations);
		}
	})
});

module.exports = router;