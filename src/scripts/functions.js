function editOrDelete(target) {
  const elem = target.className
  //edit
  if(elem == "edit"){

  }
  // delete
  else{
    const cardElement = target.parentElement.parentElement.parentElement.parentElement.parentElement
    let idOfCard = cardElement.id;

    // Remove the Card
    cardElement.classList.remove('show')
    setTimeout(()=> {cardElement.remove()}, 1000)

    // Remove the card from Local Storage using id
    // code 

  }


}


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