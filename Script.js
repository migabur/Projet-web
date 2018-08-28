function createParagraph() {
  var para = document.createElement('p');
  para.textContent = "lul";
  document.body.appendChild(para);
}

var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton;

var buttons = document.querySelectorAll('button');

for(var i = 0; i < buttons.length ; i++) {
  buttons[i].addEventListener('click', createParagraph);

  function checkGuess(){
  	alert('hshgdqs')
  }
}

