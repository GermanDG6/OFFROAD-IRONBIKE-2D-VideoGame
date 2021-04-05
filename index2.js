
//CLASES

class LandScape {
  constructor(){
    this.img= ""
    this.width = ctx.canvas.width
    this.height = ctx.canvas.height
    this.x =0
    this.y =0
    this.speed= -6
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
        this.height = 150
        this.x = 0
        this.y =310
        this.vx = 0;
        this.vy= 2;
      }
    //METHODS
    drawSelf(){
        ctx.drawImage(loadedImages.bike, this.x, this.y, this.width, this.height)
    }

    moveLeft(){
      this.x -= 18
    }

    moveRight(){
      this.x += 24
    }

    brake(){
      this.x -= 10.60
    }

    jump() {
      this.x += 60
      this.vy -= gravity;
      this.y -= this.vy ;
      this.y -= 100
      }
  }


class Obstacle {
    constructor(){
        this.img=""
        this.width = 60
        this.height = 60
        this.x =( (Math.random() * ((ctx.canvas.width + 50)-(ctx.canvas.width/2 ))) + (ctx.canvas.width + 50)) 
        this.y = 390
        this.speed= -5
    }
    drawSelf(){
        ctx.drawImage(loadedImages.obstacle, this.x, this.y, this.width, this.height)
    }

    moveSelf(){
        this.x -= 1
        this.x += this.speed
      }
}

    
// VARIABLES 
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    let loadedAllImages = false
    const loadedImages = {} 
    const listOfUrls = {landScape:'./images/landscape1.jpg', bike:'./images/klipartz.com (2).png', obstacle:'./images/klipartz.com (1).png'}  
    let counterForLoadedImages = 0
    
    const arrayOfObstacles = []
    
    let musicAudio, ambientAudio, commentsAudio;

    let score = 0
    
    let jumping 
    let gravity = 0.8;
    
    let gameOver = false
    let gamePaused = false

    let startclicked = false

    const landScape = new LandScape()
    const bike = new Bike()
    const obstacle  = new Obstacle()
    


//DOM MANIPULATION 
    document.getElementById('start-button').onclick = () => {
      if(!startclicked){
        startGame();
        startclicked = true
    };
  }  
    document.getElementById('btncheck1').onclick = () => {
      ;
    };
    document.getElementById('btncheck2').onclick = () => {
    ;
    };
    document.getElementById('btncheck3').onclick = () => {
    ;
    };
    document.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowRight'){
          bike.moveRight()
        }else if(event.key === 'ArrowLeft'){
          bike.moveLeft()
        }else if(event.key === 'ArrowDown'){
          bike.brake()
        }
        if(bike.y>=280){ 
        if(event.key === 'ArrowUp'){
          bike.jump()
        }}
    })
    document.addEventListener('keydown', (event)=>{    
      if(event.key === ' '){
       pauseGame()
      }})

//GAME LOGIC
    const startGame = ()=>{
        loadImages()
        loadAudios()
        ambientAudio.play()
        commentsAudio.play()
        musicAudio.play()
        updateCanvas() 
    }

//CARGAR IMAGENES 
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
  //CARGAR AUDIOS 
  const loadAudios = ()=>{
    musicAudio = new Audio('./sounds/MUSIC-BIKE-GAME.wav')
    commentsAudio = new Audio('./sounds/COMMENTS-BIKE-GAME.wav')
    ambientAudio = new Audio('./sounds/AMBIENT-BIKE-GAME.wav')
//  backgroundAudio.loop = true
      
  }
// DIBUJAR FONDO
  const drawLandScape = ()=>{
    landScape.drawSelf()
  }
// LOGICA BICI
  const drawBike = ()=>{
    bike.drawSelf()
  }
  const gravityBike = ()=>{
    if(bike.vy>2){bike.vy=2}
    if(bike.y<310 && bike.vy<=2){
      bike.vy += gravity;
      bike.x += bike.vx;
      bike.y += bike.vy ;
    }else if(bike.y>=309){
      bike.vy = 3;
    }
  }
  // LIMITES 
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


//LOGICA OBSTACULOS
  
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
  }
  
  const moveObstacles = ()=>{
    arrayOfObstacles.forEach((obstacle)=>{
      obstacle.moveSelf()
    })
  }

//LIMPIAR CANVAS 
  const clearCanvas = ()=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const renderScore = ()=>{
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${score}`, 70, 40)
  }

  const renderGameOverText = ()=>{
    ctx.fillText(`GAME OVER`, ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.font = '30px Arial';
    console.log('game over')
  }
  function pauseGame() {
    if (!gamePaused) {
      gamePaused = true;
      //musicAudio.muted()
      // ambientAudio.pause() 
      // commentsAudio.pause()
    } else if (gamePaused) {
        if(!startclicked){
        startclicked = true
        startGame();
    };
    
      gamePaused = false;
    }
  }

//COMPROBAR COLISION

const checkCollision = ()=>{
  arrayOfObstacles.forEach((obstacle)=>{
  if( ((Math.round(obstacle.x/6)==Math.round((bike.x+bike.width)/6)) )&&((bike.y+bike.height-20)>=obstacle.y)){ 
    //backgroundAudio.pause()
    //crashAudio.play()
    gameOver = true;
    renderGameOverText()
    score-=3000;
  } else {
    score++
  }
})
}

  
  
  const updateCanvas = ()=>{
    if(!gamePaused){
    if(loadedAllImages ){
      landScape.move()
      clearCanvas()
      drawLandScape()
      gravityBike()
      drawBike()
      createObstacles()
      drawObstacles() 
      obstacle.moveSelf()
      moveObstacles()
      checkForBoundries()
      checkCollision()
      renderScore()
    }
  }
  requestAnimationFrame(updateCanvas)
}


  window.onload = () => { } 


  // soundButton.addEventListener('click', ()=>{
  //    soundButton.classList.toggle('muted') if (!soundButton.classList.contains('muted')){ 
  //      backgroundAudio.muted = false splashAudio.muted = false soundOFF.classList.add("display-none") soundON.classList.remove("display-none") }else{ backgroundAudio.muted = true splashAudio.muted = true soundON.classList.add("display-none") soundOFF.classList.remove("display-none") } }) 