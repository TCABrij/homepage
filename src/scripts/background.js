const body = document.body;
let randomNum, src;

// check if dark Mode is enabled
let theme = localStorage.getItem("theme");

if (theme == "dark") {
  randomNum = Math.floor(Math.random() * 5 + 1); // We have 6 dark wallpapers
  src = `url('src/img/walls/dark/dark${randomNum}.jpg')`;
} else {
  // Normal Light mode
  randomNum = Math.floor(Math.random() * 8 + 1); // We have 9 light wallpapers
  src = `url('src/img/walls/light${randomNum}.jpg')`;
}

let mainDiv = document.querySelector('.main-view')
mainDiv.style.backgroundImage = src;

// // Page Cut-off problem
// setInterval(() => {
//   let mainDiv = document.querySelector('.main-view')
//   mainDiv.style.height = window.innerHeight + "px";
// }, 1000);
