window.addEventListener('load', function(){
   let square = document.querySelectorAll(".square");
   let overlay = document.querySelectorAll(".overlay");
   let text = document.querySelector("#text");
   let playagain = document.querySelector("#play-again");
   let start = document.querySelector("#start");
   let gameboard = document.querySelector("#simon-game");
   let btn_wrap = document.querySelector("#simon-buttons");
   let simonBtns = document.querySelector("#simon-board");
   let leveltext = document.querySelector("#level");
   let onBtn = document.querySelector("#on");
   let offBtn = document.querySelector("#off");
   let cpuArr = [];
   let currentLevel = 0;
   let index = 0;
   let userArr = [];

function hello(event){
  let ele = event.target.getAttribute('data-value')
  console.log(ele)
      overlay[ele].classList.remove('hidden');
      setTimeout(function(){
       overlay[ele].classList.add('hidden');  
      }, 100)
     userArr.push(Number(ele))
       checkWin(); 
  
  console.log(userArr)
  console.log(cpuArr)
}

  //check if correct sequence is entered
  function checkWin(){
     for(var j = 0; j < userArr.length; j++){
          if(userArr[j] !== cpuArr[j]){
           for(var k = 0; k < square.length; k++){
           square[k].removeEventListener('click', hello, false)
            }  
          text.innerHTML = "Wrong! Game Over."
          start.style.display = "none";
          playagain.style.display = "inline-block";
          leveltext.innerHTML = "- -";
          userArr = [];
          return false;
         }
        }
      if(userArr.length === cpuArr.length){
        setTimeout(function(){
           cpuTurn();
        }, 500)   
       }
    return true;
  }
  
  //generate a random number
  function randomNum(){
    return Math.floor(Math.random() * 4)
  }

  //computer color sequence 
  function cpuTurn(){
   for(var k = 0; k < square.length; k++){
     square[k].removeEventListener('click', hello, false)
   }
    start.removeEventListener('click', startGame, false)
  leveltext.innerHTML = "0" + (currentLevel + 1);
  index = 0;
  currentLevel++
  userArr = [];
  let num = randomNum();
  cpuArr.push(num)
  let interval = setInterval(function(){ 
    overlay[cpuArr[index]].classList.remove('hidden');
    setTimeout(function(){
     overlay[cpuArr[index]].classList.add('hidden');
     index++
    }, 500)
    if(index+1 >= currentLevel){
      setTimeout(function(){
      for(var k = 0; k < square.length; k++){
     square[k].addEventListener('click', hello, false)
      }
         start.addEventListener('click', startGame, false)
      }, 700)
  
      clearInterval(interval);
    }
  },1000)
  
  }
  
  // play again
  playagain.addEventListener('click', function(){
    start.style.display = "inline-block";
    reset();
  })
  
  // on & off button functionality 
function turnOn(){
    btn_wrap.style.animation = "spin 6s ease-in-out 1s infinite";
    this.style.background = "#232323";
    offBtn.style.background = "#aaa";
      text.innerHTML = "Press Start 2 Play."
    for(var i = 0; i < square.length; i++){
       square[i].style.filter = "grayscale(0%)"
    }
     start.style.filter = "grayscale(0%)"
    
  
   start.addEventListener('click', startGame, false);
   offBtn.addEventListener('click', turnOff, false);
   onBtn.removeEventListener('click', turnOn, false);
   }
  
 function turnOff(){
   for(var k = 0; k < square.length; k++){
     square[k].removeEventListener('click', hello, false)
   }
    leveltext.innerHTML = "- -";
    btn_wrap.style.animation = "none";
    btn_wrap.style.transform = "rotate(0deg)";
    this.style.background = "#232323";
    onBtn.style.background = "#aaa";
    text.innerHTML = "Turn On Your Device.";
    playagain.style.display = "none";
    start.style.display = "inline-block";
    start.innerHTML = "START";
    currentLevel = 0;
   
     for(var i = 0; i < square.length; i++){
       square[i].style.filter = "grayscale(100%)"
    }
      start.style.filter = "grayscale(100%)"
     onBtn.addEventListener('click', turnOn, false);
     offBtn.removeEventListener('click', turnOff, false);
      start.removeEventListener('click', startGame, false);
   console.log("hello")
 }
  
  // start the game  
  function startGame(){
   
    this.innerHTML = "RESET"
      btn_wrap.style.animation = "none"
      btn_wrap.style.transform = "rotate(0deg)"
      reset()
  }
  //reset the game
  function reset(){
    text.innerHTML = "Repeat the Pattern."
    playagain.style.display = "none";
    cpuArr = [];
    currentLevel = 0;
    cpuTurn();
}
  
  onBtn.addEventListener('click', turnOn, false);
  offBtn.addEventListener('click', turnOff, false);
});

