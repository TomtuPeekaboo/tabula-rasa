import { forumFirst, getUserServlet, delArticleServlet, search } from './function.js'
window.addEventListener('load', function () {
    const touxiang = document.querySelector('.touxiang');
    const username = document.querySelectorAll('.name');//0 1
    const zhuang = document.querySelector('.tou .zhaungtai');
    const userid = document.querySelector('.wei .id');
    const time = document.querySelector('.wei .time');
    const address = document.querySelector('.address');
    const phone = document.querySelector('.phone');
    const email = document.querySelector('.email');
    const fabu = document.querySelector('.dongtai ul li:nth-child(1) span');
    const zan = document.querySelector('.dongtai ul li:nth-child(2) span');
    const fensi = document.querySelector('.dongtai ul li:nth-child(3) span');
    // let url = "http://192.168.0.161:8080/rasaProject/";
    let url="";
    const s = new XMLHttpRequest;
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    let id = getQueryString("userid");
    //创建对象
    s.open("get", url + "getUserServlet?id="+id, true);
    s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    s.send();
    //保存操作
    s.onreadystatechange = function () {
        //判断
        //200+都可以
        if (s.readyState === 4 && s.status === 200) {
            let json = JSON.parse(s.responseText);
            console.log(json.data.id);
            // touxiang.style.backgroundImage = "url(getUserHeadServlet?userid ="+ json.data.id+"&count=0)";
            touxiang.src="getUserHeadServlet?userid="+ json.data.id+"&count=0";
            username[0].innerHTML = json.data.username;
            username[1].innerHTML = json.data.username;
            zhuang.innerHTML = json.data.type + "中";
            userid.innerHTML = json.data.id;
            address.innerHTML = json.data.province + "省" + json.data.city + "市" + json.data.county + "区";
            phone.innerHTML = json.data.phone;
            email.innerHTML = json.data.email;

        }
    }

    //创建对象
    const x = new XMLHttpRequest;
    x.open("get", url + "getMyDynamicServlet?authodId="+id, true);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send();
    //保存操作
    x.onreadystatechange = function () {
        //判断
        //200+都可以
        if (x.readyState === 4 && x.status === 200) {
            let json = JSON.parse(x.responseText);
            fabu.innerHTML = json.data.length;
            let sum = 0;
            for (let i = 0; i < json.data.length; i++){
                sum += json.data[i].zcount;
            }
            zan.innerHTML = sum;
            fensi.innerHTML = sum;
        }
    }
})