/* eslint-disable */

const chatUl = document.getElementById("chat-ul");
const sendButton = document.getElementById("send-button");
const thinkingDiv = document.getElementById("thinking-bubble");
const chatWindow = document.querySelector("#chat-window");

window.addEventListener("load", function(e) {
  var whatsup = createBubble("bot", "Hey!");
  var stressed = createBubble("bot", "Is something stressing you out?");
  setTimeout(function() {
    chatUl.appendChild(whatsup);
  }, 500);
  setTimeout(function() {
    chatUl.appendChild(stressed);
  }, 1500);
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
  if (resJSON.fulfillmentText) {
    var reply = createBubble("bot", resJSON.fulfillmentText);
    chatUl.appendChild(reply);
  }
  var nextQuestion = getNextQuestion();
  var delay = 1000;
  if (nextQuestion instanceof Array) {
    nextQuestion.forEach(function(q) {
      var html = createBubble("bot", q);
      setTimeout(() => {
        chatUl.appendChild(html);
        setScrollToBottom();
      }, delay);
      delay += 1000;
    });
  } else {
    var next = createBubble("bot", nextQuestion);
    setTimeout(() => {
      chatUl.appendChild(next);
      setScrollToBottom();
    }, 1000);
  }
}

function getNextQuestion() {
  var result = questionArray[questionCounter];
  questionCounter++;
  return result;
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
  var text = person == "user" ? "you" : person;
  subtext.textContent = text.toUpperCase();
  subtext.classList.add("name");
  container.appendChild(reply);
  container.appendChild(subtext);
  return container;
}

var questionCounter = 0;
var questionArray = [
  "Tell me about the situation",
  "What about that is causing you the most stress?",
  [
    "How we feel about things is shaped by many things: emotions, thoughts, bodily sensations and behaviours are a few. I’m going to ask you about each of these:",
    "What emotions do you feel when thinking about the situation?"
  ],
  "What bodily sensations do you feel when thinking about the situation?",
  "How are you behaving in the situation?",
  "What’s going through your mind when thinking about the situation?"
];
