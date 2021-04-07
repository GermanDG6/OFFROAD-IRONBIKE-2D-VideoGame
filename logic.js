// VARIABLES 
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    let loadedAllImages = false
    const loadedImages = {} 
    const listOfUrls = {landScape:'./images/landscape1.jpg', bike:'./images/klipartz.com (2).png',bikejump:'./images/bici vuelta 1.png',bike2:'./images/bici dh plana.png',bikejump2:'./images/bici dh vuelta.png' ,obstacle:'./images/klipartz.com (1).png',obstacle2:'./images/tronco1.png',obstacle3:'./images/tronco2.png',obstacle4:'./images/fogata.png',obstacle5:'./images/valla-1.png'}  

    let counterForLoadedImages = 0
    
    const arrayOfObstacles = []
    
    let musicAudio, ambientAudio, commentsAudio, introAudio;

    let score = 0
    
    let volume 
    let gravity = 0.8;
    
    let gameOver = false
    let gamePaused = false
    let totalTime = 150
    let startclicked = false

    const landScape = new LandScape()
    const bike = new Bike()
  
//GAME LOGIC
    const startGame = ()=>{
        loadImages()
        loadAudios()
        ambientAudio.play()
        commentsAudio.play()
        musicAudio.play()
        musicAudio.loop = true
        updateClock()
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
    if(score<600){
    if(bike.y<308){
      bike.drawJump()
    }else{bike.drawSelf()}}
    if(score>=600){
    if(bike.y<308){
      bike.drawJumpDh()
    }else{bike.drawSelfDh()}}
    
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
    if(score<150){
      if(counter >= 150){
      const obstacle = new Obstacle()
      arrayOfObstacles.push(obstacle)
      counter = 0
    }}
    if(150<=score && score<300){
      if(counter >= 75){
        const obstacle = new Obstacle()
        arrayOfObstacles.push(obstacle)
        counter = 0
      }}
    if(300<=score && score<600){
      if(counter >= 60){
        const obstacle = new Obstacle()
        arrayOfObstacles.push(obstacle)
        counter = 0
      }}
    if(600<=score && score<1200){
        if(counter >= 50){
          const obstacle = new Obstacle()
          arrayOfObstacles.push(obstacle)
          counter = 0
        }}
    if(1200<=score){
        if(counter >= 25){
            const obstacle = new Obstacle()
            arrayOfObstacles.push(obstacle)
            counter = 0
        }}    
      

  }
  
  const drawObstacles = ()=>{  
    arrayOfObstacles.forEach((obstacle)=>{
      if(obstacle.randomImg==0){
        obstacle.drawSelf()
      }
      if(obstacle.randomImg==1){
        obstacle.drawTronco()
        }
      if(obstacle.randomImg==2){
        obstacle.drawTronco2()
      }
      if(obstacle.randomImg==3){
         obstacle.drawFogata()
      }
      if(obstacle.randomImg==4){
        obstacle.drawValla()
      }
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
    ctx.font = '30px myFont';
    ctx.fillStyle = 'rgb(196, 104, 0)' 
    ctx.fillText(`Score: ${score}`, 70, 40)
  }

  function pauseGame() {
    if (!gamePaused) { 
      gamePaused = true;
      ambientAudio.muted= true;
      commentsAudio.muted = true;
      musicAudio.muted= true;
    } else if (gamePaused) {
      ambientAudio.muted= false;
      commentsAudio.muted = false;
      musicAudio.muted= false
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
        score-=150;
        arrayOfObstacles.splice(index,1)
      }
    })
  }

  const checkPassed =()=>{
    arrayOfObstacles.forEach((obstacle,index)=>{
      if(obstacle.x<=0){
        score+=50
        arrayOfObstacles.splice(index,1)
      }
    })
  }
  
  const renderGameOverText = ()=>{
    ctx.font = '80px myFont';
    ctx.fillStyle='rgb(196, 104, 0)'
    ctx.fillText(`GAME OVER`, (ctx.canvas.width / 2)-240, ctx.canvas.height / 2)
  }
  const checkScore = ()=>{
    if(score < 0){
      gameOver = true
      ambientAudio.pause()
      commentsAudio.pause()
      musicAudio.pause()
      introAudio.play()
      introAudio.loop = true
      renderGameOverText()
    }
  }

  //CUENTA ATRAS
  function updateClock() {
    document.getElementById('countdown').innerHTML = `TIME OUT : ${totalTime}`;
    if(!gameOver){
    if(totalTime==0){
      document.getElementById('countdown').innerHTML = `YOUR SCORE :${score}`
      pauseGame()
      ambientAudio.pause()
      commentsAudio.pause()
    }else{
      totalTime-=1;
      setTimeout("updateClock()",1000);
    }}else{
      totalTime = 0
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





