const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const FormationSchema = mongoose.Schema({
	formation: {
		type: String,
		required: true
	},
	strength: [{
		type: String,
	}],
	weakness: [{
		type: String,
	}],
	tactics: {
		buildUp: {
			speed: {
				type: Number
			},
			passing: {
				type: Number
			},
			positioning: {
				type: String
			}
		},
		chanceCreation: {
			passing: {
				type: Number
			},
			shooting: {
				type: Number
			},
			crossing: {
				type: Number
			},
			positioning: {
				type: String				
			}
		},
		defence: {
			pressure: {
				type: Number
			},
			aggression: {
				type: Number
			},
			teamWidth: {
				type: Number
			},
			defenderLine: {
				type: String
			}
		}
	},
	playerInstructions: {
		fwd: [{
			type: String
		}],
		mid: [{
			type: String
		}],
		def: [{
			type: String
		}]
	}
});

FormationSchema.methods.apiRepr = function() {
	return {
		formation: this.formation,
		strength: [...this.strength],
		weakness: [...this.weakness],
		tactics: this.tactics,
		playerInstructions: this.playerInstructions
	};
};

const Formation = mongoose.model('Formation', FormationSchema);

module.exports = {Formation};