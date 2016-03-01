var passport = require('passport');
var connection = require('../database.js')(passport);
var chat = require('./chat.js');
var util = require('../lib/util.js');

var query = {
	'queryInList' : function (gid, uid, type, callback) {
		var sQuery = '';
		callback(sQuery);
	},
	'queryGetList' : function (gid, type, callback) {
		var sQuery = '';
		callback(sQuery);
	},
	'queryAddSingleUserToList' : function (gid, uid, type, callback) {
		var created = Date(),
		    sQuery = '';
		callback(sQuery);
	},
  'queryAddMultiUserToList' : function (gid, uid, type, callback) {
    var created = Date(),
        sQuery = '';

    console.log(sQuery);
    // callback(sQuery);
  },
	'queryRemoveFromList' : function (gid, uid, callback) { // this query should execute for single or multiple users 
		var sQuery = '';

    console.log(sQuery);
		// callback(sQuery);
	},
	'queryGetGroupList' : function (gid, callback) {
		var sQuery = '';
		callback(sQuery);
	}
};

var list = {
	'listExecQuery' : function (sQuery, funName, callback) {
		var funTagName = funName;
		if (sQuery !== '') {
			connection.query(sQuery, function (error, results, fields) {
				util.queryExecuteHandler(results, error, funTagName, callback);
			});
		} else {
			var res = {'error message' : 'party id not exist'};
			callback(res);
		}
	},
	'getList' : function (gid, type, callback) {
		var _this = this,
        funName = arguments.callee.name.toString();
		query.queryGetList(gid, type, function (sQuery) {
			_this.listExecQuery(sQuery, funName, callback);
		});
	},
	'getWhiteList' : function (gid, callback) {
		var type = 2;
		this.getList(gid, type, callback); 
	},
	'getBlackList' : function (gid) {
		var type = 1;
		this.getList(gid, type);
	},
	'userInList' : function (gid, uid, type) {
		var _this = this;
		query.queryInList(gid, uid, type, function (sQuery) {
			_this.listExecQuery(sQuery, callback);
		});
	},
	'userInWhiteList' : function (gid, uid) {
		var type = '2'; // white list
		this.userInList(gid, uid, type);
	},
	'userInBlackList' : function (gid, uid) {
		var type = '1'; // black list
		this.userInList(gid, uid, type);
	},
	'getGroupList' : function (gid, callback) {
		var _this = this,
		    funName = arguments.callee.name.toString();
		query.queryGetGroupList(gid, function (sQuery) {
			_this.listExecQuery(sQuery, funName, callback);
		});
	},
  'addUserToList' : function (gid, uid, type, callback) {
    var aUid = uid.split('|');
    var _this = this,
        funName = arguments.callee.name.toString;
        aUid = uid.split('|');

    if (aUid.length > 1) {
      query.queryAddMultiUserToList(gid, aUid, type, function (sQuery) {
        _this.listExecQuery(sQuery, funName, callback);
      });
    } else {
       query.queryAddSingleUserToList(gid, aUid, type, function (sQuery) {
        _this.listExecQuery(sQuery, funName, callback);
      });
    } 
    
    // console.log('access addUserToList function');
    // console.log(gid);
    // console.log(aUid);
    // console.log(aUid.length)
    // console.log(type);
  },
  'removeUserFromList' : function (gid, uid, type, callback) {
    var aUid = uid.split('|');
    var _this = this,
        funName = arguments.callee.name.toString;
    query.queryRemoveFromList(gid, aUid, type, function (sQuery) {
      _this.listExecQuery(sQuery, funName, callback);
    });
    
    // console.log('access removeUserFromList function') ;
    // console.log(gid);
    // console.log(uid);
    // console.log(type);
    
  }
};


module.exports = list;