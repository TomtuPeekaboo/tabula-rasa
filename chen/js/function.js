
// 引入功能函数并应用
import { request } from './functionalFunction.js'

// function login(no, pwd) {
//     return request('url', { no, pwd }, { token: 'aaa' }, 'post');
// }

// function getDisplayData(id) {
//     return request('url2', { id }, null, 'get');//返回一个promise对象
// }





// 动态区域第一次发送请求，可获得用户id
// 这里的start是指从第几条动态开始访问  要设置一个start循环，每次+5
function forumFirst(start) {
    return request('http://192.168.43.157:8080/rasaProject/getDynamicServlet', { "start": start });
}

// 动态区获取照片地址   
// 从第一次请求找到图片地址id并传入
function forumPhotoGain(photoId) {
    return request('http://192.168.43.157:8080/rasaProject/getDynamicServlet', { "photoId": photoId });
}

// 动态区用户信息
// 从第一次请求找到用户信息id
function getAuthor(authorId) {
    return request('http://192.168.43.157:8080/rasaProject/getUserServlet', { "authorId": authorId });
}

// 统一暴露
export { forumFirst, forumPhotoGain, getAuthor };