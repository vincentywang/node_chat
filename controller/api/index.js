var app = require('express');
var router = app.Router();

router.use('/contact', require('./contact'));
router.use('/list', require('./list'));
router.use('/feed', require('./feed'));
router.use('/chat', require('./chat'));

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