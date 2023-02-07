const content = '안녕하세요! 주민건 입니다'
const txt = document.querySelector('.txt');
let n = 0;

const typing = function() {
    txt.innerHTML += content[n++]; //.txt엘리먼트에 위에 content의 변수에 저장한 문자를 순차적으로 뿌리겠다.
    if(n >= content.length) { 
        clearInterval(loop);
    }
};

var loop = setInterval(typing, 100);