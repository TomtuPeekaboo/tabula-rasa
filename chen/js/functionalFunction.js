// 创建一个功能函数,可以传入需要的参数
// 做成一个模块可以引入

export function request(url, data, header = null, method = "get") {
    return new Promise((resolve, reject) => {
        const DT = new XMLHttpRequest();
        DT.responseType = 'json';
        DT.onreadystatechange = function () {
            if (DT.readyState === 4) {
                if (DT.status >= 200 && DT.status < 300) {
                    resolve(DT.response);//成功
                } else {
                    reject(DT.status);//失败
                }
            }
        };
        //判断data是否有数据
        var param = '';
        //这里使用stringify方法将js对象格式化为json字符串
        if (JSON.stringify(data) != '{}') {
            url += '?';
            for (var i in data) {
                // i为属性名称，data[i]为对应属性的值 
                param += i + '=' + data[i] + '&';   //将js对象重组，拼接成url参数存入param变量中
            }
            //使用slice函数提取一部分字符串，这里主要是为了去除拼接的最后一个&字符
            //slice函数：返回一个新的字符串。包括字符串从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
            param = param.slice(0, param.length - 1);
        };
        //判断method是否为get
        if (method == "get") {
            //是则将数据拼接在url后面
            url = url + param;
        }
        //初始化请求
        xhr.open(method, url, true);

        if (method == 'post') {
            xhr.setRequestHeader("content-Type", "application/x-www-fprm-urlencoded");
            //发送请求
            xhr.send(param);
        }
        else {
            xhr.send(null);
        }
    });
}


//引入示范
// function login(no, pwd) {
//     return request('url', { no, pwd }, { token: 'aaa' }, 'post');
// }
