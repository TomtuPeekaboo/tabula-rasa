
// 引入功能函数并应用
import { request } from './functionalFunction.js'


// const address = 'http://175.178.7.180:8080/rasaProject/';  //服务器
// const address = 'http://localhost:8080/rasaProject_war_exploded/'  //707生产环境
const address = '';

// 动态区域第一次发送请求，可获得用户id
// 这里的start是指从第几条动态开始访问  要设置一个start循环，每次+5
function forumFirst(start, msg) {

    return request(address + 'getDynamicServlet', { "start": start, "msg": msg }, null, 'post');
}

// 从第一次请求找到用户信息id
function getAuthor(authorId) {
    return request(address + 'getUserServlet', { "id": authorId });
}

// 搜索打字过程返回关键字
function getSearchKey(key) {
    return request(address + 'getUserServlet', { "key": key });
}

// 获取朋友
function getFansServlet(type) {
    return request(address + 'getFansServlet', { "type": type });
}

// 搜索功能
function getFindResult(start, msg) {
    return request(address + 'getUserServlet', { 'start': start, 'msg': msg }, null, 'post');
}

// 话题获取
function gethotTalk() {
    return request(address + 'getTopicServlet', {});
}
// 评论获取
function getComment(articleId) {
    return request(address + 'getCommentServlet', { "articleId": articleId });
}

// 下载图片
function getPhoto(imgFile, count) {
    return request(address + 'downLoadImgServlet', { "imgFile": imgFile, "count": count }, null, 'post');
}

// 发表评论
function saveComment(articleId, comment, authodId) {
    return request(address + 'saveCommentServlet', { "articleId": articleId, "comment": comment, "authodId": authodId }, null, 'post');
}

// 获取登录者的信息
function getAdmin() {
    return request(address + 'getAdminServlet', {});
}


// 保存关注
function saveFollow(id) {
    return request(address + 'saveFollowServlet', { "id": id });
}
// 判断是否已经点赞
function IsFollow(userid) {
    return request(address + 'getIsFallowServlet', { "userid": userid }, null, 'post');
}
// 取消关注
function delFollow(userid) {
    return request(address + 'delFollowServlet', { "userid": userid }, null, 'post');
}

// 保存点赞
function saveFabulou(articleId, userid) {
    return request(address + 'saveFabulousServlet', { "articleId": articleId, "userid": userid }, null, 'post');
}
// 判断是否已经点赞
function IsFaulou(articleId) {
    return request(address + 'getIsFaulousServlet', { "articleId": articleId }, null, 'post');
}
// 取消点赞
function delFabulou(articleId) {
    return request(address + 'delFabulousServlet', { "articleId": articleId }, null, 'post');
}

function getMyArticle() {
    return request(address + 'getMyDynamicServlet', {});
}
function getConnection(uid) {
    // uid=uid.replace(/(^\s*)|(\s*$)/g,'');
    if (uid == '' || uid == undefined || uid == null) {
        alert("请填写用户名");
    }
    let websocket = null;
    // websocket = new WebSocket('ws://localhost:8080/rasaProject/communctionServlet/' + uid);
    // websocket = new WebSocket('ws://localhost:8080/rasaProject_war_exploded/communctionServlet/' + uid)
    websocket = new WebSocket('ws://175.178.7.180:8080/rasaProject/communctionServlet/' + uid)
    return websocket;
}

// 统一暴露
export { forumFirst, getAuthor, getSearchKey, gethotTalk, getFindResult, getFansServlet, getComment, getPhoto, saveComment, getAdmin, IsFollow, delFollow, saveFollow, saveFabulou, IsFaulou, delFabulou, getMyArticle, getConnection };