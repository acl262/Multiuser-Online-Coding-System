var mongoose = require("mongoose");

// mongoose.connect("mongodb://user:a123456@ds255262.mlab.com:55262/minilc")

var ProblemSchema = mongoose.Schema( {

	id: Number,
	name: String,
	desc: String,
	difficulty: String

});

var problemModel = mongoose.model("ProblemModel", ProblemSchema);

module.exports = problemModel;