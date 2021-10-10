
// 引入功能函数并应用
import { request } from './functionalFunction.js'


// const address = 'http://192.168.0.161:8080/rasaProject/';
const address = '';
// const address = 'http://172.20.10.2:8080/rasaProject';//队长热点


// function forumFirst(start, msg) {
//     return request(address + 'getDynamicServlet', { "start": start, "msg": msg }, null, 'post');
// }

// function getAuthor(authorId) {
//     return request(address + 'getUserServlet', { "id": authorId });
// }
function AllUserServlet(start) {
    console.log("start="+start)
    return request(address + 'getAllUserServlet', { "start": start }, null, 'post');
}
function forumFirst(start, msg) {
    return request(address + 'getDynamicServlet', { "start": start, "msg": msg }, null, 'post');
}
function getUserServlet(id) {
    return request(address + 'getUserServlet', { "id": id });
}
function delArticleServlet(articleId) {
    return request(address + 'delArticleServlet', { "articleId": articleId });
}
function delUserServlet(userId) {
    return request(address + 'delUserServlet', { "userId": userId }, null, 'post');
}
function search(id,username,time,type){
    return request(address +'searchServlet',{"id":id,"authod":username,"time":time,"type":type},null,'get');
}


// 统一暴露
export { AllUserServlet, forumFirst, getUserServlet, delArticleServlet, delUserServlet,search};