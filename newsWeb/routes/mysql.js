var mysql=require('mysql');


var pool=mysql.createPool({
	host:'115.159.190.25',
	user:'BSWeb',
	password:'5323383',
	port:'3306',
	database:'news',
});

module.exports=pool;