/**
 * 1. database connection 
 * 2. passport authentication strategy
 */

var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var md5 = require('md5');
var credential = require('./credentials.js');

var connection = mysql.createConnection({
  host     : credential.db_host,
  user     : credential.db_user,
  password : credential.db_pass,
  database : credential.db_database
});

// module.exports = connection;


// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(
      function(user, done) {
		    done(null, user.id);
      }
    );

    // used to deserialize the user
    passport.deserializeUser(
      function(id, done) {
    		connection.query("select * from users where id = " + id, 
          function (err,rows) {	
      			done(err, rows[0]);
		      }
        );
      }
    );
	

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        
        /**
         * By default, local strategy uses user name and password 
         * here override with email
         *
         * email, password is the form input elements name attribute
         */

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) { // callback with email and password from the form
        connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", 
          function (err,rows) {

      			if (err)
              return done(err);

      			if (!rows.length) {
      			 	// req.flash is the way to set flashdata using connect-flash
              return done(null, false, req.flash('loginMessage', 'No user found.'));
            } 
  			
      			// if the user is found but the password is wrong
            if (( rows[0].password != md5(password)))
            	// create the loginMessage and save it to session as flashdata
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      			
            // all is well, return successful user
            return done(null, rows[0]);			
  		
      		}
        );
      }
    ));

    return connection;
};