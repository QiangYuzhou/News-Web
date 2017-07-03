function getInfo(){
	var user=$("input[type='text']").val();
	var pwd=$("input[type='password']").val();
	$.post("/signInData",	//发送post请求，验证用户是否存在
		{
			user:user,
			pwd:pwd
		},
		function(data,status){
			if(data=="fail")
				alert("用户名或密码错误！");
			else {
				alert("登陆成功！");
				$.cookie('user',user,{expires:7,path:'/'});	//设置cookie保存用户名
				window.location.assign("/index");
			}
		});
}