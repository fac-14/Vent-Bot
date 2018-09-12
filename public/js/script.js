/* eslint-disable */

var sendButton = document.getElementById('send-button');
console.log(sendButton);
sendButton.addEventListener('click', function(e) {
  e.preventDefault();
  // console.log('you clicked the button');
  var userInput = document.getElementById('user-input');
  userInput.value;
  // console.log(userInput.value);

  var chatUl = document.getElementById('chat-ul');
  var chatLi = document.createElement('li');
  chatLi.innerText = userInput.value;
  // console.log(chatLi.innerText);
  chatUl.appendChild(chatLi);

  var thinkingDiv = document.getElementById('thinking-bubble');
  var thinkingLi1 = document.createElement('li');
  var thinkingLi2 = document.createElement('li');
  var thinkingLi3 = document.createElement('li');
  
  thinkingLi1.innerText = ('.');
  thinkingLi2.innerText = ('.');
  thinkingLi3.innerText = ('.');

  thinkingDiv.appendChild(thinkingLi1);
  thinkingDiv.appendChild(thinkingLi2);
  thinkingDiv.appendChild(thinkingLi3);


  
});

