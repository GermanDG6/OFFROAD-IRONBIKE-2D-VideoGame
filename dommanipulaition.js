    //DOM MANIPULATION 
    document.getElementById('start-button').onclick = () => {
        if(!startclicked){
          startGame();
          startclicked = true
        };
      };  
  
      document.getElementById('reload-button').onclick = () => {
       location.reload()
      };
  
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
  
      document.getElementById('vol-low').onclick = () => {
        musicAudio.volume = 0.1
        commentsAudio.volume = 0.1
        ambientAudio.volume = 0.1
        introAudio.volume = 0.1
       };
       document.getElementById('vol-mid').onclick = () => {
        musicAudio.volume = 0.5
        commentsAudio.volume = 0.5
        ambientAudio.volume= 0.5
        introAudio.volume = 0.5
       };
       document.getElementById('vol-high').onclick = () => {
        musicAudio.volume = 1
        commentsAudio.volume = 1
        ambientAudio.volume = 1
        introAudio.volume = 1
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