class LandScape {
  constructor(){
    this.img= ''
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
      ctx.drawImage(loadedImages.landScape, this.x + ctx.canvas.width, 0,ctx.canvas.width, ctx.canvas.height)
    } else {
      ctx.drawImage(loadedImages.landScape, this.x - this.img.width, 0,ctx.canvas.width, ctx.canvas.height)
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
  drawSelfDh(){
    ctx.drawImage(loadedImages.bike2, this.x, this.y, this.width, this.height)
  }
  drawJumpDh(){
    ctx.drawImage(loadedImages.bikejump2, this.x, this.y, this.width, this.height)
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
    this.randomImg = Math.floor(Math.random()* 5)                 
  }
  drawSelf(){
    ctx.drawImage(loadedImages.obstacle, this.x, this.y, this.width, this.height)
  }
  drawTronco(){
    ctx.drawImage(loadedImages.obstacle2, this.x, this.y, this.width, this.height)
  }    
  drawTronco2(){
    ctx.drawImage(loadedImages.obstacle3, this.x, this.y, this.width, this.height)
  } 
  drawFogata(){ 
    ctx.drawImage(loadedImages.obstacle4, this.x, this.y, this.width+20, this.height)
  }   
  drawValla(){
    ctx.drawImage(loadedImages.obstacle5, this.x, this.y, this.width, this.height)
  }

  moveSelf(){
    this.x -= 1
    this.x += this.speed
  }
}