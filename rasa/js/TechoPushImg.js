window.addEventListener('load', function () {
    const putupImg = document.querySelector('.putupImg input');
    const allRemove = document.querySelector('.allRemove');
    const putimg = document.querySelector('.shangchauntupian');
    //定义一个数组 把文件数组的值给新数组  对新数组进行操作  然后把新数组传递给后台
    var curFiles = [];
    // 文件选择监听事件
    putupImg.onchange = function () {
        // 文件读取对象读取文件
        for (let i = 0; i < this.files.length; i++) {
            const fileReader = new FileReader();
            const li = document.createElement('li');
            const img = document.createElement('img');
            const span = document.createElement('span');
            fileReader.readAsDataURL(this.files[i]);
            //在数组中追加每次文件
            curFiles.push(this.files[i]);
            // 在控制台打印出文件数组
            // console.log(curFiles);
            fileReader.onload = function () {
                img.src = fileReader.result;
                // 将role放入装照片的盒子里，然后在role之前插入新元素
                putimg.insertBefore(li, putimg.children[2]);
                li.appendChild(img);
                li.appendChild(span);
                removeImg(span);
            };
        };
    }
    //全部删除功能
    allRemove.addEventListener('click', function () {
        if (confirm("确定删除全部的图片？")) {
            let str = "<li class='putupImg'>上传图片<input type='file' multiple='multiple'></li><li class='allRemove'>全部删除</li>";
            putimg.innerHTML = str;
        }
    })
    //删除功能
    function removeImg(div) {
        div.addEventListener('click', function () {
            this.parentNode.parentNode.removeChild(this.parentNode);
        })
    }
})