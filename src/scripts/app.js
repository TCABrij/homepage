//                    //
//    First Visit     //
//                   //

const isFirstVisit = localStorage.getItem('isFirstVisit')

if(isFirstVisit == null){
    // set status for new visit
    localStorage.setItem("isFirstVisit", 0)
    
    // Show Things for new user
    document.body.textContent = `Hello new User`
    const name = prompt("What's your name?")

    // Set username
    localStorage.setItem("userName", name)

}

if(isFirstVisit == 0){
    // Show things for reguler user
    const userName = localStorage.getItem('userName') || "User"
    document.body.textContent = `Hello ${userName}!`
}