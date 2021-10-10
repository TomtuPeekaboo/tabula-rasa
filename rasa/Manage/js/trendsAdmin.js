import {delArticleServlet} from "./function.js";

window.addEventListener('load', function () {
    //删除按钮
    const deleteButton = document.querySelectorAll('.delete');
    //delete弹窗
    const delete_frame = document.querySelector('.delete-frame');
    //关闭delete弹窗
    const close = document.querySelectorAll('.delete-right');
    //确定删除
    //推荐
    const pushTop = document.querySelector('.pushTop-frame');
    //推送推荐页面按钮
    const pushTopButton = document.querySelectorAll('.pushtop');
    //关闭推荐
    const pushClose = document.querySelectorAll('.pushTop-right');
    const delete_input = document.querySelector('#delete-input');
    const sure = document.querySelector('.sure');
    const td1 = document.querySelector('.id');
    const td2 = document.querySelector('.user');
    const td3 = document.querySelector('.time');
    const td4 = document.querySelector('.redu');
    const td5 = document.querySelector('.pinglun');
    const td6 = document.querySelector('.dianzan');
    const ImgBox = document.querySelector('.trends .img');
    // let url = "http://192.168.0.161:8080/rasaProject/";
    let url="";
    const text = document.querySelector('.trends .text');
    let index = 0;//记录第几条记录
    let imgindex=0;
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].setAttribute('index', i);
        deleteButton[i].addEventListener('click', function () {
            index = this.getAttribute('index');
            delete_frame.style.display = 'block';
        })
    }
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {
            delete_frame.style.display = 'none';
        })
    }
    for (let i = 0; i < pushClose.length; i++) {
        pushClose[i].addEventListener('click', function () {
            pushTop.style.display = 'none';
        })
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    let articleId = getQueryString("userid");
    const x = new XMLHttpRequest;
    //创建对象
    x.open("get", url + "getArticleServlet?articleId=" + articleId, true);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send();
    //保存操作
    x.onreadystatechange = function () {
        //判断
        //200+都可以
        if (x.readyState === 4 && x.status === 200) {
            let json = JSON.parse(x.responseText);
            imgindex = json.data.imgcount;
            td1.innerHTML = json.data.id;
            td2.innerHTML = json.data.authod;
            td3.innerHTML = json.data.time;
            td4.innerHTML = json.data.zcount;
            td5.innerHTML = json.data.ccount;
            td6.innerHTML = json.data.zcount;
            text.innerHTML = json.data.content;
            for (let i = 0; i < json.data.imgcount; i++) {
                let li = document.createElement('li');
                li.style.backgroundImage = "url(" + url + "getDynamicImgServlet?imgFiles=" + json.data.imgFiles + "&count=" + i + "&type=" + json.data.type + ")";
                ImgBox.appendChild(li);
                li.setAttribute('index', i);
                displayImg(li);
            }
            sure.addEventListener('click', function () {
                if (delete_input.value == 'rasa') {
                    delete_frame.style.display = 'none';
                    alert('删除成功');
                    delArticleServlet(json.data.id).then(res => {
                        window.location.href = 'forumManage.html';
                    });
                } else {
                    alert('管理员密码错误')
                }
            })
        }
    }

    //图片
    const imgs = document.querySelectorAll('.trends .img li');
    const img = document.querySelector('.big-mask img');
    const mask = document.querySelector('.big-mask');
    const rotate = document.querySelector('.mask-rotate');
    const left = document.querySelector('.mask-left');
    const right = document.querySelector('.mask-right');
    const imgBox = document.querySelector('.img-box');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('index', i);
        imgs[i].addEventListener('click', function () {
            mask.style.display = 'block';
            let url = this.style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            imgindex = parseInt(this.getAttribute('index'));
            img.src = url;
        })
    }
    function displayImg(li) {
        li.addEventListener('click', function () {
            mask.style.display = 'block';
            let url = this.style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            imgindex = parseInt(this.getAttribute('index'));
            img.src = url;
        })
    }
    document.addEventListener('click', function (e) {
        if (e.target == mask || e.target == imgBox) {
            mask.style.display = 'none';
        }
    })
    left.addEventListener('click', function () {
        const allimg = document.querySelectorAll('.trends .img li');
        console.log(1);
        if (imgindex > 0) {
            let url = allimg[imgindex - 1].style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            img.src = url;
            imgindex--;
        }
    })
    right.addEventListener('click', function () {
        const allimg = document.querySelectorAll('.trends .img li');
        if (imgindex < allimg.length - 1) {
            let url = allimg[imgindex + 1].style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            img.src = url;
            imgindex++;
        }
    })
    rotate.addEventListener('click', function () {
        let deg = parseInt(img.style.transform.split("(")[1].split(")")[0]);
        let newdeg = deg + 90;
        if (deg == 270) {
            newdeg = 0;
        }
        // if (img.style.width > 600&&(newdeg==90||newdeg==270)) {
        //     img.style.width = 600 + 'px';
        //     img.style.height = 600 / parseFloat(img.getAttribute('bili')) + 'px';
        // } else {
        //     getbili1(img.src,img);
        // }
        img.style.transform = 'rotate(' + newdeg + 'deg)';
    })
    //获得真实图片大小的比例
    function getbili1(src, img1) {
        var img = new Image();
        let w;
        let h;
        var bili;
        img.addEventListener('load', function () {
            w = parseInt(img.width);
            h = parseInt(img.height);
            bili = w / h;
            if (h > 600) {
                if (600 * bili > 800) {
                    img1.style = "width:" + 800 + "px; height: " + 800 / bili + "px; transform: rotate(0deg);";
                } else
                    img1.style = "width:" + 600 * bili + "px; height: 600px; transform: rotate(0deg);";
            } else if (w > 800) {
                img1.style = "width:700px; height:" + 800 / bili + "px; transform: rotate(0deg);";
            } else {
                img1.style = "width:" + w + "px;height:" + h + "px; transform: rotate(0deg);";
            }
            img1.setAttribute('bili', bili);
        })
        img.src = src;
    }
})