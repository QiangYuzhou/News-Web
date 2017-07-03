var express = require('express');
var bodyParser=require("body-parser");
var pool=require("./mysql");
var router = express.Router();
var dic=["即时","大陆","国际","台湾","社会","军事","港澳","历史","财经","娱乐"];
var column=new Array();

router.use(bodyParser.urlencoded({extended:false}));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_v2');
});

//注册界面的路由
router.get('/signUp', function(req, res, next) {
  res.render('signUp');
});

//对于注册数据提交的路由
router.post('/signUpData',function(req,res){
	var user=req.body.user;
	var pwd=req.body.pwd;
	var email=req.body.email;
	pool.getConnection(function(err,conn){
		if(err)
			console.log("POOL ==> "+err);
		else
			conn.query("insert into user values(?,?,?,null,null,null,null)",[user,pwd,email],function(err,rows){
				if(err){
					console.log("insert err: "+err);
					conn.release()
					res.send("插入失败！"+err);
					return ;
				}
				console.log(rows);
				conn.query("insert into pos values(?,0,0,0,0,0,0,0,0,0,0)",user);
				conn.release();
				res.send("success");
			});
	});
});

//对于验证用户请求的路由
router.post('/signInData',function(req,res){
	var user=req.body.user;
	var pwd=req.body.pwd;
	pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query("select * from user where user='"+user+"' and pwd='"+pwd+"'",function(err,rows){
					if(err)
						console.log(err);
					else
						console.log(rows);
					if(rows.length)
						res.send(rows);
					else	
						res.send("fail");
					conn.release();
				});
		});
});

//对于新闻数据的请求
router.post('/getColumn/:id',function(req,res){
	var id=req.params.id;
	console.log("id is "+id+"\n");
	var user=req.body.user;
	pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query("select * from "+dic[id],function(err,rows){
					if(err)
						console.log(err);
					else{
						column[id]=rows;
						res.send(rows);
					}
					conn.release();
				});
		});
});

//对于修改兴趣数据提交的路由
router.post('/setData',function(req,res){
	var user=req.body.user;
	var op=new Array();
	for(i=1;i<5;i++){
		op[i-1]=eval("req.body.op"+i);
		if(op[i-1]!="null")
			op[i-1]='"'+op[i-1]+'"';
	}
	pool.getConnection(function(err,conn){
		if(err)
			console.log("POOL ==> "+err);
		else
			conn.query("update user set like1="+op[0]+",like2="+op[1]+",like3="+op[2]+",like4="+op[3]+" where user='"+user+"'",function(err,rows){
				if(err){
					console.log("update err: "+err);
					conn.release()
					res.send("更新失败！"+err);
					return ;
				}
				console.log(rows);
				conn.release();
				res.send("success");
			});
	});
});

router.post('/getData',function(req,res){
	var user=req.body.user;
	pool.getConnection(function(err,conn){
		if(err)
			console.log("POOL ==> "+err);
		else
			conn.query("select like1,like2,like3,like4 from user where user='"+user+"'",function(err,rows){
				if(err){
					console.log("select err: "+err);
					conn.release()
					res.send("查询失败！"+err);
					return ;
				}
				console.log(rows);
				conn.release();
				res.send(rows);
			});
	});
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/set', function(req, res, next) {
  res.render('set');
});

router.get('/text', function(req, res, next) {
	var i=req.query.i;
	var j=req.query.j;
	console.log(i+" and "+j);
 	res.render('text',{content:column[i][j]['content']});
});

//增加栏目点击数量
router.post('/add/:id',function(req,res){
	var id=req.params.id;
	console.log("id is "+id+"\n");
	var user=req.body.user;
	pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query("update pos set "+dic[id]+"="+dic[id]+"+1 where user='"+user+"'",function(err,rows){
					if(err)
						console.log(err);
					else{
						res.send("success");
					}
					conn.release();
				});
		});
});

router.post('/getPos',function(req,res){
	var user=req.body.user;
	pool.getConnection(function(err,conn){
		if(err)
			console.log("POOL ==> "+err);
		else
			conn.query("select * from pos where user='"+user+"'",function(err,rows){
				if(err){
					console.log("select err: "+err);
					conn.release()
					res.send("查询失败！"+err);
					return ;
				}
				console.log(rows);
				conn.release();
				res.send(rows);
			});
	});
});


module.exports = router;
