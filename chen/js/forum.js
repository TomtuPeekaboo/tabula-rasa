import { forumFirst, getAuthor, getSearchKey, gethotTalk, getFindResult, getFansServlet, getComment, getPhoto, saveComment, getAdmin, saveFollow, saveFabulou } from './function.js'

window.onload = function () {
    //服务器连接地址前缀
    // var address = 'http://192.168.0.161:8080/rasaProject/';
    var address = '';
    // var address = 'http://172.20.10.2:8080/rasaProject';//队长热点

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

    const ringp = document.querySelector('.ring p');
    const ringC = document.querySelector('.ringContent');
    const personp = document.querySelector('.person p');
    const personC = document.querySelector('.personContent');
    const write = document.querySelector('.write');//得到编辑按钮
    const writeArea = document.querySelector('.writeArea');//得到编辑区
    const say = document.querySelector('.centerC .say');
    const searchBtn = document.querySelector('.search p');
    const searchArea = document.querySelector('.search input');
    const searchAreaWidth = searchArea.offsetWidth;
    const adminNameBox = document.querySelector('.navShow .person p img');//登录者头像
    var authorId;//用户id,用全局变量
    var adminid;//登录者id
    var adminName;//登录者昵称
    var adminHead;//登录者头像

    // 获取登录者的信息
    getAdmin().then(res => {
        if (res.code == 200) {
            const adminArray = res.data;
            adminid = adminArray.id;
            adminName = adminArray.username;
            adminHead = adminArray.head;
            adminNameBox.src = "getUserHeadServlet?userid=" + adminid + "&count=0";//图像
        } else {
            console.log('获取登录者信息失败');
        }
    });



    // // 导航栏编辑框
    clickDisplay(write, say);
    //导航栏搜索处-----------------------------------------------------------------------
    // 搜索框关键字
    const searchKeyUl = document.querySelector('#souSuoUl');
    searchBtn.addEventListener('click', () => {
        // 如果出现
        if (searchArea.offsetWidth > 500) {
            const searchAV = searchArea.value;
            // 但是没输入，点击隐藏
            if (searchAV == '') {
                searchArea.style.width = 72 + 'px';
                searchArea.style.backgroundColor = 'transparent';
                searchArea.placeholder = "";
                searchArea.style.borderColor = 'transparent';
                searchKeyUl.style.display = 'none';
            } else {
                // 有输入，，发送请求
                searchArea.oninput = function () {
                    // 获取用户输入的内容
                    const searchText = this.value;
                    // 向服务端发送请求 拿到关键字相关内容
                    getSearchKey(searchText).then(res => {
                        console.log(res);
                        const gskText = res.data;
                        const gskNum = gskText.length;
                        // 创建关键字相关内容的li
                        function creatLi3(num) {
                            let lis = [];
                            for (let k = 1; k <= num; k++) {//框架
                                lis[k] = '<li class="souSuoLi"></li>';//可更换为想要的格式
                            }
                            return lis.join('');//数组转化为字符串
                        }
                        searchKeyUl.innerHTML = creatLi3(gskNum);
                        // 获取刚刚创建的li，并填入返回的内容
                        const searchKeyLi = document.querySelector('#souSuoUl li');
                        for (let i = 0; i < gskNum; i++) {
                            searchKeyLi.innerHTML = gskText[i];
                        }
                    });
                    searchKeyUl.style.display = 'block';
                }

                // 把搜索内容传进去
                getFindResult(start, searchAV).then(res => {
                    console.log(res);//返回地址传递过来的所有信息
                    // 后续处理--------------------------------------可以直接让后端把相关东西放到动态区域那里，然后刷新----------------

                });
            }
        } else {
            // 如果没出现，让它出现
            searchArea.style.width = searchAreaWidth + 'px';
            searchArea.placeholder = "搜索";
            searchArea.style.backgroundColor = 'rgb(246, 246, 246)';
            searchArea.style.borderColor = '#ccc';
        }
    });

    // searchArea.oninput = function () {
    //     // 获取用户输入的内容
    //     const searchText = this.value;
    //     // 向服务端发送请求 拿到关键字相关内容
    //     getSearchKey(searchText).then(res => {
    //         console.log(res);
    //         const gskText = res.data;
    //         const gskNum = gskText.length;
    //         // 创建关键字相关内容的li
    //         function creatLi3(num) {
    //             let lis = [];
    //             for (let k = 1; k <= num; k++) {//框架
    //                 lis[k] = '<li class="souSuoLi"></li>';//可更换为想要的格式
    //             }
    //             return lis.join('');//数组转化为字符串
    //         }
    //         searchKeyUl.innerHTML = creatLi3(gskNum);
    //         // 获取刚刚创建的li，并填入返回的内容
    //         const searchKeyLi = document.querySelector('#souSuoUl li');
    //         for (let i = 0; i < gskNum; i++) {
    //             searchKeyLi.innerHTML = gskText[i];
    //         }
    //     });
    //     // searchKeyUl.style.display = 'block';
    // }



    //----------------编辑区---
    //按钮排他算法事件


    const sileftBtns = document.querySelectorAll('.siLeft p');
    const facePrintBox = document.querySelector('.facePrint');
    const AtmeBox = document.querySelector('#Atme');//获取@的大盒子
    const huaTiBox = document.querySelector('#huaTiban');//获取#的大盒子
    let sileft = [sileftBtns[0], sileftBtns[2], sileftBtns[3], ringp, personp];//按钮
    let Btndiv = [facePrintBox, AtmeBox, huaTiBox, ringC, personC];
    for (let i = 0; i < sileft.length; i++) {
        sileft[i].addEventListener('click', () => {
            if (Btndiv[i].style.display == 'none') {
                for (let j = 0; j < sileft.length; j++) {
                    Btndiv[j].style.display = 'none';
                }
                Btndiv[i].style.display = 'block';
            } else {
                Btndiv[i].style.display = 'none';
            }
        });
    }


    // (1)上传相册
    const rolePhotoIcon = document.querySelector('#rolePhotoIcon');
    const photoBox = document.querySelector('.photo');
    const role = document.querySelector('.role');
    // 创建图片预览img元素
    const file = document.querySelector('#file');
    //定义一个数组 把文件数组的值给新数组  对新数组进行操作  然后把新数组传递给后台
    var curFiles = [];
    // 文件选择监听事件
    file.onchange = function () {
        // 文件读取对象读取文件
        for (let i = 0; i < this.files.length; i++) {
            const fileReader = new FileReader();
            const img = document.createElement('img');
            fileReader.readAsDataURL(this.files[i]);
            //在数组中追加每次文件
            curFiles.push(this.files[i]);
            // 在控制台打印出文件数组
            // console.log(curFiles);
            fileReader.onload = function () {
                img.src = fileReader.result;
                img.setAttribute('index', i);
                // 将role放入装照片的盒子里，然后在role之前插入新元素
                photoBox.insertBefore(img, role);
            };
        };

        // 点击图片该删除图片
        photoBox.addEventListener('click', (e) => {
            const imgRemove = e.target;
            const index = imgRemove.getAttribute('index');
            imgRemove.remove();
            curFiles.splice(index, 1);
            console.log(curFiles);
        });
    }
    clickDisplay(rolePhotoIcon, photoBox);


    // (2).发表情区域
    const facePrintUl = document.querySelector('.facePrint ul');
    const spareIconface = document.querySelector('#spareIconface');
    const facePrint = document.querySelector('.facePrint');
    // 创建li函数
    function creatLi1(num) {
        let lis = [];
        for (let i = 1; i <= num; i++) {
            lis[i] = '<li><img src="./img/emoji/' + i +
                '.gif" alt=""></li>';
        }
        return lis.join(''); //数组转化为字符串 
    }
    facePrintUl.innerHTML = creatLi1(149);


    // (3).在文本框输入文字跟表情
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
            // console.log(cloneimg);
            insertHtmlAtCaret(cloneimg);
        });
    };


    // @跟话题
    const At = document.querySelector('#At');//获取话题按钮
    const Atme = document.querySelector('#Atme');//获取@的大盒子
    const AtArea = document.querySelector('#at');//获取装@的textarea
    const huaTiBtn = document.querySelector('#hauTi');//获得#按钮
    const huaTi = document.querySelector('#huaTiban');//获取#的大盒子
    const topicArea = document.querySelector('#topicContent');//获取装#的textarea
    //(2)将后台传入的信息传入各自框框里面
    // @部分
    const p1 = getFansServlet().then(res => {
        //console.log(res);//返回地址传递过来的所有信息
        const fanData = res.data;
        for (let g = 0; g < fanData.length; g++) {
            const optionA = document.createElement('li');//创建li标签
            optionA.className = "Atli";
            optionA.innerHTML = fanData[g];//放信息
            Atme.appendChild(optionA);//加到@盒子里面
        }
        const Atlis = document.querySelectorAll('#Atme li');
        for (let i = 0; i < Atlis.length; i++) {
            Atlis[i].addEventListener('click', () => {
                const AtDiv = document.createElement('div');
                AtDiv.className = 'AtDiv';
                AtDiv.innerHTML = '<span class="AtTip">@' + Atlis[i].innerHTML + '</span>';
                //AtArea.innerHTML = '@' + Atlis[i].innerHTML + AtArea.innerHTML;//把@传到@的textArea(利用字符串拼接)
                // fuwenben.insertBefore(AtDiv, fuwenben.children[0]);
                fuwenben.appendChild(AtDiv);
            });
        }

    });

    // #部分
    const p2 = gethotTalk().then(res => {
        const hotTalkData = res.data;
        for (let g = 0; g < hotTalkData.length; g++) {
            const optionH = document.createElement('li');
            optionH.innerHTML = hotTalkData[g].topicContent;
            huaTi.appendChild(optionH);//加到#盒子里面
        }
        // #部分
        const HTlis = document.querySelectorAll('#huaTiban li');
        for (let i = 0; i < HTlis.length; i++) {
            HTlis[i].addEventListener('click', () => {
                const HTDiv = document.createElement('div');
                HTDiv.className = 'AtDiv';
                HTDiv.innerHTML = '<span class="HtTip">#' + HTlis[i].innerHTML + '</span>';
                // topicArea.innerHTML = '#' + HTlis[i].innerHTML + topicArea.innerHTML;//把话题传到话题的textArea(利用字符串拼接)
                // fuwenben.insertBefore(HTDiv, fuwenben.children[0]);
                fuwenben.appendChild(HTDiv);
            });
        }
    });

    Promise.all([p1, p2]).then(result => {
        console.log('成功！yeah');
        //4. 提交表单  发布---------------------------------------------------------------------------------
        // 获取表单
        const form = document.querySelector('#form');
        // （1）获取富文本textarea内容的文本域
        const textArea1 = document.querySelector('#content');
        fuwenben.addEventListener('DOMSubtreeModified', () => {
            textArea1.value = fuwenben.innerHTML; // 同步富文本跟文本域的值
            //console.log(textArea1.value);

            //（2） #的文本域
            const topicContent = document.querySelector('#topicContent');
            console.log(topicContent);
            const HtTip = document.querySelectorAll('.fuWenBen span.HtTip');
            console.log(HtTip);
            let Htres = '';
            let Atres = '';
            for (let h = 0; h < HtTip.length; h++) {
                const HtTipC = HtTip[h].innerHTML;
                Htres = HtTipC + Htres;
                topicContent.innerHTML = Htres;
                //console.log(topicContent.innerHTML);
            }
            // （3）@的文本域
            const at = document.querySelector('#at');
            const AtTip = document.querySelectorAll('.fuWenBen span.AtTip');
            for (let w = 0; w < AtTip.length; w++) {
                const AtTipC = AtTip[w].innerHTML;
                Atres = AtTipC + Atres;
                at.innerHTML = Atres;
                //console.log(at.innerHTML);
            }

        });

        // 获取编辑区发布按钮
        const writeBtn = document.querySelector('#writeBtn');
        writeBtn.addEventListener('click', () => {
            //将获得的表单元素作为参数，对formData初始化
            var formdata = new FormData(form);
            // 通过get获取文本框跟照片文件的value值
            // formdata.get("content");
            //alert(formdata.get("content"));
            // formdata.get("file");
            const xhr = new XMLHttpRequest();
            xhr.open('post', address + 'sendDynamicServlet');
            // xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
            // xhr.setRequestHeader("enctype","multipart/form-data");
            xhr.send(formdata);
            window.location.href = "forum.html";
            xhr.onreadystatechange = function () {
                if (xhr.status == 200) {
                    window.location.href = "forum.html";
                }
            }
        });

    }, err => console.log).catch(e => console.log);


    // (3)评论条件选择按钮（按热度，，按时间）
    const choose = document.querySelectorAll('.doChoose');
    for (let k = 0; k < choose.length; k++) {
        const chooseSpan = choose[k].children;
        for (let b = 0; b < chooseSpan.length; b++) {
            chooseSpan[b].addEventListener('click', () => {
                for (let l = 0; l < chooseSpan.length; l++) {
                    chooseSpan[l].className = '';
                }
                chooseSpan[b].className = 'doc';
            });
        }
    };

    const rightC = document.querySelector('#rightC');
    const fixTimeH = rightC.offsetHeight - window.innerHeight;
    // window.addEventListener('scroll', () => {
    //     //滚动的距离,距离顶部的距离
    //     const topScroll = window.scrollY;
    //     if (topScroll >= fixTimeH) {
    //         rightC.style.position = "fixed";
    //         rightC.style.top = -fixTimeH + 'px';
    //         rightC.style.right = 52 + 'px';
    //     } else {
    //         rightC.style.position = "absolute";
    //         rightC.style.top = 0 + 'px';
    //         rightC.style.right = 0 + 'px';
    //     }
    // });



    // （2）创建动态模板
    // 引入模块后直接处理------------------------------------------------------------------------------------------(一)
    // 获取装动态的大盒子
    var hotNewBody = document.querySelector('.hotNewBody');
    var start = 0;//选择开始的位置
    var msg = "";
    var hotSmallnum = 0;

    getforumData(0, "", 0);//第一次要先触发一次
    // getforumData(5, "", 1);
    scrollforum();
    //滚动事件触发
    function scrollforum() {
        window.onscroll = function () {
            //滚动的距离,距离顶部的距离
            const topScroll = window.scrollY;
            if (topScroll >= fixTimeH) {
                rightC.style.position = "fixed";
                rightC.style.top = -fixTimeH + 'px';
                rightC.style.right = 110 + 'px';
            } else {
                rightC.style.position = "relative";
                rightC.style.top = 0 + 'px';
                rightC.style.right = 0 + 'px';
            }

            if (getScrollTop() + getClientHeight() >= getScrollHeight() * (hotSmallnum + 1)) {
                console.log('加和成功');
                start = start + 5;
                hotSmallnum = hotSmallnum + 1;
                // console.log('start' + start);
                // console.log('msg' + msg);
                // console.log('hotSmallnum' + hotSmallnum);
                getforumData(start, msg, hotSmallnum); //加载数据
            }
        }
    }



    function getforumData(start, msg, hotSmallnum) {
        forumFirst(start, msg).then(res => {
            console.log(res);
            const DTArray = res.data;
            console.log(DTArray);//获得所有返回结果
            const creatdivNum = DTArray.length;
            if (creatdivNum < 5) {
                removeEventListener('scroll', scrollforum, false);//小于五说明下次没数据了，要就移除滚动事件
            }
            const hotNewSmall = document.createElement('div');
            hotNewSmall.className = 'hotNewSmallbody';
            function creatdiv(num) {
                let divs = [];
                const divforum = '<div class="forum"><div class="aurther"><div class="photo"><img src="" alt=""></div><div class="aurtherName"><p class="anName"></p><p class="anTime"></p></div><div class="gz">关注</div></div><div class="aurtherSay"><p></p></div><div class="clearfix aurtherTmg"></div><div class="forumFooter"><div class="zf"><span class="iconfont icon-zhuanfa"></span>转发</span></div><div class="pl"><span class="iconfont icon-pinglun"></span>评论</div><div class="aixin"><span class="iconfont icon-aixin"></span><div class="two"></div></div></div><div class="discuss" style="display: none;"><div class="disSelf"><span class="dsPhoto"><img src="' + adminHead + '" alt=""></span><div id="disSelf" placeholder="唠嗑一下" contenteditable="true"></div><div class="dsButton"><div class="face iconfont icon-biaoqing" id="faceTwoBtn"></div><div class="tsSend"><input type="checkbox">同时转发</div><div class="bsbbtn">评论</div><div class="facePrint" id="faceTwoBox" style="display: none;"><ul class="facePrintUl" id="faceTwo"></ul></div ></div></div><div class="disOther"><div class="doChoose"><span>按时间</span><span class="doc"> 按热度</span></div><ul class="doUl"></ul></div></div></div>';
                for (let k = 1; k <= num; k++) {//框架
                    divs[k] = divforum;//可更换为想要的格式
                }
                return divs.join('');//数组转化为字符串
            }
            hotNewSmall.innerHTML = creatdiv(creatdivNum);//自动创建需要数量的forum
            hotNewBody.appendChild(hotNewSmall);
            const hotNewSmallbody = document.querySelectorAll('.hotNewSmallbody');//获得每五个forum的大盒子
            // console.log(hotNewSmallbody);
            // console.log(hotSmallnum);
            const forumBox = hotNewSmallbody[hotSmallnum].querySelectorAll('.forum');//获取动态盒子forum
            // 用户文案区域
            const aurtherSay = hotNewSmallbody[hotSmallnum].querySelectorAll('.forum .aurtherSay p');//文案
            const aurtherTmg = hotNewSmallbody[hotSmallnum].querySelectorAll('.forum .aurtherTmg');//配图
            const username = hotNewSmallbody[hotSmallnum].querySelectorAll('.forum .anName');//用户名
            const Userphoto = hotNewSmallbody[hotSmallnum].querySelectorAll('.forum .photo img');//用户头像
            const UserTime = hotNewSmallbody[hotSmallnum].querySelectorAll('.forum .anTime');//用户发表时间
            const aixinBtn = hotNewSmallbody[hotSmallnum].querySelectorAll('.aixin');//获赞按钮
            const aixin = hotNewSmallbody[hotSmallnum].querySelectorAll('.aixin .icon-aixin');//爱心图标
            const aixinText = hotNewSmallbody[hotSmallnum].querySelectorAll('.aixin .two');//获赞数
            const plbtn = hotNewSmallbody[hotSmallnum].querySelectorAll('.forumFooter .pl');//评论区出现按钮
            const discuss = hotNewSmallbody[hotSmallnum].querySelectorAll('.discuss');//评论区
            const disSelfInput = hotNewSmallbody[hotSmallnum].querySelectorAll('.disSelf #disSelf');//评论区富文本
            const bsbbtn = hotNewSmallbody[hotSmallnum].querySelectorAll('.dsButton .bsbbtn');//评论区按钮
            const disOther = hotNewSmallbody[hotSmallnum].querySelectorAll('.disOther');//他人评论
            const choose = hotNewSmallbody[hotSmallnum].querySelectorAll('.doChoose');//评论区切换排序按钮
            const faceTwoBtn = hotNewSmallbody[hotSmallnum].querySelectorAll('#faceTwoBtn');//获取评论区表情按钮
            const faceTwoDiv = hotNewSmallbody[hotSmallnum].querySelectorAll('#faceTwoBox');//获得评论区表情包的box
            const faceTwo = hotNewSmallbody[hotSmallnum].querySelectorAll('#faceTwo');//获得评论区表情包的ul
            const laoke = hotNewSmallbody[hotSmallnum].querySelectorAll('.disSelf .dsPhoto img');//本人评论头像********************************************
            const commentBox = hotNewSmallbody[hotSmallnum].querySelectorAll('.doUl');//获得装评论的盒子
            const follow = hotNewSmallbody[hotSmallnum].querySelectorAll('.aurther .gz');//获得关注按钮


            for (let i = 0; i < DTArray.length; i++) {//i=每个forum
                let num = i;
                authorId = DTArray[i].authodId;
                const articleId = DTArray[i].id;//获取文章Id
                // console.log(DTArray[i].id);
                getAuthor(authorId).then(res => {//获取用户id包含的所有信息
                    // console.log(res);
                    const UserArray = res.data;
                    username[num].innerHTML = UserArray.username;
                    Userphoto[num].src = address + 'getUserHeadServlet?userid=' + DTArray[i].authodId + "&count=0";
                });
                // 关注业务
                follow[num].addEventListener('click', () => {
                    saveFollow(authorId).then(res => {
                        if (follow[num].innerHTML == '关注') {
                            follow[num].innerHTML = "已关注";
                        } else {
                            follow[num].innerHTML = "关注";
                        }
                        if (res.code == 106) {
                            console.log("用户未登录");
                        } else {
                            console.log("保存关注成功");
                        }
                    });
                });
                aurtherSay[num].innerHTML = DTArray[i].content;// 用户文案
                const imgFile = DTArray[i].imgFiles; // 用户图片地址(后续这里会有对应的id值判断)
                UserTime[num].innerHTML = DTArray[i].time;  // 用户发布时间
                const imgcount = DTArray[i].imgcount; // 用户图片个数
                function creatLi2(imgcount) { // 创建li>img函数  生成存放照片的盒子
                    let lis = [];
                    for (let k = 0; k < imgcount; k++) {//框架
                        let url = address + 'getDynamicImgServlet?imgFiles=' + imgFile + "&count=" + k;
                        lis[k] = "<li><img src=" + url + " alt=''></li>";//可更换为想要的格式
                    }
                    return lis.join('');//数组转化为字符串
                }
                aurtherTmg[num].innerHTML = creatLi2(imgcount);
                // 图片点击放大处理
                const AurtherImg = forumBox[num].querySelectorAll('.aurtherTmg li img');//对应动态获得全部发布图片
                // console.log(AurtherImg);
                for (let m = 0; m < AurtherImg.length; m++) {
                    AurtherImg[m].addEventListener('click', () => {
                        modal.classList.add("model-shown");
                        modalImg.src = AurtherImg[m].src;
                        captionText.innerHTML = AurtherImg[m].alt;
                        load.addEventListener('click', () => {
                            // console.log(imgFile);
                            // console.log(m);
                            getPhoto(imgFile, m).then(res => { });
                        });
                        // load.href = AurtherImg[m].src;
                        // load.download = 'a.png';
                        let degnum = 0;
                        rRotateBtn.addEventListener('click', () => {
                            let img = document.querySelector('#image-cover-image');
                            degnum++;
                            let Deg = (degnum * 90) % 360;
                            img.style.transform = 'rotate(' + Deg + 'deg)';
                        });
                    });
                }

                aixinText[num].innerHTML = DTArray[i].zcount; // 用户获赞数
                aixinBtn[num].addEventListener('click', () => {
                    let aixinNum = parseInt(aixinText[num].innerText);
                    if (aixin[num].style.color == 'red') {
                        aixinText[num].innerText = aixinNum - 1;
                        aixin[num].style.color = 'rgb(85, 85, 85)';
                    } else {
                        aixinText[num].innerText = aixinNum + 1;
                        aixin[num].style.color = 'red';
                    }
                    // 保存点赞
                    saveFabulou(articleId, authorId).then(res => {
                        if (res.code == 106) {
                            console.log("用户未登录");
                        } else {
                            console.log("保存点赞成功");
                        }
                    });
                });
                clickDisplay(plbtn[num], discuss[num]);
                const chooseSpan = choose[num].children;//评论区排序条件
                for (let b = 0; b < chooseSpan.length; b++) {
                    chooseSpan[b].addEventListener('click', () => {
                        for (let l = 0; l < chooseSpan.length; l++) {
                            chooseSpan[l].className = '';
                        }
                        chooseSpan[b].className = 'doc';
                    });
                }
                faceTwo[num].innerHTML = creatLi1(149);
                clickDisplay(faceTwoBtn[num], faceTwoDiv[num]);
                // 评论区富文本插入表情
                const faceTwoimg = forumBox[num].querySelectorAll('#faceTwo li img');//获取所有的表情img
                for (let h = 0; h < faceTwoimg.length; h++) {
                    faceTwoimg[h].addEventListener('click', () => {
                        if (document.activeElement !== disSelfInput[num]) {
                            disSelfInput[num].focus();
                        }
                        let cloneimg2 = faceTwoimg[h].cloneNode(true);
                        insertHtmlAtCaret(cloneimg2);
                    });
                }


                // 评论区域请求
                getComment(articleId).then(res => {
                    // console.log(res);
                    const CommentArray = res.data;
                    // console.log(CommentArray);
                    if (CommentArray.length != 0) {
                        disOther[num].style.display = 'block';
                        const CommentNum = CommentArray.length;//评论条数
                        if (CommentNum > 0) {
                            function creatComment(num) {//要创建多少个li
                                let plDoli = [];
                                for (let i = 0; i < num; i++) {//框架
                                    plDoli[i] = '<li class="doli"><span class="dlPhoto"><img src="" alt=""></span><div class="bigliContent"><div class="dlName" id="dlname1"></div><p class="dlContent" id="dlContent1"></p></div><div class="dlTime" id="dlTime1"></div><ul class="liInUl"><li class="doli"><div class="bigliContent"><div class="dlName"><span id="dlName" class="dlname2">Tomtu:</span>回复:</div><p class="dlContent" id="dlContent2">我也觉得</p></div><div class="dlTime" id="dlTime2">2021-10 22:30</div></li></ul></li>';
                                }
                                return plDoli.join('');//数组转化为字符串
                            };
                            commentBox[num].innerHTML = creatComment(CommentNum);//在评论盒子插入首评
                            const commenterName = hotNewSmallbody[hotSmallnum].querySelectorAll('#dlname1');//评论者的昵称
                            const commenterPhoto = hotNewSmallbody[hotSmallnum].querySelectorAll('.dlPhoto img');//评论者的头像
                            //console.log(commenterPhoto);
                            const commenterTime = hotNewSmallbody[hotSmallnum].querySelectorAll('#dlTime1');//评论者的评论时间
                            const commentContent = hotNewSmallbody[hotSmallnum].querySelectorAll('#dlContent1');//评论内容
                            for (let c = 0; c < CommentNum; c++) {
                                const commenterId = CommentArray[i].commenterId;//获得评论者的id
                                getAuthor(commenterId).then(res => {//获取评论者id包含的所有信息
                                    // console.log(res);
                                    const plterArray = res.data;
                                    commenterName[c].innerHTML = plterArray.username + ':';
                                    commenterPhoto[c].src = address + '/getUserHeadServlet?userid=' + plterArray.id + "&count=0";
                                });
                                commenterTime[c].innerHTML = CommentArray[c].time;
                                commentContent[c].innerHTML = CommentArray[c].comment;
                            }
                        }

                    } else {
                        console.log('该动态没有评论');
                        disOther[num].style.display = 'none';
                    }
                });

                //评论区书写评论 
                bsbbtn[num].addEventListener('click', () => {
                    // 获取本人的信息   如果上面的信息可以用就不用重新请求
                    // getAdmin().then(res => {
                    //     console.log(res);
                    // });

                    const disSelfInputdata = disSelfInput[num].innerHTML;//对应富文本的内容
                    if (disSelfInputdata != "") {
                        // 创建首评模板   登录者的头像，昵称拼接到bs里面
                        const doli = document.createElement('li');
                        doli.className = 'doli';
                        const bs = '<span class="dlPhoto"><img src="' + adminHead + '" alt=""></span><div class="bigliContent"><div class="dlName" id="dlname1">' + adminName + ':' + '</div><p class="dlContent" id="dlContent1">' + disSelfInputdata + '</p></div><div class="dlTime" id="dlTime1">' + getTimer() + '</div>';
                        doli.innerHTML = bs;
                        commentBox[num].insertBefore(doli, commentBox[num].children[0]);//评论放在第一行
                        //保存评论的请求
                        saveComment(articleId, disSelfInputdata, authorId).then(res => {
                            console.log(res);
                            if (res.code == 106) {
                                console.log('用户未登录');
                            } else if (res.code == 200) {
                                console.log('保存评论成功');
                            }
                        });

                        disSelfInput[num].innerHTML = '';
                        faceTwoDiv[num].style.display = 'none';
                        disOther[num].style.display = 'block';
                    } else {
                        console.log('评论不能为空');
                    }

                });

            }

        }).catch(err => {
            console.log(err);
        });
    }



    // 滚动定位问题
    // 获得可视化口内部的大小
    // 固定条件  滚动距离=盒子高度-可视化窗口高度
    // const rightC = document.querySelector('#rightC');
    // const fixTimeH = rightC.offsetHeight - window.innerHeight;
    // window.addEventListener('scroll', () => {
    //     //滚动的距离,距离顶部的距离
    //     const topScroll = window.scrollY;
    //     if (topScroll >= fixTimeH) {
    //         rightC.style.position = "fixed";
    //         rightC.style.top = -fixTimeH + 'px';
    //         rightC.style.right = 52 + 'px';
    //     } else {
    //         rightC.style.position = "absolute";
    //         rightC.style.top = 0 + 'px';
    //         rightC.style.right = 0 + 'px';
    //     }
    // });






    // 热门话题
    const hotTalkB = document.querySelector('.hotTalkB');//装话题大盒子
    gethotTalk().then(res => {
        // console.log(res);
        const HTArray = res.data;
        // console.log(HTArray);
        // 获取话题数
        const HTnum = HTArray.length;
        // 制造放话题的li
        function creatLi4(num) {
            let lis = [];
            for (let k = 1; k <= num; k++) {//框架
                lis[k] = '<li><a href="javascript:;"></a></li>';//可更换为想要的格式
            }
            return lis.join('');//数组转化为字符串
        }
        hotTalkB.innerHTML = creatLi4(HTnum);
        const hotTalkLi = document.querySelectorAll('.hotTalkB li a');
        for (let i = 0; i < hotTalkLi.length; i++) {
            // 把话题内容加上去
            hotTalkLi[i].innerHTML = '<p id="hTp"><span>' + (i + 1) + '</span>' + HTArray[i].topicContent + '</p><i>' + HTArray[i].hot + '</i>';
        }
    });



    // 右边
    const hand = document.querySelectorAll('.makeBody li');
    const handTip = document.querySelector('#handTip');
    console.log(hand);
    console.log(handTip);
    if (hand.length == 0) {
        handTip.style.display = 'block';
    } else {
        handTip.style.display = 'none';
    }



    // -----------------------函数封装-------------------------
    // 点击出现或消失函数
    function clickDisplay(obj, target) {
        obj.addEventListener('click', () => {
            if (target.style.display == 'none') {
                target.style.display = 'block';
                if (obj == write) {
                    scrollTo(0, 0);//回到顶部
                }
            } else {
                target.style.display = 'none';
            }
        });
    };

    // 创建li函数
    function creatLi(num) {//要创建多少个li
        let lis = [];
        lis[0] = tongbaoul.innerHTML;
        for (let i = 1; i <= num; i++) {//框架
            lis[i] = '<li><img src="" alt=""></li>';//可更换为想要的格式
        }
        return lis.join('');//数组转化为字符串
    };

    //返回当前的时分秒  格式  08：08：08
    function getTimer() {
        var time = new Date();
        var year = time.getFullYear(); //返回当前日期的年
        var month = time.getMonth() + 1; //月份（0~11） 返回的月份小一个月，记得月份+1
        var dates = time.getDate(); //返回日期
        var h = time.getHours();
        h = h < 10 ? '0' + h : h;
        var m = time.getMinutes();
        m = m < 10 ? '0' + m : m;
        var s = time.getSeconds();
        s = s < 10 ? '0' + s : s;
        return year + '-' + month + '-' + dates + ' ' + h + ':' + m + ':' + s;
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

    //获取屏幕可视范围的高度
    function getClientHeight() {
        return window.innerHeight;
    }

    //获取文档完整的高度
    function getScrollHeight() {
        return Math.min(document.body.scrollHeight, document.documentElement.scrollHeight);
    }







    // //创建forum的div
    // function creatdiv(num) {
    //     let divs = [];
    //     const divforum = '<div class="forum"><div class="aurther"><div class="photo"><img src="" alt=""></div><div class="aurtherName"><p class="anName"></p><p class="anTime"></p></div><div class="gz">关注</div></div><div class="aurtherSay"><p></p></div><div class="clearfix aurtherTmg"></div><div class="forumFooter"><div class="zf"><span class="iconfont icon-zhuanfa"></span>转发</span>></div><div class="pl"><span class="iconfont icon-pinglun"></span>评论</div><div class="aixin"><span class="iconfont icon-aixin"></span><div class="two"></div></div></div><div class="discuss" style="display: none;"><div class="disSelf"><span class="dsPhoto"><img src="img/person.jpg" alt=""></span><input type="text" name="disSelf" id="disSelf" placeholder="唠嗑一下"><div class="dsButton"><div class="face iconfont icon-biaoqing"></div><div class="tsSend"><input type="checkbox">同时转发</div><div class="bsbbtn">评论</div></div></div><div class="disOther"><div class="doChoose"><span>按时间</span><span class="doc"> 按热度</span></div><ul class="doUl"><li class="doli"><span class="dlPhoto"><img src="" alt=""></span><div class="bigliContent"><div class="dlName"></div><p class="dlContent"></p></div><div class="dlTime"></div><ul class="liInUl"><li class="doli"><div class="bigliContent"><div class="dlName"><span id="dlName"></span>回复</div><p class="dlContent"></p></div><div class="dlTime"></div></li></ul></li></ul></div></div></div>';
    //     for (let k = 1; k <= num; k++) {//框架
    //         divs[k] = divforum;//可更换为想要的格式
    //     }
    //     return divs.join('');//数组转化为字符串
    // }
    // const hotNewBody = document.querySelector('.hotNewBody');
    // hotNewBody.innerHTML = creatdiv(5);
    // console.log(hotNewBody.firstChild);
}