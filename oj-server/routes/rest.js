var express = require("express");
var router = express.Router();
var problemService = require("../services/problemService");
var bodyParser = require("body-Parser");
var jsonParser = bodyParser.json();

var node_rest_client = require("node-rest-client").Client;

var rest_client = new node_rest_client

EXECUTOR_SERVER_URL = "http://localhost:5000/build_and_run";

rest_client.registerMethode("build_and_run",EXECUTOR_SERVER_URL, "POST" );


router.get("/problems", function (req, res) {
	
	problemService.getProblems()
				  .then(problems => res.json(problems));


});

router.get("/problems/:id", function (req, res) {

	var id = req.params.id;

	
	problemService.getProblem(+id)
				  .then(problem => res.json(problem));


});

router.post("/problems", jsonParser, function (req, res) {
	
	problemService.addProblem(req.body)
				  .then(

				  	function (problem) {

					res.json(problem)
				  },
				  	function (error) {

				  		res.status(400).send("Problem name alreay exists!");

				  	}


				  );


});

// For usercode build and run
router.post('/build_and_run', jsonParser, function(req, res) {
  const userCode = req.body.user_code;
  const lang = req.body.lang;

  rest_client.methods.build_and_run(
      {data: { code: userCode, lang: lang },
       headers: { "Content-Type": "application/json" }
      }, (data, response) => {
    console.log('Recieved response from execution server: ');
    console.log(response);
    // Generate a human readable response displayed in output textarea.
    const text =`Build output: ${data['build']}
    Execute output: ${data['run']}`;

    data['text'] = text;
    res.json(data);
  });
});

module.exports = router;

//user
//a123456