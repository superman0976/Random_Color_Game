const colorName = [
    "Red",
    "Green",
    "Blue",
    "yellow",
    "Purple",
    "Cyan",
    "magenta",
    "Orange",
    "Pink",
    "Brown",
    "Lime",
    "Olive",
    "Teal",
    "Navy",
    "Maroon",
    "Silver",
];

let winingScore = 3;
let targetColor = " ";
let score = 0;
let timer = 60;
let gameInterval, timerInterval;

let setRandomColor = () =>{
    const Cells = document.querySelectorAll('.cell');
    Cells.forEach(cell =>{
         const randomIndex = Math.floor(Math.random()*colorName.length)  // it will generate random index 
         const randomColor = colorName[randomIndex]
         cell.style.backgroundColor = randomColor;
         cell.setAttribute('data-color', randomColor)
    })
}

// setRandomColor();

// setInterval(setRandomColor, 500);

let setTargetColor = () =>{
   const randomIndex = Math.floor(Math.random()*colorName.length);
   targetColor = colorName[randomIndex];
   document.getElementById('targetColor').textContent = targetColor;
}

// setTargetColor();
let formatTime = (seconds)=>{
    const minutes = Math.floor(seconds/60);
    const second = seconds%60;
    return `${minutes}:${second <10 ? '0': ''}${second}`;
}


let updateTimer = ()=>{
    timer--;
    document.getElementById('timer').textContent = formatTime(timer);
    if(timer <= 0){
        endGame(false);
    }
}

let initializeGame = () =>{
    score = 0;
    timer = 60;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = formatTime(timer);
    document.getElementById('congratsOverlay').style.display = 'none';
    document.getElementById('loseOverlay').style.display = 'none';
    setRandomColor();
    setTargetColor();
    document.getElementById('BackgroundMusic').play();
    // bgm.play();

    gameInterval = setInterval(setRandomColor,2000);
    updateTimer = setInterval(updateTimer,1000);
}


let endGame = (isWin)=>{
   clearInterval(gameInterval)
   clearInterval(timerInterval)

   document.getElementById('BackgroundMusic').pause();

   const overlay = isWin ? document.getElementById('congratsOverlay') : document.getElementById('loseOverlay');

   overlay.style.display = 'block';
   if(isWin){
      document.getElementById('winMusic').play();
   }
   else
     document.getElementById('loseMusic').play();
}

let handleClick = (e)=>{
    const clickedColor = e.target.getAttribute('data-color');
    if(clickedColor===targetColor){
        score++;
        document.getElementById('score').textContent = score;

        if(score === winingScore){
            endGame(true);
        }

        setRandomColor();
        setTargetColor();
        document.getElementById('correctMusic').play();
        // cbgm.play();
    }   else {
        document.getElementById('incorrectMusic').play();
        // ibgm.play();
    }
};

document.querySelectorAll('.cell').forEach(cell =>{
    cell.addEventListener('click', handleClick);
});

document.getElementById('restartGameOverlay').addEventListener('click', initializeGame);
document.getElementById('restartGameOverlayLose').addEventListener('click', initializeGame);

initializeGame();



