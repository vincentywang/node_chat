var passport = require('passport');
var connection = require('../database.js')(passport);
var gList = require('./list.js');
var util = require('../lib/util');

var query = {
	'queryGetById' :  function (id, callback) { callback();},
	'queryGetByHash' : function (hash, callback) {callback();},
	'queryGetByMkey' : function (mkey, callback) {callback();}
};

var gchat = {
	'gchatExecQuery' : function (sQuery, funName, callback) {
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
	'getGroupTypeTag' : function () {
		var typeTag = 2;
		return typeTag;
	},
	'getChannelTypeTag' : function () {
		var typeTag = 1;
		return typeTag;
	},
	'getPartyTypeTag' : function () {
		var typeTag = 0;
		return typeTag;
	},
	'getGchatById' : function getGchatById(id, callback) {
		var _this = this;
        funName = arguments.callee.name.toString();
		query.queryGetById(id, function (sQuery) {
			_this.gchatExecQuery(sQuery, funName, callback);
		});
	},
	'getGchatByHash' : function getGchatByHash(hash, callback) {
		var _this = this;
		    funName = arguments.callee.name.toString();
		query.queryGetByHash(hash, function (sQuery) {
			_this.gchatExecQuery(sQuery , funName, callback);
		});
	},
	'getGchatByMkey' : function getGchatByMkey(mkey, callback) {
		var _this = this;
		    funName = arguments.callee.name.toString();
		query.queryGetByMkey(mkey, function (sQuery) {
			_this.gchatExecQuery(sQuery, funName, callback);
		});
	},
	'getGroupMembers' : function (gid, callback) {
		gList.getWhiteList(gid, function (list) {
      var member = [];
      var aList = list.content;
      for (var index in aList) {
        if (aList.hasOwnProperty(index)) {
          member.push(aList[index].uid.toString());
        }
      }
      callback({
        'success' : true,
        'content' : member
      });
    });
	},
	'getChannelMembers' : function (gid, callback) {

    console.log('trigger the getChannelMembers function');

    var prepareMembers = function (oGchat, callback) {
      var member = [];
      var aMembers = oGchat.mkey.split('||');
      for (var index in aMembers) {
        if (aMembers.hasOwnProperty(index)) {
          member.push(aMembers[index]);
        }
      }
      callback({
        'success' : true,
        'content' : member
      });
    };

    if (typeof gid !== 'object') {
      var oGchat = this.getGchatById(gid, function (oGchat) {
        console.log(oGchat);
        prepareMembers(oGchat, callback);
      });
    } else {
      //gid is object passed from getRoomMember function
      prepareMembers(gid, callback);
    }
	},
	'getRoomMembers' : function (gid, callback) {

    console.log('trigger the getRoomMembers function');

    var _this = this;

		this.getGchatById(gid, function (gchat) {
      console.log(gchat);
      if (gchat.success) {
        var oGchat = gchat.content[0];
        if (oGchat.type == _this.getGroupTypeTag()) {
          _this.getGroupMembers(gid, callback);
        } else if (oGchat.type == _this.getChannelTypeTag()) {
          _this.getChannelMembers(oGchat, callback);
        } else if (oGchat.type == _this.getPartyTypeTag()){
          // Not sure how to handle this.
          callback({
            'success' : false,
            'message' : 'Can not get member of public chat room'
          });
        } else {
          // throw error
          throw new Error('return gchat have no type properties');
        }
      } else {
        callback(gchat);
      }
    
    });		
	}
};

module.exports = gchat;