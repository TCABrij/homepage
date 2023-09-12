// Set Greet Message in Greeting View
function greet(message){
    let greetDiv = document.querySelector('.greeting-view')
    greetDiv.textContent = `Hello ${message}`
}

function createElement(element, properties){
    let el = document.createElement(element)
    if(typeof(properties) === "object"){
        for( property in properties){
            el.setAttribute(property, properties[property])
        }
    }
    return el

}