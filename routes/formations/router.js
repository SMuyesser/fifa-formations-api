const express = require('express');
const router = express.Router();

const {Formation} = require('./models');

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

module.exports = {router};