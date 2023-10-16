function toggleOptions() {
  let display = document.querySelector(".relative-wrapper .options").style.display;
  if (display == "block") {
    document.querySelector(".relative-wrapper .options").style.display = "none";
    return;
  }
  document.querySelector(".relative-wrapper .options").style.display = "block";
}
