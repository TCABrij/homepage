
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