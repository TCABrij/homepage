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

  const favourites = localStorage.getItem("links") || "nothing";

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
  const url = document.getElementById("url").value.toLowerCase();

  // Prevent: empty inputs
  if (siteTitle == "" || url == "") return;

  // Validating URL
  if(!isValidUrl(url)){
    alert("Please enter a valid URL")
    return
  }

  // Appending data to favorites
  let linksWindow = document.querySelector(".links");

  //create linkObject and Render card to UI
  const randomUniqueId = getRandomId();
  const newLink = {
    id: randomUniqueId,
    title: siteTitle,
    url: url,
  };
  renderLinkToUi(newLink);

  // Storing link to LocalStorage as json string
  let linksJsonString = localStorage.getItem("links") || undefined;
  if (linksJsonString == undefined) {
    // Set Fresh links Object in storage
    localStorage.setItem(
      "links",
      `{"links": [{"id": "${randomUniqueId}", "title": "${siteTitle}", "url": "${url}"}]}`
    );
  } else {
    // set new link to existing links object in storage
    let linksObject = JSON.parse(linksJsonString);

    const newLinkObj = {
      id: randomUniqueId,
      title: siteTitle,
      url: url,
    };
    // push new link to existing links array & convert back to jsonString
    linksObject.links.push(newLinkObj);
    let newLinksJsonString = JSON.stringify(linksObject);

    // Sent back new Data to LocalStorage
    localStorage.setItem("links", newLinksJsonString);
  }

  // Remove no links alert
  document.querySelector(".no-links").classList.remove('show')

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
  try {
    var favourites = JSON.parse(obj_as_string);
  } catch (e) {
    console.log("Error Occured: " + e);
  }

  favourites.links.forEach((link) => {
    renderLinkToUi(link);
  });
}

// take an array
function renderLinkToUi(linkObj) {
  let linksWindow = document.querySelector(".links");
  linksWindow.innerHTML += `
  <div class="link-card hidden show" onClick="openLink(event)" title="Open in new Tab" id=${linkObj.id} data-url="${linkObj.url}">
  <img src="src/img/icons/internet.svg" alt="" class="logo" data-url="${linkObj.url}">
  <div class="link-data" data-url="${linkObj.url}">
      <p class="link-title" data-url="${linkObj.url}" data-title="${linkObj.title}">
        ${linkObj.title} 
        <!-- Storing URL in hidden input field -->
        <input type="hidden" value="${linkObj.url}" class="hiddenURL">
      </p>
      <p class="link-src" data-url="${linkObj.url}">
        ${linkObj.url}
        <!-- Storing URL in hidden input field -->
        <input type="hidden" value="${linkObj.url}" class="hiddenURL">
      </p>
  </div>
  <div class="link-options" data-url="${linkObj.url}">
      <div class="relative-wrapper" data-url="${linkObj.url}">
          <button class="options-toggle-btn" onClick="editOrDelete(this)" data-url="${linkObj.url}">
              <img src="src/img/icons/dots.svg" class="dots" alt="options" data-url="${linkObj.url}">
              <div class="options" data-url="${linkObj.url}">
                  <p class="edit" onClick="editOrDelete(this)">Edit</p>
                  <p class="delete" onClick="editOrDelete(this)">Delete</p>
              </div>
          </button>
      </div>
  </div>
</div>
  `;
  // hide no links alert
  document.querySelector(".no-links").classList.remove('show')
  setTimeout(()=>{
    document.querySelector('.no-links').style.display = "none";
  }, 0)
}

// function to welcome user
function setGreeting(message) {
  let greetDiv = document.querySelector(".greeting");
  greetDiv.textContent += `${message}!`;
}

// Editing and Deleting functionality
function editOrDelete(target) {
  const className = target.className;
  //edit
  if (className == "edit") {
    const myDialog = document.getElementById("myDialog")
    myDialog.showModal()
    //fill current data in the modal
    updateModal(target)
  }
  // delete
  else if(className == "delete") {
    const cardElement =
      target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    let idOfCard = cardElement.id;

    // Remove the Card
    cardElement.classList.remove("show");
    setTimeout(() => {
      cardElement.remove();
    }, 1000);

    // Remove the card from Local Storage using id
    deleteElementById(idOfCard);
  }
  else{
    return
  }
}

function changeUserName(){
  let newName = prompt("What should I call you?")
  if(newName){
    // Render new name to UI
    document.querySelector('.greeting').textContent = `Hello ${newName}!`
    // Update to LocalStorage too
    localStorage.setItem("username", newName)
  }
}