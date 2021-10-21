import { forumFirst, forumPhotoGain, getAuthor } from './function.js'

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
    // 导航栏搜索处
    searchBtn.addEventListener('click', () => {
        if (searchArea.offsetWidth > 500) {
            searchArea.style.width = 72 + 'px';
            searchArea.style.backgroundColor = 'transparent';
            searchArea.placeholder = "";
            searchArea.style.borderColor = 'transparent'

        } else {
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
            lis[i] = '<li><img src="../img/emoji/' + i +
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

    // 同步富文本跟文本域的值
    fuwenben.addEventListener('DOMSubtreeModified', () => {
        textArea.value = fuwenben.innerHTML;
        // console.log(textArea.value);
    })




    for (let i = 0; i < faceimgs.length; i++) {
        faceimgs[i].addEventListener('click', () => {
            // 判断光标是否在富文本框里面
            if (document.activeElement !== fuwenben) {
                // 如果不是就在富文本框中加上光标
                fuwenben.focus();
            }
            // 记录光标位置对象
            var range;
            const node = window.getSelection().anchorNode;
            // 判断是否有光标
            if (node != null) {
                // 获取光标起始位置
                range = window.getSelection().getRangeAt(0);
            } else {
                range = undefined;
            }
            // 克隆被点击的表情的img
            let cloneimg = faceimgs[i].cloneNode(true);
            // console.log(cloneimg);
            range.insertNode(cloneimg);
        });
    };


    //4. 提交表单  发布---------------------------------------------------------------------------------
    // 获取表单
    const form = document.querySelector('#form');
    // 获取textarea
    const textArea = document.querySelector('#content');
    // 获取编辑区发布按钮
    const writeBtn = document.querySelector('#writeBtn');
    writeBtn.addEventListener('click', () => {
        //将获得的表单元素作为参数，对formData初始化
        var formdata = new FormData(form);
        // 通过get获取文本框跟照片文件的value值
        formdata.get("content");
        formdata.get("file");
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3000/');
        xhr.send(formdata);
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                // 具体操作
            }
        }
    });




    //发动态区
    const plbtn = document.querySelectorAll('.forumFooter .pl');
    const discuss = document.querySelectorAll('.discuss');
    for (let i = 0; i < plbtn.length; i++) {
        clickDisplay(plbtn[i], discuss[i]);
    }

    // （1）小红心
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

    // 获取第一个forum作为模板克隆
    const forum = document.querySelector('.hotNewBody .forum');
    // 深克隆动态模板
    // const forumTemplet = forum.cloneNode(true);
    // 获取装动态的大盒子
    const hotNewBody = document.querySelector('.hotNewBody');
    // 用户文案区域
    const aurtherSay = document.querySelectorAll('.forum .aurtherSay p');
    const aurtherTmg = document.querySelectorAll('.forum .aurtherTmg');
    const username = document.querySelectorAll('.forum .anName');//用户名
    const Userphoto = document.querySelectorAll('.forum .photo img');//用户头像
    const UserTime = document.querySelectorAll('.forum .anTime')
    // console.log(Userphoto);


    //---------获取数据---------------
    // 引入功能函数并应用


    // const p = new Promise((resolve, reject) => {
    //     const DT = new XMLHttpRequest();
    //     DT.responseType = 'json';
    //     DT.open('get', "http://192.168.43.157:8080/rasaProject/getDynamicServlet?start=0");
    //     DT.send();
    //     DT.onreadystatechange = function () {
    //         if (DT.readyState === 4) {
    //             if (DT.status >= 200 && DT.status < 300) {
    //                 resolve(DT.response);
    //             } else {
    //                 reject(DT.status);

    //             }
    //         }
    //     }
    // });

    //引入模块后直接处理----------------(一)
    var start;//选择开始的位置
    forumFirst(start).then(res => {
        console.log(res);//返回地址传递过来的所有信息
        const DTArray = res.data;
        console.log(DTArray);//获得所有返回结果
        // 根据返回数据个数复刻forum个数
        for (let i = 0; i < DTArray.length - 1; i++) {//j=每个forum
            const forumTemplet = forum.cloneNode(true);//深复制forum
            // 将forum装在大盒子里面的末尾        --->这里后面需要一个函数来判断要插到哪里！！！！而不是死板的放在最后
            hotNewBody.appendChild(forumTemplet);
            //  用户的id值(后续需要)  其声明在最顶部
            authorId = DTArray.authodId;


            // ------------------------------------------（二）
            getAuthor(authorId).then(res => {
                console.log(res);//返回地址传递过来的所有信息
                // 后续处理
                const UserArray = res.data;
                username[i].innerHTML = UserArray.username;
                Userphoto[i].src = UserArray.head;
            })

            // 用户文案
            aurtherSay[i].innerHTML = DTArray.content;
            // 用户图片地址(后续这里会有对应的id值判断)
            const imgFile = DTArray.imgFile;
            // -------------------------------------------（三）
            forumPhotoGain().then(res => {

            });


            // 用户发布时间
            UserTime.innerText = DTArray.time;
            //  用户图片个数
            const imgcount = DTArray.imgcount;
            // 创建li>img函数  生成存放照片的盒子
            function creatLi2(imgcount) {
                let lis = [];
                for (let k = 1; k <= imgcount; k++) {//框架
                    lis[k] = '<li><img src="" alt=""></li>';//可更换为想要的格式
                }
                return lis.join('');//数组转化为字符串
            }
            aurtherTmg.innerHTML = creatLi2(imgcount);

            // 用户获赞数
            aixinText[i] = DTArray.zcount;

        }

    }).catch(err => {
        console.log(err);
    })


    // 用p.then(function(value){},function(reson){})来完成需要工作，上面的就不用动它
    // p.then(value => {
    //     console.log(value);//返回地址传递过来的所有信息
    //     const DTArray = value.data;
    //     console.log(DTArray);//获得所有返回结果


    //     // 根据返回数据个数复刻forum个数
    //     for (let i = 0; i < DTArray.length - 1; i++) {//j=每个forum
    //         const forumTemplet = forum.cloneNode(true);//深复制forum
    //         // 将forum装在大盒子里面的末尾        --->这里后面需要一个函数来判断要插到哪里！！！！而不是死板的放在最后
    //         hotNewBody.appendChild(forumTemplet);
    //         //  用户的id值(后续需要)  其声明在最顶部
    //         authorId = DTArray.authodId;
    //         getUser(authorId).then(res => {

    //         })

    //         // 用户文案
    //         aurtherSay[i].innerHTML = DTArray.content;
    //         // 用户图片地址(后续这里会有对应的id值判断)----------------
    //         const imgFile = DTArray.imgFile;
    //         //  用户图片个数
    //         const imgcount = DTArray.imgcount;
    //         // 创建li>img函数  生成存放照片的盒子
    //         function creatLi2(num) {
    //             let lis = [];
    //             for (let k = 1; k <= num; k++) {//框架
    //                 lis[k] = '<li><img src="" alt=""></li>';//可更换为想要的格式
    //             }
    //             return lis.join('');//数组转化为字符串
    //         }
    //         aurtherTmg.innerHTML = creatLi2(imgcount);

    //         // 用户获赞数
    //         aixinText[i] = DTArray.zcount;

    //     }
    // }, reason => {
    //     console.log(reason);//0
    // });





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


}