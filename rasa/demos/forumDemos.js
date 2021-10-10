window.addEventListener('load', () => {


 //---------获取数据---------------
    const p = new Promise((resolve, reject) => {
        const DT = new XMLHttpRequest();
        DT.responseType = 'json';
        DT.open('get', "https://cbs-i.sports.cctv.com/cache/0fe461738f548ffb6227a83776895fad?ran=1632043143196");
        DT.send();
        DT.onreadystatechange = function () {
            if (DT.readyState === 4) {
                if (DT.status >= 200 && DT.status < 300) {
                    resolve(DT.response);
                } else {
                    reject(DT.status);
                    
                }
            }
        }
    })
    // 用p.then(function(value){},function(reson){})来完成需要工作，上面的就不用动它
    p.then(value => {
        //console.log(value);//返回地址传递过来的所有信息
        const DTArray = value.results;
        //console.log(DTArray);//获得所有返回结果
        for (let j = 0; j < DTArray[0].list.length - 1; j++) {//j=每个小栏目的数组（30）
            var copyli = DTlis[0].cloneNode(true);//深复制ul里面的li
            PEul.appendChild(copyli);
        }

        for (let i = 0; i < gameHead.length; i++) {//如果把gameHead.length改成PEArray.length或者13都会出错,为什么！！！
            gameHead[i].innerHTML = PEArray[i].league;//将头部信息导入
            // 直接调用函数-------------------------
            Xuanran(0);
            gameHead[i].addEventListener('click', function () {
                // 前面以第一个为复制标本，都复制30个，后面要判断数量是否一致多减少加
                if (PEArray[i].list.length != PElis.length) {
                    let delnum = PElis.length - PEArray[i].list.length;
                    //console.log(delnum);
                    if (delnum > 0) {
                        for (let w = 0; w < delnum; w++) {
                            let lastChild = PEul.lastElementChild;
                            //console.log(lastChild);
                            PEul.removeChild(lastChild);
                        }
                    } else {
                        delnum = delnum * (-1);
                        //console.log(delnum);
                        for (let w = 0; w < delnum; w++) {
                            let copyli = PElis[0].cloneNode(true);//深复制ul里面的li
                            PEul.appendChild(copyli);
                        }
                    }
                }
                for (let j = 0; j < gameHead.length; j++) {
                    gameHead[j].className = '';
                }
                gameHead[i].className = 'one';
                Xuanran(i);
            })

        }
        //封装渲染函数  使得不用点击就可以让第一个显示
        function Xuanran(i) {
            // 设置li里面的具体数据
            for (let k = 0; k < PElis.length; k++) {
                let PEdivs = PElis[k].children;
                let imgs = PElis[k].querySelectorAll('img');
                let ps = PElis[k].querySelectorAll('p');
                PEdivs[0].innerHTML = PEArray[i].list[k].leagueName + PEArray[i].list[k].gameRound;
                PEdivs[2].children[0].innerHTML = PEArray[i].list[k].appStatusDesc;//children 是一个数组
                imgs[0].src = PEArray[i].list[k].guestPicUrl;
                imgs[1].src = PEArray[i].list[k].homePicUrl;
                ps[0].innerHTML = PEArray[i].list[k].guestName;
                // 如果找不到得分，赋值0:0
                if (PEArray[i].list[k].guestScore) {
                    let guestS = PEArray[i].list[k].guestScore;
                    guestS == null ? "" : PEArray[i].list[k].guestScore;//这句在这好像没什么用
                    ps[1].innerHTML = PEArray[i].list[k].statusDesc + "<br>" + guestS + ":" + PEArray[i].list[k].homeScore;
                } else {
                    //let data1 = new Date('PEArray[i].list[k].scores.startTime');
                    ps[1].innerHTML = PEArray[i].list[k].startTime + "<br>" + "0:0";
                }
                ps[2].innerHTML = PEArray[i].list[k].homeName;
            }
        }
    }, reason => {
        console.log(reason);//0
    })
    
});