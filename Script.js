function createParagraph() {
  var para = document.createElement('p');
  para.textContent = "lul";
  document.body.appendChild(para);
}

var randomNumber = Math.floor(Math.random()*100)+1


var buttons = document.querySelectorAll('button');

for(var i = 0; i < buttons.length ; i++) {
  buttons[i].addEventListener('click', createParagraph);
}

