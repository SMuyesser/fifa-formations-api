const express = require('express');
const router = express.Router();

const {Formation} = require('../models/formationSchema');

//get formation info
router.get('/:formation', (req, res) => {
	Formation.findOne({'formation':req.params.formation}, function (err, formation) {  
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(formation);
		}
	})
});

module.exports = router;