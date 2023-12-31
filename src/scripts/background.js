const body = document.body;
let randomNum, src;

// check if dark Mode is enabled
let theme = localStorage.getItem("theme");

if (theme == "dark") {
  randomNum = Math.floor(Math.random() * 5 + 1); // We have 6 dark wallpapers
  src = `url('src/img/walls/dark/dark${randomNum}.jpg')`;
} else {
  // Normal Light mode
  randomNum = Math.floor(Math.random() * 7 + 1); // We have 8 light wallpapers
  src = `url('src/img/walls/light${randomNum}.jpg')`;
}

body.style.backgroundImage = src;
