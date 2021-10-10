// 在用户选择文件时触发
//file是上传文件的input
file.onchange = function () {
    // 创建空的formdata表单对象
    var formdata = new FormData();
    // 将用户选择的文件追加到formdata表单对象中
    formdata.append('attrName', this.files[0]);
    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    // 对ajax进行配置
    xhr.open('post', 'http://……');

    // // 在文件上传的过程中连续触发  显示进度
    // xhr.upload.onprogress = function (ev) {
    //     // ev.loaded   文件已经上传了多少
    //     // ev.total  上传文件的总大小
    //     var result = (ev.loaded / ev.total) * 100 + '%';
    //     // 设置进度条bar的宽度
    //     bar.style.width = result;
    //     // 将百分比显示在进度条中
    //     bar.innerHTML = result;
    // }


    // 发送请求
    xhr.send(FormData);
    // 监听服务器端响应给客户端的数据
    xhr.onload = function () {
        if (xhr.status == 200) {
            // 将服务器端返回的数据显示在控制台
            var result1 = JSON.parse(xhr.responseText);
            // 动态创建img
            var img = document.createElement('img');
            // 给图片的标签设置src属性
            img.src = result1.path;
            // 给图片加载完成以后
            img.onload = function () {
                // 将图片显示在页面中  box是装照片的那个盒子
                box.appedChild(img);
            }
        }
    }
}