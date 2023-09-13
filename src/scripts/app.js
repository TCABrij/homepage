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

//   Add favourite links
const addNewBtn = document.querySelector(".add-new-link");
addNewBtn.addEventListener("click", addFavouriteLink);

////////////////////
//   Functions    //
////////////////////

function addFavouriteLink() {
  const closeBtn = document.querySelector(".close-btn");
  const linkModal = document.querySelector(".modal.link");

  //show link wala Modal 
  linkModal.classList.add("show")

  // finally adding something
  document.querySelector(".add-to-btn").addEventListener("click", () => {
    
    // work resumed
    console.log("added to favourites");
    linkModal.classList.remove("show")

  });

  // user don't want to add
  closeBtn.addEventListener("click", () => {
    linkModal.classList.remove("show");
  });
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
