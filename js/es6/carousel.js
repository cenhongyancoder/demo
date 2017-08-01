window.onload = function () {
    let list = document.getElementById('list');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    function animate(offset) {
        var newLeft = parseInt(list.style.left)+offset;
        if(newLeft > 0){
            list.style.left = -2007+'px';
        }else if(newLeft < -3345){
            list.style.left = -1338+'px';
        }else {
            list.style.left = newLeft+'px';
        }

    }
    let timer;
    function play() {
        timer = setInterval(function () {
            next.onclick();
        },1500)

    }
    play();

    let container = document.getElementsByClassName('container')[0];
    function stop() {
        window.clearInterval(timer); //清除定时器
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    
    let btns = document.getElementById('yuan').getElementsByTagName('span');
    let index = 1;
    function btnShow() {
        //清除之前的样式
       for(let i = 0 ;i < btns.length;i++) {
            if(btns[i].className == 'active')
            {
                btns[i].className = '';
            }
        };
        //下标从0开始
        btns[index-1].className = 'active';
    }
    prev.onclick = function () {
        //由于上边定时器的作用，index会一直递增下去，我们只有btns.length个小圆点，所以需要做出判断
        index -= 1;
        if(index < 1){
            index = btns.length;
        }
        btnShow();
        animate(669);
    }
    next.onclick = function () {
        index += 1;
        if(index > btns.length){
            index = 1;
        }
        btnShow();
        animate(-669)
    }

    for(let i = 0;i < btns.length;i++){
        (function (i) {
            btns[i].onclick = function () {
                let clickIndex = parseInt(this.getAttribute('index'));
                let offset = 669*(index-clickIndex);
                animate(offset);
                index = clickIndex;
                btnShow();
            }
        })(i)
    }


}