// ********************************* VARIABLES ************************************ / /

let background = document.querySelector('#bg');
let audioEl = document.querySelector('#audio');

let storyContainer = document.querySelector('.story');
let choice1Container = document.querySelector('.choice1');
let choice2Container = document.querySelector('.choice2');
let continueContainer = document.querySelector('.continue');
let storyCard = document.querySelector('.storycard');

let card1 = document.querySelector('.card1');
let card2 = document.querySelector('.card2');
let cardContinue = document.querySelector('.cardContinue');

// Button to auto-fill text:
let autofill = document.querySelector('#autofill');
// Button to control music: 
let musicBtn = document.querySelector('#musicBtn');

// Speed for typewriter functions: 
let speed = 0;

// Run variable
let runFunction

// Variables for text
let storyTxt = ''
let choice1Txt = '';
let choice2Txt = '';


// ************************************** FUNCTIONS ************************************ //

// ***** The Initial function:  *****

let hideInit = function () {
    // Hide cards first: 
    card1.style.display = "none";
    card2.style.display = "none";
    cardContinue.style.display = "none";


    // Then, get the background image: 
    getImage();
};

// *** Get background image function: ***
// Using Pexels API: https://www.pexels.com/api/
// Image: https://www.pexels.com/photo/mountain-scenery-1450082/


let getImage = function () {
    let apiKey = "563492ad6f917000010000015b7284fdeb3c4957b9976cdc11fb5370"

    fetch("https://api.pexels.com/v1/photos/1450082/", { headers: { "Authorization": apiKey } })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    // set url:
                    background.setAttribute("src", data.src.original)

                    // Next, load the background music: 
                    getMusic();
                });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to API');
        });
};

// *** Get background music function: ***
// Using Freesound API: https://freesound.org/docs/api/authentication.html
// Sound: https://freesound.org/people/InspectorJ/sounds/376415/
// "Wind, Synthesized, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org

let getMusic = function () {
    fetch("https://freesound.org/apiv2/sounds/376415/?token=VarP0dKebdRzKHFvZOPxw81IsdKK6OH3iLAgQRwY")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.2;
                    audioEl.setAttribute("loop", "true");

                    // // Saving location: 
                    runFunction = getRunFunction();
                    determineWin(); // Test to see if Win / Lose

                })
            }
        })
};


// FUNCTION TO RUN STORYLINES:
let runStory = function () {
    setRunFunction();  // This is a way to Save location
    clearScreen(); // Each time this runs, first clear the screen
    switch (runFunction) { // It only runs one "case," passing in runFunction as the case name (each case needs to have a unique name)
        case 'win':
            storyTxt = `The trek up the mountain is daunting, and yet you do not find yourself wearied. There is power emerging from some place deep within you, awakening in the same way that the dragon awakes. **
            
            Though you still wonder why you, unworthy as you seem, were the one chosen for this task, you are finally sure that the old man spoke the truth. This quest is yours. And you have no hesitation anymore.`
            singleMessage(); // Run the function to display only one continue button
            runFunction = 'win2' // Set runFunction to the subsequent "case"... called "next"
            break; // break out of the switch function
        case 'win2':
            storyTxt = `The entire earth tremors as Fraener awakens. In a burst of fire and stone, the dragon emerges from his deep slumber. He rages at his awakening. **And you are there to meet him.`
            // Start to play the music, after the first user interaction: 
            audioEl.play();
            singleMessage();
            runFunction = 'win3'
            break;
        case 'win3':
            storyTxt = `His terrible eyes sweep the land and then fix on you. You both know that fate has brought you together — for once and for all.`
            singleMessage();
            runFunction = 'win4'
            break;
        case 'win4':
            storyTxt = `The battle seems to exist outside of time, each of you transfixed on the other. You breathe heavily, whirling through his singeing fire, in a chaos of motion and fury. **
            
            As the battle endures, the moon and the sun orbit you. Fatigue takes hold of you, and it does the same for Fraener. But there is a surety in your movements.`
            singleMessage();
            runFunction = 'win5'
            break;
        case 'win5':
            storyTxt = `In one final, fearsome clash, you strike. In his eyes, you see recognition. You both know it is over.`
            singleMessage();
            runFunction = 'win6'
            break;
        case 'win6':
            storyTxt = `Fraener falls. You watch the dragon’s form tumble from the mountainside. The world fades into darkness… `
            singleMessage();
            runFunction = 'win7'
            break;
        case 'win7':
            storyTxt = `You have saved the land from Fraener’s wrath. Just how it always happens, those who doubted the most are the ones to most loudly praise the destruction of the dragon. The celebrations go on for weeks — you at the center. The land rests easy, safe in the knowledge that a great danger has passed. ** 

            And yet, Fraener’s knowing eyes will forever haunt you, those eyes of blitz and chaos.`
            singleMessage();
            runFunction = 'end'
            break;
        case 'lost':
            storyTxt = 'The earth tremors as Fraener awakens. In a burst of fire and stone, the dragon emerges from his deep slumber. He rages at his awakening.'
            singleMessage()
            runFunction = 'lost2'
            break;
        case 'lost2':
            storyTxt = `You were not prepared for the magnitude of his anger. You remember the old man in the tavern, his warnings, but it is too late. The realization that you did not do enough consumes you. There is no conscript. There is no stopping Fraener’s wrath now.`
            audioEl.play();
            singleMessage()
            runFunction = 'lost3'
            break;
        case 'lost3':
            storyTxt = `The mountain crumbles beneath his claws. The forest ignites, the scorching fires sweeping across the land with dazzling terror. **

            There are screams, but your only thought is for the dragon that swoops towards you.`
            singleMessage()
            runFunction = 'lost4'
            break;
        case 'lost4':
            storyTxt = `In the end, you are helpless, and so, too, is the world. **

            You end in blitz and chaos.`
            singleMessage()
            runFunction = 'end'
            break;
        case 'end':
            // clearScreen();
            end();
            break;
    }
};


// FOR STORYLINES WITH ONLY ONE CONTINUE CHOICE:
let singleMessage = function () {

    let smTypeWriter = function () {

        // let storyTxt = "";
        let i = 0;
        speed = 30;

        function typeWriter() {
            if (i < storyTxt.length) {
                if (storyTxt.charAt(i) == "*") {
                    storyContainer.innerHTML += "<br />";
                }
                else {
                    storyContainer.innerHTML += storyTxt.charAt(i);
                }
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Once the script has been written out, display the user's options: 
                smScreenDraw();
            }
        };

        typeWriter();

    };

    // ** CONTINUE: ** 
    let smScreenDraw = function () {

        // Create a continue Button
        let btnContinue = document.createElement('button');
        btnContinue.classList.add("button", "continuebtn");
        btnContinue.innerHTML = "Continue";
        btnContinue.addEventListener('click', runStory, true);  // on click, move to the next Storyline
        // Display the card that we initially had hidden: 
        cardContinue.style.display = "inline";
        cardContinue.style.backgroundColor = 'bisque';
        cardContinue.appendChild(btnContinue);

    };
    smTypeWriter();
};


// FUNCTION FOR ENDING THE GAME: 

let end = function () {
    storyCard.style.display = "none";

    let btnEnd = document.createElement('button');
    btnEnd.classList.add("button", "continuebtn");
    btnEnd.innerHTML = "Restart Game";
    btnEnd.addEventListener('click', restart, true);  // on click, run restart: 
    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnEnd);
};

let restart = function () {
    window.localStorage.clear(); // Clear everything from LocalStorage
    window.location.href = './index.html' // Redirect to the opening page again! 
};



// FUNCTION FOR CLEARING THE SCREEN FOR RE-WRITES

let clearScreen = function () {

    // First, set all of the containers back to empty
    storyContainer.innerHTML = "";
    choice1Container.innerHTML = "";
    choice2Container.innerHTML = "";
    continueContainer.innerHTML = "";

    // We have to remove the buttons we created or they will just keep piling up each time we run a new function

    if (card1.lastElementChild.className == 'button') {
        card1.removeChild(card1.lastElementChild)
    }

    if (card2.lastElementChild.className == 'button') {
        card2.removeChild(card2.lastElementChild)
    }
    if (cardContinue.lastElementChild.className == 'button continuebtn') {
        cardContinue.removeChild(cardContinue.lastElementChild)
    }

    // Once again, hide the containers before they're filled
    card1.style.display = "none";
    card2.style.display = "none";
    cardContinue.style.display = "none";
};


// MUSIC PAUSE / PLAY FUNCTION

function togglePlay() {
    if (audioEl.paused) {
        audioEl.play();
    }
    else {
        audioEl.pause();
    }
};

musicBtn.addEventListener("click", togglePlay);

// FUNCTION AND EVENT LISTENERS FOR MANAGING TYPEWRITER SPEED: 

let setSpeed = function () {
    speed = 0;
};

autofill.addEventListener("click", setSpeed, false);
choice1Container.addEventListener("click", setSpeed, false);
choice2Container.addEventListener("click", setSpeed, false);


// FUNCTIONS FOR MANAGING POINT COUNTS IN LOCAL STORAGE:

let addToCounter = function (number) {
    let gamecounter = JSON.parse(localStorage.getItem("gamecounter"));
    gamecounter += number;
    localStorage.setItem("gamecounter", JSON.stringify(gamecounter));
};

let subtractFromCounter = function (number) {
    let gamecounter = JSON.parse(localStorage.getItem("gamecounter"));
    gamecounter -= number;
    if (gamecounter < 0) {
        gamecounter = 0;
    }
    localStorage.setItem("gamecounter", JSON.stringify(gamecounter));
};

let retrieveCounter = function () {
    return JSON.parse(localStorage.getItem("gamecounter"));
};


// FUNCTIONS FOR SAVING LOCATION

let setRunFunction = function () {
    localStorage.setItem("runfunctionStory5", JSON.stringify(runFunction));
};

let getRunFunction = function () {
    if (localStorage.getItem("runfunctionStory5") !== null) {
        return JSON.parse(localStorage.getItem("runfunctionStory5"));
    }
    else {
        return
    }
};

// FUNCTIONS FOR DETERMING WINS

let determineWin = function () {

    let finalPoints = retrieveCounter()
    if (finalPoints > 45) {
        runFunction = "win"
        runStory(runFunction);

    }
    else {
        runFunction = "lost"
        runStory(runFunction);
    }

};

// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

hideInit();