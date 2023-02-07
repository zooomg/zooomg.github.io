const content = '안녕하세요!+주민건 입니다 '
const first_line = document.querySelector('.first_line');
const second_line = document.querySelector('.second_line');
let txt = first_line;
let i = 0;

const typing = function() {
    txt.innerHTML += content[i++];
    if(content[i]==='+'){
        txt = second_line;
        i++;
    }
    if(i >= content.length) { 
        clearInterval(loop);
    }
};

var loop = setInterval(typing, 100);