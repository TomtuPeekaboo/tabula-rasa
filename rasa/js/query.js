window.addEventListener('load', function () {
    let changebutton = document.querySelector('.changebutton');
    let change = document.querySelector('.change');
    let change_left = document.querySelector('.change-left');
    let change_right = document.querySelector('.change-right');
    let content1 = document.querySelector('.content1');
    // let url = "http://192.168.0.161:8080/rasaProject/";
    let url="";
    let content2 = document.querySelector('.content2');
    let contentuls1 = document.querySelectorAll('.content1 ul');//各省份对应的核酸检测内容
    let contentuls2 = document.querySelectorAll('.content2 ul');//各省份对应的疫苗查询点
    const footer = document.querySelector('.footer1');
    content1.style.height = contentuls1[0].offsetHeight + 'px';
    content2.style.display = 'none';
    function changebutton1() {
        for (let i = 0; i < provinces.length; i++) {
            if (content2.style.display == 'none') {
                contentuls1[i].style.display = 'none';
            } else {
                contentuls2[i].style.display = 'none';
            }
            provinces[i].className = '';
        }
        provinces[0].className = 'chan';
        if (changebutton.offsetLeft == 1) {//各省份对应的疫苗
            contentuls2[0].style.display = 'flex';
            changebutton.style.left = change.offsetWidth / 2 - 3 + 'px';
            change_right.style.color = '#fff';
            change_left.style.color = '#C280FF';
            content2.style.display = 'block';
            content1.style.display = 'none';
            content2.style.height = contentuls2[0].offsetHeight + 'px';
        } else {//各省份对应的核酸检测内容
            contentuls1[0].style.display = 'flex';
            changebutton.style.left = 1 + 'px';
            change_left.style.color = '#fff';
            change_right.style.color = '#C280FF';
            content1.style.display = 'block';
            content2.style.display = 'none';
            content1.style.height = contentuls1[0].offsetHeight + 'px';
        }

    }
    change_left.addEventListener('click', function () {
        changebutton1();
    })
    change_right.addEventListener('click', function () {
        changebutton1();
    })


    //核酸检测
    const provinces = document.querySelectorAll('.select li');//省份
    function creatLi(num, index, contentuls) {//num要创建多少个,index第几个要创li,contentuls那个模块
        let lis = [];
        lis[0] = contentuls.children[index].innerHTML;
        for (let i = 1; i <= num; i++) {//框架
            lis[i] = "<li><h1></h1><p>所在县区：<span class='province'></span></p><p>联系电话：<span class='tel'></span></p><p>机构地址：<span class='address'></span></p></li>"
        }
        return lis.join('');//数组转化为字符串
    }
    for (let i = 0; i < provinces.length; i++) {
        provinces[i].setAttribute('index', i);
        provinces[i].addEventListener('click', function () {
            let index = this.getAttribute('index');
            for (let i = 0; i < provinces.length; i++) {
                if (content2.style.display == 'none') {
                    contentuls1[i].style.display = 'none';
                } else {
                    contentuls2[i].style.display = 'none';
                }
                provinces[i].className = '';
            }
            this.className = 'chan';
            if (content2.style.display == 'none') {//判断是那个模块
                contentuls1[index].style.display = 'flex';
                content1.style.height = contentuls1[index].offsetHeight + 'px';
            } else {
                contentuls2[index].style.display = 'flex';
                content2.style.height = contentuls2[index].offsetHeight + 'px';
            }
            if (findcontent() == content1) {
                getmessage();
            } else {
                getyimiaomessage();
            }
        })
    }
    //判断是哪个模块 是核酸还是疫苗
    function findcontent() {
        if (content2.style.display == 'none') {//核酸
            return content1;
        } else {//疫苗
            return content2;
        }
    }

    //获取省份名
    function findprovince() {
        for (let i = 0; i < provinces.length; i++) {
            if (provinces[i].className == 'chan') {
                return provinces[i].innerHTML;
            }
        }
    }
    //获取第几个孩子
    function getindex() {
        for (let i = 0; i < provinces.length; i++) {
            if (provinces[i].className == 'chan') {
                return i;
            }
        }
    }
    const s = new XMLHttpRequest();
    s.open("get", url + "code.json");
    s.send();
    var json2;
    s.onload = function () {
        json2 = JSON.parse(s.responseText);
        console.log(json2);
    }
    let index1 = 0;//记录条数的索引号
    let index2 = 0;
    const x = new XMLHttpRequest();
    x.open("get", url + "package.json");
    x.send();
    var json1;
    // console.log(x.readyState);
    x.onload = function () {
        json1 = JSON.parse(x.responseText);
    }

    const y = new XMLHttpRequest();
    var json3;
    function getyimiaomessage() {
        for (let i = 0; i < json2.data.list.length; i++) {
            let name;
            if (findprovince() == "全部") {
                name = "北京";
            } else {
                name = findprovince();
            }
            if (json2.data.list[i].name == name) {
                y.open("get", url + "requestVaccinesAPIServlet?code=" + json2.data.list[i].items[0].code);
                y.send();
                y.onload = function () {
                    json3 = JSON.parse(y.responseText);
                    console.log(json3);
                    let k = getindex();
                    findcontent().children[k].innerHTML = creatLi(6, k, findcontent());//请求一次创建六个孩子
                    let ul = findcontent().children[getindex()];
                    let i = 0;
                    if (ul.children > 6) {
                        i = ul.children.length - 6;
                    } else {
                        i = 0;
                    }
                    while (i < ul.children.length) {
                        if (json3.data.list.data != undefined) {
                            ul.children[i].querySelector('h1').innerHTML = json3.data.list.data[index2].title;
                            ul.children[i].querySelector('.province').innerHTML = json3.data.list.data[index2].city + json3.data.list.data[index2].district;//省份名称直接data[i]
                            ul.children[i].querySelector('.tel').innerHTML = json3.data.list.data[index2].tel;//电话
                            ul.children[i].querySelector('.address').innerHTML = json3.data.list.data[index2].address;//地址
                        } else {
                            ul.children[i].querySelector('h1').innerHTML = json3.data.otherData[index2].title;
                            console.log(json3.data.otherData[index2].province);
                            ul.children[i].querySelector('.province').innerHTML = json3.data.otherData[index2].province+ json3.data.otherData[index2].city;//省份名称直接data[i]
                            ul.children[i].querySelector('.tel').innerHTML = json3.data.otherData[index2].tel;//电话
                            ul.children[i].querySelector('.address').innerHTML = json3.data.otherData[index2].address;//地址
                        }
                        i++;
                        index2++;
                    }
                    findcontent().style.height = findcontent().children[getindex()].offsetHeight + 'px';
                }
                break;
            }
        }
    }
    function getmessage() {
        let proIndex = 0;
        let k = getindex();
        findcontent().children[k].innerHTML = creatLi(6, k, findcontent());//请求一次创建六个孩子
        let ul = findcontent().children[getindex()];
        let i = 0;
        if (ul.children > 6) {
            i = ul.children.length - 6;
        } else {
            i = 0;
        }
        while (i < ul.children.length) {
            if (k == 0) {
                ul.children[i].querySelector('h1').innerHTML = json1.data.list[index1].title;
                ul.children[i].querySelector('.province').innerHTML = json1.data.list[index1].sprovince;//省份名称直接data[i]
                ul.children[i].querySelector('.tel').innerHTML = json1.data.list[index1].tel;//电话
                ul.children[i].querySelector('.address').innerHTML = json1.data.list[index1].address;//地址
                i++;
                index1++;
            } else if (findprovince() == json1.data.list[proIndex].sprovince) {//放data里面的省份
                ul.children[i].querySelector('h1').innerHTML = json1.data.list[proIndex].title;
                ul.children[i].querySelector('.province').innerHTML = json1.data.list[proIndex].sprovince;//省份名称
                ul.children[i].querySelector('.tel').innerHTML = json1.data.list[proIndex].tel;//电话
                ul.children[i].querySelector('.address').innerHTML = json1.data.list[proIndex].address;//地址
                i++;
            }
            proIndex++;
        }
        findcontent().style.height = findcontent().children[getindex()].offsetHeight + 'px';
    }
    // getmessage();
    // getyimiaomessage();
    document.addEventListener('scroll', function (e) {
        // let down = e.wheelDelta;
        var e = e || window.event;
        var down = true;
        down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;
        if (down == false && document.documentElement.clientHeight >= footer.getBoundingClientRect().top - 30) {
            if (findcontent() == content1) {
                getmessage();
            } else {
                getyimiaomessage();
            }
        }
    })
})