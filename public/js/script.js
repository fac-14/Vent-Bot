/* eslint-disable */
var chatUl = document.getElementById('chat-ul');
var chatLi = document.createElement('li');
var sendButton = document.getElementById('send-button');
var userInput = document.getElementById('user-input')
var thinkingDiv = document.getElementById('thinking-bubble');

sendButton.addEventListener('click', function(e) {
  e.preventDefault();
  chatLi.innerText = userInput.value;
  chatUl.appendChild(chatLi);

  for ( var i = 0; i < 3 ; i++ ) {
    var li = document.createElement('li');
    li.innerText = ('.');
    thinkingDiv.appendChild(li);
  }

});

