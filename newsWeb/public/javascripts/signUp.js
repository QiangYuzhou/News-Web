function submitInfo(){
	var user=$("#user").val();
	var pwd1=$("#pwd1").val();
	var pwd2=$("#pwd2").val();
	var email=$("#email").val();
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var str="";
	if(pwd1!=pwd2)
		str+="两次密码不相同！\n";
	if(pwd1.length<=6||user.length<=6)
		str+="账号和密码长度要大于6字节！\n";
	if(!myreg.test(email))
		str+="邮箱格式不正确！\n";
	if(str==""){
		$.post("/signUpData",	//发送post请求，存储注册用户
		{
			user:user,
			pwd:pwd1,
			email:email
		},
		function(data,status){
			alert(data);
			if(data=="success")
				window.location.assign("/");
		});
	}
	else
		alert(str);
}