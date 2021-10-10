window.addEventListener('load', function () {
    const leftAs = document.querySelectorAll('.left ul li a');
    for (let i = 0; i < leftAs.length; i++){
        leftAs[i].addEventListener('click', function () {
            console.log(1)
            for (let i = 0; i < leftAs.length; i++){
                // leftAs[i].className = '';
            }
            this.className = 'atn';
        })
    }
})