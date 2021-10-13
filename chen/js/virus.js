window.addEventListener('load', function () {

    const slideSmall = document.querySelector('#slideSmall');
    const Ul = document.querySelector('ul.rightImg');
    const Ullis = Ul.children;
    const lifts = document.querySelectorAll('.lift>li');
    const slideSmallWidth = slideSmall.offsetWidth;
    const liftCircle = document.querySelector('.liftCircle');
    const c3rCircles = document.querySelectorAll('#c3rCircle>div');

    // 控制轮播图切换以及小圆点
    for (let i = 0; i < lifts.length; i++){
        lifts[i].setAttribute('index', i);
        lifts[i].addEventListener('click', () => {
            const liftCircleTop = liftCircle.offsetTop;
            // 判断当前小圆点跟目标值大小，来控制抖动效果
            animate1(Ul, -i * slideSmallWidth-1);
            if (liftCircleTop > (i * 90 + 54)) {
                animate2(liftCircle, (i * 90) + 24, function () {
                animate2(liftCircle, (i * 90) + 70, function () {
                    animate2(liftCircle, (i * 90)+  54);
                });
            }); 
            } else {
                 animate2(liftCircle, (i * 90) + 70, function () {
                animate2(liftCircle, (i * 90) + 24, function () {
                    animate2(liftCircle, (i * 90)+  54);
                });
            });
            }
            
        })
    }
    // 控制第三个方框里的三个内容
    const bigc3r = document.querySelector('.bigc3r');
    const card = document.querySelector('.card3');
    // console.log(card);
    for (let i = 0; i < c3rCircles.length; i++){
        const cardWidth = card.offsetHeight;
    //    console .log(cardWidth);
        c3rCircles[i].addEventListener('click', function () {
            for (let j = 0; j < c3rCircles.length; j++){
                c3rCircles[j].className = "c3rc1";
            }
            this.className = "c3rc1 c3rc2";
            animate2(bigc3r, -cardWidth * i);
        });
    };


    // 缓动动画左右
    function animate1(obj, target, callback) {
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
        obj.timer = setInterval(function () {
        /* 步长值写到定时器里面  步长公式（目标值-当前值）/10*/
        var step = (target - obj.offsetTop) / 10;
        // 把步长改成整数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);// Math.ceil(step)对浮点数向上取整,Math.floor(step)向下取整
        if (obj.offsetTop == target) {
            //停止动画
            clearInterval(obj.timer);
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
        slideshow.responseType = 'jsonp';
        slideshow.open('get', "https://c.m.163.com/ug/api/wuhan/app/data/list-total");
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
        //console.log(value);
        // const centers = document.querySelectorAll('.rightCell>p.center');
        // const bottoms = document.querySelectorAll('.rightCell>p.bottom');
        // const ss_array = value.data;
        // console.log(ss_array);
        // centers[0].innerHTML = ss_array.chinaTotal.total.input;//9337
        // bottoms[0].innerHTML = ss_array.chinaTotal.total.input;//22
        // centers[1].innerHTML = ss_array.chinaTotal.exData.noSymptom;//359
        // bottoms[1].innerHTML = ss_array.chinaTotal.exData.incrNoSymptom;//16
        // // centers[2].innerHTML = ss_array.chinaTotal.total.input;//
        // bottoms[2].innerHTML = ss_array.chinaTotal.today.storeConfirm;//-19
        // centers[3].innerHTML = ss_array.chinaTotal.total.confirm;//1251115
        // bottoms[3].innerHTML = ss_array.chinaTotal.today.confirm;//30
        // centers[4].innerHTML = ss_array.chinaTotal.total.dead;//5695
        // bottoms[3].innerHTML = ss_array.chinaTotal.today.dead;//0
        // centers[5].innerHTML = ss_array.chinaTotal.total.heal;//116938
        // bottoms[5].innerHTML = ss_array.chinaTotal.today.heal;//49
        
    }, reason => {
        console.log(reason);
        console.log("出错啦！");
    })

   
});