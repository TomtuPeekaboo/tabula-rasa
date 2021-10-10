window.addEventListener('load', function () {
    let navbutton = document.getElementsByClassName('navbutton')[0];
    let span1 = document.getElementsByClassName('span1')[0];
    let span2 = document.getElementsByClassName('span2')[0];
    let mask = document.getElementsByClassName('mask')[0];
    let flag = 1;
    navbutton.addEventListener('click', function () {
        if (flag == 1) {
            flag = 0;
            span1.style.transform = 'translate3d(0px, 8px, 0px) rotateZ(45deg)';
            span2.style.transform = 'translate3d(0px, -8px, 0px) rotateZ(-45deg)';
            mask.style.clipPath = 'circle(75%)';
        } else {
            flag = 1;
            span1.style.transform = 'translate3d(0px, 0px, 0px) rotateZ(0deg)';
            span2.style.transform = 'translate3d(0px, 0px, 0px) rotateZ(0deg)';
            mask.style.clipPath = 'circle(1px at calc(100% ) 0)';
        }
    })
})