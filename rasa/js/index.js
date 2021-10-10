window.addEventListener('load', () => {
    // var address = 'http://192.168.0.161:8080/rasaProject/';
    var address=''
    const content = document.querySelectorAll('.content');
    let i = 0;
    const nav = document.querySelector('.nav');
    window.onscroll = function () {
        if (getScrollTop() >= 200) {
            nav.style.background = "#fff";
            nav.style.boxShadow = "0 2px 5px #ccc";
        } else {
            nav.style.background = "transparent";
            nav.style.boxShadow = "0 2px 5px transparent";
        }
        if (getScrollTop() + window.innerHeight >= getDisTop(content[i]) + 50) {
            if (i % 2 == 1) {
                content[i].children[0].style.right = 80 + 'px';
                content[i].children[1].style.top = 25 + 'px';
            } else {
                content[i].children[0].style.left = 80 + 'px';
                content[i].children[1].style.top = 25 + 'px';
            }
            i++;
        }
    }

    //阻止页面缩放
    const keyCodeMap = {
        // 91: true, // command
        61: true,
        107: true, // 数字键盘 +
        109: true, // 数字键盘 -
        173: true, // 火狐 - 号
        187: true, // +
        189: true, // -
    };
    // 覆盖ctrl||command + ‘+’/‘-’
    document.onkeydown = function (event) {
        const e = event || window.event;
        const ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCodeMap[e.keyCode]) {
            e.preventDefault();
        } else if (e.detail) { // Firefox
            event.returnValue = false;
        }
    };
    // 覆盖鼠标滑动
    document.body.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                e.preventDefault();
                return false;
            }
            if (e.deltaY > 0) {
                e.preventDefault();
                return false;
            }
        }
    }, { passive: false });


    //一开始的数据
    const positionI = document.querySelectorAll('.position i');
    const s = new Promise((resolve, reject) => {
        //创建对象
        const positionData = new XMLHttpRequest();
        positionData.responseType = 'json';
        positionData.open('get', address + "requestAPIServlet");

        //发送请求
        positionData.send();
        positionData.onreadystatechange = function () {
            //判断
            if (positionData.readyState === 4) {
                if (positionData.status >= 200 && positionData.status < 300) {//200+都可以
                    //保存数据
                    resolve(positionData.response);
                } else {
                    reject(positionData.status);
                }
            }
        }
    });
    s.then(value => {
        console.log(value);
        value = JSON.parse(value)
        const poI_array = value.data;
        positionI[0].innerHTML = poI_array.chinaTotal.total.confirm;//确诊人数
        positionI[1].innerHTML = poI_array.chinaTotal.total.heal;//死亡人数
        positionI[2].innerHTML = poI_array.chinaTotal.total.dead;//恢复人数
    }, reason => {
        console.log(reason);
        console.log("出错啦！");
    });

    //获取元素距离页面顶部的距离
    function getDisTop(element) {
        var realTop = element.offsetTop;
        var parent = element.offsetParent;
        while (parent !== null) {
            realTop += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return realTop;
    }

    //获取滚动条当前的位置
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        scrollTop = Math.round(scrollTop);
        return scrollTop;
    }
});