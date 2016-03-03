
var passport = require('passport');
var connection = require('../database.js')(passport);
var gchat = require('./gchat.js');
var util = require('../lib/util.js');

var query = {
	'querySaveFeed' : function (userId, groupId, feed, meta, mkey, callback) {
    var sQuery = '';
    sQuery = "";
    // console.log('what is this query looks like');
    // console.log(sQuery);
    callback(sQuery);
  },
	'queryDelFeed' : function (mkey, callback) {
    var sQuery = '';
    sQuery = '';
    callback(sQuery);
  },
	'queryGetAllPartyFeeds' : function (partyId, callback) {
		var _partyID = 'party_' + partyId,
		    sQuery = '';
		gchat.getGchatByMkey(_partyID, function (gchat) {
      console.log(gchat);
      var oGchat = gchat.content[0];
			if (util.isEmpty(oGchat)) {
        console.log('do i run into this loop');
        callback(sQuery);
			} else {
				sQuery = ''; 
        callback(sQuery);
			}
		});
	},
	'queryGetNumFeedswithTime' : function(partyId, num, ts, callback) {

		/** Query Sample: 
		SELECT UNIX_TIMESTAMP(f.created) as created2, u.firstname, u.lastname, f.* FROM `gchat_feed` as `f` 
		left join `users` as u ON u.id = f.user_id WHERE f.gchat_id = 10 AND (UNIX_TIMESTAMP(f.created) < 9999999999) 
		ORDER BY f.created DESC LIMIT 20;
		 */
		
		var _partyID = 'party_' + partyId,
		    sQuery = '';
		gchat.getGchatByMkey(_partyID, function(gchat) {
			// console.log(_partyID);
			// console.log(num);
      var oGchat = gchat.content[0];
			if (typeof oGchat !== 'undefined') {
				sQuery = '';

				// console.log(sQuery);

				callback(sQuery);
			} else {
				callback(sQuery);
			}
		});
	}	 
};

var feed = {

	'getAllPartyFeeds' : function getAllPartyFeeds (partyId, callback) {
		/**
		 * Test URL Query: 
		 * 	http://localhost:3000/feed/3
		 */
		var _this = this,
		    funName = arguments.callee.name.toString();
		query.queryGetAllPartyFeeds(partyId, function (sQuery) {
			_this.feedExecQuery(sQuery, funName, callback);
		});
		
	},
	'getNumFeedswithTime' : function getNumFeedswithTime (partyId, num, ts, callback) {
		/**
		 * Test URL Query: 
		 * 	http://localhost:3000/feed/3/5/99
		 */
		var _this = this,
        funName = arguments.callee.name.toString();
		query.queryGetNumFeedswithTime(partyId, num, ts, function (sQuery) {
			_this.feedExecQuery(sQuery, funName, callback);
		});
	},
	'feedExecQuery' : function (sQuery, funName, callback) {
		var funTagName = funName;
		if (sQuery !== '') {
			connection.query(sQuery, function (error, results, fields) {
				util.queryExecuteHandler(results, error, funTagName, callback);
			});
		} else {
			var res = {
        'success' : false,
        'error message' : 'party id not exist'
      };
			callback(res);
		}
		
	},
  'saveFeed' : function (data, callback) {
    console.log('this trigger save feed from socket');

    var userId = data.f,
        groupId = data.gid,
        type = data.type,
        meta = data.meta,
        mkey = data.mkey,
        feed = data.message;
    
    console.log('what is data looks like');
    console.log(data);
    

    var _this = this,
       funName = arguments.callee.name.toString();
    query.querySaveFeed(userId, groupId, feed, meta, mkey, function(sQuery) {
      _this.feedExecQuery(sQuery, funName, callback);
    });
  },
  'delFeed' : function (mkey, callback) {
    var _this = this,
        funName = arguments.callee.name.toString();
    query.queryDelFeed(mkey, function (sQuery) {
      _this.feedExecQuery(sQuery, funName, callback);
    });
  }
};

module.exports = feed;