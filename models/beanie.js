var mongoose = require("mongoose");

var beanieSchema = new mongoose.Schema({
	name: String,
	species: String,
	birthday: String,
	poem: String,
	image: String
});

var Beanie = mongoose.model("Beanie", beanieSchema);

module.exports = Beanie;