window.addEventListener('load', () => {
    var address = 'http://192.168.0.161:8080/rasaProject';
    const ringp = document.querySelector('.ring p');
    const ringC = document.querySelector('.ringContent');
    const personp = document.querySelector('.person p');
    const personC = document.querySelector('.personContent');
    const write = document.querySelector('.write');//得到编辑按钮
    const writeArea = document.querySelector('.writeArea');//得到编辑区
    const say = document.querySelector('.centerC .say');
    const searchBtn = document.querySelector('.search p');
    const searchArea = document.querySelector('.search input');
    const searchAreaWidth = searchArea.offsetWidth;
    const adminNameBox = document.querySelector('.navShow .person p img');//登录者头像
    let sileft = [ringp, personp];//按钮
    let Btndiv = [ringC, personC];//对应内容
    for (let i = 0; i < sileft.length; i++) {
        sileft[i].addEventListener('click', () => {
            if (Btndiv[i].style.display == 'none') {
                for (let j = 0; j < sileft.length; j++) {
                    Btndiv[j].style.display = 'none';
                }
                Btndiv[i].style.display = 'block';
            } else {
                Btndiv[i].style.display = 'none';
            }
        });
    }
    // 搜索框关键字
    const searchKeyUl = document.querySelector('#souSuoUl');
    searchBtn.addEventListener('click', () => {
        // 如果出现
        if (searchArea.offsetWidth > 500) {
            const searchAV = searchArea.value;
            // 但是没输入，点击隐藏
            if (searchAV == '') {
                searchArea.style.width = 72 + 'px';
                searchArea.style.backgroundColor = 'transparent';
                searchArea.placeholder = "";
                searchArea.style.borderColor = 'transparent';
                searchKeyUl.style.display = 'none';
            } else {
                // 有输入，，发送请求
                searchArea.oninput = function () {
                    // 获取用户输入的内容
                    const searchText = this.value;
                    // 向服务端发送请求 拿到关键字相关内容
                    getSearchKey(searchText).then(res => {
                        console.log(res);
                        const gskText = res.data;
                        const gskNum = gskText.length;
                        // 创建关键字相关内容的li
                        function creatLi3(num) {
                            let lis = [];
                            for (let k = 1; k <= num; k++) {//框架
                                lis[k] = '<li class="souSuoLi"></li>';//可更换为想要的格式
                            }
                            return lis.join('');//数组转化为字符串
                        }
                        searchKeyUl.innerHTML = creatLi3(gskNum);
                        // 获取刚刚创建的li，并填入返回的内容
                        const searchKeyLi = document.querySelector('#souSuoUl li');
                        for (let i = 0; i < gskNum; i++) {
                            searchKeyLi.innerHTML = gskText[i];
                        }
                    });
                    searchKeyUl.style.display = 'block';
                }

                // 把搜索内容传进去
                getFindResult(start, searchAV).then(res => {
                    console.log(res);//返回地址传递过来的所有信息
                    // 后续处理--------------------------------------可以直接让后端把相关东西放到动态区域那里，然后刷新----------------

                });
            }
        } else {
            // 如果没出现，让它出现
            searchArea.style.width = searchAreaWidth + 'px';
            searchArea.placeholder = "搜索";
            searchArea.style.backgroundColor = 'rgb(246, 246, 246)';
            searchArea.style.borderColor = '#ccc';
        }
    });

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
    nameRequest.open('get', address + "/getAdminServlet", true);
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
        slideshow.open('get', address + "/getMyAtServlet");
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
        if (value.code == "106") {
            window.location.href = "signIn.html"
        } else if (value.code == "200") {
            console.log(value)
            for (let i = value.data.length - 1; i >= 0; i--) {
                let x = value.data[i];
                //增加段
                let forum = document.createElement('div');
                forum.setAttribute('class', 'forum');
                let photo = document.createElement('div');
                photo.setAttribute('class', 'photo');
                let head = document.createElement('img');
                head.src = address + "/getUserHeadServlet?userid=" + x.authodId + "&count=0";
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
                let result = ''
                for (let j = 0; j < x.imgcount; j++) {
                    result += "<li><img src=" + address + "/getDynamicImgServlet?imgFiles=" + x.imgFiles + "&count=" + j + "></li>";
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

    }, reason => {
        console.log(reason);
        console.log("出错啦！");
    });






    const pl = document.querySelector(".pl");
    const ss = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "/getMyCommentServlet");
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
            console.log(value)
            for (let i = value.data.length - 1; i >= 0; i--) {
                let x = value.data[i];
                //增加段
                let forum = document.createElement('div');
                forum.setAttribute('class', 'forum');
                let photo = document.createElement('div');
                photo.setAttribute('class', 'photo');
                let head = document.createElement('img');
                head.src = address + "/getUserHeadServlet?userid=" + x.commenterId + "&count=0";
                photo.appendChild(head);
                let name = document.createElement('div');
                name.setAttribute('class', 'name');
                const nameRequest = new XMLHttpRequest;
                // nameRequest.responseType = 'json';
                nameRequest.open('get', address + "/getUserServlet?id=" + x.commenterId);
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
                articleRequest.open('get', address + "/getArticleServlet?articleId=" + x.articleId);
                articleRequest.send();
                articleRequest.onreadystatechange = function () {
                    //判断
                    //200+都可以
                    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
                        //保存数据
                        let json = JSON.parse(articleRequest.responseText)
                        console.log(json)
                        let wenAn = document.createElement('p');
                        wenAn.setAttribute('class', 'wenAn');
                        wenAn.innerHTML = json.data.content;
                        let forumPhoto = document.createElement('div');
                        forumPhoto.setAttribute('class', 'forumPhoto clearfix');
                        let result = ''
                        for (let j = 0; j < json.data.imgcount; j++) {
                            result += "<li><img src=" + address + "/getDynamicImgServlet?imgFiles=" + json.data.imgFiles + "&count=" + j + "></li>";
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
        console.log(reason);
        console.log("出错啦！");
    });




    const zan = document.querySelector(".zanBox");
    const sss = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "/getMyFabulousServlet");
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
            console.log(value)
            for (let i = value.data.length - 1; i >= 0; i--) {
                let x = value.data[i];
                //增加段
                let forum = document.createElement('div');
                forum.setAttribute('class', 'forum');
                let photo = document.createElement('div');
                photo.setAttribute('class', 'photo');
                let head = document.createElement('img');
                head.src = address + "/getUserHeadServlet?userid=" + x.fabulousId + "&count=0";
                photo.appendChild(head);
                let name = document.createElement('div');
                name.setAttribute('class', 'name');
                const nameRequest = new XMLHttpRequest;
                // nameRequest.responseType = 'json';
                nameRequest.open('get', address + "/getUserServlet?id=" + x.fabulousId);
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
                articleRequest.open('get', address + "/getArticleServlet?articleId=" + x.articleId);
                articleRequest.send();
                articleRequest.onreadystatechange = function () {
                    //判断
                    //200+都可以
                    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
                        //保存数据
                        let json = JSON.parse(articleRequest.responseText)
                        console.log(json)
                        let wenAn = document.createElement('p');
                        wenAn.setAttribute('class', 'wenAn');
                        wenAn.innerHTML = json.data.content;
                        let forumPhoto = document.createElement('div');
                        forumPhoto.setAttribute('class', 'forumPhoto clearfix');
                        let result = ''
                        for (let j = 0; j < json.data.imgcount; j++) {
                            result += "<li><img src=" + address + "/getDynamicImgServlet?imgFiles=" + json.data.imgFiles + "&count=" + j + "></li>";
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
        console.log(reason);
        console.log("出错啦！");
    });


});