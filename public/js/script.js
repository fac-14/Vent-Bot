/* eslint-disable */

const chatUl = document.getElementById("chat-ul");
const sendButton = document.getElementById("send-button");
const chatWindow = document.querySelector("#chat-window");
const thinkingDiv = document.querySelector(".thinking-dots");

// ----------- Initial hello -----------

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

// ----------- User Send Message -----------

sendButton.addEventListener("click", function(e) {
  e.preventDefault();
  var inputField = document.getElementById("user-input");
  var userInput = inputField.value;
  if (userInput.length === 0) {
    console.log('userinput is 0');
    inputField.setAttribute('placeholder', "I can't hear you, type a message");
    inputField.style.border = 'solid 3px #0cceff';
  } else {
    inputField.setAttribute('placeholder', 'Type your message');
    inputField.style.border = 'none';
  // Send off XHR
  sendInput(userInput, renderBotResponse);
  // Append message to chat
  var message = createBubble("user", userInput);
  chatUl.appendChild(message);
  // add thinkingDiv
  thinkingDiv.classList.remove("hidden");
  // Clear field and reset
  inputField.value = "";
  inputField.focus();
  setScrollToBottom();
  }
});

// ----------- USER XHR -----------

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

// ----------- Render API response -----------

function renderBotResponse(res) {
  // render API response
  if (res !== "no response") {
    var reply = createBubble("bot", res);
    chatUl.appendChild(reply);
    thinkingDiv.classList.add("hidden");
  }
  // render next prompt
  var nextQuestion = getNextQuestion();
  var delay = 1000;
  if (nextQuestion instanceof Array) {
    nextQuestion.forEach(function(q) {
      var html = createBubble("bot", q);
      setTimeout(() => {
        chatUl.appendChild(html);
        setScrollToBottom();
        thinkingDiv.classList.add("hidden");
      }, delay);
      delay += 1000;
    });
  } else {
    var next = createBubble("bot", nextQuestion);
    setTimeout(() => {
      chatUl.appendChild(next);
      setScrollToBottom();
      thinkingDiv.classList.add("hidden");
    }, 1000);
  }
}

// ----------- Look for DOM change to animate bubbles -----------

var callback = function(mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (mutation.addedNodes) {
      setTimeout(() => {
        chatUl.lastChild.classList.add("move");
      }, 0);
    }
  }
};
var config = { childList: true };
var observer = new MutationObserver(callback);
observer.observe(chatUl, config);

// ----------- Create Bubble HTML -----------

function createBubble(person, text, thinking) {
  person = person.toLowerCase();
  // Create Container
  var container = document.createElement("li");
  container.classList.add(`bubble-wrapper-${person}`);
  if (thinking) {
    container.classList.add("thinking");
  }
  // create message content
  var reply = document.createElement("p");
  reply.classList.add(`${person}-speech-bubble`, `speechBox`);
  reply.textContent = text;
  // create subtext
  var subtext = document.createElement("p");
  var text = person == "user" ? "you" : person;
  subtext.textContent = text.toUpperCase();
  subtext.classList.add("name");
  // append to container, return container
  container.appendChild(reply);
  container.appendChild(subtext);
  return container;
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
