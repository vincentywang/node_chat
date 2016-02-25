var passport = require('passport');
var connection = require('../database.js')(passport);

var query = {
	'queryGetAllContacts' : function (uid, limit, offset, callback) {
		/**
		 * (Query Example)
		 * SELECT u.firstname, u.lastname, u.profile_image, u.id, u.status, c.* FROM `contacts` as c 
		 * LEFT JOIN `users` as u ON c.contacts_id = u.id WHERE c.users_id = 154089 AND u.deleted != 1 LIMIT 10 OFFSET 0;
		 */
		var sQuery = '';
		sQuery = 'SELECT u.firstname, u.lastname, u.profile_image, u.id, u.status, c.* FROM `contacts` as c';
		sQuery += ' LEFT JOIN `users` as u ON c.contacts_id = u.id WHERE c.users_id = '+ uid;
		sQuery += ' AND u.deleted != 1 LIMIT '+ limit +' OFFSET '+ offset +';'; 
		callback(sQuery);
	}
};

var contact = {
	'feedExecQuery' : function (sQuery, funName, callback) {
		var funTagName = funName;
		if (sQuery !== '') {
			connection.query(sQuery, function (error, results, fields) {
				if (error) {
					console.log("error to execute query through" + funTagName);
					console.log(error);
				} 
				if (results) {
					callback(results);
				}
			});
		} else {
			var res = {'error message' : 'party id not exist'};
			callback(res);
		}
		
	},
	'getAllContacts' : function (uid, limit, offset, callback) {
		var _this = this,
		    funName = arguments.callee.name.toString();
		query.queryGetAllContacts(uid, limit, offset, function (sQuery) {
			_this.feedExecQuery(sQuery, funName, callback);
		});
	}
};

module.exports = contact;