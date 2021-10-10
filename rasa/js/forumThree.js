window.addEventListener('load', () => {
    // const address = 'http://175.178.7.180:8080/rasaProject/';
    const address = '';

    var url = window.location.search;
    url = url.substring(url.lastIndexOf('=') + 1, url.length);

    // 消息
    let ringplate = document.querySelectorAll('.ringContent span');
    let ringTixing = document.querySelector('.ring span.ringTixing');
    let ringplateI = document.querySelectorAll('.ringContent span i.redPoint');
    let ringcount = 0;
    for (let i = 0; i < ringplate.length; i++) {
        ringplate[i].addEventListener('click', () => {
            ringcount = ringcount + 1;
            if (ringcount == 4) {
                ringTixing.className = "ringTixing";
            }
            ringplateI[i].className = "";//清空类名
        });

    }



    const ringp = document.querySelector('.ring p');
    const ringC = document.querySelector('.ringContent');
    const personp = document.querySelector('.person p');
    const personC = document.querySelector('.personContent');
    const write = document.querySelector('.write');//得到编辑按钮
    const writeArea = document.querySelector('.writeArea');//得到编辑区
    const say = document.querySelector('.centerC .say');
    const adminNameBox = document.querySelector('.navShow .person p img');//登录者头像

    let ring = document.querySelector('.ring');
    let person = document.querySelector('.person');
    let ringContent = document.querySelector('.ringContent');
    let personContent = document.querySelector('.personContent');

    function Click(obj, tar) {
        obj.addEventListener('click', (e) => {
            if (tar.style.display == 'none') {
                tar.style.display = 'block';
            } else {
                tar.style.display = 'none';
            }
            e.stopPropagation();
        });
        document.addEventListener('click', () => {
            if (tar.style.display == 'block') {
                tar.style.display = 'none';
            }
        })
    }

    Click(ring, ringContent);
    Click(person, personContent);


    adminNameBox.src = address + "getUserHeadServlet?userid=3&count=0"

    // 点击出现或消失函数
    function clickDisplay(obj, target) {
        obj.addEventListener('click', () => {
            if (target.style.display == 'none') {
                target.style.display = 'block';
                if (obj == write) {
                    scrollTo(0, 0);//回到顶部
                }
            } else {
                target.style.display = 'none';
            }
        });
    };

    const changediv = document.querySelectorAll('.change>div');
    const Boxs = document.querySelectorAll('.banner>div');

    switch (url) {
        case 'at':
            changediv[3].style.left = changediv[1].offsetWidth * 0 + 'px';
            changediv[3].innerHTML = changediv[0].innerHTML;//changediv3是按钮
            f1(0);
            break;
        case 'commit':
            changediv[3].style.left = changediv[1].offsetWidth * 1 + 'px';
            changediv[3].innerHTML = changediv[1].innerHTML;//changediv3是按钮
            f1(1);
            break;
        case 'zan':
            changediv[3].style.left = changediv[1].offsetWidth * 2 + 'px';
            changediv[3].innerHTML = changediv[2].innerHTML;//changediv3是按钮
            f1(2)
            break;
    }

    function f1(i) {
        for (let j = 1; j < Boxs.length; j++) {
            Boxs[j].style.display = 'none';
        }
        Boxs[i + 1].style.display = 'block';
    }
    for (let i = 0; i < 3; i++) {
        changediv[i].addEventListener('click', () => {
            changediv[3].style.left = changediv[1].offsetWidth * i + 'px';
            changediv[3].innerHTML = changediv[i].innerHTML;//changediv3是按钮
            for (let j = 1; j < Boxs.length; j++) {
                Boxs[j].style.display = 'none';
            }
            Boxs[i + 1].style.display = 'block';
        });
    }
    let adminName = "";

    const nameRequest = new XMLHttpRequest;
    // nameRequest.responseType = 'json';
    nameRequest.open('get', address + "getAdminServlet", true);
    nameRequest.send();
    nameRequest.onreadystatechange = function () {
        //判断
        //200+都可以
        if (nameRequest.readyState === 4 && nameRequest.status === 200) {
            //保存数据
            let json = JSON.parse(nameRequest.responseText)
            adminName = json.data.username;
        }
    }




    //at的大盒子
    const atBox = document.querySelector(".atBox");
    const s = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "getMyAtServlet");
        // slideshow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //发送请求
        slideshow.send();
        slideshow.onreadystatechange = function () {
            //判断
            if (slideshow.readyState === 4) {
                if (slideshow.status >= 200 && slideshow.status < 300) {//200+都可以
                    //保存数据
                    resolve(slideshow.response);
                } else {
                    reject(slideshow.status);
                }
            }
        }
    });
    s.then(value => {
        console.log(value)
        if (value.code == "106") {
            window.location.href = "signIn.html"
        } else if (value.code == "200") {
            console.log(value.data)
            for (let i = value.data.length - 1; i >= 0; i--) {
                let x = value.data[i];
                //假如没有数据
                if (x) {
                    //增加段
                    let forum = document.createElement('div');
                    forum.setAttribute('class', 'forum');
                    let photo = document.createElement('div');
                    photo.setAttribute('class', 'photo');
                    let head = document.createElement('img');
                    head.src = address + "getUserHeadServlet?userid=" + x.authodId + "&count=0";
                    photo.appendChild(head);
                    let name = document.createElement('div');
                    name.setAttribute('class', 'name');
                    name.innerHTML = x.authod;
                    let time = document.createElement('div');
                    time.setAttribute('class', 'time');
                    time.innerHTML = x.time;
                    let content = document.createElement('div');
                    content.setAttribute('class', 'content');
                    let wenAn = document.createElement('p');
                    wenAn.setAttribute('class', 'wenAn');
                    wenAn.innerHTML = x.content;
                    let forumPhoto = document.createElement('div');
                    forumPhoto.setAttribute('class', 'forumPhoto clearfix');
                    let result = '';
                    if (x.type == "img") {
                        for (let j = 0; j < x.imgcount; j++) {
                            result += "<li><img src=" + address + "getDynamicImgServlet?imgFiles=" + x.imgFiles + "&count=" + j + "&type=img></li>";
                        }
                    } else if (x.type == "video") {
                        for (let j = 0; j < x.imgcount; j++) {
                            // result += '<span class="videobox2"><video controls="controls"  style="width:100%;"><source src="' + address + 'getDynamicImgServlet?imgFiles=' + x.imgFiles + '&count=' + j + '&type=vedio' + '"></video></video></span>';
                            let video = '<li id="videoli" style="background: #000;width:710px;height:400px"><video class="box" controls="controls" autoplay="autoplay" style="width: 710px"> <source src="' + address + 'getDynamicImgServlet?imgFiles=' + x.imgFiles + '&count=' + j + '&type=video" type="video/mp4" class=""></video></li>';
                            result += video;
                        }
                    }

                    forumPhoto.innerHTML = result;
                    content.append(wenAn);
                    content.append(forumPhoto);
                    forum.append(photo);
                    forum.append(name);
                    forum.append(time);
                    forum.append(content);
                    atBox.append(forum);
                }

            }
        }

    }, reason => {
        console.log("出错啦！");
    });






    const pl = document.querySelector(".pl");
    const ss = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "getMyCommentServlet");
        // slideshow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //发送请求
        slideshow.send();
        slideshow.onreadystatechange = function () {
            //判断
            if (slideshow.readyState === 4) {
                if (slideshow.status >= 200 && slideshow.status < 300) {//200+都可以
                    //保存数据
                    resolve(slideshow.response);
                } else {
                    reject(slideshow.status);
                }
            }
        }
    });
    ss.then(value => {
        if (value.code == "106") {
            window.location.href = "signIn.html"
        } else if (value.code == "200") {
            // console.log(value)
            for (let i = value.data.length - 1; i >= 0; i--) {
                let x = value.data[i];
                //增加段
                let forum = document.createElement('div');
                forum.setAttribute('class', 'forum');
                let photo = document.createElement('div');
                photo.setAttribute('class', 'photo');
                let head = document.createElement('img');
                head.src = address + "getUserHeadServlet?userid=" + x.commenterId + "&count=0";
                photo.appendChild(head);
                let name = document.createElement('div');
                name.setAttribute('class', 'name');
                const nameRequest = new XMLHttpRequest;
                // nameRequest.responseType = 'json';
                nameRequest.open('get', address + "getUserServlet?id=" + x.commenterId);
                nameRequest.send();
                nameRequest.onreadystatechange = function () {
                    //判断
                    //200+都可以
                    if (nameRequest.readyState === 4 && nameRequest.status === 200) {
                        //保存数据
                        let json = JSON.parse(nameRequest.responseText)
                        name.innerHTML = json.data.username;
                    }
                }
                let time = document.createElement('div');
                time.setAttribute('class', 'time');
                time.innerHTML = x.time;
                let atname = document.createElement('span');
                atname.setAttribute('class', 'atname');
                atname.innerHTML = adminName;
                let news = document.createElement('p');
                news.setAttribute('class', 'new');
                news.innerHTML = "回复" + "<span class='atname'>@" + adminName + "：</span>" + x.comment + "</p>";
                let content = document.createElement('div');
                content.setAttribute('class', 'content');
                let content_atname = document.createElement('p');
                content_atname.setAttribute('class', 'atname');
                content_atname.innerHTML = adminName;
                const articleRequest = new XMLHttpRequest;
                // articleRequest.responseType = 'json';
                articleRequest.open('get', address + "getArticleServlet?articleId=" + x.articleId);
                articleRequest.send();
                articleRequest.onreadystatechange = function () {
                    //判断
                    //200+都可以
                    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
                        //保存数据
                        let json = JSON.parse(articleRequest.responseText)
                        // console.log(json)
                        let wenAn = document.createElement('p');
                        wenAn.setAttribute('class', 'wenAn');
                        wenAn.innerHTML = json.data.content;
                        let forumPhoto = document.createElement('div');
                        forumPhoto.setAttribute('class', 'forumPhoto clearfix');
                        let result = ''
                        if (json.data.type == "img") {
                            for (let j = 0; j < json.data.imgcount; j++) {
                                result += "<li><img src=" + address + "getDynamicImgServlet?imgFiles=" + json.data.imgFiles + "&count=" + j + "&type=img></li>";
                            }
                        }

                        forumPhoto.innerHTML = result;
                        content.append(content_atname);
                        content.append(wenAn);
                        content.append(forumPhoto);

                    }
                }

                forum.append(photo);
                forum.append(name);
                forum.append(time);
                forum.append(news);
                forum.append(content);
                pl.append(forum);
            }
        }

    }, reason => {
        // console.log(reason);
        console.log("出错啦！");
    });




    const zan = document.querySelector(".zanBox");
    const sss = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "getMyFabulousServlet");
        // slideshow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //发送请求
        slideshow.send();
        slideshow.onreadystatechange = function () {
            //判断
            if (slideshow.readyState === 4) {
                if (slideshow.status >= 200 && slideshow.status < 300) {//200+都可以
                    //保存数据
                    resolve(slideshow.response);
                } else {
                    reject(slideshow.status);
                }
            }
        }
    });
    sss.then(value => {
        if (value.code == "106") {
            window.location.href = "signIn.html"
        } else if (value.code == "200") {
            // console.log(value)
            for (let i = value.data.length - 1; i >= 0; i--) {
                let x = value.data[i];
                //增加段
                let forum = document.createElement('div');
                forum.setAttribute('class', 'forum');
                let photo = document.createElement('div');
                photo.setAttribute('class', 'photo');
                let head = document.createElement('img');
                head.src = address + "getUserHeadServlet?userid=" + x.fabulousId + "&count=0";
                photo.appendChild(head);
                let name = document.createElement('div');
                name.setAttribute('class', 'name');
                const nameRequest = new XMLHttpRequest;
                // nameRequest.responseType = 'json';
                nameRequest.open('get', address + "getUserServlet?id=" + x.fabulousId);
                nameRequest.send();
                nameRequest.onreadystatechange = function () {
                    //判断
                    //200+都可以
                    if (nameRequest.readyState === 4 && nameRequest.status === 200) {
                        //保存数据
                        let json = JSON.parse(nameRequest.responseText)
                        name.innerHTML = json.data.username;
                    }
                }
                let time = document.createElement('div');
                time.setAttribute('class', 'time');
                time.innerHTML = x.time;
                let news = document.createElement('p');
                news.setAttribute('class', 'new');
                news.innerHTML = "赞了你的动态";
                let content = document.createElement('div');
                content.setAttribute('class', 'content');
                let content_atname = document.createElement('p');
                content_atname.setAttribute('class', 'atname');
                content_atname.innerHTML = adminName;
                const articleRequest = new XMLHttpRequest;
                // articleRequest.responseType = 'json';
                articleRequest.open('get', address + "getArticleServlet?articleId=" + x.articleId);
                articleRequest.send();
                articleRequest.onreadystatechange = function () {
                    //判断
                    //200+都可以
                    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
                        //保存数据
                        let json = JSON.parse(articleRequest.responseText);
                        let wenAn = document.createElement('p');
                        wenAn.setAttribute('class', 'wenAn');
                        //data假如为0就为""
                        let wenAnContent = ((json.data == null || json.data.content == null) ? "" : json.data.content);
                        wenAn.innerHTML = wenAnContent;
                        let forumPhoto = document.createElement('div');
                        forumPhoto.setAttribute('class', 'forumPhoto clearfix');
                        let result = '';
                        if (json.data) {
                            if (json.data.type == "img") {
                                for (let j = 0; j < json.data.imgcount; j++) {
                                    result += "<li><img src=" + address + "getDynamicImgServlet?imgFiles=" + json.data.imgFiles + "&count=" + j + "&type=img></li>";
                                }
                            }
                        }
                        forumPhoto.innerHTML = result;
                        content.append(content_atname);
                        content.append(wenAn);
                        content.append(forumPhoto);

                    }
                }

                forum.append(photo);
                forum.append(name);
                forum.append(time);
                forum.append(news);
                forum.append(content);
                zan.append(forum);
            }
        }

    }, reason => {
        // console.log(reason);
        console.log("出错啦！");
    });


});