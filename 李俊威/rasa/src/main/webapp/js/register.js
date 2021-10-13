window.addEventListener('load', function () {
    const card = document.querySelector('.card');
    const boxs = card.children[1].children;//得到一个input大盒子的数组
    const inputs = document.querySelectorAll('input');
    const active = document.querySelectorAll('.active');
    const registerFont = document.querySelectorAll('#registerFont');
    const IDright = this.document.querySelector('.IDright');
    const Idimg = IDright.querySelector('img');
    const username = document.querySelector('input#username');
    const phone = document.querySelector('input#phone');
    const password = document.querySelector('input#password');
    const code = document.querySelector('input#code');
    const tip = document.querySelector('#cip>span');
    const submit=document.querySelector('button#submit')





    var flag = 0;
    for (let i = 0; i < active.length; i++) {
        active[i].setAttribute('index', i);
        active[i].addEventListener('click', function () {
            if (flag == 1) {
                const index = parseInt(active[i].getAttribute('index')) + 1;//转化成数字，不然得到的是字符串
                boxs[index].style.display = 'block'; // 想让点击出现下一个div
            }
        });
        inputs[i].addEventListener('keydown', function (event) {
            const e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) { // enter 键
                const index = parseInt(active[i].getAttribute('index')) + 1;//一直不起作用！原来是把active[i]写成this，不同地方的this不一样
                boxs[index].style.display = 'block'; // 想让点击出现下一个div
                inputs[i].blur();//让input失去焦点
                inputs[i + 1].focus();
            }


        })
    };

    // 获取数据
    //传数据部分

    submit.addEventListener('click',function(){
        const register=new XMLHttpRequest;
            //创建对象
            register.open("post","registerServlet",true);
            register.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            let s= "username="+username.value + "&phone=" + phone.value + "&password=" + password.value + "&code=" + code.value
            register.send(s);
            register.onreadystatechange = function () {
                //判断
                    //200+都可以
                if (register.readyState === 4 && register.status === 200) {
                    //保存数据
                    let json=JSON.parse(register.responseText)

                    if (json.code === 104) {
                        tip.innerHTML = "验证码输入错误！";
                    } else if (json.code === 101) {
                        tip.innerHTML = "该用户已存在！";
                    } else if (json.code === 200) {
                        tip.innerHTML = "入户成功！";
                        window.location.href = "signIn.html";
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
                        let reg1 = /^[0-9A-Z_a-z]{1,16}$/;
                        let reg2 = /^[\u4e00-\u9fa5]{1,16}$/;
                        if (!(reg1.test(inputs[num].value) || reg2.test(inputs[num].value))) {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'red';
                            active[num].innerHTML = '* 用户名最多十六位';
                            flag = 0;
                        } else {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'yellowgreen';
                            active[num].innerHTML = '活跃值+1';
                            // alert(username.value);
                            flag = 1;
                        }
                    }
                        break;
                    case 1: {
                        var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;//手机号码正则表达
                        if (reg.test(inputs[num].value)) {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'yellowgreen';
                            active[num].innerHTML = '活跃值+2';
                            flag = 1;
                            // alert(phone.value);
                        } else {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'red';
                            active[num].innerHTML = '* 手机号格式不正确';
                            flag = 0;
                        }
                    }
                        break;
                    case 2: {
                        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                        if (reg.test(inputs[num].value)) {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'yellowgreen';
                            active[num].innerHTML = '成熟度+1';
                            flag = 1;
                            // alert(password.value);
                        } else {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'red';
                            active[num].innerHTML = '* 密码至少包含数字和英文且位数6~16';
                            flag = 0;
                        }
                    }
                        break;
                    case 3: {
                        if (inputs[2].value == inputs[3].value) {
                            registerFont[num].innerHTML = '';
                            registerFont[num].style.color = 'yellowgreen';
                            active[num].innerHTML = '入户成功';
                            flag = 1;
                        } else {
                            registerFont[2].innerHTML = '';
                            active[num].innerHTML = '* 密码不一致';
                            // inputs[2].value = '';
                            // active[2].className = 'active';
                            inputs[3].value = '';
                            flag = 0;
                        }
                    }
                        break;
                }
            }
        })
    }
    Idimg.addEventListener('click', function () {

        Idimg.src = "checkCode?" + new Date().getTime();
    })


})









