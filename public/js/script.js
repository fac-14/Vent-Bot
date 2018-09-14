/* eslint-disable */
var chatUl = document.getElementById('chat-ul');
var sendButton = document.getElementById('send-button');
var thinkingDiv = document.getElementById('thinking-bubble');

window.addEventListener('load', function(e) {
  var whatsup = createBubble('bot',"What's up?");
  setTimeout(function() {
    chatUl.appendChild(whatsup);
  }, 500);
})

sendButton.addEventListener('click', function(e) {
  e.preventDefault();
  // clear previous "..."
  var thinking = document.querySelector(".thinking")
  if ( thinking ){
    thinking.remove();
  }
  // get input
  var inputField = document.getElementById('user-input')
  var userInput = inputField.value;
  // Send input to server
  sendInput(userInput, renderBotResponse);
  // add bubble-wrapper
  var message = createBubble('user', userInput);
  chatUl.appendChild(message);
  // add thinking li
  var thinking = createBubble('bot', '...', 'thinking')
  chatUl.appendChild(thinking);
  // clear input, reset focus
  userInput.value = ""
  inputField.focus();
  setScrollToBottom();
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
  var thinking = document.querySelector(".thinking")
  if ( thinking ){
    thinking.remove();
  }
  var reply = createBubble('bot', resJSON.fulfillmentText);
  chatUl.appendChild(reply);
  setScrollToBottom();
}

var chatWindow = document.querySelector("#chat-window")

function setScrollToBottom() {
  var length = chatWindow.clientHeight;
  window.scrollTo(0, length);
  console.log(length);
}


function createBubble(person, text, thinking) {
  person = person.toLowerCase();
  var container = document.createElement('li');
  container.classList.add(`bubble-wrapper-${person}`)
  if (thinking) {
    container.classList.add('thinking')
  }

  var reply = document.createElement('p');
  reply.classList.add(`${person}-speech-bubble`,`speechBox`);
  reply.textContent = text;

  var subtext = document.createElement('p');
  subtext.textContent = person.toUpperCase();
  subtext.classList.add('name');

  container.appendChild(reply);
  container.appendChild(subtext);

  return container;  
}