window.addEventListener('load', function () {
    var that;
    class top {
        constructor() {
            this.returnTop = document.querySelector('.returnTop');
            this.allHigh = document.body.scrollHeight;
            that = this;
            this.init();
        }
        //初始化
        init() {
            this.isDisplay();
            document.addEventListener('scroll', this.isDisplay);
            this.returnTop.addEventListener('click', this.backTop);
        }
        //判断图标是否出来
        isDisplay() {
            let scrollHigh = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            if (scrollHigh >= that.allHigh * 0.2) {
                that.returnTop.style.top = 80 + '%';
            } else {
                that.returnTop.style.top = -60 + 'px';
            }
        }
        //页面返回顶部动画函数
        backTop() {
            clearInterval(that.timer);
            that.timer = setInterval(() => {
                let step = (0 - window.pageYOffset) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (window.pageYOffset == 0) {
                    clearInterval(that.timer);
                }
                document.documentElement.scrollTop = window.pageYOffset + step;
            }, 15)
        }
    }
    new top();
})