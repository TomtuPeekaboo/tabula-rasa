window.addEventListener('load', function () {

    const slideSmall = document.querySelector('#slideSmall');
    const Ul = document.querySelector('ul.rightImg');
    const Ullis = Ul.children;
    const lifts = document.querySelectorAll('.lift>li');
    const liftText = document.querySelectorAll('.lift>li a');
    const slideSmallWidth = slideSmall.offsetWidth;
    const liftCircle = document.querySelector('.liftCircle');
    const c3rCircles = document.querySelectorAll('#c3rCircle>div');
    const c4Circle = document.querySelector('.c4Circle');
    console.log(liftText);


    //获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    const times = document.querySelectorAll('#time p');
    for (let b = 0; b < times.length; b++) {
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        times[b].innerHTML = year + "-" + month + "-" + (day - 2 + b);
        times[b].addEventListener('click', () => {
            for (let j = 0; j < c3rCircles.length; j++) {
                times[j].className = "";
            }
            times[b].className = "nowTime";
            const nowTTop = times[b].offsetTop;
            const c4CircleTop = c4Circle.offsetTop;
            if (c4CircleTop < b * 151 + 30) {
                animate2(c4Circle, nowTTop + 20, function () {
                    animate2(c4Circle, nowTTop - 20, function () {
                        animate2(c4Circle, nowTTop + 3);
                    });
                });
            } else {
                animate2(c4Circle, nowTTop - 20, function () {
                    animate2(c4Circle, nowTTop + 20, function () {
                        animate2(c4Circle, nowTTop + 3);
                    });
                });
            }

        });
    }

    // 控制轮播图切换以及小圆点
    for (let i = 0; i < lifts.length; i++) {
        lifts[i].setAttribute('index', i);
        lifts[i].addEventListener('click', () => {
            // 对应字体
            for (let k = 0; k < lifts.length; k++) {
                liftText[k].className = '';
            }
            liftText[i].className = 'liftText';
            const liftCircleTop = liftCircle.offsetTop;
            // 判断当前小圆点跟目标值大小，来控制抖动效果
            animate1(Ul, -i * slideSmallWidth - 1);
            if (liftCircleTop > (i * 90 + 54)) {
                animate2(liftCircle, (i * 90) + 24, function () {
                    animate2(liftCircle, (i * 90) + 70, function () {
                        animate2(liftCircle, (i * 90) + 54);
                    });
                });
            } else {
                animate2(liftCircle, (i * 90) + 70, function () {
                    animate2(liftCircle, (i * 90) + 24, function () {
                        animate2(liftCircle, (i * 90) + 54);
                    });
                });
            }

        })
    }
    // 控制第三个方框里的三个内容
    const bigc3r = document.querySelector('.bigc3r');//第三个大盒子
    const card = document.querySelector('.card3');
    for (let i = 0; i < c3rCircles.length; i++) {
        const cardWidth = card.offsetHeight;
        //    console .log(cardWidth);
        c3rCircles[i].addEventListener('click', function () {
            for (let j = 0; j < c3rCircles.length; j++) {
                c3rCircles[j].className = "c3rc1";
            }
            this.className = "c3rc1 c3rc2";
            animate2(bigc3r, -cardWidth * i);
        });
    };

    var num = 0;//滚动计时器
    // !!!!添加鼠标滚动事件 在轮播框里滚动鼠标使得卡片移动     每次移动一张
    function onMouseWheel(ev) {
        /*当鼠标滚轮事件发生时，执行一些操作*/
        var ev = ev || window.event;
        var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
        // wheelDelta：当用户向上滚动鼠标滚轮时，wheelDelta>0,向下wheelDelta<0
        down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
        if (down) {
            //console.log('鼠标滚轮向下---------')
            // 只有当不在第三张card上才会触发向下滚动事件
            if (num < 2) {
                num++;
                for (let j = 0; j < c3rCircles.length; j++) {
                    c3rCircles[j].className = "c3rc1";
                }
                c3rCircles[num].className = "c3rc1 c3rc2";
                animate2(bigc3r, bigc3r.offsetTop - 500);
            }


        } else {
            //console.log('鼠标滚轮向上++++++++++')
            if (num > 0) {
                num--;
                for (let j = 0; j < c3rCircles.length; j++) {
                    c3rCircles[j].className = "c3rc1";
                }
                c3rCircles[num].className = "c3rc1 c3rc2";
                animate2(bigc3r, bigc3r.offsetTop + 500);
            }

        }
        if (ev.preventDefault) {
            /*FF 和 Chrome*/
            ev.preventDefault(); // 阻止默认事件
        }
        return false;
    }
    addEvent(bigc3r, 'mousewheel', onMouseWheel);
    // addEvent(bigc3r, 'DOMMouseScroll', onMouseWheel);
    //操作对象+事件+函数
    function addEvent(obj, xEvent, fn) {
        obj.addEventListener(xEvent, fn, false);
    }



    var timer2;
    // 缓动动画左右
    function animate1(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            /* 步长值写到定时器里面  步长公式（目标值-当前值）/10*/
            var step = (target - obj.offsetLeft) / 10;
            // 把步长改成整数
            step = step > 0 ? Math.ceil(step) : Math.floor(step);// Math.ceil(step)对浮点数向上取整,Math.floor(step)向下取整
            if (obj.offsetLeft == target) {
                //停止动画
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里
                callback && callback();//相当于 if callback {callback()};如果回调函数存在，则执行该回调函数
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 5);
    };
    // 缓动动画上下
    function animate2(obj, target, callback) {
        console.log(target);
        clearInterval(timer2);
        timer2 = setInterval(function () {
            /* 步长值写到定时器里面  步长公式（目标值-当前值）/10*/
            var step = (target - obj.offsetTop) / 10;
            // 把步长改成整数
            step = step > 0 ? Math.ceil(step) : Math.floor(step);// Math.ceil(step)对浮点数向上取整,Math.floor(step)向下取整
            if (obj.offsetTop == target) {
                //停止动画
                clearInterval(timer2);
                // 回调函数写到定时器结束里
                callback && callback();//相当于 if callback {callback()};如果回调函数存在，则执行该回调函数
            }
            obj.style.top = obj.offsetTop + step + 'px';
        }, 5);
    };



    //传数据部分
    const s = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', "requestAPIServlet");
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
    })
    s.then(value => {
        console.log(value);
        const centers = document.querySelectorAll('.rightCell>p.center');
        const bottoms = document.querySelectorAll('.rightCell>p.bottom');
        value = JSON.parse(value)
        const ss_array = value.data;
        console.log(ss_array);
        const x1 = parseInt(ss_array.chinaTotal.total.confirm);
        const x2 = parseInt(ss_array.chinaTotal.total.heal);
        const x3 = parseInt(ss_array.chinaTotal.total.dead);
        const result = x1 - x2 - x3;
        centers[0].innerHTML = ss_array.chinaTotal.total.input;//境外输入
        bottoms[0].innerHTML = ss_array.chinaTotal.today.input;//今天境外输入
        centers[1].innerHTML = ss_array.chinaTotal.extData.noSymptom;//无症状感染者
        bottoms[1].innerHTML = ss_array.chinaTotal.extData.incrNoSymptom;//新增无症状感染
        centers[2].innerHTML = result;//现有确诊
        bottoms[2].innerHTML = ss_array.chinaTotal.today.storeConfirm;//现有确诊较昨日
        centers[3].innerHTML = ss_array.chinaTotal.total.confirm;//累计确诊
        bottoms[3].innerHTML = ss_array.chinaTotal.today.confirm;//确诊新增
        centers[4].innerHTML = ss_array.chinaTotal.total.dead;//累计死亡
        bottoms[3].innerHTML = ss_array.chinaTotal.today.dead;//死亡新增
        centers[5].innerHTML = ss_array.chinaTotal.total.heal;//累计治愈
        bottoms[5].innerHTML = ss_array.chinaTotal.today.heal;//治愈新增

    }, reason => {
        console.log(reason);
        console.log("出错啦！");
    })


});