// Button Selectors
const startButton  = document.querySelector('#start-button');
const pauseButton  = document.querySelector('#pause-button');
const resumeButton = document.querySelector('#resume-button');
const stopButton   = document.querySelector('#stop-button');

// Time Selectors
const displayMinutes = document.querySelector('#show-minute');
const displaySeconds = document.querySelector('#show-second');


const storeMinutes = localStorage.getItem("minutes");
const storeSeconds = localStorage.getItem("seconds");

if (storeMinutes !== null && storeSeconds !== null) {
    runningMinutes = storeMinutes;
    runningSeconds = storeSeconds;
}
let intervalId, runningSeconds = 0, runningMinutes = 0;
let currentState = localStorage.getItem("state") || "idle";
 
function changeState(newState) {
    if (currentState === "idle" && newState === "started") {
        currentState = "started";
    }
    else if (currentState === "started") {
        if (newState === "paused") currentState = "paused";
        else if (newState === "stopped") currentState = "stopped";
    }
    else if (currentState === "paused") {
        if (newState === "resumed") currentState = "resumed";
        else if (newState === "stopped") currentState = "stopped";
    }
    else if (currentState === "resumed") {
        if (newState === "paused") currentState = "paused";
        else if (newState === "stopped") currentState = "stopped";
    }
    
    localStorage.setItem("state", currentState);
}

//# Start Button Handler
startButton.addEventListener('click', () => {
    changeState('started');
    runningSeconds = 0;

    startButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    stopButton.classList.remove('hidden');

    intervalId = setInterval(() => {
        if (runningSeconds === 59) {
            runningSeconds = 0;
            runningMinutes++;
            displaySeconds.innerText = '00';
            displayMinutes.innerHTML = runningMinutes;
        } else {
            displaySeconds.innerText = ++runningSeconds;
        }
    }, 1000);
});

//# Pause Button Handler
pauseButton.addEventListener('click', () => {
    changeState("paused");
    clearInterval(intervalId);

    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');

    localStorage.setItem("minutes", runningMinutes.toString());
    localStorage.setItem("seconds", runningSeconds.toString());
});

//# Resume Button Handler
resumeButton.addEventListener('click', () => {
    changeState("resumed");
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');

    intervalId = setInterval(() => {
        if (runningSeconds === 59) {
            runningSeconds = 0;
            runningMinutes++;
            displaySeconds.innerText = '00';
            displayMinutes.innerHTML = runningMinutes;
        } else {
            displaySeconds.innerText = ++runningSeconds;
        }
    }, 1000);
});

//# Stop Button Handler
stopButton.addEventListener('click', () => {
    localStorage.clear();
    clearInterval(intervalId);

    displaySeconds.innerText = '00';
    displayMinutes.innerHTML = '00';

    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
    stopButton.classList.add('hidden');
});


