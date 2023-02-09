const $text = document.querySelector(".text");
const $a = document.querySelector(".a");

// 글자 모음 - 개행문자(\n)로 줄바꿈
const letters = [
  "안녕하세요 \n 주민건 입니다",
  "Hello \n This is Mingeon Ju", 
];

// 글자 입력 속도
const speed = 150;
let i = 0;

String.prototype.toKorChars = function() { 
    const cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ];
    const cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ];
    const cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ]; 
    var str = this;
    const cnt = str.length;
    var chars = [];
    for (var i = 0; i < cnt; i++) { 
        cCode = str.charCodeAt(i); 
        if (cCode == 32) { 
          chars.push(" ");
          continue;
        } // 한글이 아닌 경우 
        if (cCode < 0xAC00 || cCode > 0xD7A3) { 
            chars.push(str.charAt(i)); 
            continue; 
        } 
        cCode = str.charCodeAt(i) - 0xAC00; 

        let jong = cCode % 28; 
        let jung = ((cCode - jong) / 28 ) % 21 
        let cho = (((cCode - jong) / 28 ) - jung ) / 21 
        chars.push(cCho[cho]);
        chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
        if (cJong[jong] !== '') { 
            chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
        }
       
    } 
    
    $a.innerHTML = chars;

    return chars; 
}

// 줄바꿈을 위한 <br> 치환
const changeLineBreak = (letter) => {
  return letter.map(text => text === "\n" ? "<br>" : text.toKorChars());
}

// 타이핑 효과
const typing = async () => {  
  // 기존코드에서 개행치환코드 추가
  const letter = changeLineBreak(letters[i].split(""));
  
  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift(); 
  }
  
  // 잠시 대기
  await wait(5000);
  
  // 지우는 효과
  remove();
}

// 글자 지우는 효과
const remove = async () => {
  // 기존코드에서 개행치환코드 추가
  const letter = changeLineBreak(letters[i].split(""));
  
  while (letter.length) {
    await wait(speed);
    
    letter.pop();
    $text.innerHTML = letter.join(""); 
  }
  
  // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
  i = !letters[i+1] ? 0 : i + 1;
  typing();
}

// 딜레이 기능 ( 마이크로초 )
function wait(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// 초기 실행
setTimeout(typing, 1500);