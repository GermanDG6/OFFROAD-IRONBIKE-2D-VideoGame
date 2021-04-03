
//CLASES
class LandScape {
  constructor(){
    this.img= ""
    this.width = ctx.canvas.width
    this.heigth = ctx.canvas.heigth
    this.x =0
    this.y =0
    this.speed= -5
  }

  move() {
    this.x += this.speed;
    this.x %= canvas.width;
  }
  drawSelf(){
  ctx.drawImage(loadedImages.landScape, this.x, 0, ctx.canvas.width, ctx.canvas.height)
  
    if (this.speed < 0) {
      ctx.drawImage(loadedImages.landScape, this.x + ctx.canvas.width, 0,ctx.canvas.width, ctx.canvas.height);
    } else {
      ctx.drawImage(loadedImages.landScape, this.x - loadedImages.landscape.width, 0,ctx.canvas.width, ctx.canvas.height);
    }
  }
  

}


class Bike {
    constructor(){
        this.img= ""
        this.width = 150
        this.heigth = 150
        this.x = 0
        this.y =310
        this.vx = 0;
        this.vy= 3;
      }
    //METHODS
    drawSelf(){
        ctx.drawImage(loadedImages.bike, this.x, this.y, this.width, this.height)
    }


    moveLeft(){
      this.x -= 15
    }

    moveRight(){
      this.x += 15
    }
    jump() {
      this.vy -= gravity;
      this.y -= this.vy ;
      this.y -= 120
      this.x += 30
      }
  }


class Obstacle {
    constructor(){
        //this.img=""
        this.width = 150
        this.heigth = 150
        this.x = 800
        this.y = 310
    }
    drawSelf(){
        ctx.fillRect(this.x, this.y, this.width, this.height)  
        ctx.drawImage(loadedImages.obstacle, this.x, this.y, this.width, this.height)
    }

    moveSelf(){
        this.x -= 15
      }

}

    
// VARIABLES 
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    let gameOver = false

    let loadedAllImages = false
    const loadedImages = {} 
    const listOfUrls = {landScape:'/images/landscape1.jpg', bike:'images/klipartz.com (2).png', obstacle:'images/klipartz.com (1).png'}  
    let counterForLoadedImages = 0

    const arrayOfObstacles = []

    let score = 0

    let jumping 
    let gravity = 0.7;

    const landScape = new LandScape()
    const bike = new Bike()
    //const obstacle  = new Obstacle()




//DOM MANIPULATION 
    document.getElementById('start-button').onclick = () => {
        startGame();
    };

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowRight'){
          bike.moveRight()
        }else if(event.key === 'ArrowLeft'){
          bike.moveLeft()
        }
        if(bike.y>=280){ 
        if(event.key === ' ' ||event.key === 'ArrowUp'){
          bike.jump()
        }}
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
    landScape.drawSelf()
   // ctx.drawImage(loadedImages.landScape, 0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const drawBike = ()=>{
    bike.drawSelf()
    ctx.drawImage(loadedImages.bike,bike.x,bike.y,bike.width,bike.heigth)
  }
  const gravityBike = ()=>{
    if(bike.vy>3){bike.vy=3}
    if(bike.y<310 && bike.vy<=3){
      bike.vy += gravity;
      bike.x += bike.vx;
      bike.y += bike.vy ;
    }else if(bike.y>=309){
      bike.vy = 3;
    }
  }
  const checkForBoundries = ()=>{
    if(bike.y > 311){
      bike.y = 310
    }
    if(bike.x > ctx.canvas.width){
      bike.x = 0
    }else if(bike.x < 0){
      bike.x = ctx.canvas.width
    }
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

  
  const drawObstacles = ()=>{
    arrayOfObstacles.forEach((obstacle)=>{
      obstacle.drawSelf()
    })
    console.log(arrayOfObstacles)
  }
  
  const moveObstacles = ()=>{
    arrayOfObstacles.forEach((obstacle)=>{
      obstacle.moveSelf()
    })
  }

  const clearCanvas = ()=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }
  
  
  const updateCanvas = ()=>{
    if(loadedAllImages ){
      landScape.move()
      clearCanvas()
      drawLandScape()
      gravityBike()
      drawBike()
      createObstacles()
      drawObstacles() 
      moveObstacles()
      checkForBoundries()
      //checkCollision()
      //renderScore()
    }
    requestAnimationFrame(updateCanvas)
  }


  window.onload = () => {  
}