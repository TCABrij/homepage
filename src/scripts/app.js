//                    //
//    First Visit     //
//                   //
const mainViewDiv = document.querySelector('.main-view')
const greetingView = mainViewDiv.children[0]

const isFirstVisit = localStorage.getItem('isFirstVisit')

if(isFirstVisit == null){
    // set status for new visit
    localStorage.setItem("isFirstVisit", 0)
    
    // Show Things for new user
    greet("User")
    const name = prompt("What's your name?")

    // Set username
    localStorage.setItem("userName", name)

}

if(isFirstVisit == 0){
    // Show things for reguler user
    const userName = localStorage.getItem('userName') || "User"
    greet(userName)
    
}