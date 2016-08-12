var usernameIpt = document.getElementById('username');
			msgUn = document.querySelector('.msg-un');
			pasw1Ipt = document.getElementById('pasw1');
			msgPwd1 = document.querySelector('.msg-pwd1');
			msgPwd2 = document.querySelector('.msg-pwd2');
			pasw2Ipt = document.getElementById('pasw2');
			btnReg = document.getElementById('btn-register');
		usernameIpt.addEventListener('change', function(){
    		testUnserName();
        });
		pasw1Ipt.addEventListener('change',function() {
			testPaswd1();
		})
		pasw2Ipt.addEventListener('change', function() {
			testPaswd2();
		})
		btnReg.addEventListener('click',function() {
			if (isLegalName()&&testPaswd1()&&testPaswd2()) {
				alert("注册成功！");
			}else {
				alert("请检查用户名和密码，再注册");
			}
		})
		function testUnserName(){
			if(isLegalName()) {
				ajax({
					url:'user.php',
					type:'post',
					data:{
						username:usernameIpt.value
					},
					success: function(ret){
						if(ret.status)
							msgUn.innerText = "用户名可用";
						else
							msgUn.innerText = "用户名被注册了";
					},
					error:function(){
						console.log("系统繁忙，请稍等");
					}
				})
			}else {
				msgUn.innerText = "用户名格式错误";
			}
		};

		function isLegalPassword(str){
		    if(str.length < 6 || str.length > 15){
		        return false;
		    }
		    //如果包含上述四种以外的字符，false
		    if(/[^A-Za-z_0-9]/.test(str)){
		        return false;
		    }

		    //如果全为大写、小写、下划线、数字, false
		    if( /(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str) ){
		        return false;
		    }
		    return true;
		};
		function isLegalName() {
			var username = usernameIpt.value;
			if(/^\w{3,10}$/g.test(username)){
				if(!/[^A-Za-z_0-9]/.test(username))
					return true;
			}
		};
		function testPaswd1() {
			var pwd = pasw1Ipt.value;
			if(isLegalPassword(pwd)) {
				msgPwd1.innerText = '密码格式符合';
				return true;
			}else {
				msgPwd1.innerText = '密码格式不对';
				
				return false;
			}
		};
		function testPaswd2() {
			if(pasw1Ipt.value == pasw2Ipt.value) {
				msgPwd2.innerText = '两次输入一致';
				return true;
			}else {
				msgPwd2.innerText = '两次输入不一致，请重新输入';
				return false;
			}
		};
		function ajax(obj) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var json = JSON.parse(xmlhttp.responseText.split('<!--')[0]);	//去掉没有实名认证带的尾巴
				obj.success(json);
			}
			if(xmlhttp.status == 404) {
				obj.error();
			}
		}
		var dataStr ='';
		for ( k in obj.data) {
			dataStr += k + '=' + obj.data[k] + '&';
		}
		dataStr = dataStr.substr(0, dataStr.length-1);
		if (obj.type.toLowerCase() == 'get') {
			xmlhttp.open(obj.type, obj.url+'?'+dataStr);
			xmlhttp.send();
		}
		if (obj.type.toLowerCase() == 'post') {
			xmlhttp.open(obj.type, obj.url);
			xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');	
			xmlhttp.send(dataStr);
		}
	}