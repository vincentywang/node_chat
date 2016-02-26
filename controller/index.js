var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));
router.use('/users', require('./users'));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.json({
  	'success' : false,
  	'message' : 'This route is incorrect'
  });
});

module.exports = router;
