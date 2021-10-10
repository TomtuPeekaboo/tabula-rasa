window.addEventListener('load', function () {
    const bookLeftButton = document.querySelector('.book .left');
    const bookRightButton = document.querySelector('.book .right');
    const book = document.querySelector('.book');
    // const page = document.querySelector('.page');
    const maskleft = document.querySelector('.mask-left');
    const maskright = document.querySelector('.mask-right');
    let titlearr = [];
    const menu = document.querySelector('.menu');
    const content = document.querySelector('.menuB');
    const pagenum = document.querySelector('.pageB');
    const contents = document.querySelectorAll('.menuB li');
    // const touxiang=document.querySelector("#touxiang");
    // let url = "http://192.168.0.161:8080/rasaProject/";
    const guanlibutton = document.querySelector('.guanlibutton');
    const guanli = document.querySelector('.guanli');
    const fengmainBox = document.querySelector('.guanli ul');
    const changeTitleSpan = document.querySelector('.changeTitle span');
    const baocunImg=document.querySelector('.page1 .before-header');
    const bookTile=document.querySelector('.page1 h1');
    let url = "";
    let svgNS = "http://www.w3.org/2000/svg";
    let pages = [];
    let s=new XMLHttpRequest();
    s.open("post","getSvgManageServlet");
    s.send();
    s.onload=function(){
        var json=JSON.parse(s.responseText);
        console.log(s.responseText);
        baocunImg.style.backgroundImage='url('+json.data.img+")";
        bookTile.innerHTML=json.data.title;
    }
    function sendBookStyle(){
        let s=new XMLHttpRequest();
        s.open("post","saveSvgManageServlet?title="+bookTile.innerHTML+'&img='+baocunImg.style.backgroundImage.split('(')[1].split(')')[0]);
        s.send();
        s.onload=function(){
            console.log(s.responseText);
        }
    }
    guanlibutton.addEventListener('click', function () {
        if (menu.offsetWidth != 400) {
            // let pages=document.querySelectorAll('.page-con');
            bookLeftButton.style.opacity = 0;
            for(let i=0;i<pages.length;i++){
                pages[i].style.transform = 'perspective(1000px) rotateY(0deg)';
            }
            const menuTitle = document.querySelectorAll('.menuTitle');
            for (let i = 0; i < menuTitle.length; i++) {
                menuTitle[i].style.display = 'block';
            }
            book.style.transform = 'translateX(0px)';
            menu.style.width = '400px';
            for (let index = 0; index < pages.length; index++) {
                pages[index].style.zIndex = pages.length - index;
            }
            maskleft.style.display = 'none';
            maskright.style.display = 'none';

        }
        menu.style.top = 720 + 'px';
        guanli.style.top = 35 + 'px';
    })
    changeTitleSpan.addEventListener('click', function () {
        menu.style.top = 0 + 'px';
        guanli.style.top = -605 + 'px';
    })
    book.addEventListener('click', function () {
        this.style.transform = 'translateX(100px)';
        // menu.style.transform = 'translateX(-100px)';
        // menuTitle.style.display = 'none';
        // page.style.display = 'none';
        const menuTitle = document.querySelectorAll('.menuTitle');
        for (let i = 0; i < menuTitle.length; i++) {
            menuTitle[i].style.display = 'none';
        }
        menu.style.width = '170px';
        menu.style.top = 0 + 'px';
        guanli.style.top = -605 + 'px';
        pages = document.querySelectorAll('.book>div .page-con');
        pages[0].style.transform = 'perspective(1000px) rotateY(-180deg)';
        maskleft.style.display = 'block';
        maskright.style.display = 'block';
    })
    document.addEventListener('mousemove', function (e) {
        if (e.target == bookRightButton || e.target == maskright) {
            bookRightButton.style.opacity = 1;
        } else {
            bookRightButton.style.opacity = 0;
        }
        if (e.target == bookLeftButton || e.target == maskleft) {
            bookLeftButton.style.opacity = 1;
        } else {
            bookLeftButton.style.opacity = 0;
        }
    })
    bookRightButton.addEventListener('click', right);
    function right(e) {
        if (e != undefined && !!e.cancelBubble) {
            e.cancelBubble = true;
        } else if (e != undefined && !!e.stopPropagation) {
            e.stopPropagation();
        }
        let i;
        for (i = 0; i < pages.length; i++) {
            if (pages[i].style.transform != 'perspective(1000px) rotateY(-180deg)') {
                break;
            }
        }
        if (i == 0) {
            book.style.transform = 'translateX(100px)';
            const menuTitle = document.querySelectorAll('.menuTitle');
            for (let i = 0; i < menuTitle.length; i++) {
                menuTitle[i].style.display = 'none';
            }
            menu.style.width = '170px';
            pages = document.querySelectorAll('.book>div .page-con');
            pages[0].style.transform = 'perspective(1000px) rotateY(-180deg)';
            maskleft.style.display = 'block';
            maskright.style.display = 'block';
        }
        if (i < pages.length - 1) {
            pages = document.querySelectorAll('.book>div .page-con');
            pages[i].style.transform = 'perspective(1000px) rotateY(-180deg)';
            pages[i].style.zIndex = pages.length;
            pages[i + 1].style.zIndex = pages.length;
            let j;
            for (j = 0; j < i; j++) {
                pages[j].style.zIndex = j;
            }
            for (j = j + 2; j < pages.length; j++) {
                pages[j].style.zIndex = pages.length - j;
            }
        }
    }
    bookLeftButton.addEventListener('click', left);
    function left(e) {
        pages = document.querySelectorAll('.book>div .page-con');
        if (e != undefined && !!e.cancelBubble) {
            e.cancelBubble = true;
        } else if (e != undefined && !!e.stopPropagation) {
            e.stopPropagation();
        }
        let i;
        for (i = 0; i < pages.length; i++) {
            if (pages[i].style.transform != 'perspective(1000px) rotateY(-180deg)') {
                break;
            }
        }
        if (i - 1 == 0) {
            bookLeftButton.style.opacity = 0;
            pages[i - 1].style.transform = 'perspective(1000px) rotateY(0deg)';
            const menuTitle = document.querySelectorAll('.menuTitle');
            for (let i = 0; i < menuTitle.length; i++) {
                menuTitle[i].style.display = 'block';
            }
            book.style.transform = 'translateX(0px)';
            menu.style.width = '400px';
            for (let index = 0; index < pages.length; index++) {
                pages[index].style.zIndex = pages.length - index;
            }
            maskleft.style.display = 'none';
            maskright.style.display = 'none';
        } else {
            pages[i - 1].style.transform = 'perspective(1000px) rotateY(0deg)';
            pages[i - 1].style.zIndex = pages.length;
            pages[i - 2].style.zIndex = pages.length;
            let j;
            for (j = 0; j < i - 2; j++) {
                pages[j].style.zIndex = j;
            }
            for (j = j + 2; j < pages.length; j++) {
                pages[j].style.zIndex = pages.length - j;
            }
        }
    }
    //建立svg里面的tag
    function creatSvgTap(tag, objAttr) {
        var tag = document.createElementNS(svgNS, tag);
        for (var i in objAttr) {
            tag.setAttribute(i, objAttr[i]);
        }
        return tag;
    }
    //点击翻页功能
    function changepages() {
        let index = Math.floor((parseInt((this.querySelector('.out').innerHTML).substring(1, 2)) - 1) / 2);
        let i = 0;
        pages = document.querySelectorAll('.book>div .page-con');
        for (i = 0; i < pages.length; i++) {
            if (pages[i].style.transform != 'perspective(1000px) rotateY(-180deg)') {
                break;
            }
        }
        let num = Math.abs(index - i + 1);//次数
        while (i - 1 > index && num > 0) {
            left();
            num--;
        }
        while (i - 1 < index && num > 0) {
            right();
            num--;
        }
    }
    for (let i = 0; i < contents.length; i++) {
        contents[i].addEventListener('click', changepages);
    }

    //获取svg
    const saveImg = new XMLHttpRequest;
    //创建对象
    saveImg.open("get", url + "getSvgsServlet", true);
    saveImg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    saveImg.send();

    saveImg.onreadystatechange = function () {
        //判断
        //200+都可以
        if (saveImg.readyState === 4 && saveImg.status === 200) {
            let json = JSON.parse(saveImg.responseText);
            let i;
            for (i = 0; i < json.data.length;i++) {
                console.log(i)
                // var svgrequest = new XMLHttpRequest;
                // svgrequest.open("post", url+"/rasaProject" +json.data[i].svg);
                // svgrequest.send();
                // svgrequest.onreadystatechange = function () {
                //     if (this.readyState === 4) {
                //         alert(i)
                //         svgCode = svgrequest.responseText;
                //         alert(svgCode)
                        let svg = creatSvgTap('svg', {
                            'xmlns': svgNS,
                            'width': book.offsetWidth,
                            'height': book.offsetHeight,
                            'style': "border-radius: 8px 20px 20px 8px;"
                        });
                        let g = creatSvgTap('g', {'id': 'all'});
                        g.innerHTML =json.data[i].svg;
                        svg.appendChild(g);
                        if (i == 0) {
                            let element = book.children[0].querySelector('.after');
                            element.appendChild(svg);
                        } else if (i == 1) {
                            book.children[1].querySelector('.before').appendChild(svg);
                        } else {
                            let li = document.createElement('div');
                            li.className = 'page2';
                            li.innerHTML = "<div class='page-con'><div class='before'></div><div class='after'></div></div>";
                            book.insertBefore(li, book.children[book.children.length - 4]);
                            if (i % 2 != 0) {
                                book.children[Math.round(i / 2)].querySelector('.before').appendChild(svg);
                            } else {
                                book.children[i / 2].querySelector('.after').appendChild(svg);
                            }
                        }


                        //创建目录
                        let li=document.createElement('li');
                        // li.innerHTML="<div class='out'></div><div class='right'><div class='menuImg'></div><div class='menuTitle'><p class='Ttop'></p><p class='Tbottom'></p></div></div>";
                        // let li = "<li><div class='out'></div><div class='right'><div class='menuImg'></div><div class='menuTitle'><p class='Ttop'></p><p class='Tbottom'></p></div></div></li>";
                        let out=document.createElement('div');
                        out.className='out';
                        li.appendChild(out);
                        let right=document.createElement('div');
                        right.className='right';
                        li.appendChild(right);
                        let menuImg=document.createElement('menuImg');
                        menuImg.className='menuImg';
                        right.appendChild(menuImg);
                        let menuTitle=document.createElement('div');
                        menuTitle.className='menuTitle';
                        right.appendChild(menuTitle);
                        let Ttop=document.createElement('p');
                        Ttop.className='Ttop';
                        menuTitle.appendChild(Ttop);
                        let Tbottom=document.createElement('p');
                        Tbottom.className='Tbottom';
                        menuTitle.appendChild(Tbottom);
                        content.appendChild(li);
                        // content.innerHTML = content.innerHTML + li;

                        let copysvg = creatSvgTap('svg', {
                            'xmlns': svgNS,
                            'width': book.offsetWidth,
                            'height': book.offsetHeight
                        });
                        let g1 = creatSvgTap('g', {'id': 'all'});

                        g1.innerHTML = json.data[i].svg;
                        copysvg.appendChild(g1);
                        //图片
                        // alert(content.children.length - 1);
                        menuImg.appendChild(copysvg);
                        menuImg.querySelector('.bg').setAttribute('width', '55px');
                        //内容
                        // let neirong = '';
                        // if (svg.querySelectorAll('p')[0] != undefined) {
                        //     if (svg.querySelectorAll('p')[0].innerHTML.length < 8) {
                        //         neirong = svg.querySelectorAll('p')[0].innerHTML;
                        //     } else {
                        //         neirong = (svg.querySelectorAll('p')[0].innerHTML).substring(0, 8);
                        //     }
                        // }
                        var top = json.data[i].topic;
                        if ("undefined" == top) {
                            top = "无标题";
                        }
                        Ttop.innerHTML = top;
                        //时间
                        Tbottom.innerHTML = (json.data[i].time).substring(0, 10);
                        //第几页
                        out.innerHTML = '0' + (i + 1);
                        li.addEventListener('click', changepages);
                        titlearr[titlearr.length] = menuTitle;

                        pages = document.querySelectorAll('.book>div .page-con');


            }
            pagenum.innerHTML = "共" + i + "篇";
            for (i = 0; i < pages.length; i++) {
                pages[i].style.zIndex = pages.length - i;
            }

            for (i = 0; i < content.children.length; i++) {
                content.children[i].addEventListener('click', function () {
                    let index = Math.floor((parseInt((this.querySelector('.out').innerHTML).substring(1, 2)) - 1) / 2);
                    let i = 0;
                    pages = document.querySelectorAll('.book>div .page-con');
                    for (i = 0; i < pages.length; i++) {
                        if (pages[i].style.transform != 'perspective(1000px) rotateY(-180deg)') {
                            break;
                        }
                    }
                    let num = Math.abs(index - i + 1);//次数
                    while (i - 1 > index && num > 0) {
                        left();
                        num--;
                    }
                    while (i - 1 < index && num > 0) {
                        right();
                        num--;
                    }
                })
            }
        }
    }



    /*****************************换标题*************************** */
    const addImg = document.querySelector('.guanli ul li:nth-child(1) input');
    const changeTitle = document.querySelector('.changeTitle input');
    const changeButton = document.querySelector('.changeTitle button');
    const imgs = document.querySelectorAll('.guanli ul li');
    const fengmian = document.querySelector('.book>div .page-con:first-of-type .before-header');
    const h1 = document.querySelector('.before-buttom h1');
    for (let i = 1; i < imgs.length; i++) {
        imgclick(imgs[i]);
    }
    function imgclick(li) {
        li.addEventListener('click', function () {
            fengmian.style.backgroundImage = this.style.backgroundImage;
            sendBookStyle();
        })
    }
    changeButton.addEventListener('click', function () {
        h1.innerHTML = changeTitle.value;
        sendBookStyle();
    })

    var curFiles = [];
    addImg.addEventListener('change', function () {
        for (let i = 0; i < this.files.length; i++) {
            const fileReader = new FileReader();
            const li = document.createElement('li');
            // const img = document.createElement('img');
            const span = document.createElement('span');
            fileReader.readAsDataURL(this.files[i]);
            //在数组中追加每次文件
            curFiles.push(this.files[i]);
            // 在控制台打印出文件数组
            // console.log(curFiles);
            fileReader.onload = function () {
                li.style.backgroundImage = "url(" + fileReader.result + ")";
                // 将role放入装照片的盒子里，然后在role之前插入新元素
                fengmainBox.insertBefore(li, fengmainBox.children[1]);
                // li.appendChild(img);
                li.appendChild(span);
                removeImg(span);
                imgclick(li);
            };
        };
    })
    //删除功能
    function removeImg(div) {
        div.addEventListener('click', function () {
            this.parentNode.parentNode.removeChild(this.parentNode);
        })
    }



})