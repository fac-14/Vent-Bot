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
  // Send input to server
  sendInput(userInput, renderBotResponse);
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

function sendInput(input, cb) {
  var encoded = "message=" + encodeURI(input);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var parsed = JSON.parse(xhr.responseText)
      cb(parsed)
    }
  }
  xhr.open("POST","/send-message", true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encoded)
}

function renderBotResponse(resJSON) {
  thinkingDiv.textContent = "";
  var botLi = document.createElement('li');
  botLi.id = 'bot-speech-bubble';
  botLi.textContent = resJSON.fulfillmentText;

  var pText = document.createElement('p');
  pText.textContent = 'Bot';
  pText.classList.add('name');
  botLi.appendChild(pText);
  chatUl.appendChild(botLi);

}