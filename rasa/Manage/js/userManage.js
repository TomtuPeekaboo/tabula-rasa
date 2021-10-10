import { AllUserServlet, delUserServlet, search } from './function.js'
window.addEventListener('load', () => {
    // const address = 'http://192.168.0.161:8080/rasaProject/';
    const address="";
    let more = document.querySelector('.more');
    let kinds = document.querySelector('.kinds');
    more.addEventListener('click', () => {
        if (kinds.style.display == 'none') {
            kinds.style.display = 'block';
        } else {
            kinds.style.display = 'none';
        }
    });
    let statusInput = document.querySelector('#statusInput');
    let kindsli = document.querySelectorAll('.kinds ul li');
    for (let i = 0; i < kindsli.length; i++) {
        kindsli[i].addEventListener('click', () => {
            statusInput.value = kindsli[i].innerHTML;
            kinds.style.display = 'none';
        });
    }

    let start = 0;//页码
    let table = document.querySelector('table');
    // 请求
    AllUserServlet(start).then(res => {
        console.log(res);
        let data = res.data;
        table.innerHTML = table.innerHTML + creatLi1(data.length); //创建结构
        let square = document.querySelectorAll('td.square span');
        let aurId = document.querySelectorAll('td.aurId');
        let aurName = document.querySelectorAll('td.aurName');
        let aurphone = document.querySelectorAll('td.aurphone');
        let aurImg = document.querySelectorAll('#headImg');
        let lock = document.querySelectorAll('td.action p.lock');
        let read=document.querySelectorAll('td.action p.read');
        console.log(read);
        for (let i = 0; i < data.length; i++) {
            square[i].addEventListener('click', () => {
                if (square[i].style.background == 'rgb(194, 128, 255)') {
                    square[i].style.background = 'transparent';
                } else {
                    square[i].style.background = 'rgb(194, 128, 255)'
                }
            });
            aurId[i].innerHTML = data[i].id;
            aurName[i].innerHTML = data[i].username;
            aurphone[i].innerHTML = data[i].phone;
            aurImg[i].src = address + "getUserHeadServlet?userid=" + data[i].id + "&count=0";
            lock[i].addEventListener('click', () => {
                delUserServlet(data[i].id).then(res => {
                    window.location.href = 'userManage.html';
                });
            });
            read[i].addEventListener('click',()=>{
                window.location.href='userAdmin.html?userid='+data[i].id;
            })
        }
        let dataNum = document.querySelector('.dataNum');
        let sum = document.querySelector('.sum');
        sum.innerHTML = "共" + data.length + "条";
        dataNum.innerHTML = "共搜索到" + data.length + "条数据";
    });
    // 页码
    var pageN = 1;//得到当前页码
    let pageNum = document.querySelectorAll('.page ul li');
    let beforePage = document.querySelector('.beforePage');
    let nextPage = document.querySelector('.nextPage');
    function page(k) {
        for (let m = 1; m < 10; m++) {
            pageNum[m].className = '';
        }
        pageNum[k].className = 'purple';
        let purple = document.querySelector('.purple');
        let leap = document.querySelector('.leap');
        leap.innerHTML = purple.innerHTML;
    }
    // for (let j = 1; j < 10; j++) {
    //     pageNum[j].addEventListener('click', () => {
    //         page(j);
    //         pageN = j;
    //     });

    // }

    // beforePage.addEventListener('click', () => {
    //     if (pageN > 0) {
    //         if (pageN >= 10) {
    //             pageN = 9;
    //         }
    //         page(pageN);
    //         pageN--;
    //     }
    // });
    // nextPage.addEventListener('click', () => {
    //     if (pageN < 10) {
    //         if (pageN < 1) {
    //             pageN = 1;
    //         }
    //         page(pageN);
    //         pageN++;
    //     }
    // });

    // 创建li函数
    function creatLi1(num) {
        let lis = [];
        for (let i = 1; i <= num; i++) {
            lis[i] = '<tr><td class="square"><span></span></td><td class="aurId"></td><td class="aurName"></td><td class="aurPhoto"><div class="aurImg"><img src="" alt="" id="headImg"></div></td><td class="aurphone">15707685419</td><td class="aurTime">2020-22-22</td><td class="aurStatus">正常</td><td class="action"><p class="read"><a href="#">查看</a></p><p class="lock"><a href="#">删除</a></p></td></tr>';
        }
        return lis.join(''); //数组转化为字符串 
    }

    const find = document.querySelector(".find");
    const id = document.querySelector("#id");
    const username = document.querySelector("#username");
    const phone = document.querySelector("#phone");
    find.addEventListener("click", function () {
        search(id.value, username.value, phone.value, "user").then(res => {
            let data = res.data;
            console.log(data);
            table.innerHTML = '<tr><th class="square" > <span class="bg"></span></th><th class="aurId">用户ID</th><th class="aurName">用户昵称</th><th class="aurPhoto">用户头像</th><th class="aurphone">手机号</th><th class="aurTime">注册时间</th><th class="aurStatus">状态</th><th class="action">操作</th></tr >';
            let tableli = '<tr><td class="square" ><span></span></td><td class="aurId">' + data.id + '</td><td class="aurName">' + data.username + '</td><td class="aurPhoto"><div class="aurImg"><img src="' + address + "getUserHeadServlet?userid=" + data.id + "&count=0" + '" alt="" id="headImg"></div></td><td class="aurphone">' + data.phone + '</td><td class="aurTime">2020-22-22</td><td class="aurStatus">正常</td><td class="action"><p class="read"><a href="#">查看</a></p><p class="lock"><a href="#">删除</a></p></td></tr>';
            table.innerHTML = table.innerHTML + tableli;
        });
    });

});