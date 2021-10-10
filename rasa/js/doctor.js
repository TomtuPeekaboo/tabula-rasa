import { getConnection, getAuthor } from './function.js'

window.onload = function () {
    // const address = 'http://175.178.7.180:8080/rasaProject/';
    // const address = 'http://localhost:8080/rasaProject_war_exploded/'  //707生产环境
    const address="";
    let chatList = document.querySelectorAll('.chatList li');
    let suffererName = document.querySelectorAll('.chatList li .aurName');
    let other = document.querySelector('.other');
    for (let i = 0; i < chatList.length; i++) {
        chatList[i].addEventListener('click', () => {
            other.innerHTML = suffererName[i].innerHTML;
        });
    }
    //发表情区域
    let faceBtn = document.querySelector('.icon').children[0];
    let faceBoard = document.querySelector('.facePrint');
    function Click(obj, tar) {
        obj.addEventListener('click', (e) => {
            if (tar.style.display == 'none') {
                tar.style.display = 'block';
            } else {
                tar.style.display = 'none';
            }
            e.stopPropagation();
        });
    }
    Click(faceBtn, faceBoard);

    const facePrintUl = document.querySelector('.facePrint ul');
    function creatLi1(num) {
        let lis = [];
        for (let i = 1; i <= num; i++) {
            lis[i] = '<li><img src="./img/emoji/' + i +
                '.gif" alt=""></li>';
        }
        return lis.join(''); //数组转化为字符串 
    }
    facePrintUl.innerHTML = creatLi1(149);
    // 在文本框输入文字跟表情
    // 表情包所在img标签
    const faceimgs = document.querySelectorAll('.facePrint ul li img');
    const fuwenben = document.querySelector('.fuWenBen');
    //聊天内容框 插入文本或者其他元素后，移动置光标到最新处
    function insertHtmlAtCaret(childElement) {
        var sel, range;
        // 判断是否有光标
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();//返回一个Selection对象，表示用户选择的文本范围或光标的当前位置
            if (sel.getRangeAt && sel.rangeCount) {
                // 获取光标起始位置
                range = sel.getRangeAt(0);
                //移除来自 Document的Range 内容。
                range.deleteContents();
                // 创建一个div
                var el = document.createElement("div");
                // 把目标值写入div
                el.appendChild(childElement);
                // -----------------------不会！！！不理解！！！！flag怎么同时声明三个 
                //创建了一虚拟的节点对象
                var frag = document.createDocumentFragment(),
                    node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }

                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9 兼容性问题
            document.selection.createRange().pasteHTML(html);
        }
    };
    // 实现表情添加
    for (let i = 0; i < faceimgs.length; i++) {
        faceimgs[i].addEventListener('click', () => {
            // 判断光标是否在富文本框里面
            if (document.activeElement !== fuwenben) {
                // 如果不是就在富文本框中加上光标
                fuwenben.focus();
            }
            // 克隆被点击的表情的img
            let cloneimg = faceimgs[i].cloneNode(true);
            insertHtmlAtCaret(cloneimg);
        });
    };

    // 上传相册
    let photoBtn = document.querySelector('.icon .icon-charutupian');
    let spare = document.querySelector('.spare');
    // 创建图片预览img元素
    const file = document.querySelector('#file');
    //定义一个数组 把文件数组的值给新数组  对新数组进行操作  然后把新数组传递给后台
    var curFiles = [];
    // 文件选择监听事件
    file.onchange = function () {
        spare.innerHTML = "";
        // 文件读取对象读取文件
        for (let i = 0; i < this.files.length; i++) {
            const fileReader = new FileReader();
            const img = document.createElement('img');
            img.className = 'picture';
            fileReader.readAsDataURL(this.files[i]);
            //在数组中追加每次文件
            curFiles.push(this.files[i]);
            // 在控制台打印出文件数组
            fileReader.onload = function () {
                img.src = fileReader.result;
                img.setAttribute('index', i);
                console.log(img);
                // 将role放入装照片的盒子里，然后在role之前插入新元素
                spare.appendChild(img);
            };
        };
    }
    let form = document.querySelector('#form');
    let textAreaContent = document.querySelector('#content');
    fuwenben.addEventListener('DOMSubtreeModified', () => {
        textAreaContent.value = fuwenben.innerHTML;//同步
    });

    //发送
    const sendBtn = document.querySelector('.button');
    let show = document.querySelector('.show');
    show.scrollTop = show.scrollHeight;//show滚动条一直在最下边
    //

    var heid = 3;
    var websocket = null;
    websocket = getConnection(4);
    websocket.onopen = function () {
        // setMessageInnerHTML("WebSocket连接成功");
        setHeMessageInnerHtml("老师好久不见")
    }
    websocket.onmessage = function (event) {
        let message = JSON.parse(event.data);
        if (message.type == "meg") {
            setHeMessageInnerHtml(message.message);
        } else if (message.type == "file") {
            setHeImgInnerHtml(message.message);
        }

    }
    websocket.onclose = function () {
        // setMessageInnerHTML("WebSocket连接断开");
    }


    sendBtn.addEventListener('click', () => {
        //将获得的表单元素作为参数，对formData初始化
        var formdata = new FormData(form);
        // 通过get获取文本框跟照片文件的value值
        // let s=formdata.get("content");
        // formdata.set("message",s);
        // formdata.delete("content");
        console.log(formdata.get("file"));
        console.log(formdata.get("message"))
        // 前端加上语言
        if (formdata.get("message") != null) {
            setMessageInnerHTML(formdata.get("message"))
            sendMsg(formdata.get("message"))
        }
        else if (formdata.get("file") != null) {
            let spareChildren = spare.children;
            for (let i = 0; i < spareChildren.length; i++) {
                setFileInnerHTML(spareChildren[i].outerHTML);
            }
            spare.innerHTML = '<div class="fuWenBen" contenteditable="true"></div><textarea name = "message" id = "content" style = "display: none;" ></textarea>';
        }
        // 图片点击放大处理
        const chatImg = show.querySelectorAll('.Say img.picture');//show里面所有的img
        for (let m = 0; m < chatImg.length; m++) {
            chatImg[m].addEventListener('click', () => {
                modal.classList.add("model-shown");
                modalImg.src = chatImg[m].src;
                captionText.innerHTML = chatImg[m].alt;
                console.log(chatImg[m]);
                let degnum = 0;
                let img = document.querySelector('#image-cover-image');
                img.style.transform = 'rotate(0deg)';
                rRotateBtn.addEventListener('click', () => {
                    degnum++;
                    let Deg = (degnum * 90) % 360;
                    img.style.transform = 'rotate(' + Deg + 'deg)';
                });
            });
        }
    });


    function setMessageInnerHTML(message) {

        let mySay1 = '<div class="my clearfix"><div class="Photo"><img src="getUserHeadServlet?userid=4&count=0" alt=""></div><div class="Say">' + message + '</div></div >';
        show.innerHTML = show.innerHTML + mySay1;
        show.scrollTop = show.scrollHeight;//show滚动条一直在最下边
        fuwenben.innerHTML = '';//清空富文本内容
    }

    function setFileInnerHTML(file) {
        let mySay2 = '<div class="my clearfix"><div class="Photo"><img src="getUserHeadServlet?userid=4&count=0 "alt=""></div><div class="Say">' + file + '</div></div >';
        show.innerHTML = show.innerHTML + mySay2;
        show.scrollTop = show.scrollHeight;//show滚动条一直在最下边
    }
    function setHeMessageInnerHtml(message) {
        let say = ' <div class="he"><div class="Photo"><img src="getUserHeadServlet?userid=3&count=0" alt=""></div><div class="Say">' + message + '</div></div>'
        show.innerHTML = show.innerHTML + say;
        show.scrollTop = show.scrollHeight;
    }
    function setHeImgInnerHtml(message) {
        let say = ' <div class="he" xmlns="http://www.w3.org/1999/html"><div class="Photo"><img src="getUserHeadServlet?userid=3&count=0" alt=""></div><div class="Say">' + '<img src="getDynamicImgServlet?' + message + '&count=0&type=img' + '"</img></div></div>'
        show.innerHTML = show.innerHTML + say;
        show.scrollTop = show.scrollHeight;
    }

    function sendMsg(message) {
        var msg = message;
        var toUid = 3;
        if (websocket == null) {
            alert("请先建立连接");
            return;
        }
        if (toUid == null || msg == '') {
            alert("接收人不能为空");
            return;
        }
        var json = {};
        json.uid = 4;
        json.toId = toUid;
        json.message = msg;
        json.type = "meg"
        var obj = JSON.stringify(json);
        websocket.send(obj);
    }

    function sendFile(message) {
        var msg = message;
        var toUid = 3;
        if (websocket == null) {
            alert("请先建立连接");
            return;
        }
        if (toUid == null || msg == '') {
            alert("接收人不能为空");
            return;
        }
        var json = {};
        json.uid = 4;
        json.toId = toUid;
        json.message = msg;
        json.type = "file"
        var obj = JSON.stringify(json);
        websocket.send(obj);
    }


    // 创建li函数
    function creatLi(num) {
        let lis = [];
        for (let i = 1; i <= num; i++) {
            lis[i] = ' <li><div class="aurPhoto"><img src="" alt=""></div><div class="chatContent"><p class="aurName">Tomtu</p><p class="chatSay">老师好久不见</p></div><div class="time">11-18</div></li>';
        }
        return lis.join(''); //数组转化为字符串 
    }
    document.body.addEventListener('click', () => {
        if (faceBoard.style.display == 'block') {
            faceBoard.style.display = 'none';
        }
    });

    //获取 img遮罩相关节点
    var modal = document.getElementById('image-cover-modal');
    var modalImg = document.getElementById("image-cover-image");
    var captionText = document.getElementById("image-cover-caption");
    var span = document.getElementsByClassName("image-cover-close")[0];
    var returnBtn = document.querySelector('#return');
    var load = document.querySelector('#load a');
    var rRotateBtn = document.querySelector('#rightRotate');
    //关掉遮罩
    returnBtn.onclick = function () {
        modal.classList.remove("model-shown");
    }
    // 个人信息
    let tdphone = document.querySelector('.tdphone');
    let tdname = document.querySelector('.tdname');
    let tdtype = document.querySelector('.tdtype');
    let PersonName = document.querySelector('.PersonName');
    let headPhoto = document.querySelector('.headPhoto img');
    let aurtherName = document.querySelector('.chatContent .aurName');
    let aurPhoto = document.querySelector('.chatList div.aurPhoto img');
    let headChatother = document.querySelector('.headChat .other');

    getAuthor(3).then(res => {//获取用户id包含的所有信息
        let idThree = res.data;
        console.log(idThree);
        tdphone.innerHTML = idThree.phone;
        tdname.innerHTML = idThree.username;
        tdtype.innerHTML = idThree.type;
        PersonName.innerHTML = idThree.username;
        headChatother.innerHTML = idThree.username;
        aurtherName.innerHTML = idThree.username;
        aurtherName.setAttribute('title', idThree.username);
        tdname.setAttribute('title', idThree.username);
        PersonName.setAttribute('title', idThree.username);
        headPhoto.src = address + 'getUserHeadServlet?userid=3&count=0';
        aurPhoto.src = address + 'getUserHeadServlet?userid=3&count=0';
    });






};