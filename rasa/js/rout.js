window.addEventListener('load', function () {
    const url = 'http://175.178.7.180:8080/rasaProject/';
    let change_left = document.querySelector('.change-left');
    let change = document.querySelector('.change');
    let change_right = document.querySelector('.change-right');
    let changebutton = document.querySelector('.changebutton');
    let search = document.querySelector('.search');//查询
    let tongbao = document.querySelector('.tongbao');//通报
    let tongbaoul = document.querySelector('.tongbao ul');
    const close = document.querySelector('.close');
    const selectCity = document.querySelector('.selectCity');
    const selectCity_content = document.querySelector('.selectCity span');
    const select_content = document.querySelector('.select-box-content');
    const select_box = document.querySelector(".select-box ");
    close.addEventListener('click', function () {
        select_box.style.bottom = '-600px';
    })
    selectCity.addEventListener('click', function () {
        select_box.style.bottom = 0;
    })
    document.addEventListener('click', function (e) {
        console.log(e.target);
    })
    change_left.addEventListener('click', function () {
        changebutton1();
    })
    change_right.addEventListener('click', function () {
        changebutton1();
    })
    function changebutton1() {
        if (changebutton.offsetLeft == 1) {//各省份对应的通报
            changebutton.style.left = change.offsetWidth / 2 - 3 + 'px';
            change_right.style.color = '#fff';
            change_left.style.color = '#C280FF';
            tongbao.style.display = 'block';
            search.style.display = 'none';
        } else {//查询
            changebutton.style.left = 1 + 'px';
            change_left.style.color = '#fff';
            change_right.style.color = '#C280FF';
            search.style.display = 'block';
            tongbao.style.display = 'none';
        }
    }
    const s = new XMLHttpRequest();
    s.open('get', url + "citycode.json");
    s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    s.send();
    var json1;
    var spanArr = [];
    s.onload = function () {
        json1 = JSON.parse(s.responseText);
        let i = 0;
        for (var k in json1.data[0]) {
            select_content.innerHTML = select_content.innerHTML + "<li><h1></h1><div class='city'></div></li>";
            select_content.children[i].querySelector('h1').innerHTML = k;
            let city = select_content.children[i++].querySelector('.city');
            let arr = json1.data[0][k];
            for (let j = 0; j < arr.length; j++) {
                let span = document.createElement('span');
                span.innerHTML = arr[j].city;
                span.setAttribute('code', arr[j].citycode);
                city.appendChild(span);
            }
        }
        spanArr = select_content.querySelectorAll("span");
        send(spanArr[0]);
        // selectCity_content.innerHTML = spanArr[0].innerHTML;
        // selectCity_content.innerHTML = "";

        spanArr.forEach(span => {
            span.addEventListener('click', function () {
                selectCity_content.innerHTML = this.innerHTML;
                select_box.style.bottom = '-600px';
                send(this);
            })
        })
        // console.log(spanArr);
    }

    function send(a) {
        let that = a;
        const x = new XMLHttpRequest();
        x.open('get', url + "requestRoutAPIServlet?code=" + that.getAttribute('code'));
        x.send();
        x.onload = function () {
            var json2 = JSON.parse(x.responseText);
            for (let i = 2; i < search.children.length - 1; i++) {
                console.log(i)
                search.removeChild(search.children[i]);
            }
            if (json2.data.person_list.length > 0) {
                for (let i = 0; i < json2.data.person_list.length; i++) {
                    let div = document.createElement('div');
                    div.className = "search-content";
                    div.innerHTML = "<div class='title'><h3>患者信息</h3><p id='huangzhexinxi'></p></div><div class='bottom'><h3>患者轨迹</h3><ul></ul></div>";
                    search.insertBefore(div, search.children[search.length - 4]);
                    div.querySelector("#huangzhexinxi").innerHTML = json2.data.person_list[i].info_main;
                    let ul = div.querySelector("ul");
                    for (let j = 0; j < json2.data.person_list[i].act_list.length; j++) {
                        let li = document.createElement('li');
                        li.innerHTML = json2.data.person_list[i].act_list[j].date_str + ' ' + json2.data.person_list[i].act_list[j].act;
                        ul.appendChild(li);
                    }
                }
            } else {
                let div = document.createElement('div');
                // div.className = 'tip';
                div.innerHTML = "<iframe id=\"inlineFrameExample\"\n" +
                    "    title=\"Inline Frame Example\"\n" +
                    "    width=\"1345\"\n" +
                    "    height=\"600\"\n" +
                    "    src=\"https://coronavirus.app/map\">\n" +
                    "</iframe>";
                search.insertBefore(div, search.children[search.length - 4]);
            }
        }
    }

    const slideshow = new XMLHttpRequest();
    // slideshow.responseType = 'json';
    slideshow.open('get', url + "requestNewsAPIServlet");
    slideshow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //发送请求
    slideshow.send();
    slideshow.addEventListener('readystatechange', function () {
        //判断
        if (slideshow.readyState === 4) {
            if (slideshow.status >= 200 && slideshow.status < 300) {//200+都可以
                //保存数据
                const json = JSON.parse(slideshow.responseText);
                // console.log(json);
                let result = "";
                for (let i = 0; i < json.length; i++) {
                    result += "<li ><div class='tongbao-text'><h1>" + json[i].title + "</h1><p>" + json[i].content + "</p><a>" + time(json[i].inputtime) + "</a></div></li>"
                }
                tongbaoul.innerHTML = result;
            } else {
                reject(slideshow.status);
            }
        }
    })


    // function creatLi(num) {//要创建多少个li
    //     let lis = [];
    //     lis[0] = tongbaoul.innerHTML;
    //     for (let i = 1; i <= num; i++){//框架
    //         lis[i] = "<li><img src='' alt=''><h1>郑州通报1例无症状感染者，活动轨迹公布</h1><p>021年7月30日17时，郑州市二七区在例行检查中发现1例核酸初筛阳性，后经市疾控中心复核，认定为无症状感染者，在复核的同时，我市立即启动应急机制，迅速开展流调、检测、消杀、隔离等相关工作。现将有关情况通报如下：</p><a>河南省人民政府门户网站 www.henan.gov.cn</a></li>"
    //     }
    //     return lis.join('');//数组转化为字符串
    // }
    // tongbaoul.innerHTML=creatLi(3);

    function time(date) {
        // date = new Date(parseInt(date));
        // console.log(date)
        //
        // var y=date.getFullYear();
        // console.log(y)
        // var m=date.getMonth()+1;
        // var d=date.getDate();
        // var h=date.getHours();
        // var m1=date.getMinutes();
        // var s=date.getSeconds();
        // m = m<10?("0"+m):m;
        // d = d<10?("0"+d):d;
        // return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
        return new Date(parseInt(date) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }

})