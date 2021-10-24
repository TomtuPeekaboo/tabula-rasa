import { forumFirst, getAuthor, getSearchKey, gethotTalk, getFindResult, getFansServlet } from './function.js'

window.onload = function () {

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




    var authorId;//用户id,用全局变量





    // 导航栏消息处
    clickDisplay(ringp, ringC);
    // 导航栏编辑框
    clickDisplay(write, say);
    // 导航栏头像处
    clickDisplay(personp, personC);
    //导航栏搜索处-----------------------------------------------------------------------
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
            } else {
                // 有输入，，发送请求

                // 把搜索内容传进去
                getFindResult(start, searchAV).then(res => {
                    console.log(res);//返回地址传递过来的所有信息
                    // 后续处理------------------------------------------------------

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



    //----------------编辑区------------------

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
            console.log(curFiles);
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




    // 2.发表情区域
    const facePrintUl = document.querySelector('.facePrint ul');
    const spareIconface = document.querySelector('#spareIconface');
    const facePrint = document.querySelector('.facePrint');

    // 创建li函数
    function creatLi1(num) { //要创建多少个li
        let lis = [];
        for (let i = 1; i <= num; i++) { //框架           
            lis[i] = '<li><img src="./img/emoji/' + i +
                '.gif" alt=""></li>';
        }
        return lis.join(''); //数组转化为字符串 
    }
    facePrintUl.innerHTML = creatLi1(149);

    clickDisplay(spareIconface, facePrint);



    // 3.在文本框输入文字跟表情

    // 表情包所在img标签
    const faceimgs = document.querySelectorAll('.facePrint ul li img');
    const fuwenben = document.querySelector('.fuWenBen');




    // 第一版本
    // for (let i = 0; i < faceimgs.length; i++) {
    //     faceimgs[i].addEventListener('click', () => {
    //         // 判断光标是否在富文本框里面
    //         if (document.activeElement !== fuwenben) {
    //             // 如果不是就在富文本框中加上光标
    //             fuwenben.focus();
    //         }
    //         // 记录光标位置对象
    //         var range;
    //         var sel = window.getSelection();//得到焦点的地方
    //         const node = sel.anchorNode;
    //         // 判断是否有光标
    //         if (node != null) {
    //             // 获取光标起始位置
    //             range = sel.getRangeAt(0);
    //         } else {
    //             range = undefined;
    //         }
    //         // 克隆被点击的表情的img
    //         let cloneimg = faceimgs[i].cloneNode(true);
    //         // console.log(cloneimg);
    //         range.insertNode(cloneimg);
    //     });
    // };

    // /--------------------------------
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
    const huaTiBtn = document.querySelector('#hauTi');//获得#按钮
    const Atme = document.querySelector('.Atme');//获取@select外的盒子
    const AtSelect = document.querySelector('#AtmeS');//获取select
    const huaTi = document.querySelector('.huaTiban');//获取#select外的盒子
    const huaTiSelect = document.querySelector('#huaTibanS');//获取select
    // 获取@select里面的所有option
    const optionAt = AtSelect.children;
    // 获取#select里面的所有option
    const optionHt = huaTiSelect.children;


    // 创建一个@模板
    forumFirst().then(res => {
        console.log(res);//返回地址传递过来的所有信息
        const fanData = res.data;
        for (let g = 0; g < fanData.length; g++) {
            const optionA = document.createElement('option');//创建option标签
            AtSelect.appendChild(optionA);
            //获取所有@的option
            const optionAt = AtSelect.children;
            optionAt[g].innerHTML = fanData[g];
        }
    });
    At.addEventListener('click', () => {
        if (Atme.style.display == 'none') {
            Atme.style.display = 'block';//点击出现选择框

            // 判断光标是否在富文本框里面
            if (document.activeElement !== fuwenben) {
                // 如果不是就在富文本框中加上光标
                fuwenben.focus();
            }

            //获取下拉选项中选中的值
            let ATValue;
            function changeAt() {
                const AtDiv = document.createElement('span');
                AtDiv.className = 'AtTip';
                let optionNum = AtSelect.selectedIndex;
                ATValue = optionAt[optionNum].innerHTML;

                console.log(ATValue);
                AtDiv.innerHTML = '@' + ATValue;
                //将话题内容插入到
                fuwenben.appendChild(AtDiv);
                Atme.style.display = 'none';
                AtSelect.removeEventListener('change', changeAt, false);
            }
            AtSelect.addEventListener('change', changeAt, false);
        } else {
            Atme.style.display = 'none';
        }
    });

    // 创建话题#
    gethotTalk().then(res => {
        console.log(res);
        const hotTalkData = res.data;
        for (let g = 0; g < hotTalkData.length; g++) {
            const optionH = document.createElement('option');
            huaTiSelect.appendChild(optionH);
            // 获取#select里面的所有option
            const optionHt = huaTiSelect.children;
            optionHt[g].innerHTML = hotTalkData[g].topicContent;
        }

    });
    huaTiBtn.addEventListener('click', () => {
        if (huaTi.style.display == 'none') {
            huaTi.style.display = 'block';//点击出现选择框

            // 判断光标是否在富文本框里面
            if (document.activeElement !== fuwenben) {
                // 如果不是就在富文本框中加上光标
                fuwenben.focus();
            }

            //获取下拉选项中选中的值
            let HTValue;
            function changeHt() {
                const HtDiv = document.createElement('span');
                HtDiv.className = 'HtTip';
                let optionNumH = huaTiSelect.selectedIndex;
                HTValue = optionHt[optionNumH].innerHTML;

                console.log(HTValue);
                HtDiv.innerHTML = '#' + HTValue;
                //将话题内容插入到
                fuwenben.appendChild(HtDiv);
                huaTi.style.display = 'none';
                huaTiSelect.removeEventListener('change', changeHt, false);
            }
            huaTiSelect.addEventListener('change', changeHt, false);
        } else {
            huaTi.style.display = 'none';
        }
    });




    //4. 提交表单  发布---------------------------------------------------------------------------------
    // 获取表单
    const form = document.querySelector('#form');
    // 获取textarea内容的文本域
    const textArea1 = document.querySelector('#content');
    // 同步富文本跟文本域的值
    fuwenben.addEventListener('DOMSubtreeModified', () => {
        textArea1.value = fuwenben.innerHTML;
        // console.log(textArea1.value);
    });
    // @的文本域
    const topicContent = document.querySelector('#topicContent');
    const HtTip = document.querySelectorAll('.fuWenBen span.HtTip');
    for (let h = 0; h < HtTip.length; h++) {
        const HtTipC = HtTip[h].innerHTML + HtTipC;
        topicContent.innerHTML = HtTipC;
    }


    // #的文本域
    const at = document.querySelector('#at');
    const AtTip = document.querySelectorAll('.fuWenBen span.AtTip');
    for (let w = 0; w < AtTip.length; w++) {
        const AtTipC = AtTip[w].innerHTML + AtTipC;
        at.innerHTML = AtTipC;
    }



    // 获取编辑区发布按钮
    const writeBtn = document.querySelector('#writeBtn');
    writeBtn.addEventListener('click', () => {
        //将获得的表单元素作为参数，对formData初始化
        var formdata = new FormData(form);
        // 通过get获取文本框跟照片文件的value值
        formdata.get("content");
        formdata.get("file");
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'sendDynamicServlet');
        xhr.send(formdata);
        xhr.onload = function () {
            if (xhr.status == 200) {
                window.location.href = "forum.html";
            }
        }
    });




    //发动态区
    const plbtn = document.querySelectorAll('.forumFooter .pl');
    const discuss = document.querySelectorAll('.discuss');
    for (let i = 0; i < plbtn.length; i++) {
        clickDisplay(plbtn[i], discuss[i]);
    }




    // (3)评论选择
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
    }

    // （2）创建动态模板



    //---------获取数据---------------
    // 引入功能函数并应用

    //引入模块后直接处理----------------(一)
    var start = 0;//选择开始的位置
    forumFirst(start, msg).then(res => {
        console.log(res);//返回地址传递过来的所有信息
        const DTArray = res.data;
        console.log(DTArray);//获得所有返回结果
        console.log(DTArray.length)
        // 根据返回数据个数复刻forum个数
        const forum = document.querySelector('.hotNewBody .forum');
        // 深克隆动态模板
        // const forumTemplet = forum.cloneNode(true);
        // 获取装动态的大盒子
        const hotNewBody = document.querySelector('.hotNewBody');
        for (let i = 0; i < DTArray.length; i++) {
            const forumTemplet = forum.cloneNode(true);//深复制forum
            // 将forum装在大盒子里面的末尾        --->这里后面需要一个函数来判断要插到哪里！！！！而不是死板的放在最后
            // hotNewBody.appendChild(forumTemplet);
            // 每次都插入到第一个
            hotNewBody.insertBefore(forumTemplet, hotNewBody.firstChild);

        }
        // 获取第一个forum作为模板克隆

        // 用户文案区域
        const aurtherSay = document.querySelectorAll('.forum .aurtherSay p');
        const aurtherTmg = document.querySelectorAll('.forum .aurtherTmg');
        const username = document.querySelectorAll('.forum .anName');//用户名
        const Userphoto = document.querySelectorAll('.forum .photo img');//用户头像
        const UserTime = document.querySelectorAll('.forum .anTime')
        const aixinBtn = document.querySelectorAll('.aixin');
        const aixin = document.querySelectorAll('.aixin .icon-aixin');
        const aixinText = document.querySelectorAll('.aixin .two');
        // console.log(aixinBtn);
        // console.log(aixin);
        for (let i = 0; i < aixinBtn.length; i++) {

            aixinBtn[i].addEventListener('click', () => {
                let aixinNum = parseInt(aixinText[i].innerText);
                if (aixin[i].style.color == 'red') {
                    aixinText[i].innerText = aixinNum - 1;
                    aixin[i].style.color = 'rgb(85, 85, 85)';
                } else {
                    aixinText[i].innerText = aixinNum + 1;
                    aixin[i].style.color = 'red';
                }
            });
        };

        for (let i = 0; i < DTArray.length; i++) {//j=每个forum
            authorId = DTArray[i].authodId;
            // ------------------------------------------（二）
            getAuthor(authorId).then(res => {
                console.log(res);//返回地址传递过来的所有信息
                // 后续处理
                const UserArray = res.data;
                username[i].innerHTML = UserArray.username;
                Userphoto[i].src = "getUserHeadServlet?userid=" + DTArray[i].authodId + "&count=0";
            });

            // 用户文案

            aurtherSay[i].innerHTML = DTArray[i].content;

            // 用户图片地址(后续这里会有对应的id值判断)
            const imgFile = DTArray[i].imgFiles;

            // 用户发布时间
            UserTime[i].innerHTML = DTArray[i].time;
            //  用户图片个数
            const imgcount = DTArray[i].imgcount;
            // 创建li>img函数  生成存放照片的盒子
            function creatLi2(imgcount) {
                let lis = [];
                for (let k = 0; k < imgcount; k++) {//框架
                    let url = "getDynamicImgServlet?imgFiles=" + imgFile + "&count=" + k
                    lis[k] = "<li><img src=" + url + " alt=''></li>";//可更换为想要的格式
                }
                return lis.join('');//数组转化为字符串
            }
            aurtherTmg[i].innerHTML = creatLi2(imgcount);

            // 用户获赞数
            aixinText[i].innerHTML = DTArray[i].zcount;

        }

    }).catch(err => {
        console.log(err);
    });





    // -----------------------函数封装-------------------------
    // 点击出现或消失函数
    function clickDisplay(obj, target) {
        obj.addEventListener('click', () => {
            if (target.style.display == 'none') {
                target.style.display = 'block';
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

    // 滚动定位问题
    // 获得可视化口内部的大小
    // 固定条件  滚动距离=盒子高度-可视化窗口高度
    const rightC = document.querySelector('#rightC');
    const fixTimeH = rightC.offsetHeight - window.innerHeight;
    window.addEventListener('scroll', () => {
        //滚动的距离,距离顶部的距离
        const topScroll = window.scrollY;
        if (topScroll >= fixTimeH) {
            rightC.style.position = "fixed";
            rightC.style.top = -fixTimeH + 'px';
            rightC.style.right = 52 + 'px';
        } else {
            rightC.style.position = "absolute";
            rightC.style.top = 0 + 'px';
            rightC.style.right = 0 + 'px';
        }
    });



    // 搜索框关键字
    const searchKeyUl = document.querySelector('#souSuoUl');
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




    // 热门话题-----------------------------------------------------------------------
    const hotTalkB = document.querySelector('.hotTalkB');//装话题大盒子
    gethotTalk().then(res => {
        console.log(res);
        const HTArray = res.data;
        console.log(HTArray);
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
        const hotTalkLi = document.querySelectorAll('.hotTalkB ul li a');
        for (let i = 0; i < hotTalkLi.length; i++) {
            // 把话题内容加上去
            hotTalkLi.innerHTML = '<span>' + (i + 1) + '</span>' + HTArray.topicContent + '<i>' + HTArray.hot + '</i>';
        }
    });

}