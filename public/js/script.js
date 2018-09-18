/* eslint-disable */

//navbar visibility

var navBar = document.getElementById('navbar');
var navIcon = document.querySelector('.nav-icon');

navIcon.addEventListener('click', showNavbar)

function showNavbar() {
  if (navBar.className === 'hidden-nav') {
    navBar.classList.remove('hidden-nav');
  } else {
    navBar.classList.add('hidden-nav');
  }
}

// for modal functionality

// var exit = document.getElement


var chatUl = document.getElementById('chat-ul');
var sendButton = document.getElementById('send-button');
var thinkingDiv = document.getElementById('thinking-bubble');
var chatWindow = document.querySelector("#chat-window")

window.addEventListener('load', function(e) {
  var whatsup = createBubble('bot',"What's up?");
  setTimeout(function() {
    chatUl.appendChild(whatsup);
  }, 500);
})

sendButton.addEventListener('click', function(e) {
  e.preventDefault();
  var thinking = document.querySelector(".thinking")
  if ( thinking ){
    thinking.remove();
  }
  var inputField = document.getElementById('user-input')
  var userInput = inputField.value;
  sendInput(userInput, renderBotResponse);
  var message = createBubble('user', userInput);
  chatUl.appendChild(message);
  var thinking = createBubble('bot', '...', 'thinking')
  chatUl.appendChild(thinking);
  inputField.value = ""
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


function setScrollToBottom() {
  var length = chatWindow.clientHeight;
  window.scrollTo(0, length);
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
