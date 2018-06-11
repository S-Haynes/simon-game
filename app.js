window.addEventListener('load', function(){
 let square = document.querySelectorAll(".square");
 let overlay = document.querySelectorAll(".overlay");
 let audio = document.querySelectorAll("audio");
 let text = document.querySelector("#text");
 let playagain = document.querySelector("#play-again");
 let start = document.querySelector("#start");
 let gameboard = document.querySelector("#simon-game");
 let btn_wrap = document.querySelector("#simon-buttons");
 let simonBtns = document.querySelector("#simon-board");
 let leveltext = document.querySelector("#level");
 let onBtn = document.querySelector("#on");
 let offBtn = document.querySelector("#off");
 let btn_box = document.querySelector("#btn-box");
 let cpuArr = [];
 let currentLevel = 0;
 let index = 0;
 let userArr = [];


 function hello(event){
  event.preventDefault();
  let ele = event.target.getAttribute('data-value')
  
  overlay[ele].style.visibility = "visible";
  setTimeout(function(){
   overlay[ele].style.visibility = "hidden"; 
 }, 100)
  userArr.push(Number(ele))
  checkWin(); 
  if(currentLevel !== -1){
    audio[ele].play();
  }
  
}

  //check if correct sequence is entered
  function checkWin(){
   for(var j = 0; j < userArr.length; j++){
    if(userArr[j] !== cpuArr[j]){
      currentLevel = -1;
      for(var k = 0; k < square.length; k++){
       square[k].removeEventListener('click', hello, false)
       overlay[k].classList.add('hidden');
     }  
     audio[4].play();
     text.innerHTML = "Wrong! Game Over."
     start.style.display = "none";
     playagain.style.display = "inline-block";
     leveltext.innerHTML = "<span class='no-select'>- -<span>";
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

   if(currentLevel+1 > 9){
    leveltext.innerHTML = "<span class='no-select'>" + (currentLevel + 1) +"<span>";
  } else{
    leveltext.innerHTML = "<span class='no-select'>" + "0" + (currentLevel + 1) +"<span>";
  }
  index = 0;
  currentLevel++
  userArr = [];
  let num = randomNum();
  cpuArr.push(num)

  let interval =  setInterval(function(){ 
    console.log(cpuArr[index])
    if(cpuArr[index] > -1){
      overlay[cpuArr[index]].style.visibility = "visible";
      audio[cpuArr[index]].play();
      setTimeout(function(){
       overlay[cpuArr[index]].style.visibility = "hidden";
       index++
     }, 500)
    }
    if(index >= cpuArr.length-1){
      if(currentLevel !== -1){
       setTimeout(function(){
         for(var k = 0; k < square.length; k++){
           square[k].addEventListener('click', hello, false)
         }
         start.addEventListener('click', startGame, false)
       }, 700)
     }

     clearInterval(interval);
   }
 },1000)

}


  // play again
  playagain.addEventListener('click', function(){
    audio[9].play();
    start.style.display = "inline-block";
    for(var k = 0; k < overlay.length; k++){
     overlay[k].classList.remove('hidden');
   }
   
   reset();
 })
  
  // on & off button functionality 
  function turnOn(){
    audio[5].play();
    setTimeout(function(){
      audio[8].play();
      offBtn.addEventListener('click', turnOff, false);
      start.addEventListener('click', startGame, false);
    }, 1000)
    btn_wrap.style.animation = "spin 6s ease-in-out 1s infinite";
    btn_box.style.transform = "translateX(0%)";
    btn_box.style.msTransform = "translateX(0%)";
    btn_box.style.webkitTransform = "translateX(0%)";
    btn_box.style.OTransform = "translateX(0%)";
    btn_box.style.MozTransform = "translateX(0%)";
    text.innerHTML = "Press Start 2 Play. <div class='footer-text'>Enjoy the Tunes!<div>";

    for(var i = 0; i < square.length; i++){
     square[i].style.filter = "grayscale(0%)";
     square[i].style.webkitFilter = "grayscale(0%)";
     square[i].removeEventListener('click', hello, false)
     overlay[i].classList.remove('hidden');
   }
   start.style.filter = "grayscale(0%)"
   start.style.webkitFilter = "grayscale(0%)"

   
   onBtn.removeEventListener('click', turnOn, false);
 }

 function turnOff(){
  for(var a = 0; a < audio.length; a++){
  audio[a].pause();
  audio[a].currentTime = 0;
  }
  audio[8].pause();
  audio[8].currentTime = 0;
  audio[6].play();
  for(var k = 0; k < square.length; k++){
   square[k].removeEventListener('click', hello, false)
   overlay[k].classList.add('hidden');
 }
 leveltext.innerHTML = "- -";
 btn_wrap.style.animation = "none";
 btn_wrap.style.msTransform = "rotate(0deg)";
 btn_wrap.style.OTransform = "rotate(0deg)";
 btn_wrap.style.webkitTransform = "rotate(0deg)";
 btn_wrap.style.MozTransform = "rotate(0deg)";
 btn_wrap.style.transform = "rotate(0deg)";
 btn_box.style.transform = "translateX(100%)";
 btn_box.style.msTransform = "translateX(100%)";
 btn_box.style.webkitTransform = "translateX(100%)";
 btn_box.style.OTransform = "translateX(100%)";
 btn_box.style.MozTransform = "translateX(100%)";
 text.innerHTML = "Turn On Your Device.";
 playagain.style.display = "none";
 start.style.display = "inline-block";
 start.innerHTML = "<span class='no-select'>" + "START" +"<span>";
 currentLevel = -1;

 for(var i = 0; i < square.length; i++){
   square[i].style.filter = "grayscale(100%)"
   square[i].style.webkitFilter = "grayscale(100%)"
 }
 start.style.filter = "grayscale(100%)";
 start.style.webkitFilter = "grayscale(100%)";

 setTimeout(function(){
  onBtn.addEventListener('click', turnOn, false);
}, 1000)

 offBtn.removeEventListener('click', turnOff, false);
 start.removeEventListener('click', startGame, false);
}

  // start the game  
  function startGame(){
    currentLevel = -1;
    for(var i = 0; i < overlay.length; i++){
      overlay[i].style.visibility = "hidden";
    }
    audio[7].play();
    audio[8].pause();
    audio[8].currentTime = 0;
    this.innerHTML = "<span class='no-select'>" + "RESET" +"<span>";
    btn_wrap.style.animation = "none"
    btn_wrap.style.msTransform = "rotate(0deg)";
    btn_wrap.style.OTransform = "rotate(0deg)";
    btn_wrap.style.webkitTransform = "rotate(0deg)";
    btn_wrap.style.MozTransform = "rotate(0deg)";
    btn_wrap.style.transform = "rotate(0deg)";
    reset();
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

