
// 引入功能函数并应用
import { request } from './functionalFunction.js'



// 动态区域第一次发送请求，可获得用户id
// 这里的start是指从第几条动态开始访问  要设置一个start循环，每次+5
function forumFirst(start) {
    return request('getDynamicServlet', { "start": start });
}


// 动态区用户信息
// 从第一次请求找到用户信息id
function getAuthor(authorId) {
    return request('getUserServlet', { "id": authorId });
}

// 搜索打字过程返回关键字
function getSearchKey(key) {
    return request('getUserServlet', { "key": key });
}

// 搜索功能
function getFindResult(value) {
    return request('getUserServlet', { "value": value });
}

// 话题获取
function gethotTalk() {
    return request('getUserServlet', {});
}
// 统一暴露
export { forumFirst, getAuthor, getSearchKey, gethotTalk, getFindResult };