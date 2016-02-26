var app = require('express');
var router = app.Router();


/**
 * Get user contacts by user id
 * TEST API: http://localhost:3000/api/contacts/154089/5/1
 *
 * @var {String} uid user id 
 * @var {String} limit number of rows return by fetch request
 * @var {String} page pagination number
 */
router.get('/:uid/:limit/:page', function (req, res, next) {

  var uid = parseInt(req.params.uid),
      limit = parseInt(req.params.limit),
      page = parseInt(req.params.page);
  if ( isNaN(uid) || isNaN(limit) || isNaN(page) ) {
    res.status(404);
    res.json({
      "success" : false,
      "status" : 404, 
      'message' : 'This route is incorrect'
    });
  } else {
    var offset = limit * (page - 1);
    console.log('do i run this route');
    console.log('do i run this route from new controllers');

    contact.getAllContacts(uid, limit, offset, function (data) {
      res.json(data);
    });
  }
});


/**
 * This router handle error for '/api/contacts/' name space
 */
router.use('/', function(req, res, next) {
  var msg = 'This route is not found in contacts api';
  var statusCode = 404;
  res.status(statusCode);
  res.json({
    'success' : false,
    'status' : statusCode,
    'message' : msg
  });
});

module.exports = router;
