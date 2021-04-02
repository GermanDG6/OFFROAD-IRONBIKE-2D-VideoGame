
//CLASES
class Bike {
    constructor(){
        this.img= ""
        this.width = 260
        this.heigth = 130
        this.x = 90
        this.y =250
    }
    //METHODS
    drawSelf(){
        ctx.drawImage(loadedImages.bike, this.x, this.y, this.width, this.height)
    }

    moveUp(){
        this.y += 10 
    }
    moveDown(){
        this.y -= 10 
    }

}

class Obstacle {
    constructor(){
        this.img=""
        this.width = 20
        this.heigth = 20
        this.x = 90
        this.y = 250
    }
    drawSelf(){
        ctx.fillRect(this.x, this.y, this.width, this.height)  
    }

    moveSelf(){
        this.x -= 5
      }

}

    
// VARIABLES 
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    let gameOver = false

    let loadedAllImages = false
    const loadedImages = {} 
    const listOfUrls = {landScape:'/images/landscape1.jpg', bike:'/images/klipartz.com (2).png',}  
    let counterForLoadedImages = 0

    const arrayOfObstacles = []

    let score = 0


    const bike = new Bike()
    const obstacle = new Obstacle()









//DOM MANIPULATION 
    document.getElementById('start-button').onclick = () => {
        startGame();
    };

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowUp'){
          bike.moveUp()
        } else if(event.key === 'ArrowDown'){
          bike.moveDown()
        }
      })






//GAME LOGIC
    const startGame = ()=>{
        loadImages()
        //loadAudios()
        //backgroundAudio.play()
        updateCanvas()
    }


  const loadImages = ()=>{
    for(let key in listOfUrls){
      const img = new Image()
      img.src = listOfUrls[key]
      img.onload = ()=>{
        counterForLoadedImages++
        loadedImages[key] = img
        if(counterForLoadedImages === Object.keys(listOfUrls).length){
          loadedAllImages = true
        }
      }
    }
  }

  const drawLandScape = ()=>{
    ctx.drawImage(loadedImages.landScape, 0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const drawBike = ()=>{
    
    console.log(bike.drawSelf)
  }

  let counter = 0;

  const createObstacles = ()=>{
    counter++;
    if(counter === 80){
      const obstacle = new Obstacle()
      arrayOfObstacles.push(obstacle)
      counter = 0
    }
  }

  const moveObstacles = ()=>{
    arrayOfObstacles.forEach((obstacle)=>{
      obstacle.moveSelf()
    })
  }

  const drawObstacles = ()=>{
    obstacle.drawSelf()
  }


  const clearCanvas = ()=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }













  const updateCanvas = ()=>{
    if(loadedAllImages ){
      clearCanvas()
     // drawLandScape()
      drawBike()
      createObstacles()
      drawObstacles() 
      moveObstacles()
      //checkCollision()
      //renderScore()
   }
    requestAnimationFrame(updateCanvas)
  }


  window.onload = () => {  
}