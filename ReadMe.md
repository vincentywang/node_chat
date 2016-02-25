credentials.js structure

module.exports = {
	db_user: '',
	db_pass: '',
	db_host: '',
	db_database: ''
};


Database Schema

Tables: 
1. user 
	-- id
	-- firstname
	-- lastname
	-- password
	-- email
	-- profile_image
	-- status

2. contacts
	-- users_id
	-- contacts_id

3. chat
	-- id
	-- hash
	-- mkey
	-- use_list
	-- creator
	-- type
	-- providers
	-- created

4. list
	-- id
	-- gid
	-- uid
	-- type
	-- created

5. feed
	-- id
	-- type
	-- created
	-- content
	-- gchat_id
	-- user_id
	-- user_name
	-- mkey
	-- meta
	