window.addEventListener('load', function () {
    const user = document.getElementById('yonghuming');
    const password = document.getElementById('mima');
    const sure = document.querySelector('.form-bottom button');
    sure.addEventListener('click', function () {
        if (user.value != 'tabularasa'&&password.value!='rasa') {
            alert("用户名或密码错误！");
        } else {
            location.href = "../userManage.html";
        }
    })
})