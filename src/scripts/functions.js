
// Returns 6 digits alphanumeric string
function getRandomId(){
  const letters = "ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz1234567890"
  const idRange = letters.length + 1;
  var id = ""
  const idLength = 10;
  while(id.length<=idLength){
    const RandomNum = Math.floor(Math.random() * idRange)
    id += letters[RandomNum]
    if(id.length === idLength)
     return id
  }

}

// URL Validator
function isValidUrl(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

// Delete link object from localStorage using unique id of link-card
function deleteElementById(id){
  let links = localStorage.getItem('links')
  let parsedLink = JSON.parse(links)

  let filteredLinks = parsedLink.links.filter(link => {
    return link.id != id
  })

  let updatedLinks = {
    "links": filteredLinks
  }

  // If no links left: No need to store the links json-string
  if(filteredLinks.length === 0){
    localStorage.removeItem('links')

    //show no-links alert
    var noLinksDiv = document.querySelector('.no-links')
    setTimeout(() => {
      noLinksDiv.style.display = "block"
    }, 1000);
    setTimeout(()=>{
      noLinksDiv.classList.add('show')
    }, 1100)
    return
  }

  // convert to json-string
  let updatedJsonString = JSON.stringify(updatedLinks)

  // Update to localStorage too
  localStorage.setItem('links', updatedJsonString)
}

// Update link object from local storage using id of link-card
function updateById(id, newDataObj){
  console.log(id, newDataObj);
}

function openLink(event){
  const target = event.target
  const elemClass = target.className

  // Avoiding menu clicks 
  if(elemClass == "edit" || elemClass == "delete" || elemClass == "options-toggle-btn" || 
  elemClass == "dots"){
    return 
  }

  const url = target.dataset.url

  // Creat Anchor and set url | 
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.target = "_blank"
  document.body.appendChild(anchor)

  // Click Simulation
  anchor.click()
  console.log(url)
}


function updateModal(target){
  //get current info
  const currentCard = target.closest(".link-card")
  const currentTitle = currentCard.querySelector(".link-title").textContent.trim()
  const currentUrl = currentCard.querySelector(".link-src").textContent.trim()

  //set current info to dialog
  document.querySelector('#titleInput').value = currentTitle
  document.querySelector('#urlInput').value = currentUrl
  document.querySelector('#cardId').value = currentCard.id
}

function editAndUpdateTheCard(targetButton){
  // Get Updated URL and Title from dialog
  const inputs = document.querySelectorAll('#myDialog input')
  const modalData = []
  inputs.forEach( input => modalData.push(input.value))
  const [title, url, id] = modalData

  if(isValidUrl(url)){
    //Update  the Card UI with new Data
    const targetCard = document.querySelector(`#${id}`)
    targetCard.querySelector('.link-title').textContent = title
    targetCard.querySelector('.link-src').textContent = url

    // Update Data in LocalStorage
    updateById(id, {title, url})

    // close the dialog
    document.querySelector("#myDialog").close()
  }

  
  
}