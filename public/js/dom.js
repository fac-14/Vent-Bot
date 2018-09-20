//navbar visibility

const menu = document.querySelector('#pop-out-menu');
const navIcon = document.querySelector('.nav-icon');
const menuLines = document.querySelectorAll('.menu-line');
const exit = document.getElementById("exit-btn");
const overlay = document.getElementsByClassName("overlay");
const no = document.getElementById("modal-no");
const yes = document.getElementById("modal-yes");

navIcon.addEventListener('click', showMenu)
function showMenu() {
  if (menu.className === 'show-menu') {
    menu.classList.remove('show-menu');
    menuLines.forEach((line) => {
      line.classList.remove("arrow-formation");
    })
  } else {
    menu.classList.add('show-menu');
    menuLines.forEach((line) => {
      line.classList.add("arrow-formation");
    })
  }
}

// open modal
exit.addEventListener("click", (e) => {
  overlay[0].classList.add("show");
});
// close modal - answer No to question
no.addEventListener("click", (e) => {
  overlay[0].classList.remove("show");
});
// reroute to set if free screen - answe Yes to question
yes.addEventListener("click", (e) => {
  window.location = "/animation";
});