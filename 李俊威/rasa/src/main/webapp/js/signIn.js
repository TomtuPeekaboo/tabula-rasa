window.addEventListener('load', function () {
    const inputs = document.querySelectorAll('input');
    const active = document.querySelectorAll('.active');
    const registerFont = document.querySelectorAll('#registerFont');
    const phone = document.querySelector('#phone');
    const password = document.querySelector('#password');
    const remember=document.querySelector('#remember')
    const submit=document.querySelector('button#submit')
    const tip = document.querySelector('#cip>span');

    for (let i = 0; i < active.length; i++) {
        active[i].setAttribute('index', i);
        active[i].addEventListener('click', function () {
            if (flag == 1) {
                const index = parseInt(active[i].getAttribute('index')) + 1;//转化成数字，不然得到的是字符串
                // boxs[index].style.display = 'block'; // 想让点击出现下一个div
            }
        });
        inputs[i].addEventListener('keydown', function (event) {
            const e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) { // enter 键
                const index = parseInt(active[i].getAttribute('index')) + 1;//一直不起作用！原来是把active[i]写成this，不同地方的this不一样
                // boxs[index].style.display = 'block'; // 想让点击出现下一个div
                inputs[i].blur();//让input失去焦点
                inputs[i + 1].focus();
            }


        })
    };


    // 获取数据
    //传数据部分

    submit.addEventListener('click',function(){
        const login=new XMLHttpRequest;
        //创建对象
        login.open("post","loginServlet",true);
        login.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let s= "phone="+phone.value+"&password="+password.value+"&remember="+remember.value;
        login.send(s);
        login.onreadystatechange = function () {
            //判断
            //200+都可以
            if (login.readyState === 4 && login.status === 200) {
                //保存数据
                let json=JSON.parse(login.responseText)
                alert(json.code)
                if (json.code === 103) {
                    tip.innerHTML = "用户手机号码或密码不正确";
                } else if (json.code === 102) {
                    tip.innerHTML = "用户不存在！";
                } else if (json.code === 200) {
                    tip.innerHTML = "登录成功！";
                    window.location.href = "index.jsp";
                }
            }
        }
    });


    //表单验证
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('num', i);
        inputs[i].addEventListener('blur', function () {
            // var num = parseInt(this.getAttribute('num'), 10);
            var num = parseInt(this.getAttribute('num'));
            if (this.value == '') {
                active[num].innerHTML = '* 输入内容不能为空';
            } else {
                switch (num) {
                    case 0: {
                        var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;//邮箱正则表达
                        if (reg.test(inputs[num].value)) {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'yellowgreen';
                            active[num].innerHTML = '活跃值+2';
                            flag = 1;
                        } else {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'red';
                            active[num].innerHTML = '* 手机号格式不正确';
                            flag = 0;
                        }
                    }
                        break;
                    case 1: {
                        // 这里的input[2]是后台的数据
                        if (inputs[1].value == inputs[2].value) {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'yellowgreen';
                            active[num].innerHTML = '入户成功';
                            flag = 1;
                        } else {
                            registerFont[1].innerHTML = '';
                            active[num].innerHTML = '* 密码错误';
                            flag = 0;
                        }
                    }
                        break;
                }
            }
        })
    }
});