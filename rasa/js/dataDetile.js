window.addEventListener('load', function () {
    const address = 'http://175.178.7.180:8080/rasaProject/';
    let tds = document.querySelector('.multiProvince table tbody');//多省份数据里的tr
    let case1 = document.querySelector('.case ul');//放病例的ul
    const dataVisual_right = document.querySelectorAll('.dataVisual-right ul li');
    const newList = document.querySelector('#newList');
    const topquezhen = [];
    const topzhiyu = [];
    const topname = [];
    let leique = 0;
    function creatTds() {//每次创建一个tr
        let tr = document.createElement('tr');
        tds.appendChild(tr);
        for (let i = 0; i < 6; i++) {
            let td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    //动态生成图表
    var chart;
    var option = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
        },
        title: {
            text: ""
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            style: {
                fontSize: "14px",
                animation: true
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: 100,
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontSize: "14px"
                    }
                },
                style: {
                    fontSize: "14px"
                }
            }
        },
        series: [{
            type: 'pie',
            name: '占比',
            colors: ['#a981dd', '#fdd424'],
            data: [
                {
                    name: '<span style="font-size: 14px">已治愈80%</span>',
                    y: 80,
                    sliced: true,
                    selected: true
                },
                ['<span style="font-size: 14px">未治愈20%</span>', 20]
            ],
            style: {
                fontSize: "14px"
            }
        }],
        credits: {
            enabled: false
        }
    };
    const confirm_data = document.querySelector("#confirm-data");
    const total_input = document.querySelector("#total_input");
    const today_input = document.querySelector("#today_input");
    const noSymptom = document.querySelector("#noSymptom");
    const incrNoSymptom = document.querySelector("#incrNoSymptom");
    const now = document.querySelector("#now");
    const storeConfirm = document.querySelector("#storeConfirm");
    const total_confirm = document.querySelector("#total_confirm");
    const today_confirm = document.querySelector("#today_confirm");
    const total_heal = document.querySelector("#total_heal");
    const today_heal = document.querySelector("#today_heal");
    const total_dead = document.querySelector("#total_dead");
    const today_dead = document.querySelector("#today_dead");
    const s = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "requestAPIServlet");

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
        value = JSON.parse(value);
        const ss_array = value.data;
        const x1 = parseInt(ss_array.chinaTotal.total.confirm);
        const x2 = parseInt(ss_array.chinaTotal.total.heal);
        const x3 = parseInt(ss_array.chinaTotal.total.dead);
        const result = x1 - x2 - x3;
        total_input.innerHTML = ss_array.chinaTotal.total.input;//境外输入
        today_input.innerHTML = ss_array.chinaTotal.today.input == undefined ? "" : ss_array.chinaTotal.today.input;//今天境外输入
        noSymptom.innerHTML = ss_array.chinaTotal.extData.noSymptom;//无症状感染者
        incrNoSymptom.innerHTML = ss_array.chinaTotal.extData.incrNoSymptom == undefined ? "" : ss_array.chinaTotal.extData.incrNoSymptom;//新增无症状感染
        now.innerHTML = result;//现有确诊
        storeConfirm.innerHTML = ss_array.chinaTotal.today.storeConfirm;//现有确诊较昨日
        total_confirm.innerHTML = ss_array.chinaTotal.total.confirm;//累计确诊-----
        today_confirm.innerHTML = ss_array.chinaTotal.today.confirm;//确诊新增
        total_dead.innerHTML = ss_array.chinaTotal.total.dead;//累计死亡
        today_dead.innerHTML = ss_array.chinaTotal.today.dead;//死亡新增
        total_heal.innerHTML = ss_array.chinaTotal.total.heal;//累计治愈-------
        today_heal.innerHTML = ss_array.chinaTotal.today.heal;//治愈新增
        leique = ss_array.chinaTotal.total.confirm;//累计确诊
        let nice = Math.round(ss_array.chinaTotal.total.heal / ss_array.chinaTotal.total.confirm * 100);

        option.series[0].data = [
            {
                name: '<span style="font-size: 14px;">已治愈' + nice + '%</span>',
                y: nice,
                sliced: true,
                selected: true
            },
            ['<span style="font-size: 14px">未治愈' + (100 - nice) + "%</span>", 100 - nice]
        ];
        chart = Highcharts.chart('container', option);
    }, reason => {
    });
    const tbody = document.querySelector("#tbody");
    const paths = document.querySelectorAll('.dataVisual-left path');
    const svg = document.querySelector('.dataVisual-left svg');
    const data_box = document.querySelector('.dataVisual-left .data');
    const x = new Promise((resolve, reject) => {
        //创建对象
        const slideshow = new XMLHttpRequest();
        slideshow.responseType = 'json';
        slideshow.open('get', address + "requestAPI2Servlet");
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
    x.then(value => {
        value = JSON.parse(value)
        const ss_array = value.data.list;

        let result = "";
        for (let i = 0; i < ss_array.length; i++) {
            let y = ss_array[i];

            let s = "<tr>" + "<td>" + y.name + "</td>" + "<td>" + y.econNum + "</td>" + "<td>" + y.value + "</td>" + "<td>" + y.deathNum + "</td>" + "<td>" + (parseInt(y.value) - parseInt(y.econNum) - parseInt(y.deathNum)) + "</td>" + "</tr>";
            result = result + s;
            if (y.name == '湖北') {
                topname[0] = '湖北';
                topquezhen[0] = y.value;
                topzhiyu[0] = (parseInt(y.value) - parseInt(y.econNum) - parseInt(y.deathNum));
            } else if (y.name == '香港') {
                topname[1] = '香港';
                topquezhen[1] = y.value;
                topzhiyu[1] = (parseInt(y.value) - parseInt(y.econNum) - parseInt(y.deathNum));
            } else if (y.name == '台湾') {
                topname[2] = '台湾';
                topquezhen[2] = y.value;
                topzhiyu[2] = (parseInt(y.value) - parseInt(y.econNum) - parseInt(y.deathNum));
            } else if (y.name == '广东') {
                topname[3] = '广东';
                topquezhen[3] = y.value;
                topzhiyu[3] = (parseInt(y.value) - parseInt(y.econNum) - parseInt(y.deathNum));
            }
            if (y.econNum >= 10000) {
                let path = findname(y.name, y.econNum);
                path.setAttribute('color', '#b80909');
                path.setAttribute('data', y.econNum);
                path.setAttribute('style', 'fill:#b80909');
            } else if (y.econNum > 1000) {
                let path = findname(y.name, y.econNum);
                path.setAttribute('color', '#e64546');
                path.setAttribute('data', y.econNum);
                path.setAttribute('style', 'fill:#e64546');
            } else if (y.econNum > 100) {
                let path = findname(y.name, y.econNum);
                path.setAttribute('color', '#f57567');
                path.setAttribute('data', y.econNum);
                path.setAttribute('style', 'fill:#f57567');
            } else if (y.econNum > 10) {
                let path = findname(y.name, y.econNum);
                path.setAttribute('color', '#ff9985');
                path.setAttribute('data', y.econNum);
                path.setAttribute('style', 'fill:#ff9985');
            } else if (y.econNum > 0) {
                let path = findname(y.name, y.econNum);
                path.setAttribute('color', '#ffe5db');
                path.setAttribute('data', y.econNum);
                path.setAttribute('style', 'fill:#ffe5db');
            } else {
                let path = findname(y.name, y.econNum);
                path.setAttribute('color', '#fcf5f3');
                path.setAttribute('data', y.econNum);
                path.setAttribute('style', 'fill:#fcf5f3');
            }

        }
        tbody.innerHTML = result;
        for (let i = 0; i < dataVisual_right.length; i++) {
            let maskpeichart = dataVisual_right[i].querySelector('.maskpeichart');
            let h1 = dataVisual_right[i].querySelector('h6');
            let p = dataVisual_right[i].querySelector('p');
            leique = parseInt(total_confirm.innerHTML);
            console.log(leique);
            maskpeichart.innerHTML = Math.round(parseInt(topquezhen[i]) / leique * 100) + '%';
            h1.innerHTML = topname[i];
            p.innerHTML = "累计确诊 " + topquezhen[i] + "   累计治愈 " + topzhiyu[i];
        }
        dataVisual_right[0].style.background = "background: conic-gradient(#fff 0,#fff 20%,#a30014 20%,#a30014 " + Math.round(topquezhen[0] / leique * 100) + '%' + ",#eee " + Math.round(topquezhen[0] / leique * 100) + '%' + ",#eee 100%);"
        dataVisual_right[1].style.background = "background: conic-gradient(#fff 0,#fff 20%,#d9001b  20%,#d9001b  " + Math.round(topquezhen[1] / leique * 100) + '%' + ",#eee " + Math.round(topquezhen[1] / leique * 100) + '%' + ",#eee 100%);"
        dataVisual_right[2].style.background = "background: conic-gradient(#fff 0,#fff 20%,#ec808d  20%,#ec808d  " + Math.round(topquezhen[2] / leique * 100) + '%' + ",#eee " + Math.round(topquezhen[2] / leique * 100) + '%' + ",#eee 100%);"
        dataVisual_right[3].style.background = "background: conic-gradient(#fff 0,#fff 20%,#f59a23  20%,#f59a23  " + Math.round(topquezhen[3] / leique * 100) + '%' + ",#eee " + Math.round(topquezhen[3] / leique * 100) + '%' + ",#eee 100%);"
    }, reason => {
        console.log(reason);
        console.log("出错啦！");
    });
    function findname(name, data) {
        for (let i = 0; i < paths.length; i++) {
            if (name == paths[i].getAttribute('name')) {
                if (name == "广东") {
                    data_box.querySelector('.name').innerHTML = "地区： 广东";
                    data_box.querySelector('.datal').innerHTML = "现有确诊： " + data;
                }
                return paths[i];
            }
        }
    }

    for (let i = 0; i < paths.length; i++) {
        paths[i].addEventListener('click', function () {
            for (let i = 0; i < paths.length; i++) {
                paths[i].style.fill = paths[i].getAttribute('color');
            }
            this.style.fill = '#c7fffd';
            data_box.querySelector('.name').innerHTML = "地区： " + paths[i].getAttribute('name');
            data_box.querySelector('.datal').innerHTML = "现有确诊： " + paths[i].getAttribute('data');
            data_box.style.display = 'block';
            let x = paths[i].getBoundingClientRect().x - svg.getBoundingClientRect().x + paths[i].getBoundingClientRect().width / 2 + 20;
            let y = paths[i].getBoundingClientRect().y - svg.getBoundingClientRect().y + paths[i].getBoundingClientRect().height / 2 + 20;
            if (paths[i].getAttribute('name') == "广东") {
                console.log(x + " " + y);
            }
            data_box.style.left = x + 'px';
            data_box.style.top = y + 'px';
        })
    }

    // const z = new Promise((resolve, reject) => {
    //     //创建对象
    //     const slideshow = new XMLHttpRequest();
    //     slideshow.responseType = 'json';
    //     slideshow.open('get', "requestNewsAPIServlet");
    //     // slideshow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //
    //     //发送请求
    //     slideshow.send();
    //     slideshow.onreadystatechange = function () {
    //         //判断
    //         if (slideshow.readyState === 4) {
    //             if (slideshow.status >= 200 && slideshow.status < 300) {//200+都可以
    //                 console.log("jhhh")
    //                 //保存数据
    //                 // console.log(slideshow.responseText);
    //
    //                 // resolve(slideshow.response);
    //             } else {
    //                 reject(slideshow.status);
    //             }
    //         }
    //     }
    // });
    // x.then(value => {
    //     value = JSON.parse(value)
    //     console.log(value)
    //     // console.log(value)
    //     // const ss_array = value.data.list;
    //     // console.log(ss_array);
    //     // let result="";
    //     // tbody.innerHTML=result;
    //
    //
    //
    // }, reason => {
    //     console.log(reason);
    //     console.log("出错啦！");
    // });

    const slideshow = new XMLHttpRequest();
    // slideshow.responseType = 'json';
    slideshow.open('get', address + "requestAreaAPIServlet");
    slideshow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //发送请求
    slideshow.send();
    slideshow.onreadystatechange = function () {
        //判断
        if (slideshow.readyState === 4) {
            if (slideshow.status >= 200 && slideshow.status < 300) {//200+都可以
                //保存数据
                const json = JSON.parse(slideshow.responseText);
                for (let i = 0; i < json.data.length; i++) {
                    const li = document.createElement('li');
                    li.innerHTML = "<div class='case-left'></div><div class='case-ardess'></div>";
                    newList.appendChild(li);
                    li.querySelector('.case-ardess').innerHTML = json.data[i].area;
                    li.querySelector('.case-ardess').setAttribute('title', json.data[i].area);
                }
            } else {
                // reject(slideshow.status);
            }
        }
    }

    function creatLi(num, s) {//要创建多少个li
        let lis = [];
        lis[0] = case1.innerHTML;
        for (let i = 1; i <= num; i++) {//框架
            lis[i] = "<li><div class='case-left'></div><div class='case-ardess'></div></li>";
        }
        return lis.join('');//数组转化为字符串
    }
})