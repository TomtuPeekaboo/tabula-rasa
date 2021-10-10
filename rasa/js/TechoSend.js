window.addEventListener('load', function () {
    const imgs = document.querySelectorAll('.send-img li');
    const img = document.querySelector('.big-mask img');
    const mask = document.querySelector('.big-mask');
    const rotate = document.querySelector('.mask-rotate');
    const left = document.querySelector('.mask-left');
    const right = document.querySelector('.mask-right');
    const imgBox = document.querySelector('.img-box');
    const send_frame = document.querySelector('.send-frame');
    const send_close = document.querySelector('.send-header span');
    const send_quxiao = document.querySelector('.pushTop-right');
    const send_sure = document.querySelector('.pushTop-sure');
    const send_button = document.querySelector('.banner .right .top .top-right span:nth-of-type(3)');
    let index = 0;
    
    send_button.addEventListener('click', function () {
        send_frame.style.display = 'block';
    })
    send_close.addEventListener('click', function () {
        send_frame.style.display = 'none';
    })
    send_quxiao.addEventListener('click', function () {
        send_frame.style.display = 'none';
    })
    send_sure.addEventListener('click', function () {
        send_frame.style.display = 'none';
    })

    for (let i = 0; i < imgs.length-1; i++){
        imgs[i].setAttribute('index', i);
        imgs[i].addEventListener('click', function () {
            mask.style.display = 'block';
            let url = this.style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            index = parseInt(this.getAttribute('index'));
            img.src = url;
        })
    }
    document.addEventListener('click', function (e) {
        if (e.target == mask||e.target==imgBox) {
            mask.style.display = 'none';
        }
    })
    left.addEventListener('click', function () {
        const allimg = document.querySelectorAll('.send-img li');
        if (index > 0) {
            let url = allimg[index - 1].style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            img.src = url;
            index--;
        }
    })
    right.addEventListener('click', function () {
        const allimg = document.querySelectorAll('.send-img li');
        if (index < allimg.length-1) {
            let url = allimg[index + 1].style.backgroundImage.split('"')[1].split('"')[0];
            getbili1(url, img);
            img.src = url;
            index++;
        }
    })
    rotate.addEventListener('click', function () {
        console.log(img.style.transform);
        let deg = parseInt(img.style.transform.split("(")[1].split(")")[0]);
        let newdeg = deg+90;
        img.style.transform = 'rotate('+newdeg+'deg)';
    })
    //获得真实图片大小的比例
    function getbili1(src, img1) {
        var img = new Image();
        let w;
        let h;
        var bili;
        img.addEventListener('load', function () {
            w = parseInt(img.width);
            h = parseInt(img.height);
            bili = w / h;
            console.log(w);
            console.log(h);
            if (h > 600) {
                if (600 * bili > 800) {
                    img1.style="width:"+ 800 +"px; height: "+800/bili+"px; transform: rotate(0deg);";
                }else
                    img1.style="width:"+ 600*bili +"px; height: 600px; transform: rotate(0deg);";
            }else if(w > 800) {
                img1.style="width:700px; height:" + 800/bili + "px; transform: rotate(0deg);";
            } else {
                img1.style = "width:" + w + "px;height:" + h + "px; transform: rotate(0deg);";
            }
            img1.setAttribute('bili', bili);
        })
        img.src = src;
    }
})