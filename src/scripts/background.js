const body = document.body
const randomNum = Math.floor(Math.random()*5+1)

const src = `url('src/walls/wall${randomNum}.jpg')`

body.style.backgroundImage = src