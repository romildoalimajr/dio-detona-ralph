const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        myLife: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    

    if (state.values.currentTime === 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.values.myLife--;
        
        state.view.life.textContent = state.values.myLife;
        state.values.currentTime = 10;
        if(state.values.myLife === 0){
            alert("Game Over! O seu resultado foi.: " + state.values.result + " e sua vida é " + state.values.myLife);
        }
    }
    
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    state.values.hitPosition = randomSquare.id;

    randomSquare.classList.add("enemy");
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
    //console.log(randomSquare);
}

function addListinerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function playSound(audioName){
    let audio = new Audio(`../audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function init() {
    moveEnemy();
    addListinerHitBox();
};

init();
