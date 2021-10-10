window.addEventListener('load', function () {
    let lis = document.querySelectorAll('.left li');
    let uls = document.querySelectorAll('.center ul');
    let buttom = document.querySelector('.banner .right .buttom');
    let inputSvg = document.querySelector('.banner .right .buttom .make');
    let inputSvgW = inputSvg.offsetWidth;
    let inputSvgH = inputSvg.offsetHeight;
    let clickbuttom = document.querySelector('.banner .center span');
    let center = document.querySelector('.banner .center');
    let right = document.querySelector('.banner .right');
    let paskma = document.querySelector('.banner .right .buttom .pagema');
    let addma = document.querySelector('.banner .right .buttom .page span');
    let act = document.querySelector('.banner .right .buttom .Pagetask');//装删除、复制按钮的框
    let delet = document.querySelector('.banner .right .buttom .Pagetask li:first-child');//删除按钮
    let copy = document.querySelector('.banner .right .buttom .Pagetask li:last-child');//复制按钮
    let addText = document.querySelector('.top-left span:nth-child(2)')//添加文字
    let textsize = document.querySelector('.textfontsize');
    let textcolor = document.querySelector('.textcolor');
    let centerwidth = center.offsetWidth;
    const titleBox = document.querySelector('.buttom input');
    // let url = "http://192.168.0.161:8080/rasaProject/";
    let url="";
    let svgNS = "http://www.w3.org/2000/svg";
    let svgs = [];
    let save = document.querySelector(".top-right span:nth-child(1)"); //保存svg
    let saveimg = document.querySelector(".top-right span:nth-child(2)");
    let fabu = document.querySelector(".top-right span:nth-child(3)");
    const send_frame = document.querySelector('.send-frame');
    const send_text = document.querySelector('.send-frame textarea');
    const baocunTecho = document.querySelector('.send-img img');
    const formInput = document.querySelector('.send-frame form input');
    let svg = creatSvgTap('svg', { 'xmlns': svgNS, 'width': inputSvgW, 'height': inputSvgH });//真实图片的大小
    let g = creatSvgTap('g', { 'id': 'all' });
    let foreignObject = creatSvgTap('foreignObject', { 'width': inputSvgW, 'height': inputSvgH, 'style': 'position:relative' });
    inputSvg.insertBefore(svg, inputSvg.children[inputSvg.children.length - 1]);
    svg.appendChild(g);
    g.appendChild(foreignObject);
    svgs[svgs.length] = svg;
    let p = [];

    //将素材导入
    //加字体
    let texts = document.querySelector('.center ul:nth-of-type(3)');
    for (let i = 0; i < 26; i++) {
        let li = document.createElement('li');
        li.innerHTML = 'TABULS RASA 中国加油';
        num = 97 + i;
        li.style.fontFamily = String.fromCharCode(num);
        texts.appendChild(li);
    }
    //加入贴纸的图片
    let tieImg = document.querySelector('.center ul:nth-of-type(2)');
    for (let i = 0; i < 19; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = 'tie/' + (i + 1) + '.png';
        tieImg.appendChild(li);
        li.appendChild(img);
    }
    //加入背景的图片
    let bg = document.querySelector('.center ul:first-of-type');
    for (let i = 0; i < 33; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = 'Techobg/' + (i + 1) + '.png';
        bg.appendChild(li);
        li.appendChild(img);
    }

    /********************************************************************************** */
    //导航栏的操作
    //最左边的导航栏
    for (let i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].addEventListener('click', function () {
            let index = this.getAttribute('index');
            for (let i = 0; i < lis.length; i++) {
                lis[i].className = '';
                uls[i].style.display = 'none';
            }
            uls[index].style.display = 'flex';
            if (index == 2 && center.offsetWidth != centerwidth) {
                uls[index].style.display = 'none';
            }
            this.className = 'atn';
        })
    }
    //收起右边导航
    let rightNav = document.querySelector('.center div');
    clickbuttom.addEventListener('click', function () {
        if (center.offsetWidth == centerwidth) {
            for (let i = 0; i < lis.length; i++) {
                if (i == 2 && lis[i].className == 'atn') {
                    uls[i].style.display = 'none';
                }
            }
            this.style.background = '#c7adea url(images/youjiantou.png) no-repeat 30px center';
            center.style.width = 0;
            rightNav.style.width = 0;
            right.style.width = right.offsetWidth + 293 + 'px';
        } else {
            for (let i = 0; i < lis.length; i++) {
                if (i == 2 && lis[i].className == 'atn') {
                    uls[i].style.display = 'flex';
                }
            }
            this.style.background = '#c7adea url(images/zuojiantou.png) no-repeat 30px center';
            center.style.width = centerwidth + 'px';
            rightNav.style.width = centerwidth + 'px';
            right.style.width = right.offsetWidth - 293 + 'px';
        }
    })
    //点击页码换页码,利用事件委托实现动态生成的元素添加事件
    paskma.addEventListener('click', function (e) {
        if (e.target != paskma) {
            for (let i = 0; i < paskma.children.length; i++) {
                paskma.children[i].className = '';
                paskma.children[i].setAttribute('index', i);
                svgs[i].setAttribute('style', 'display:none');//显示svg
            }
            e.target.className = 'click';
            let index = parseInt(e.target.getAttribute('index'), 10);
            act.style.top = 13 + 50 * index + 'px';//复制删除框
            svgs[index].setAttribute('style', 'display:block');
            if (p[getsvg()] != undefined) {
                titleBox.value = p[getsvg()];
            } else {
                titleBox.value = '';
            }
            ditincttieBox();
            // gtieBox.style.display = 'none';
        }
    })
    titleBox.addEventListener('input', function () {
        p[getsvg()] = titleBox.value;
    })
    //鼠标经过展示删除复制操作
    paskma.addEventListener('mousemove', function (e) {
        if (e.target != paskma) {
            let index = parseInt(e.target.innerHTML, 10) - 1;
            act.style.top = 13 + 50 * index + 'px';
            act.style.display = 'block';
        }
    })
    //隐藏删除复制操作
    buttom.addEventListener('mousemove', function (e) {
        if (e.target != act && e.target.nodeName != 'LI') {
            act.style.display = 'none';
        }
    })

    //制作区变大变小
    const xiao = document.querySelector('.xiao');
    const big = document.querySelector('.jia');
    const baifenhao = document.querySelector('.baifenhao');
    //变小


    //背景和svg的创建
    //背景
    let bgs = document.querySelectorAll('.center div ul:first-of-type li img');//设置背景的ul
    for (let i = 0; i < bgs.length; i++) {
        bgs[i].addEventListener('click', function () {
            let lis = document.querySelectorAll('.pagema li');
            for (i = 0; i < lis.length; i++) {
                if (lis[i].className == 'click') {//加背景
                    let bgimg = svgs[i].querySelector('.bg');
                    if (bgimg == null) {
                        let img = creatSvgTap('image', { 'class': 'bg', 'width': inputSvgW, 'x': 0 + '', 'y': 0 + '' });
                        img.href.baseVal = this.src;
                        // bgImg[bgindex++] = img;
                        svgs[i].querySelector('#all').insertBefore(img, svgs[i].querySelector('#all').children[0]);
                    } else {//换背景
                        bgimg.href.baseVal = this.src;
                    }
                }
            }
        })
    }
    // let gtieBox = document.querySelector('.tieBox-frame');
    //加页码，添加svg
    addma.addEventListener('click', function () {
        let li = document.createElement('li');
        li.innerHTML = paskma.children.length + 1;
        paskma.appendChild(li);
        let g = creatSvgTap('g', { 'id': 'all' });
        let svg = creatSvgTap('svg', { 'xmlns': svgNS, 'width': inputSvgW, 'height': inputSvgH });
        let foreignObject = creatSvgTap('foreignObject', { 'width': inputSvgW, 'height': inputSvgH, 'style': 'position:relative' });
        inputSvg.insertBefore(svg, inputSvg.children[inputSvg.children.length - 1]);
        svg.appendChild(g);
        g.appendChild(foreignObject);
        svgs[svgs.length] = svg;
        if (paskma.children.length == 1) {
            li.className = 'click';
        }
        for (let i = 0; i < paskma.children.length; i++) {
            paskma.children[i].className = '';
            paskma.children[i].setAttribute('index', i);
            svgs[i].setAttribute('style', 'display:none');//显示svg
        }
        li.className = 'click';
        svg.setAttribute('style', 'display:block');
        if (p[getsvg()] != undefined) {
            titleBox.value = p[getsvg()];
        } else {
            titleBox.value = '';
        }
        let ties = inputSvg.children[getsvg()].querySelectorAll('.tieBox');
        for (let i = 0; i < ties.length; i++) {
            ties.style.border = 'none';
        }
    })
    //删除整个svg
    delet.addEventListener('click', function () {
        let index = (act.offsetTop - 13) / 50;
        inputSvg.removeChild(inputSvg.children[index]);
        paskma.removeChild(paskma.children[index]);
        let i = index;
        for (; i < paskma.children.length; i++) {
            paskma.children[i].innerHTML = parseInt(paskma.children[i].innerHTML, 10) - 1;
            svgs[i] = svgs[i + 1];
        }
        svgs.length--;
        console.log(svgs);
        // act.style.display = 'none';
        if (paskma.children.length == 0) {
            inputSvg.querySelector('span').innerHTML = '点击加页开始制作吧~';
        }
    })
    //点击复制事件复制整个svg
    copy.addEventListener('click', function () {
        let index = (act.offsetTop - 13) / 50;
        let svg1 = creatSvgTap('svg', { 'xmlns': svgNS, 'width': svgs[index].getAttribute('width'), 'height': svgs[index].getAttribute('height') });
        let g = creatSvgTap('g', { 'id': 'all' });
        if (svgs[index].querySelector('#all').innerHTML != null) {
            g.innerHTML = svgs[index].querySelector('#all').innerHTML;
        }
        svg1.appendChild(g);
        let li1 = document.createElement('li');
        console.log(index);
        li1.innerHTML = index + 2;
        console.log(svgs);
        if (index + 1 < paskma.children.length) {
            inputSvg.insertBefore(svg1, inputSvg.children[index + 1]);
            paskma.insertBefore(li1, paskma.children[index + 1]);
        } else {
            inputSvg.insertBefore(svg1, inputSvg.children[inputSvg.children.length - 1]);
            paskma.appendChild(li1);
        }
        for (let i = svgs.length; i > index + 1; i--) {
            svgs[i] = svgs[i - 1];
            paskma.children[i].innerHTML = parseInt(paskma.children[i].innerHTML, 10) + 1;
        }
        svgs[index + 1] = svg1;
    })



    // 贴纸区
    //创建贴纸的
    let ties = document.querySelectorAll('.center ul:nth-of-type(2) li img');
    for (let i = 0; i < ties.length; i++) {
        bulitTie(ties[i]);
    }
    function bulitTie(tie) {
        tie.addEventListener('click', function () {
            let foreign = getforeignObject();
            let tiebox = document.createElement('div');
            tiebox.style.display = 'none';
            getbili(tie.src, tiebox);
            tiebox.className = "tieBox";
            let img = creatSvgTap('image', { 'width': '100%', 'height': '100%', 'class': 'tie' });
            img.href.baseVal = tie.src;
            let svg = creatSvgTap('svg', { 'width': '100%', 'height': '100%', 'xmlns': svgNS });
            foreign.appendChild(tiebox);
            tiebox.appendChild(svg);
            svg.appendChild(img);
            tiebox.innerHTML = "<span class='delect'></span><span class='Csize'></span><span class='rotate'></span>" + tiebox.innerHTML;
            removetie(tiebox.children[0])
            resize(tiebox, tiebox.children[1], false, false, true);
            resize(tiebox, tiebox.children[2], false, false, false);
            moveTie(tiebox);
            ditincttieBox();
            tiebox.style.border = '3px dashed #a981dd';
            tiebox.children[0].style.display = 'block';
            tiebox.children[1].style.display = 'block';
            tiebox.children[2].style.display = 'block';
        })
    }
    //获得真实图片大小的比例
    function getbili(src, tie) {
        var img = new Image();
        let w;
        let h;
        var bili;
        img.addEventListener('load', function () {
            w = parseInt(img.width);
            h = parseInt(img.height);
            bili = w / h;
            console.log(2);
            tie.setAttribute('bili', bili);
            tie.style = "width:100px; height:" + bili * 100 + "px; position:absolute; top:200px; left:150px; display : block;transform:rotate(0deg);";
        })
        img.src = src;
    }
    //移除贴纸
    function removetie(tie) {
        tie.addEventListener('click', function () {
            let father = tie.parentNode;
            father.parentNode.removeChild(father);
        })
    }
    //移动贴纸
    function moveTie(handle) {
        handle.onmousedown = function (e) {
            if (e.target.getAttribute('class') == 'tie' || e.target.className == 'textmove') {
                if (e.target.getAttribute('class') == 'tie') {
                    var gtieBox = e.target.parentNode.parentNode;
                } else {
                    var gtieBox = e.target.parentNode;
                }
                gtieBox.style.cursor = 'move';
                if (e.target.getAttribute('class') == 'tie') {
                    var X = e.pageX - this.getBoundingClientRect().left - document.documentElement.scrollLeft;
                    var Y = e.pageY - this.getBoundingClientRect().top - document.documentElement.scrollTop;
                } else {
                    var X = e.pageX - this.parentNode.getBoundingClientRect().left - document.documentElement.scrollLeft;
                    var Y = e.pageY - this.parentNode.getBoundingClientRect().top - document.documentElement.scrollTop;
                }
                document.onmousemove = function (e) {
                    let boxL = e.clientX - X - inputSvg.getBoundingClientRect().left;//要移动的距离
                    let boxT = e.clientY - Y - inputSvg.getBoundingClientRect().top;
                    if (boxL < 0) {//左边锁死
                        boxL = 0;
                    } else if (boxL + gtieBox.offsetWidth >= inputSvg.offsetWidth) {//右边锁死
                        boxL = inputSvg.offsetWidth - gtieBox.offsetWidth;
                    }
                    if (boxT < 0) {//上边
                        boxT = 0;
                    } else if (boxT + gtieBox.offsetHeight >= inputSvg.offsetHeight) {
                        boxT = inputSvg.offsetHeight - gtieBox.offsetHeight;
                    }
                    gtieBox.style.left = boxL + 'px';
                    gtieBox.style.top = boxT + 'px';
                };
                document.onmouseup = function () {
                    gtieBox.style.cursor = 'defalut';
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            }
        }
    }
    //改变大小 旋转
    //改变贴纸的大小函数
    //isLeft改变left值
    //istop改变top值
    //lockx改变宽度
    //lockY改变高度
    function resize(oParent, handle, lockX, lockY, size) {
        var oParentx;
        var oParenty;
        handle.onmousedown = function (event) {
            if (!!event.cancelBubble) {
                event.cancelBubble = true;
            } else if (!!event.stopPropagation) {
                event.stopPropagation();
            }
            if (size) {
                var event = event || window.event;
                if (oParent.className == 'tieBox') {
                    var disX = event.clientX;//鼠标的位置-左边的值
                } else {
                    var disX = event.clientX;//鼠标的位置-左边的值
                }
                var jiaodu = Math.abs(parseInt(oParent.style.transform.substring(7, oParent.style.transform.length)));
                var iParentLeft = oParent.offsetLeft;
                var iParentWidth = oParent.offsetWidth;
                document.body.style.cursor = 'move';
            } else {
                oParentx = oParent.getBoundingClientRect().left + document.documentElement.scrollLeft + oParent.getBoundingClientRect().width / 2;
                oParenty = oParent.getBoundingClientRect().top + document.documentElement.scrollTop + oParent.getBoundingClientRect().height / 2;
            }
            document.onmousemove = function (event) {
                var event = event || window.event;
                if (size) {
                    var iL = event.clientX - disX;//要变化的距离
                    //lockX代表不是就执行语句
                    if (oParent.className == 'tieBox') {
                        if (jiaodu > 135 && jiaodu < 315) {
                            var iW = iParentWidth - iL;
                        } else {
                            var iW = iParentWidth + iL;
                        }
                        let tieW = oParent.offsetWidth;
                        let tiebili = oParent.getAttribute('bili');
                        let tieH = tieW * tiebili;
                        var tieX = oParent.offsetLeft;
                        var tieY = oParent.offsetTop;
                        var iH = iW * tiebili;
                        if (iW > 20) {
                            if (tieX + tieW < inputSvgW && tieY + tieH < inputSvgH || iW < oParent.offsetWidth || iH < oParent.offsetHeight) {
                                lockX || (oParent.style.width = iW + "px");//是左右两边的就改变width
                                lockY || (oParent.style.height = iH + "px");
                            }
                        }
                    } else {
                        var iW = iParentWidth - iL;
                        if (iParentLeft + iL >= 0) {
                            oParent.style.left = iParentLeft + iL + "px";
                            oParent.style.width = iW + "px";
                        }
                    }
                } else {
                    let x = event.pageX - oParentx;
                    let y = event.pageY - oParenty;
                    if (oParent.className == 'tieBox')
                        oParent.style.transform = 'rotate(' + Math.round(Math.atan2(y, x) / Math.PI * 180 - 180) + 'deg)';
                    else
                        oParent.style.transform = 'rotate(' + Math.round(Math.atan2(y, x) / Math.PI * 180 - 90) + 'deg)';
                }
            }
            //鼠标抬起去除函数事件
            document.onmouseup = function () {
                document.body.style.cursor = 'default';
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    }


    /********************************图片区******************************** */
    const putupImg = document.querySelector('.putupImg input');
    const allRemove = document.querySelector('.allRemove');
    const putimg = document.querySelector('.shangchauntupian');
    //定义一个数组 把文件数组的值给新数组  对新数组进行操作  然后把新数组传递给后台
    var curFiles = [];
    // 文件选择监听事件
    loadFile(putupImg);
    function loadFile(img) {
        img.addEventListener('input', function () {
            // 文件读取对象读取文件
            for (let i = 0; i < this.files.length; i++) {
                const fileReader = new FileReader();
                const li = document.createElement('li');
                const img = document.createElement('img');
                const span = document.createElement('span');
                fileReader.readAsDataURL(this.files[i]);
                //在数组中追加每次文件
                curFiles.push(this.files[i]);
                // 在控制台打印出文件数组
                fileReader.onload = function () {
                    img.src = fileReader.result;
                    // 将role放入装照片的盒子里，然后在role之前插入新元素
                    putimg.insertBefore(li, putimg.children[2]);
                    li.appendChild(img);
                    li.appendChild(span);
                    removeImg(span);
                    bulitTie(img);
                };
            };
        })
    }
    removeallImg(allRemove);
    //全部删除功能
    function removeallImg(element) {
        element.addEventListener('click', function () {
            if (confirm("确定删除全部的图片？")) {
                let str = "<li class='putupImg'>上传图片<input type='file' multiple='multiple'></li><li class='allRemove'>全部删除</li>";
                putimg.innerHTML = str;
                removeallImg(putimg.querySelector('.allRemove'));
                loadFile(putimg.querySelector('input'));
                // curFiles = [];
            }
        })
    }
    //删除功能
    function removeImg(div) {
        div.addEventListener('click', function () {
            this.parentNode.parentNode.removeChild(this.parentNode);
        })
    }

    //删除文字
    function textdelect(div) {
        div.addEventListener('click', function () {
            div.parentNode.parentNode.removeChild(div.parentNode);
        })
    }
    //添加文字
    addText.addEventListener('click', function (e) {
        let div = document.createElement('div');
        div.className = 'textBox';
        div.style = "width:100px; height:auto; position:absolute; top:200px; left:150px;transform='rotate(0deg);'";
        div.innerHTML = ' <span class="textdelect"></span><span class="textCsize"></span><span class="textrotate"></span><span class="textmove"></span><p contenteditable="true" class="futext" style="width:100%; height=30px;"></p>';
        getforeignObject().appendChild(div);
        textdelect(div.children[0]);
        moveTie(div.children[3]);
        resize(div, div.children[1], false, false, true);
        resize(div, div.children[2], false, false, false);
        ditincttextBox();
        div.style.border = '3px dashed #a981dd';
        div.children[0].style.display = 'block';
        div.children[1].style.display = 'block';
        div.children[2].style.display = 'block';
        div.children[3].style.display = 'block';
    })

    //获得在哪个svg
    function getsvg() {
        for (let i = 0; i < paskma.children.length; i++) {
            if (paskma.children[i].className == 'click') {
                return i;
            }
        }
    }
    //获取在哪个foreignObject
    function getforeignObject() {
        return inputSvg.children[getsvg()].children[0].querySelector('foreignObject');
    }
    //获取在哪个textframe
    function gettextframe() {
        let texts = getforeignObject().querySelectorAll('.textBox');
        for (let i = 0; i < texts.length; i++) {
            if (texts[i].style.border != "none") {
                return texts[i];
            }
        }
    }

    //换字体
    let textlis = texts.querySelectorAll('li');
    for (let i = 0; i < textlis.length; i++) {
        textlis[i].addEventListener('click', function () {
            if (gettextframe() != null) {
                let element = gettextframe().children[4];
                element.style.fontFamily = this.style.fontFamily;
            }
        })
    }
    textcolor.addEventListener('input', function () {
        //selection.isCollapsed 返回值为boolean类型 如果false 文字有被选中  true 文字没有被选中
        if (gettextframe() != null) {
            let selection = window.getSelection();
            if (selection.isCollapsed == true) {
                gettextframe().children[4].style.color = textcolor.value;
            } else {
                // 取得选中的文本
                // let selectedText = selection.toString();
                // 取得表示选区的范围
                let range = selection.getRangeAt(0);
                // 高亮选中的文本
                let span = window.document.createElement("span");
                span.style.color = textcolor.value;
                range.surroundContents(span);
            }
        }
    })
    textsize.addEventListener('input', function () {
        if (gettextframe() != null) {
            gettextframe().children[4].style.fontSize = textsize.value + 'px';
        }
    })

    //建立svg里面的tag
    function creatSvgTap(tag, objAttr) {
        var tag = document.createElementNS(svgNS, tag);
        for (var i in objAttr) {
            tag.setAttribute(i, objAttr[i]);
        }
        return tag;
    }

    //图片转base64
    let arr = [];
    saveimg.addEventListener('click', function (flag) {
        ditincttieBox();
        ditincttextBox();
        if (flag == undefined) flag = true;
        const x = new XMLHttpRequest;
        let s = inputSvg.children[getsvg()];
        if (s.querySelector('.bg') != null) {
            console.log(s.querySelector(".bg").href.baseVal.length);
            let index;
            for (index = s.querySelector(".bg").href.baseVal.length - 1; index > 0; index--) {
                if (s.querySelector(".bg").href.baseVal[index] == 'T') {
                    break;
                }
            }
            console.log(s.querySelector(".bg").href.baseVal.substring(index, (s.querySelector(".bg").href.baseVal).length));
            arr[arr.length] = (s.querySelector(".bg").href.baseVal).substring(index, (s.querySelector(".bg").href.baseVal).length);
        }
        //发送背景图片的src
        for (let i = 0; i < s.querySelectorAll(".tieBox image").length; i++) {
            let img = s.querySelectorAll(".tieBox image")[i];
            let index;
            for (index = img.href.baseVal.length - 1; index > 0; index--) {
                if (img.href.baseVal[index] == 't') {
                    break;
                }
            }
            arr[arr.length] = (img.href.baseVal).substring(index, (img.href.baseVal).length);
        }
        x.open("get", url + "getBanse64Servlet?array=" + arr);
        x.send();
        x.onreadystatechange = function () {
            //判断
            //200+都可以
            if (x.readyState === 4 && x.status === 200) {
                let json = JSON.parse(x.responseText);
                //获取替换src
                s.querySelector(".bg").href.baseVal = "data:image/png;base64," + json.data[0];
                for (let i = 1; i < json.data.length; i++) {
                    let img = s.querySelectorAll(".tieBox image")[i - 1];
                    img.href.baseVal = "data:image/png;base64," + json.data[i];
                }
                console.log(flag);
                a(s, flag);//调用下载图片的函数
            }
        }
    })
    //svg转图片
    function a(s, flag) {
        // console.log(flag.isTrusted);
        var svg = s;
        var serializer = new XMLSerializer();
        var toExport = svg.cloneNode(true);
        var bb = svg.getBBox();
        toExport.setAttribute('viewBox', (bb.x - 20) + ' ' + (bb.y - 20) + ' ' + (bb.width + 40) + ' ' + (bb.height + 40));
        toExport.setAttribute('width', bb.width);
        toExport.setAttribute('height', bb.height);
        var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(toExport);
        var image = new Image;
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        if (flag.isTrusted == false) {
            baocunTecho.src = image.src;
            formInput.value = image.src;
        }
        // var imgFile = dataURLtoFile("data:image/jpg;base64,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");
        var canvas = document.createElement("canvas");
        canvas.width = bb.width;
        canvas.height = bb.height;
        var context = canvas.getContext("2d");
        context.fillStyle = '#fff';
        context.fillRect(0, 0, bb.width, bb.height);
        if (flag.isTrusted == true) {
            image.onload = function () {
                context.drawImage(image, 0, 0)
                var a = document.createElement("a")
                a.download = "tabulaRasa.png";
                a.href = canvas.toDataURL("image/png");
                a.click();
            }
        }
        s.querySelector(".bg").href.baseVal = arr[0];
        for (let i = 1; i < arr.length; i++) {
            let img = s.querySelectorAll(".tieBox image")[i - 1];
            img.href.baseVal = arr[i];
        }
        arr = [];
    }
    const pushTop_sure = document.querySelector('.pushTop-sure');

    //发布
    fabu.addEventListener('click', function () {
        send_frame.style.display = 'block';
        saveimg.click(false);
        // send_text.value//文字内容

    })

    const form=document.querySelector("#sendform");
    pushTop_sure.addEventListener('click', function () {
        var formdata = new FormData(form);
        // var imgFile = base64ToBlob(baocunTecho.src, "image/png");
        // formdata.append("content", send_text.value);
        // formdata.set("file",)
        // formdata.append("file", imgFile);
        console.log(formdata.get("file"));
        formdata.append("content", send_text.value);
        formdata.append("at", "");
        var fabu = new XMLHttpRequest();
        fabu.open("post", "sendDynamicServlet");
        fabu.send(formdata);
        fabu.onload = function () {
            alert("发布成功");
        }
    })


    function base64ToBlob(urlData, type) {
        console.log(urlData);
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1] || type;
        // 去掉url的头，并转化为byte
        console.log(arr[1]);
        let bytes = decodeURIComponent(escape(window.atob((arr[1]))));
        // 处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {
            type: mime
        });
    }


    const Baocuntip = document.querySelector('.tips');
    //保存与后台的连接
    save.addEventListener('click', function () {
        const saveImg = new XMLHttpRequest;
        //创建对象
        saveImg.open("post", url + "saveSvgsServlet", true);
        saveImg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let index = getsvg();
        var z = inputSvg.children[index].querySelector('#all').innerHTML;
        console.log(z);
        z = encodeURI(z);
        console.log(z);
        saveImg.send("svgs=" + z + "&i=" + index + "&p=" + p[index]);
        saveImg.onreadystatechange = function () {
            //判断
            //200+都可以
            if (saveImg.readyState === 4 && saveImg.status === 200) {
                console.log(saveImg.responseText);
                Baocuntip.style.opacity = 1;
                setTimeout(function () {
                    Baocuntip.style.opacity = 0;
                }, 2000);
            }
        }
    })
    //转义
    function zhuanyi(html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText或者textContent
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    }
    //反转义
    function fanzhuanyi(text) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //3.最后返回这个元素的innerText或者textContent，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
    //获取svg
    const saveImg = new XMLHttpRequest;
    //创建对象
    saveImg.open("get", url + "getSvgsServlet", true);
    saveImg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    saveImg.send();
    //保存操作
    saveImg.onreadystatechange = function () {
        //判断
        //200+都可以
        if (saveImg.readyState === 4 && saveImg.status === 200) {
            let json = JSON.parse(saveImg.responseText);
            inputSvg.removeChild(inputSvg.children[0]);
            paskma.removeChild(paskma.children[0]);
            svgs = [];
            p = [];
            for (let i = 0; i < json.data.length; i++) {
                console.log("i=" + i)

                console.log(json.data);
                // let json1 = JSON.parse(json.data);
                // var svgrequest = new XMLHttpRequest;
                // svgrequest.open("post", url + json.data[i].svg);
                // console.log(url + json.data[i].svg)
                // svgrequest.send();
                // svgrequest.onreadystatechange = function () {
                //     if(svgrequest.readyState===4&&svgrequest.status===200){
                //         console.log(i);
                //         let svgCode = "";
                //         svgCode = svgrequest.responseText;
                //         // svgCode=svgCode.substring(16);
                //         console.log(svgCode);
                        let svg = creatSvgTap('svg', { 'xmlns': svgNS, 'width': inputSvgW, 'height': inputSvgH });
                        let g = creatSvgTap('g', { 'id': 'all' });
                        let li = document.createElement('li');
                        li.innerHTML = paskma.children.length + 1;
                        svg.setAttribute('style', "display:none");
                        if (paskma.children.length == 0) {
                            li.className = 'click';
                            svg.setAttribute('style', "display:block");
                        }
                        p[p.length] = json.data[i].topic;//标题
                        svgs[svgs.length] = svg;
                        paskma.appendChild(li);
                        g.innerHTML = json.data[i].svg;
                        inputSvg.insertBefore(svg, inputSvg.children[inputSvg.children.length - 1]);
                        svg.appendChild(g);
                        // for (let i = 1; i < svgs.length; i++) {
                        //     svgs[i].setAttribute('style', "display:none");
                        // }
                        //绑定事件
                        //贴纸
                        let tiebox = svg.querySelector('.tieBox');
                        if (tiebox != null) {
                            removetie(tiebox.children[0])
                            resize(tiebox, tiebox.children[1], false, false, true);
                            resize(tiebox, tiebox.children[2], false, false, false);
                            moveTie(tiebox);
                        }
                        //文字
                        let div = svg.querySelector('.textBox');
                        if (div != null) {
                            textdelect(div.children[0]);
                            moveTie(div.children[3]);
                            resize(div, div.children[1], false, false, true);
                            resize(div, div.children[2], false, false, false);
                        }



                }
            titleBox.value=p[0];
            console.log(p)

        }
        ditincttieBox();
        ditincttextBox();
    }

    function ditincttieBox() {
        let alltie = document.querySelectorAll('.tieBox');
        let allclose = document.querySelectorAll('.delect');
        let allrotate = document.querySelectorAll('.rotate');
        let allCsize = document.querySelectorAll('.Csize');
        for (let i = 0; i < alltie.length; i++) {
            alltie[i].style.border = 'none';
            allclose[i].style.display = 'none';
            allrotate[i].style.display = 'none';
            allCsize[i].style.display = 'none';
        }
    }

    function ditincttextBox() {
        let alltext = document.querySelectorAll('.textBox');
        let allclose = document.querySelectorAll('.textdelect');
        let allrotate = document.querySelectorAll('.textrotate');
        let allCsize = document.querySelectorAll('.textCsize');
        let allMove = document.querySelectorAll('.textmove');
        for (let i = 0; i < alltext.length; i++) {
            alltext[i].style.border = 'none';
            allclose[i].style.display = 'none';
            allrotate[i].style.display = 'none';
            allCsize[i].style.display = 'none';
            allMove[i].style.display = 'none';
        }
    }
    //发布


    //点击其他地方关闭矩形框
    buttom.addEventListener('mousedown', function (e) {
        if (e.target.className != 'tieBox'
            && e.target.className != 'delect'
            && e.target.className != 'Csize'
            && e.target.className != 'rotate' && e.target.getAttribute('class') != 'tie') {
            ditincttieBox();
        } else if (e.target.getAttribute('class') == 'tie') {
            ditincttieBox();
            e.target.parentNode.parentNode.style.border = '3px dashed #a981dd';
            e.target.parentNode.parentNode.children[0].style.display = 'block';
            e.target.parentNode.parentNode.children[1].style.display = 'block';
            e.target.parentNode.parentNode.children[2].style.display = 'block';
        }
        if (e.target.className != 'textBox'
            && e.target.className != 'textdelect'
            && e.target.className != 'textCsize'
            && e.target.className != 'textrotate' && e.target.className != 'textmove' && e.target.className != 'futext') {
            ditincttextBox();
        } else if (e.target.className == 'futext') {
            ditincttextBox()
            e.target.parentNode.style.border = '3px dashed #a981dd';
            e.target.parentNode.children[0].style.display = 'block';
            e.target.parentNode.children[1].style.display = 'block';
            e.target.parentNode.children[2].style.display = 'block';
            e.target.parentNode.children[3].style.display = 'block';
        }
    })
})
