/* eslint-disable */
var chatUl = document.getElementById('chat-ul');
var sendButton = document.getElementById('send-button');
var thinkingDiv = document.getElementById('thinking-bubble');

sendButton.addEventListener('click', function(e) {
  thinkingDiv.textContent = "";
  var userInput = document.getElementById('user-input')
  e.preventDefault();
  // add message bubble
  var chatLi = document.createElement('li');
  chatLi.id = "user-speech-bubble";
  chatLi.innerText = userInput.value;
  // include subtext of bot/user
  var ptext = document.createElement('p');
  ptext.textContent = "User";
  ptext.classList.add("name");
  chatLi.appendChild(ptext);
  chatUl.appendChild(chatLi);
  // add thinking div
  thinkingDiv.textContent = "thinking..."
  // clear input, reset focus
  userInput.value = ""
  userInput.focus();
});

//<p class="name">User</p>
