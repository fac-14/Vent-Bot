//navbar visibility

const menu = document.getElementById('pop-out-menu');
const navIcon = document.querySelector('.nav-icon');

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
const exit = document.getElementById("exit-btn");
const overlay = document.getElementsByClassName("overlay");
exit.addEventListener("click", (e) => {
  overlay[0].classList.add("show");
});

// close modal - answer No to question
const no = document.getElementById("modal-no");
no.addEventListener("click", (e) => {
  overlay[0].classList.remove("show");
});

// reroute to set if free screen - answe Yes to question
const yes = document.getElementById("modal-yes");
yes.addEventListener("click", (e) => {
  window.location = "/animation";
});

