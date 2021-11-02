window.addEventListener('load', () => {
    const content = document.querySelectorAll('.content');
    let i = 0;
    window.onscroll = function () {
        if (getScrollTop() + window.innerHeight >= getDisTop(content[i]) + 50) {
            if (i % 2 == 1) {
                content[i].children[0].style.right = 80 + 'px';
                content[i].children[1].style.top = 25 + 'px';
            } else {
                content[i].children[0].style.left = 80 + 'px';
                content[i].children[1].style.top = 25 + 'px';
            }
            i++;
        }
    }


    //获取元素距离页面顶部的距离
    function getDisTop(element) {
        var realTop = element.offsetTop;
        var parent = element.offsetParent;
        while (parent !== null) {
            realTop += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return realTop;
    }

    //获取滚动条当前的位置
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        scrollTop = Math.round(scrollTop);
        return scrollTop;
    }
});