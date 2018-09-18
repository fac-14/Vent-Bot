/* eslint-disable */

//navbar visibility

var menu = document.getElementById('pop-out-menu');
var navIcon = document.querySelector('.nav-icon');

navIcon.addEventListener('click', showMenu)

function showMenu() {
  if (menu.className === 'show-menu') {
    menu.classList.remove('show-menu');
  } else {
    menu.classList.add('show-menu');
  }
}

// for modal functionality
// open modal
var exit = document.getElementById("exit-btn");
var overlay = document.getElementsByClassName("overlay");
exit.addEventListener("click", function(e) {
  overlay[0].classList.add("show");
});

// close modal - answer No to question
var no = document.getElementById("modal-no");
no.addEventListener("click", function(e) {
  overlay[0].classList.remove("show");
});

// reroute to set if free screen - answe Yes to question
var yes = document.getElementById("modal-yes");
yes.addEventListener("click", function(e) {
  window.location = "/animation";
});

var chatUl = document.getElementById("chat-ul");
var sendButton = document.getElementById("send-button");
var thinkingDiv = document.getElementById("thinking-bubble");
var chatWindow = document.querySelector("#chat-window");

window.addEventListener("load", function(e) {
  var whatsup = createBubble("bot", "What's up?");
  setTimeout(function() {
    chatUl.appendChild(whatsup);
  }, 500);
});

sendButton.addEventListener("click", function(e) {
  e.preventDefault();
  var thinking = document.querySelector(".thinking");
  if (thinking) {
    thinking.remove();
  }
  var inputField = document.getElementById("user-input");
  var userInput = inputField.value;
  sendInput(userInput, renderBotResponse);
  var message = createBubble("user", userInput);
  chatUl.appendChild(message);
  var thinking = createBubble("bot", "...", "thinking");
  chatUl.appendChild(thinking);
  inputField.value = "";
  inputField.focus();
  setScrollToBottom();
});

function sendInput(input, cb) {
  var encoded = "message=" + encodeURI(input);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var parsed = JSON.parse(xhr.responseText);
      cb(parsed);
    }
  };
  xhr.open("POST", "/send-message", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encoded);
}

function renderBotResponse(resJSON) {
  var thinking = document.querySelector(".thinking");
  if (thinking) {
    thinking.remove();
  }
  var reply = createBubble("bot", resJSON.fulfillmentText);
  chatUl.appendChild(reply);
  setScrollToBottom();
}

function setScrollToBottom() {
  var length = chatWindow.clientHeight;
  window.scrollTo(0, length);
}

function createBubble(person, text, thinking) {
  person = person.toLowerCase();
  var container = document.createElement("li");
  container.classList.add(`bubble-wrapper-${person}`);
  if (thinking) {
    container.classList.add("thinking");
  }
  var reply = document.createElement("p");
  reply.classList.add(`${person}-speech-bubble`, `speechBox`);
  reply.textContent = text;
  var subtext = document.createElement("p");
  subtext.textContent = person.toUpperCase();
  subtext.classList.add("name");
  container.appendChild(reply);
  container.appendChild(subtext);
  return container;
}
