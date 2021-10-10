import { forumFirst, getUserServlet, delArticleServlet, search } from './function.js'
window.addEventListener('load', () => {
    let table = document.querySelector('table');
    var start = 0;
    var count = 0;
    //删除按钮
    const deleteButton = document.querySelectorAll('.delete');
    //delete弹窗
    const delete_frame = document.querySelector('.delete-frame');
    //关闭delete弹窗
    const close1 = document.querySelector('.delete-right');
    const delete_input = document.querySelector('#delete-input');
    const sure = document.querySelector('.sure');
    let index;
    // 请求
    close1.addEventListener('click',function (){
        delete_frame.style.display='none';
    })
    forumFirst(start).then(res => {
        count = res.message;
        console.log(count)
        let data = res.data;
        console.log(data)
        let dataNum = document.querySelector('.dataNum');
        let sum = document.querySelector('.sum');
        sum.innerHTML = "共" + data.length + "条";
        dataNum.innerHTML = "共搜索到" + data.length + "条数据";

        table.innerHTML = table.innerHTML + creatLi1(data.length); //创建结构
        let trs = table.children;
        let forumId = document.querySelectorAll('td.forumId');
        let aurName = document.querySelectorAll('td.aurName');
        let fbTime = document.querySelectorAll('td.fbTime');
        let commit = document.querySelectorAll('td.commit');
        let good = document.querySelectorAll('td.good');
        let lock = document.querySelectorAll('td.action p.lock');
        let read=document.querySelectorAll('td.action p.read');
        for (let i = 0; i < data.length; i++) {
            forumId[i].innerHTML = data[i].id;
            fbTime[i].innerHTML = data[i].time;
            commit[i].innerHTML = data[i].ccount;
            good[i].innerHTML = data[i].zcount;
            getUserServlet(data[i].authodId).then(res => {
                aurName[i].innerHTML = res.data.username;
            });
            lock[i].addEventListener('click', () => {
                delete_frame.style.display='block';
                index=i;
            });
            read[i].addEventListener('click',()=>{
                window.location.href='trendsAdmin.html?userid='+data[i].id;
            })

        }
        sure.addEventListener('click', function () {
            if (delete_input.value == 'rasa') {
                delete_frame.style.display = 'none';
                alert('删除成功');
                delArticleServlet(data[index].id).then(res => {
                    window.location.href = "forumManage.html";
                });
            } else {
                alert('管理员密码错误')
            }
        })
        const pageul = document.querySelector(".page ul");
        const spanli = document.querySelector("#pageli");
        for (let i = 1; i <= count / 5 + 1; i++) {
            let li = document.createElement('li');
            if (i == 1) {
                li.setAttribute('class', 'purple');
            }
            li.innerHTML = i;
            spanli.appendChild(li);
            var pageN = 1;//得到当前页码
            const t = i;
            li.addEventListener('click', () => {
                // page(t);
                pageN = t;
                let trs = table.children;
                for (var i = 0; i < trs.length; i++) {

                    table.removeChild(trs[i]);
                }
                forumFirst((t - 1)*5).then(res => {
                    console.log(t)
                    let data = res.data;
                    console.log(data)
                    table.innerHTML = "<tr><th class=\"forumId\">动态ID</th><th class=\"aurName\">用户昵称</th><th class=\"fbTime\">发布时间</th><th class=\"commit\">评论数</th><th class=\"good\">点赞数目</th><th class=\"action\">操作</th></tr>";
                    table.innerHTML = table.innerHTML + creatLi1(data.length); //创建结构

                    let forumId = document.querySelectorAll('td.forumId');
                    let aurName = document.querySelectorAll('td.aurName');
                    let fbTime = document.querySelectorAll('td.fbTime');
                    let commit = document.querySelectorAll('td.commit');
                    let good = document.querySelectorAll('td.good');
                    let lock = document.querySelectorAll('td.action p.lock');
                    for (let i = 0; i < data.length; i++) {
                        forumId[i].innerHTML = data[i].id;
                        fbTime[i].innerHTML = data[i].time;
                        commit[i].innerHTML = data[i].ccount;
                        good[i].innerHTML = data[i].zcount;
                        getUserServlet(data[i].authodId).then(res => {
                            aurName[i].innerHTML = res.data.username;
                        });
                        lock[i].addEventListener('click', () => {
                            console.log(lock[i]);
                            console.log(trs);
                            delArticleServlet(data[i].id).then(res => {
                                window.location.href = 'forumManage.html';
                            });
                        });
                    }
                });
            });
        }

        for (let j = 1; j < count / 5 + 1; j++) {


        }
    });

    // 页码

    let beforePage = document.querySelector('.beforePage');
    let nextPage = document.querySelector('.nextPage');


    // function page(k) {
    //     for (let m = 1; m < count; m++) {
    //         pageNum[m].className = '';
    //     }
    //     pageNum[k].className = 'purple';
    //     let purple = document.querySelector('.purple');
    //     let leap = document.querySelector('.leap');
    //     leap.innerHTML = purple.innerHTML;
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
            lis[i] = '<tr><td class="forumId"></td><td class="aurName"></td><td class="fbTime"></td><td class="commit"></td><td class="good"></td><td class="action"><p class="read">查看<a href="#"></a></p><p class="lock">删除<a href="#"></a></p></td</tr >';
        }
        return lis.join(''); //数组转化为字符串 
    }

    const find = document.querySelector(".find");
    const sarticleid = document.querySelector("#sarticleid");
    const susername = document.querySelector("#susername");
    const stime = document.querySelector("#stime");
    find.addEventListener("click", function () {
        console.log(sarticleid.value);
        console.log(stime.value);
        search(sarticleid.value, susername.value, stime.value, "article").then(res => {
            let data = res.data;
            console.log(data);
            table.innerHTML = "<tr><th class=\"forumId\">动态ID</th><th class=\"aurName\">用户昵称</th><th class=\"fbTime\">发布时间</th><th class=\"commit\">评论数</th><th class=\"good\">点赞数目</th><th class=\"action\">操作</th></tr>";
            let tableli = '<tr><td class="forumId">' + data[0].id + '</td><td class="aurName"></td><td class="fbTime">' + data[0].time + '</td><td class="commit">' + data[0].ccount + '</td><td class="good">' + data[0].zcount + '</td><td class="action"><p class="read">查看<a href="#"></a></p><p class="lock">删除<a href="#"></a></p></td</tr >';
            table.innerHTML = table.innerHTML + tableli;
            let aurName1 = document.querySelector('td.aurName');
            getUserServlet(data[0].authodId).then(res => {
                aurName1.innerHTML = res.data.username;
            });
        });
    })


});