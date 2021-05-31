var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.locals.connection.query('SELECT * from movies', function (error, results, fields) {
		if(error)
		{
			console.log(error)
			 throw error;
		}
		res.send(JSON.stringify(results));
	});
});

router.get('/genres', function(req, res, next) {
	res.locals.connection.query('SELECT * from Genre', function (error, results, fields) {
		// console.log(res);
	   if(error)
	   {
		   console.log(error)
			throw error;
	   }
	   res.send(JSON.stringify(results));
   }); 

});

router.get('/movie', function(req, res, next) {
      const id=req.query.id
	res.locals.connection.query(`SELECT * from movies where id=${id}`, function (error, results, fields) {
	//	console.log('\n\n\n\n'); 
	//	console.log(results);
	//	console.log('\n\n\n\n'); 
	   if(error)
	   {
		   console.log(error)
			throw error;
	   }
	   res.send(JSON.stringify(results));
   }); 

});

router.post	('/update', function(req, res, next) {
   let id=req.body.id
	let title=req.body.title
	let rating=req.body.rating


	res.locals.connection.query(`UPDATE movies SET NAME='${title}' ,RATING='${rating}' where ID='${id}'`, function (error, results, fields) {
		// console.log(res);
		console.log('\n\n\n\n'); 
	    console.log(results);
	    console.log('\n\n\n\n'); 
	   if(error)
	   {
		   console.log(error)
			throw error;
	   }
	   res.send(JSON.stringify(results));
   }); 

});




module.exports = router;
