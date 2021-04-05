
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
    drawJump(){
      ctx.drawImage(loadedImages.bikejump, this.x, this.y, this.width, this.height)
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
    const listOfUrls = {landScape:'./images/landscape1.jpg', bike:'./images/klipartz.com (2).png',bikejump:'./images/bici vuelta 1.png', obstacle:'./images/klipartz.com (1).png'}  
    let counterForLoadedImages = 0
    
    const arrayOfObstacles = []
    
    let musicAudio, ambientAudio, commentsAudio, introAudio;

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
      if(!musicAudio.muted){
        musicAudio.muted= true
      }else{
        musicAudio.muted= false
      }
      if(!introAudio.muted){
        introAudio.muted= true
      }else{
        introAudio.muted= false
      }
    };
    document.getElementById('btncheck2').onclick = () => {
      if(!ambientAudio.muted){
        ambientAudio.muted= true;
      }else{
        ambientAudio.muted= false;
      }
    };
    document.getElementById('btncheck3').onclick = () => {
      if(!commentsAudio.muted){
        commentsAudio.muted = true;
      }else{
        commentsAudio.muted = false;
      }
    };

    document.getElementById('reload-button').onclick = () => {
     location.reload()
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
        ambientAudio.volume = 0.2
        commentsAudio.play()
        commentsAudio.volume = 0.2
        musicAudio.play()
        musicAudio.volume = 0.2
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
    introAudio = new Audio ('./sounds/MUSIC INTRO BIKE-GAME.wav')
    musicAudio = new Audio('./sounds/MUSIC-BIKE-GAME.wav')
    commentsAudio = new Audio('./sounds/COMMENTS-BIKE-GAME.wav')
    ambientAudio = new Audio('./sounds/AMBIENT-BIKE-GAME.wav')      
  }
// DIBUJAR FONDO
  const drawLandScape = ()=>{
    landScape.drawSelf()
  }
// LOGICA BICI
  const drawBike = ()=>{
    if(bike.y<308){
      bike.drawJump()
    }else{bike.drawSelf()}
    
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
    if(bike.y > 315){
      bike.y = 310
    }
    if(bike.x > ctx.canvas.width){
      bike.x = 0
    }else if(bike.x < 0){
      bike.x = 0
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

  function pauseGame() {
    if (!gamePaused) {
      gamePaused = true;
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
    arrayOfObstacles.forEach((obstacle,index)=>{
      if( ((Math.round(obstacle.x/6)==Math.round((bike.x+bike.width)/6)) )&&((bike.y+bike.height-20)>=obstacle.y)){ 
        score-=15000;
        arrayOfObstacles.splice(index,1)
      }
    })
  }

  const renderGameOverText = ()=>{
    ctx.fillText(`Game Over`, (ctx.canvas.width / 2)-90, ctx.canvas.height / 2)
    ctx.font = '180px Arial';
    console.log('Game Over')
  }

  const checkPassed =()=>{
    arrayOfObstacles.forEach((obstacle,index)=>{
      console.log(obstacle.x)
      if(obstacle.x<=0){
        score+=5000
        arrayOfObstacles.splice(index,1)
      }
    })
  }
  
  const checkScore = ()=>{
    if(score < 0){
      gameOver = true
      ambientAudio.pause()
      commentsAudio.pause()
      musicAudio.pause()
      introAudio.play()
      introAudio.loop = true
      introAudio.volume = 0.2
      renderGameOverText()
    }
  }
  
  
  const updateCanvas = ()=>{
    if(!gamePaused){
    if(loadedAllImages && !gameOver){
      landScape.move()
      clearCanvas()
      drawLandScape()
      gravityBike()
      drawBike()
      createObstacles()
      drawObstacles() 
      moveObstacles()
      checkForBoundries()
      checkCollision()
      checkPassed()
      renderScore()
      checkScore()
    }
  }
  requestAnimationFrame(updateCanvas)
}


  window.onload = () => { } 


