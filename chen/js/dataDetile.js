window.addEventListener('load', function () {
    let peichart1 = document.getElementsByClassName('peichart1')[0];
    peichart1.style.background = 'conic-gradient(#fff 0%,#fff 20%,#c280ff 20%,#c280ff 64%,#eee 64%,#eee 100%)';
    let tds = document.querySelector('.multiProvince table tbody');//多省份数据里的tr
    let case1 =document.querySelector('.case ul');//放病例的ul
    function creatTds() {//每次创建一个tr
        let tr = document.createElement('tr');
        tds.appendChild(tr);
        for (let i = 0; i < 6; i++){
            let td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    function creatLi(num) {//要创建多少个li
        let lis = [];
        lis[0] = case1.innerHTML;
        for (let i = 1; i <= num; i++){//框架
            lis[i] = "<li><div class='case-left'></div><div class='case-time'></div><div class='case-ardess'></div></li>"
        }
        return lis.join('');//数组转化为字符串
    }
})