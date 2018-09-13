/* eslint-disable */
var chatUl = document.getElementById('chat-ul');
var sendButton = document.getElementById('send-button');
var thinkingDiv = document.getElementById('thinking-bubble');

sendButton.addEventListener('click', function(e) {
  e.preventDefault();
  // clear previous "thinking..."
  thinkingDiv.textContent = "";
  // get input
  var inputField = document.getElementById('user-input')
  var userInput = inputField.value;
  console.log(userInput);
  // Send input to server
  sendInput(userInput);
  // add message bubble
  var chatLi = document.createElement('li');
  chatLi.id = "user-speech-bubble";
  chatLi.innerText = userInput;
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
  inputField.focus();
  // e.dispatchEvent();
});

function sendInput(input) {
  var encoded = "message=" + encodeURI(input);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.statusCode === 200) {
      var parsed = JSON.parse(xhr.responseText)
      console.log(parsed);
    }
  }
  xhr.open("POST","/send-message", true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encoded)
}