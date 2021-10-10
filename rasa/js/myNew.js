import { forumFirst, getAuthor, getSearchKey, gethotTalk, getFindResult, getFansServlet, getComment, getPhoto, saveComment, getAdmin, saveFollow, saveFabulou, IsFaulou, delFabulou, IsFollow, delFollow, getMyArticle } from './function.js'
window.addEventListener('load', () => {
    // const address = 'http://175.178.7.180:8080/rasaProject/';
    // const address = 'http://localhost:8080/rasaProject_war_exploded/'
    const address=''
    // 消息
    let ringplate = document.querySelectorAll('.ringContent span');
    let ringTixing = document.querySelector('.ring span.ringTixing');
    let ringplateI = document.querySelectorAll('.ringContent span i.redPoint');
    let ringcount = 0;
    for (let i = 0; i < ringplate.length; i++) {
        ringplate[i].addEventListener('click', () => {
            ringcount = ringcount + 1;
            if (ringcount == 4) {
                ringTixing.className = "ringTixing";
            }
            ringplateI[i].className = "";//清空类名
        });

    }

    // 编辑区
    let ring = document.querySelector('.ring');
    let person = document.querySelector('.person');
    let ringContent = document.querySelector('.ringContent');
    let personContent = document.querySelector('.personContent');

    function Click(obj, tar) {
        obj.addEventListener('click', (e) => {
            if (tar.style.display == 'none') {
                tar.style.display = 'block';
            } else {
                tar.style.display = 'none';
            }
            e.stopPropagation();
        });
        document.addEventListener('click', () => {
            if (tar.style.display == 'block') {
                tar.style.display = 'none';
            }
        })
    }
    Click(ring, ringContent);
    Click(person, personContent);

    const searchArea = document.querySelector('.search input');
    const adminNameBox = document.querySelector('.navShow .person p img');//登录者头像


    // 获取粉丝跟关注
    const aurFans = document.querySelector('.relative .fs span');
    const aurfollow = document.querySelector('.relative .gz span');
    const follow = 'follow';
    const fan = 'fan';
    getFansServlet(follow).then(res => {
        aurfollow.innerHTML = res.data.length;
    });
    getFansServlet(fan).then(res => {
        aurFans.innerHTML = res.data.length;
    });
    // 获取登录者的信息
    const aurImg = document.querySelector('.aurPh img');//头像
    const ATname = document.querySelector('.aurT .ATname');//昵称
    const zt = document.querySelector('.zt');//状态
    const phone = document.querySelector('.qm');//手机号码
    const autTaddress = document.querySelector('.data .address');//地址
    const email = document.querySelector('.joinT');


    getAdmin().then(res => {
        const aurNew = res.data;
        ATname.innerHTML = aurNew.username;
        zt.innerHTML = aurNew.type + '...';
        phone.innerHTML = aurNew.phone;
        autTaddress.innerHTML = aurNew.province + '省' + aurNew.city + '市' + aurNew.county + '区';
        aurImg.src = address + "getUserHeadServlet?userid=" + aurNew.id + "&count=0";
        adminNameBox.src = address + "getUserHeadServlet?userid=" + aurNew.id + "&count=0";
        email.innerHTML = aurNew.email;
    });
    const hto = document.querySelector(".hotNewBody");
    getMyArticle().then(res => {
        const articleData = res.data;
        for (let i = articleData.length - 1; i >= 0; i--) {
            let data = articleData[i];
            let forum = addClass('forum');
            let circleBefore = addClass('circleBefore');
            let aurther = addClass('aurther');
            let photo = addClass('photo');

            photo.innerHTML = "<img src='" + address + "getUserHeadServlet?userid=" + data.authodId + "&count=0'>";
            let aurtherName = addClass('aurtherName');
            aurtherName.innerHTML = "<p class='anName'>" + data.authod + "</p><p class='anTime'>" + data.time + "</p>";
            let delete1 = addClass('delete');
            delete1.innerHTML = "删除";
            delete1.addEventListener('click', function () {
                let x = new XMLHttpRequest();
                x.open("get", "delArticleServlet?articleId=" + data.id);
                x.send();
                x.onreadystatechange = function () {
                    let json = JSON.parse(x.responseText);
                    if (json.code == 200) {
                        window.location.href = "myNew.html"
                    }
                }

            })
            aurther.append(photo, aurtherName, delete1);
            let aurtherSay = addClass('aurtherSay');
            aurtherSay.innerHTML = "<p>" + data.content + "</p>"
            let clearfix = addClass('clearfix');
            clearfix.setAttribute('class', 'aurtherTmg');
            let result = "";
            for (let j = 0; j < data.imgcount; j++) {
                result = result + "<li><img src='" + address + "getDynamicImgServlet?imgFiles=" + data.imgFiles + "&count=" + j + "&type=img'></li>";
            }
            clearfix.innerHTML = result;
            let forumFooter = addClass('forumFooter');
            let zf = addClass('zf');
            zf.innerHTML = "<span class='iconfont icon-zhuanfa'></span>转发";
            let pl = addClass("pl");
            pl.innerHTML = "<span class='iconfont icon-pinglun'></span>" + "评论"
            let aixin = addClass("aixin");
            aixin.innerHTML = "<span class='iconfont icon-aixin'></span><div class='tow'>" + data.zcount + "</div>"
            forumFooter.append(zf, pl, aixin);
            forum.append(circleBefore, aurther, aurtherSay, clearfix, forumFooter);
            hto.append(forum);
        }
    })

    function addClass(args) {
        let data = document.createElement('div');
        data.setAttribute('class', args)
        return data;
    }

    //编辑资料状态区域
    let editor = document.querySelector('.editor');
    let editData = document.querySelector('.editData');
    let data = document.querySelector('.data');
    let esBoxTitle = document.querySelector('.esBoxTitle');
    let esBoxContent = document.querySelector('.esBoxContent');
    let esBoxContentP = document.querySelectorAll('.esBoxContent p');
    editor.addEventListener('click', () => {
        if (editData.style.display == 'block') {
            data.style.display = 'block';
            editData.style.display = 'none';
            editor.innerHTML = '编辑资料';
        } else {
            data.style.display = 'none';
            editData.style.display = 'block';
            editor.innerHTML = '确认修改';
        }
    });
    esBoxTitle.addEventListener('click', () => {
        if (esBoxContent.style.display == 'none') {
            esBoxContent.style.display = 'block';
        } else {
            esBoxContent.style.display = 'none';
        }
    });
    for (let i = 0; i < esBoxContentP.length; i++) {
        esBoxContentP[i].addEventListener('click', () => {
            esBoxTitle.innerHTML = esBoxContentP[i].innerHTML;
            esBoxTitle.className = 'esBoxTitle ' + esBoxContentP[i].className;
            esBoxContent.style.display = 'none'
        });
    }

    const json = [
        {
            "id": "110000",
            "name": "北京",
            "list": [
                {
                    "id": "110000",
                    "name": "北京"
                }
            ]
        },
        {
            "id": "120000",
            "name": "天津",
            "list": [
                {
                    "id": "120000",
                    "name": "天津"
                }
            ]
        },
        {
            "id": "130000",
            "name": "河北",
            "list": [
                {
                    "id": "130100",
                    "name": "石家庄"
                },
                {
                    "id": "130200",
                    "name": "唐山"
                },
                {
                    "id": "130300",
                    "name": "秦皇岛"
                },
                {
                    "id": "130400",
                    "name": "邯郸"
                },
                {
                    "id": "130500",
                    "name": "邢台"
                },
                {
                    "id": "130600",
                    "name": "保定"
                },
                {
                    "id": "130700",
                    "name": "张家口"
                },
                {
                    "id": "130800",
                    "name": "承德"
                },
                {
                    "id": "130900",
                    "name": "沧州"
                },
                {
                    "id": "131000",
                    "name": "廊坊"
                },
                {
                    "id": "131100",
                    "name": "衡水"
                }
            ]
        },
        {
            "id": "140000",
            "name": "山西",
            "list": [
                {
                    "id": "140100",
                    "name": "太原"
                },
                {
                    "id": "140200",
                    "name": "大同"
                },
                {
                    "id": "140300",
                    "name": "阳泉"
                },
                {
                    "id": "140400",
                    "name": "长治"
                },
                {
                    "id": "140500",
                    "name": "晋城"
                },
                {
                    "id": "140600",
                    "name": "朔州"
                },
                {
                    "id": "140700",
                    "name": "晋中"
                },
                {
                    "id": "140800",
                    "name": "运城"
                },
                {
                    "id": "140900",
                    "name": "忻州"
                },
                {
                    "id": "141000",
                    "name": "临汾"
                },
                {
                    "id": "141100",
                    "name": "吕梁"
                }
            ]
        },
        {
            "id": "150000",
            "name": "内蒙古",
            "list": [
                {
                    "id": "150100",
                    "name": "呼和浩特"
                },
                {
                    "id": "150200",
                    "name": "包头"
                },
                {
                    "id": "150300",
                    "name": "乌海"
                },
                {
                    "id": "150400",
                    "name": "赤峰"
                },
                {
                    "id": "150500",
                    "name": "通辽"
                },
                {
                    "id": "150600",
                    "name": "鄂尔多斯"
                },
                {
                    "id": "150700",
                    "name": "呼伦贝尔"
                },
                {
                    "id": "150800",
                    "name": "巴彦淖尔"
                },
                {
                    "id": "150900",
                    "name": "乌兰察布"
                },
                {
                    "id": "152200",
                    "name": "兴安"
                },
                {
                    "id": "152500",
                    "name": "锡林郭勒"
                },
                {
                    "id": "152900",
                    "name": "阿拉善"
                }
            ]
        },
        {
            "id": "210000",
            "name": "辽宁",
            "list": [
                {
                    "id": "210100",
                    "name": "沈阳"
                },
                {
                    "id": "210200",
                    "name": "大连"
                },
                {
                    "id": "210300",
                    "name": "鞍山"
                },
                {
                    "id": "210400",
                    "name": "抚顺"
                },
                {
                    "id": "210500",
                    "name": "本溪"
                },
                {
                    "id": "210600",
                    "name": "丹东"
                },
                {
                    "id": "210700",
                    "name": "锦州"
                },
                {
                    "id": "210800",
                    "name": "营口"
                },
                {
                    "id": "210900",
                    "name": "阜新"
                },
                {
                    "id": "211000",
                    "name": "辽阳"
                },
                {
                    "id": "211100",
                    "name": "盘锦"
                },
                {
                    "id": "211200",
                    "name": "铁岭"
                },
                {
                    "id": "211300",
                    "name": "朝阳"
                },
                {
                    "id": "211400",
                    "name": "葫芦岛"
                }
            ]
        },
        {
            "id": "220000",
            "name": "吉林",
            "list": [
                {
                    "id": "220100",
                    "name": "长春"
                },
                {
                    "id": "220200",
                    "name": "吉林"
                },
                {
                    "id": "220300",
                    "name": "四平"
                },
                {
                    "id": "220400",
                    "name": "辽源"
                },
                {
                    "id": "220500",
                    "name": "通化"
                },
                {
                    "id": "220600",
                    "name": "白山"
                },
                {
                    "id": "220700",
                    "name": "松原"
                },
                {
                    "id": "220800",
                    "name": "白城"
                },
                {
                    "id": "222400",
                    "name": "延边"
                }
            ]
        },
        {
            "id": "230000",
            "name": "黑龙江",
            "list": [
                {
                    "id": "230100",
                    "name": "哈尔滨"
                },
                {
                    "id": "230200",
                    "name": "齐齐哈尔"
                },
                {
                    "id": "230300",
                    "name": "鸡西"
                },
                {
                    "id": "230400",
                    "name": "鹤岗"
                },
                {
                    "id": "230500",
                    "name": "双鸭山"
                },
                {
                    "id": "230600",
                    "name": "大庆"
                },
                {
                    "id": "230700",
                    "name": "伊春"
                },
                {
                    "id": "230800",
                    "name": "佳木斯"
                },
                {
                    "id": "230900",
                    "name": "七台河"
                },
                {
                    "id": "231000",
                    "name": "牡丹江"
                },
                {
                    "id": "231100",
                    "name": "黑河"
                },
                {
                    "id": "231200",
                    "name": "绥化"
                },
                {
                    "id": "232700",
                    "name": "大兴安岭"
                }
            ]
        },
        {
            "id": "310000",
            "name": "上海",
            "list": [
                {
                    "id": "310000",
                    "name": "上海"
                }
            ]
        },
        {
            "id": "320000",
            "name": "江苏",
            "list": [
                {
                    "id": "320100",
                    "name": "南京"
                },
                {
                    "id": "320200",
                    "name": "无锡"
                },
                {
                    "id": "320300",
                    "name": "徐州"
                },
                {
                    "id": "320400",
                    "name": "常州"
                },
                {
                    "id": "320500",
                    "name": "苏州"
                },
                {
                    "id": "320600",
                    "name": "南通"
                },
                {
                    "id": "320700",
                    "name": "连云港"
                },
                {
                    "id": "320800",
                    "name": "淮安"
                },
                {
                    "id": "320900",
                    "name": "盐城"
                },
                {
                    "id": "321000",
                    "name": "扬州"
                },
                {
                    "id": "321100",
                    "name": "镇江"
                },
                {
                    "id": "321200",
                    "name": "泰州"
                },
                {
                    "id": "321300",
                    "name": "宿迁"
                }
            ]
        },
        {
            "id": "330000",
            "name": "浙江",
            "list": [
                {
                    "id": "330100",
                    "name": "杭州"
                },
                {
                    "id": "330200",
                    "name": "宁波"
                },
                {
                    "id": "330300",
                    "name": "温州"
                },
                {
                    "id": "330400",
                    "name": "嘉兴"
                },
                {
                    "id": "330500",
                    "name": "湖州"
                },
                {
                    "id": "330600",
                    "name": "绍兴"
                },
                {
                    "id": "330700",
                    "name": "金华"
                },
                {
                    "id": "330800",
                    "name": "衢州"
                },
                {
                    "id": "330900",
                    "name": "舟山"
                },
                {
                    "id": "331000",
                    "name": "台州"
                },
                {
                    "id": "331100",
                    "name": "丽水"
                }
            ]
        },
        {
            "id": "340000",
            "name": "安徽",
            "list": [
                {
                    "id": "340100",
                    "name": "合肥"
                },
                {
                    "id": "340200",
                    "name": "芜湖"
                },
                {
                    "id": "340300",
                    "name": "蚌埠"
                },
                {
                    "id": "340400",
                    "name": "淮南"
                },
                {
                    "id": "340500",
                    "name": "马鞍山"
                },
                {
                    "id": "340600",
                    "name": "淮北"
                },
                {
                    "id": "340700",
                    "name": "铜陵"
                },
                {
                    "id": "340800",
                    "name": "安庆"
                },
                {
                    "id": "341000",
                    "name": "黄山"
                },
                {
                    "id": "341100",
                    "name": "滁州"
                },
                {
                    "id": "341200",
                    "name": "阜阳"
                },
                {
                    "id": "341300",
                    "name": "宿州"
                },
                {
                    "id": "341500",
                    "name": "六安"
                },
                {
                    "id": "341600",
                    "name": "亳州"
                },
                {
                    "id": "341700",
                    "name": "池州"
                },
                {
                    "id": "341800",
                    "name": "宣城"
                }
            ]
        },
        {
            "id": "350000",
            "name": "福建",
            "list": [
                {
                    "id": "350100",
                    "name": "福州"
                },
                {
                    "id": "350200",
                    "name": "厦门"
                },
                {
                    "id": "350300",
                    "name": "莆田"
                },
                {
                    "id": "350400",
                    "name": "三明"
                },
                {
                    "id": "350500",
                    "name": "泉州"
                },
                {
                    "id": "350600",
                    "name": "漳州"
                },
                {
                    "id": "350700",
                    "name": "南平"
                },
                {
                    "id": "350800",
                    "name": "龙岩"
                },
                {
                    "id": "350900",
                    "name": "宁德"
                }
            ]
        },
        {
            "id": "360000",
            "name": "江西",
            "list": [
                {
                    "id": "360100",
                    "name": "南昌"
                },
                {
                    "id": "360200",
                    "name": "景德镇"
                },
                {
                    "id": "360300",
                    "name": "萍乡"
                },
                {
                    "id": "360400",
                    "name": "九江"
                },
                {
                    "id": "360500",
                    "name": "新余"
                },
                {
                    "id": "360600",
                    "name": "鹰潭"
                },
                {
                    "id": "360700",
                    "name": "赣州"
                },
                {
                    "id": "360800",
                    "name": "吉安"
                },
                {
                    "id": "360900",
                    "name": "宜春"
                },
                {
                    "id": "361000",
                    "name": "抚州"
                },
                {
                    "id": "361100",
                    "name": "上饶"
                }
            ]
        },
        {
            "id": "370000",
            "name": "山东",
            "list": [
                {
                    "id": "370100",
                    "name": "济南"
                },
                {
                    "id": "370200",
                    "name": "青岛"
                },
                {
                    "id": "370300",
                    "name": "淄博"
                },
                {
                    "id": "370400",
                    "name": "枣庄"
                },
                {
                    "id": "370500",
                    "name": "东营"
                },
                {
                    "id": "370600",
                    "name": "烟台"
                },
                {
                    "id": "370700",
                    "name": "潍坊"
                },
                {
                    "id": "370800",
                    "name": "济宁"
                },
                {
                    "id": "370900",
                    "name": "泰安"
                },
                {
                    "id": "371000",
                    "name": "威海"
                },
                {
                    "id": "371100",
                    "name": "日照"
                },
                {
                    "id": "371300",
                    "name": "临沂"
                },
                {
                    "id": "371400",
                    "name": "德州"
                },
                {
                    "id": "371500",
                    "name": "聊城"
                },
                {
                    "id": "371600",
                    "name": "滨州"
                },
                {
                    "id": "371700",
                    "name": "菏泽"
                }
            ]
        },
        {
            "id": "410000",
            "name": "河南",
            "list": [
                {
                    "id": "410100",
                    "name": "郑州"
                },
                {
                    "id": "410200",
                    "name": "开封"
                },
                {
                    "id": "410300",
                    "name": "洛阳"
                },
                {
                    "id": "410400",
                    "name": "平顶山"
                },
                {
                    "id": "410500",
                    "name": "安阳"
                },
                {
                    "id": "410600",
                    "name": "鹤壁"
                },
                {
                    "id": "410700",
                    "name": "新乡"
                },
                {
                    "id": "410800",
                    "name": "焦作"
                },
                {
                    "id": "410900",
                    "name": "濮阳"
                },
                {
                    "id": "411000",
                    "name": "许昌"
                },
                {
                    "id": "411100",
                    "name": "漯河"
                },
                {
                    "id": "411200",
                    "name": "三门峡"
                },
                {
                    "id": "411300",
                    "name": "南阳"
                },
                {
                    "id": "411400",
                    "name": "商丘"
                },
                {
                    "id": "411500",
                    "name": "信阳"
                },
                {
                    "id": "411600",
                    "name": "周口"
                },
                {
                    "id": "411700",
                    "name": "驻马店"
                },
                {
                    "id": "419001",
                    "name": "济源"
                }
            ]
        },
        {
            "id": "420000",
            "name": "湖北",
            "list": [
                {
                    "id": "420100",
                    "name": "武汉"
                },
                {
                    "id": "420200",
                    "name": "黄石"
                },
                {
                    "id": "420300",
                    "name": "十堰"
                },
                {
                    "id": "420500",
                    "name": "宜昌"
                },
                {
                    "id": "420600",
                    "name": "襄阳"
                },
                {
                    "id": "420700",
                    "name": "鄂州"
                },
                {
                    "id": "420800",
                    "name": "荆门"
                },
                {
                    "id": "420900",
                    "name": "孝感"
                },
                {
                    "id": "421000",
                    "name": "荆州"
                },
                {
                    "id": "421100",
                    "name": "黄冈"
                },
                {
                    "id": "421200",
                    "name": "咸宁"
                },
                {
                    "id": "421300",
                    "name": "随州"
                },
                {
                    "id": "422800",
                    "name": "恩施"
                },
                {
                    "id": "429004",
                    "name": "仙桃"
                },
                {
                    "id": "429005",
                    "name": "潜江"
                },
                {
                    "id": "429006",
                    "name": "天门"
                },
                {
                    "id": "429021",
                    "name": "神农架"
                }
            ]
        },
        {
            "id": "430000",
            "name": "湖南",
            "list": [
                {
                    "id": "430100",
                    "name": "长沙"
                },
                {
                    "id": "430200",
                    "name": "株洲"
                },
                {
                    "id": "430300",
                    "name": "湘潭"
                },
                {
                    "id": "430400",
                    "name": "衡阳"
                },
                {
                    "id": "430500",
                    "name": "邵阳"
                },
                {
                    "id": "430600",
                    "name": "岳阳"
                },
                {
                    "id": "430700",
                    "name": "常德"
                },
                {
                    "id": "430800",
                    "name": "张家界"
                },
                {
                    "id": "430900",
                    "name": "益阳"
                },
                {
                    "id": "431000",
                    "name": "郴州"
                },
                {
                    "id": "431100",
                    "name": "永州"
                },
                {
                    "id": "431200",
                    "name": "怀化"
                },
                {
                    "id": "431300",
                    "name": "娄底"
                },
                {
                    "id": "433100",
                    "name": "湘西"
                }
            ]
        },
        {
            "id": "440000",
            "name": "广东",
            "list": [
                {
                    "id": "440100",
                    "name": "广州"
                },
                {
                    "id": "440200",
                    "name": "韶关"
                },
                {
                    "id": "440300",
                    "name": "深圳"
                },
                {
                    "id": "440400",
                    "name": "珠海"
                },
                {
                    "id": "440500",
                    "name": "汕头"
                },
                {
                    "id": "440600",
                    "name": "佛山"
                },
                {
                    "id": "440700",
                    "name": "江门"
                },
                {
                    "id": "440800",
                    "name": "湛江"
                },
                {
                    "id": "440900",
                    "name": "茂名"
                },
                {
                    "id": "441200",
                    "name": "肇庆"
                },
                {
                    "id": "441300",
                    "name": "惠州"
                },
                {
                    "id": "441400",
                    "name": "梅州"
                },
                {
                    "id": "441500",
                    "name": "汕尾"
                },
                {
                    "id": "441600",
                    "name": "河源"
                },
                {
                    "id": "441700",
                    "name": "阳江"
                },
                {
                    "id": "441800",
                    "name": "清远"
                },
                {
                    "id": "441900",
                    "name": "东莞"
                },
                {
                    "id": "442000",
                    "name": "中山"
                },
                {
                    "id": "445100",
                    "name": "潮州"
                },
                {
                    "id": "445200",
                    "name": "揭阳"
                },
                {
                    "id": "445300",
                    "name": "云浮"
                }
            ]
        },
        {
            "id": "450000",
            "name": "广西",
            "list": [
                {
                    "id": "450100",
                    "name": "南宁"
                },
                {
                    "id": "450200",
                    "name": "柳州"
                },
                {
                    "id": "450300",
                    "name": "桂林"
                },
                {
                    "id": "450400",
                    "name": "梧州"
                },
                {
                    "id": "450500",
                    "name": "北海"
                },
                {
                    "id": "450600",
                    "name": "防城港"
                },
                {
                    "id": "450700",
                    "name": "钦州"
                },
                {
                    "id": "450800",
                    "name": "贵港"
                },
                {
                    "id": "450900",
                    "name": "玉林"
                },
                {
                    "id": "451000",
                    "name": "百色"
                },
                {
                    "id": "451100",
                    "name": "贺州"
                },
                {
                    "id": "451200",
                    "name": "河池"
                },
                {
                    "id": "451300",
                    "name": "来宾"
                },
                {
                    "id": "451400",
                    "name": "崇左"
                }
            ]
        },
        {
            "id": "460000",
            "name": "海南",
            "list": [
                {
                    "id": "460100",
                    "name": "海口"
                },
                {
                    "id": "460200",
                    "name": "三亚"
                },
                {
                    "id": "460300",
                    "name": "三沙"
                },
                {
                    "id": "460400",
                    "name": "儋州"
                },
                {
                    "id": "469001",
                    "name": "五指山"
                },
                {
                    "id": "469002",
                    "name": "琼海"
                },
                {
                    "id": "469005",
                    "name": "文昌"
                },
                {
                    "id": "469006",
                    "name": "万宁"
                },
                {
                    "id": "469007",
                    "name": "东方"
                },
                {
                    "id": "469021",
                    "name": "定安"
                },
                {
                    "id": "469022",
                    "name": "屯昌"
                },
                {
                    "id": "469023",
                    "name": "澄迈"
                },
                {
                    "id": "469024",
                    "name": "临高"
                },
                {
                    "id": "469025",
                    "name": "白沙"
                },
                {
                    "id": "469026",
                    "name": "昌江"
                },
                {
                    "id": "469027",
                    "name": "乐东"
                },
                {
                    "id": "469028",
                    "name": "陵水"
                },
                {
                    "id": "469029",
                    "name": "保亭"
                },
                {
                    "id": "469030",
                    "name": "琼中"
                }
            ]
        },
        {
            "id": "500000",
            "name": "重庆",
            "list": [
                {
                    "id": "500000",
                    "name": "重庆"
                }
            ]
        },
        {
            "id": "510000",
            "name": "四川",
            "list": [
                {
                    "id": "510100",
                    "name": "成都"
                },
                {
                    "id": "510300",
                    "name": "自贡"
                },
                {
                    "id": "510400",
                    "name": "攀枝花"
                },
                {
                    "id": "510500",
                    "name": "泸州"
                },
                {
                    "id": "510600",
                    "name": "德阳"
                },
                {
                    "id": "510700",
                    "name": "绵阳"
                },
                {
                    "id": "510800",
                    "name": "广元"
                },
                {
                    "id": "510900",
                    "name": "遂宁"
                },
                {
                    "id": "511000",
                    "name": "内江"
                },
                {
                    "id": "511100",
                    "name": "乐山"
                },
                {
                    "id": "511300",
                    "name": "南充"
                },
                {
                    "id": "511400",
                    "name": "眉山"
                },
                {
                    "id": "511500",
                    "name": "宜宾"
                },
                {
                    "id": "511600",
                    "name": "广安"
                },
                {
                    "id": "511700",
                    "name": "达州"
                },
                {
                    "id": "511800",
                    "name": "雅安"
                },
                {
                    "id": "511900",
                    "name": "巴中"
                },
                {
                    "id": "512000",
                    "name": "资阳"
                },
                {
                    "id": "513200",
                    "name": "阿坝"
                },
                {
                    "id": "513300",
                    "name": "甘孜"
                },
                {
                    "id": "513400",
                    "name": "凉山"
                }
            ]
        },
        {
            "id": "520000",
            "name": "贵州",
            "list": [
                {
                    "id": "520100",
                    "name": "贵阳"
                },
                {
                    "id": "520200",
                    "name": "六盘水"
                },
                {
                    "id": "520300",
                    "name": "遵义"
                },
                {
                    "id": "520400",
                    "name": "安顺"
                },
                {
                    "id": "520500",
                    "name": "毕节"
                },
                {
                    "id": "520600",
                    "name": "铜仁"
                },
                {
                    "id": "522300",
                    "name": "黔西南"
                },
                {
                    "id": "522600",
                    "name": "黔东南"
                },
                {
                    "id": "522700",
                    "name": "黔南"
                }
            ]
        },
        {
            "id": "530000",
            "name": "云南",
            "list": [
                {
                    "id": "530100",
                    "name": "昆明"
                },
                {
                    "id": "530300",
                    "name": "曲靖"
                },
                {
                    "id": "530400",
                    "name": "玉溪"
                },
                {
                    "id": "530500",
                    "name": "保山"
                },
                {
                    "id": "530600",
                    "name": "昭通"
                },
                {
                    "id": "530700",
                    "name": "丽江"
                },
                {
                    "id": "530800",
                    "name": "普洱"
                },
                {
                    "id": "530900",
                    "name": "临沧"
                },
                {
                    "id": "532300",
                    "name": "楚雄"
                },
                {
                    "id": "532500",
                    "name": "红河"
                },
                {
                    "id": "532600",
                    "name": "文山"
                },
                {
                    "id": "532800",
                    "name": "西双版纳"
                },
                {
                    "id": "532900",
                    "name": "大理"
                },
                {
                    "id": "533100",
                    "name": "德宏"
                },
                {
                    "id": "533300",
                    "name": "怒江"
                },
                {
                    "id": "533400",
                    "name": "迪庆"
                }
            ]
        },
        {
            "id": "540000",
            "name": "西藏",
            "list": [
                {
                    "id": "540100",
                    "name": "拉萨"
                },
                {
                    "id": "540200",
                    "name": "日喀则"
                },
                {
                    "id": "540300",
                    "name": "昌都"
                },
                {
                    "id": "540400",
                    "name": "林芝"
                },
                {
                    "id": "540500",
                    "name": "山南"
                },
                {
                    "id": "540600",
                    "name": "那曲"
                },
                {
                    "id": "542500",
                    "name": "阿里"
                }
            ]
        },
        {
            "id": "610000",
            "name": "陕西",
            "list": [
                {
                    "id": "610100",
                    "name": "西安"
                },
                {
                    "id": "610200",
                    "name": "铜川"
                },
                {
                    "id": "610300",
                    "name": "宝鸡"
                },
                {
                    "id": "610400",
                    "name": "咸阳"
                },
                {
                    "id": "610500",
                    "name": "渭南"
                },
                {
                    "id": "610600",
                    "name": "延安"
                },
                {
                    "id": "610700",
                    "name": "汉中"
                },
                {
                    "id": "610800",
                    "name": "榆林"
                },
                {
                    "id": "610900",
                    "name": "安康"
                },
                {
                    "id": "611000",
                    "name": "商洛"
                }
            ]
        },
        {
            "id": "620000",
            "name": "甘肃",
            "list": [
                {
                    "id": "620100",
                    "name": "兰州"
                },
                {
                    "id": "620200",
                    "name": "嘉峪关"
                },
                {
                    "id": "620300",
                    "name": "金昌"
                },
                {
                    "id": "620400",
                    "name": "白银"
                },
                {
                    "id": "620500",
                    "name": "天水"
                },
                {
                    "id": "620600",
                    "name": "武威"
                },
                {
                    "id": "620700",
                    "name": "张掖"
                },
                {
                    "id": "620800",
                    "name": "平凉"
                },
                {
                    "id": "620900",
                    "name": "酒泉"
                },
                {
                    "id": "621000",
                    "name": "庆阳"
                },
                {
                    "id": "621100",
                    "name": "定西"
                },
                {
                    "id": "621200",
                    "name": "陇南"
                },
                {
                    "id": "622900",
                    "name": "临夏"
                },
                {
                    "id": "623000",
                    "name": "甘南"
                }
            ]
        },
        {
            "id": "630000",
            "name": "青海",
            "list": [
                {
                    "id": "630100",
                    "name": "西宁"
                },
                {
                    "id": "630200",
                    "name": "海东"
                },
                {
                    "id": "632200",
                    "name": "海北"
                },
                {
                    "id": "632300",
                    "name": "黄南"
                },
                {
                    "id": "632500",
                    "name": "海南"
                },
                {
                    "id": "632600",
                    "name": "果洛"
                },
                {
                    "id": "632700",
                    "name": "玉树"
                },
                {
                    "id": "632800",
                    "name": "海西"
                }
            ]
        },
        {
            "id": "640000",
            "name": "宁夏",
            "list": [
                {
                    "id": "640100",
                    "name": "银川"
                },
                {
                    "id": "640200",
                    "name": "石嘴山"
                },
                {
                    "id": "640300",
                    "name": "吴忠"
                },
                {
                    "id": "640400",
                    "name": "固原"
                },
                {
                    "id": "640500",
                    "name": "中卫"
                }
            ]
        },
        {
            "id": "650000",
            "name": "新疆",
            "list": [
                {
                    "id": "650100",
                    "name": "乌鲁木齐"
                },
                {
                    "id": "650200",
                    "name": "克拉玛依"
                },
                {
                    "id": "650400",
                    "name": "吐鲁番"
                },
                {
                    "id": "650500",
                    "name": "哈密"
                },
                {
                    "id": "652300",
                    "name": "昌吉"
                },
                {
                    "id": "652700",
                    "name": "博州"
                },
                {
                    "id": "652800",
                    "name": "巴州"
                },
                {
                    "id": "652900",
                    "name": "阿克苏"
                },
                {
                    "id": "653000",
                    "name": "克州"
                },
                {
                    "id": "653100",
                    "name": "喀什"
                },
                {
                    "id": "653200",
                    "name": "和田"
                },
                {
                    "id": "654000",
                    "name": "伊犁"
                },
                {
                    "id": "654200",
                    "name": "塔城"
                },
                {
                    "id": "654300",
                    "name": "阿勒泰"
                },
                {
                    "id": "659001",
                    "name": "石河子"
                },
                {
                    "id": "659002",
                    "name": "阿拉尔"
                },
                {
                    "id": "659003",
                    "name": "图木舒克"
                },
                {
                    "id": "659004",
                    "name": "五家渠"
                },
                {
                    "id": "659005",
                    "name": "北屯"
                },
                {
                    "id": "659006",
                    "name": "铁门关"
                },
                {
                    "id": "659007",
                    "name": "双河"
                },
                {
                    "id": "659008",
                    "name": "可克达拉"
                },
                {
                    "id": "659009",
                    "name": "昆玉"
                },
                {
                    "id": "659010",
                    "name": "胡杨河"
                }
            ]
        },
        {
            "id": "710000",
            "name": "台湾",
            "list": [
                {
                    "id": "710100",
                    "name": "台北"
                },
                {
                    "id": "710200",
                    "name": "高雄"
                },
                {
                    "id": "710300",
                    "name": "台南"
                },
                {
                    "id": "710400",
                    "name": "台中"
                },
                {
                    "id": "710600",
                    "name": "南投"
                },
                {
                    "id": "710700",
                    "name": "基隆"
                },
                {
                    "id": "710800",
                    "name": "新竹"
                },
                {
                    "id": "710900",
                    "name": "嘉义"
                },
                {
                    "id": "711100",
                    "name": "新北"
                },
                {
                    "id": "711200",
                    "name": "宜兰"
                },
                {
                    "id": "711300",
                    "name": "新竹"
                },
                {
                    "id": "711400",
                    "name": "桃园"
                },
                {
                    "id": "711500",
                    "name": "苗栗"
                },
                {
                    "id": "711700",
                    "name": "彰化"
                },
                {
                    "id": "711900",
                    "name": "嘉义"
                },
                {
                    "id": "712100",
                    "name": "云林"
                },
                {
                    "id": "712400",
                    "name": "屏东"
                },
                {
                    "id": "712500",
                    "name": "台东"
                },
                {
                    "id": "712600",
                    "name": "花莲"
                },
                {
                    "id": "712700",
                    "name": "澎湖"
                }
            ]
        },
        {
            "id": "810000",
            "name": "香港",
            "list": [
                {
                    "id": "810000",
                    "name": "香港"
                }
            ]
        },
        {
            "id": "820000",
            "name": "澳门",
            "list": [
                {
                    "id": "820000",
                    "name": "澳门"
                }
            ]
        }
    ]
    let selectBox = document.querySelector('.selectBox');
    for (let i = 0; i < json.length; i++) {
        let listContent = '';//初始化
        for (let m = 0; m < json[i].list.length; m++) {
            listContent = '<span>' + json[i].list[m].name + '</span>' + listContent;
        }
        let selectLi = '<li><h1>' + json[i].name + '</h1><div class="selectDiv">' + listContent + '</div><li>';
        selectBox.innerHTML = selectBox.innerHTML + selectLi;//每轮都加上li
    }
    //地址选择
    const closeselect = document.querySelector('.close');
    let editAddrSpan = document.querySelectorAll('#editAddrSpan');
    let addressShow = document.querySelector('.addressShow');
    console.log(closeselect);
    closeselect.addEventListener('click', () => {
        addressShow.style.bottom = '-615px';
    });
    for (let i = 0; i < editAddrSpan.length; i++) {
        editAddrSpan[i].addEventListener('click', () => {
            if (addressShow.style.bottom == '-615px') {
                addressShow.style.bottom = '0px';
            } else {
                addressShow.style.bottom = '-615px';
            }
        });
    }
    let province = document.querySelector('.province input');
    let city = document.querySelector('.city input');
    let checkedSpan = document.querySelectorAll('.selectBox li span');
    for (let j = 0; j < checkedSpan.length; j++) {
        checkedSpan[j].addEventListener('click', () => {
            console.log(checkedSpan[j].parentNode.previousElementSibling.innerHTML);
            province.value = checkedSpan[j].parentNode.previousElementSibling.innerHTML;
            console.log(checkedSpan[j].innerHTML);
            city.value = checkedSpan[j].innerHTML;
            addressShow.style.bottom = '-615px';
        });
    }
});