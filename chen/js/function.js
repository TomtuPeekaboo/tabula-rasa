
// 引入功能函数并应用
import { request } from './functionalFunction.js'


// const address = 'http://192.168.0.161:8080/rasaProject/';
const address ='';
// const address = 'http://172.20.10.2:8080/rasaProject';//队长热点

// 动态区域第一次发送请求，可获得用户id
// 这里的start是指从第几条动态开始访问  要设置一个start循环，每次+5
function forumFirst(start, msg) {
    return request(address + 'getDynamicServlet', { "start": start, "msg": msg });
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
function getFansServlet() {
    return request(address + 'getFansServlet');
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

// 保存点赞
function saveFabulou(articleId, userid) {
    return request(address + 'saveFabulousServlet', { "articleId": articleId, "userid": userid }, null, 'post');
}



// 统一暴露
export { forumFirst, getAuthor, getSearchKey, gethotTalk, getFindResult, getFansServlet, getComment, getPhoto, saveComment, getAdmin, saveFollow, saveFabulou };