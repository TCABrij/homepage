//                    //
//    First Visit     //
//                   //
const mainViewDiv = document.querySelector(".main-view");
const greetingView = mainViewDiv.children[0];
const modal = document.querySelector(".modal.user");
var _user = "";

const isFirstVisit = localStorage.getItem("isFirstVisit");

if (isFirstVisit == null) {
  // set status for new visit
  localStorage.setItem("isFirstVisit", 0);

  // Show Modal for taking username
  const modal = document.querySelector(".modal");
  modal.classList.add("show");

  // What's his/her name?
  document.getElementById("username").addEventListener("keyup", (e) => {
    const key = e.key;
    if (key === "Enter") {
      const username = e.target.value;
      localStorage.setItem("username", username);
      _user = username;
      modal.classList.remove("show");
      setGreeting(username);
      mainViewDiv.classList.add("show");
    }
  });
}

//                //
//  Reguler user //
//              //

if (isFirstVisit == 0) {
  // Show things for reguler user
  const userName = localStorage.getItem("username");
  setGreeting(userName);
  mainViewDiv.classList.add("show");

  /////////////////////////////////
  //   favourite links of User   //
  ////////////////////////////////

  const favourites = localStorage.getItem("favourites") || "nothing";

  if (favourites === "nothing") {
    // show no links
    document.querySelector(".no-links").classList.add("show");
  } else showFavouritesToUser(favourites);
}

// Add favourite links
const addNewBtn = document.querySelector(".add-new-link");
const closeBtn = document.querySelector(".close-btn");
const linkModal = document.querySelector(".modal.link");
const addToBtn = document.querySelector(".add-to-btn");

// User wants to add a link
addNewBtn.addEventListener("click", addFavouriteLink);

// User doesn't want to add
closeBtn.addEventListener("click", () => {
  linkModal.classList.remove("show");
});

// Event listener for the "Add to Favorites" button
addToBtn.addEventListener("click", () => {
  // Get the user data
  const siteTitle = document.getElementById("siteTitle").value;
  const url = document.getElementById("url").value;

  // Prevent: empty inputs
  if (siteTitle == "" || url == "") return;

  // Appending data to favorites
  let linksWindow = document.querySelector(".links");
  let uniqueId = getRandomId()
  console.log(uniqueId);
  linksWindow.innerHTML += `
  <div class="link-card hidden show" id=${uniqueId}>
  <img src="src/img/icons/folder.png" alt="" class="logo">
  <div class="link-data">
      <p class="link-title" data-title="${siteTitle}"> ${siteTitle} </p>
      <p class="link-src" data-url="${url}"> ${url}</p>
  </div>
  <div class="link-options">
      <div class="relative-wrapper">
          <button class="options-toggle-btn">
              <img src="/src/img/icons/dots.svg" class="dots" alt="options">
              <div class="options">
                  <p class="edit" onClick="editOrDelete(this)">Edit</p>
                  <p class="delete" onClick="editOrDelete(this)">Delete</p>
              </div>
          </button>
      </div>
  </div>
</div>
  `;

  // Remove no links alert
  document.querySelector(".no-links").style.display = "none";

  console.log("Added to favorites");
  // Hide Modal
  linkModal.classList.remove("show");
});

// Function to show the link modal
function addFavouriteLink() {
  // Show link modal
  linkModal.classList.add("show");
}

function showFavouritesToUser(obj_as_string) {
  let favourites = JSON.parse(obj_as_string);
  console.log(favourites);
}

// function to welcome user
function setGreeting(message) {
  let greetDiv = document.querySelector(".greeting-view");
  greetDiv.textContent = `Hello ${message}`;
}
