/**
 * Controller for "/api/gchat"
 *
 * 1. list group chat according group id
 * 2. 
 */

var router = require('express').Router(),
    gchat = require('../../models/chat'),
    util = require('../../lib/util');


/**
 * Get grout chat info by group id
 * TEST API - GET:http://localhost:3000/api/gchat/121
 * 
 * @var {String} gid group id
 * 
 */
router.get('/:gid', function (req, res, next) {
  var gid = parseInt(req.params.gid);
  if (isNaN(gid)) {
    next();
  } else {
    gchat.getGchatById(gid, function(data) {
      res.json(data);
    });
  }
});


/**
 * Get gchat (group/channel) members, tag members is hard code into URL
 * TEST API - GET:http://localhost:3000/api/gchat/room/members
 * 
 */
router.get('/:type/:members/:gid', function (req, res, next) {
  var sDirectiveOne = util.upFirstLetter(req.params.type),
      sDirectiveTwo = util.upFirstLetter(req.params.members),
      sGid = req.params.gid,
      sMethod = req.method.toLowerCase(),
      funName = sMethod + sDirectiveOne + sDirectiveTwo;

  console.log(typeof(sMethod));
  console.log(funName);
  console.log(gchat[funName]);

  /**
   * Below function may getRoomMembers()
   */
  if (typeof(gchat[funName]) === 'function') {
    gchat[funName](sGid, function(data) {
      res.json(data);
    });
  } else {
    res.status(404);
    res.json({
      'success' : false,
      'status' : 404,
      'error' : 'this api not exist'
    });
  }
 
});


/**
 * Create new event for third party application
 * TEST API - POST:http://localhost:3000/api/gchat/
 * eid = 121 event id which saved in purchase system 
 * 
 */
router.post('/event-id', function (req, res, next) {
  var eid = req.body.eid;
  console.log('this route are reached by post method');
  console.log(req.body);
  console.log('the event id is ' + eid);
  gchat.newEventChat(eid, function (data) {
    res.json(data);
  });
});


/**
 * This router handle error for '/api/gchat/' name space
 */
router.use('/', function(req, res, next) {
  var msg = 'This route is not found in gchat api';
  var statusCode = 404;
  res.status(statusCode);
  res.json({
    'success' : false,
    'status' : statusCode,
    'message' : msg
  });
});

module.exports = router;
