(function () {
  const allWords = 'script_and_DB/allWords.json';
  let myWords = [];

  fetch(allWords)
    .then(response => response.json())
    .then(word => {
      myWords.push(word);
      // console.log(myWords[0].myWords[5].word);
    });

  const words = document.querySelectorAll('p');
  const hintPlace = document.querySelector('h3');
  const input = document.querySelector('[type="text"]');
  const check = document.querySelector('[type="submit"]');
  const span = document.getElementsByTagName('span');
  const showWord = document.querySelector('.showWord');
  const startGame = document.querySelector('.startGame');
  const hint = document.querySelectorAll('.description');
  const board = document.querySelector('.letterBoard');
  const score = document.querySelector('.score');
  let statP = document.querySelectorAll('h2 > span');
  // let myPoints = 0;
  // remember the results
  let myPoints = 0 || JSON.parse(localStorage.getItem('myPoints'));
  let sentence;
  let quantity;
  let counter = 0;
  let hintCounter = 0;
  score.innerHTML = myPoints;

  check.addEventListener('click', checkWord);
  startGame.addEventListener('click', startNewGame);
  showWord.addEventListener('click', seeThisWord);
  hint[0].addEventListener('click', hintOne);
  hint[1].addEventListener('click', hintTwo);

  function checkWord(event) {
    event.preventDefault();
    let thisWord;
    if(sentence) {
      thisWord = sentence.map(letter => letter.replace('<span>','').replace('</span>','')).join('');
    }

    if (input.value.toLowerCase() == thisWord) {
      arrangeWord();
      statP[1].innerHTML = `${counter+1} try Congratulations!!!`;
      counter = 0;
      let attemptMinus = parseFloat(statP[0].textContent) || 0;

      myPoints += (5 - 2*hintCounter - attemptMinus);

      hintCounter = 0;
    } else {
      statP[0].innerHTML = '';
      counter++;
      statP[0].innerHTML = `${counter}`;
    }

    // remember the results
    localStorage.setItem('myPoints', JSON.stringify(myPoints));

    score.innerHTML = myPoints;
    input.value = '';
  }

  function hintOne() {
    if(quantity){
      hintPlace.innerHTML = myWords[0].myWords[quantity].desc;
    }
    hintCounter ++;
  }

  function hintTwo() {
    if(quantity) {
      board.style.backgroundImage = `url('${myWords[0].myWords[quantity].url}')`;
    }
    setTimeout(function(){
      board.style.backgroundImage = '';
    }, 2000);
    hintCounter ++;
  }

  function startNewGame() {
    board.style.backgroundImage = "url('')";
    quantity = Math.floor(Math.random()*myWords[0].myWords.length);
    words[0].innerHTML = `${myWords[0].myWords[quantity].word}`;

    statP[1].innerHTML = '';
    statP[0].innerHTML = '';
    hintPlace.innerHTML = '';

    words.forEach(randomize);
    hintCounter = 0;
  }

  function seeThisWord() {
    arrangeWord();
    hintCounter = 2.5;
    checkWord(event);
    counter = 0;
  }

  function randomize(oneLineText) {
    sentence = [];

    for(let i=0; i<oneLineText.textContent.length; i++){
      sentence.push(`<span>${oneLineText.textContent.charAt(i)}</span>`);
    }

    oneLineText.innerHTML = sentence.join('');

    for(let i=0; i<span.length; i++){
      const spanAll = document.querySelectorAll('span');

      let red = Math.floor(Math.random()*220);
      let green = Math.floor(Math.random()*220);
      let blue = Math.floor(Math.random()*220);
      span[i].style.color = `rgb(${red}, ${green}, ${blue})`;

      let topOffset = Math.floor(Math.random()*350);
      let leftOffset = Math.floor(Math.random()*170);

      span[i].style.left = `${topOffset - (spanAll[i].offsetLeft) + board.offsetLeft}px`;
      span[i].style.top = `${leftOffset - (spanAll[i].offsetTop) + board.offsetTop}px`;

    }
  }

  function arrangeWord(){
    const allSpan = document.querySelectorAll('p > span');

    allSpan.forEach(span => span.classList.add('move'));
    allSpan.forEach(span => span.style.left = `0px`);
    allSpan.forEach(span => span.style.top = `0px`);
  }

})();

