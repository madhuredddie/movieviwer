var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.locals.connection.query('SELECT * from Genre', function (error, results, fields) {
          console.log(res);
		if(error)
		{
			console.log(error)
			 throw error;
		}
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
