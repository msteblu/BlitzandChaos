// ********************************* VARIABLES ************************************ / /

let background = document.querySelector('#bg');
let audioEl = document.querySelector('#audio');

let storyContainer = document.querySelector('.story');
let choice1Container = document.querySelector('.choice1');
let choice2Container = document.querySelector('.choice2');
let continueContainer = document.querySelector('.continue');

let card1 = document.querySelector('.card1');
let card2 = document.querySelector('.card2');
let cardContinue = document.querySelector('.cardContinue');

// Button to auto-fill text:
let autofill = document.querySelector('#autofill');
// Button to control music: 
let musicBtn = document.querySelector('#musicBtn');

// Array for collecting Items: 
let gameObjects = [];

// Speed for typewriter functions: 
let speed = 0;

// Run variable
let runFunction = 'begin'

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
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to API');
        });
};

// *** Get background music function: ***

let getMusic = function () {
    fetch("https://freesound.org/apiv2/sounds/376415/?token=VarP0dKebdRzKHFvZOPxw81IsdKK6OH3iLAgQRwY")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.2;
                    audioEl.setAttribute("loop", "true");

                    // If we already have a location saved, it will bring us to that location. 
                    // if (getRunFunction() !== 'undefined') {
                    //     runFunction = getRunFunction()
                    // }

                    runStory(runFunction);

                })
            }
        })
};

// Function to run story lines
let runStory = function () {
    // setRunFunction();  // This will eventually be a way to Save location
    clearScreen(); // Each time this runs, first clear the screen
    switch (runFunction) { // It only runs one "case," passing in runFunction as the case name (each case needs to have a unique name)
        case 'begin':
            // initalizeGameObjects() // Testing. Would put these here only on Index.html to clear localstorage
            // initializeCounter()
            storyTxt = 'When the days become warmer, the nights become darker. In those dark nights things. . . monstrous things wake. Now, some people say this is just folklore; a tale to tell for metaphorical reasons, or perhaps just to pass the time. Those are the lucky ones, the ones who got to live their lives in peace, never seeing the darkest of nights filled with smoke, flames and death. I am an old man. Very old, indeed. I have seen too much of those things I care not to remember. Those of us who survived that dark night remember the death and destruction of everything we loved and with that we remember the vow we made: to survive long enough to stop the next blitz and chaos. '
            singleMessage(); // Run the function to display only one continue button
            runFunction = 'begin2' // Set runFunction to the subsequent "case"... called "next"
            break; // break out of the switch function
        case 'begin2':
            storyTxt = '"The time is upon us again, child. The time has come for Fraener to fly again. He has waited patiently for this day. Sleeping in his cave beneath the mountains. It is said that this time nothing will survive his flames."' + '<br>' + 'The old man looked up from an almost empty whiskey glass. His eyes glazed in fear. '
            // Start to play the music, after the first user interaction: 
            audioEl.play();
            singleMessage();
            runFunction = 'begin3'
            break;
        case 'begin3':
            storyTxt = " 'Elden, no one wants to hear an old man's crazy talk.' The bartender said as he poured the man a shot. /n Elden ignored the bartender. 'Child, you can think me crazy, think me a fool, but I beg you to hear my story.' "
            choice1Txt = 'Why are you telling me this?'
            choice2Txt = 'I just came here to drink in peace, leave me alone.'
            doubleMessage();
            runFunction = 'beginChoices' // This will be passed in for the case name in selectionMade after everything is written to the screen: to allow for cascading
            break;
        case 'beg':
            storyTxt = "“If you don’t heed my advice everything will soon become fire and ash. Everyone! Everything! Destroyed! Do you hear me? Everyone! Everything!” The old man jumped from his chair, knocking the glass to the floor. The entire tavern fell silent, but only for a second. After the glass shattered and sprawled across the floor, they all continued with their conversations and the room filled with noise and laughter. It was as though the man standing was just another drunk in a tavern late on a warm winter's night. "
            singleMessage()
            runFunction = 'beg2'
            break;
        case 'beg2':
            storyTxt = 'The bartender rolled his eyes, as he grabbed a broom. It was just another late night in a tavern. /n The old man turned towards me. Then forced his hands on my shoulders. “I am not a fool, I am a drunk, yes; but not a fool. I know the words I speak, and what they mean. The choice is yours. Save the world or watch it burn."'
            choice1Txt = '"What do you want from me, old man?"'
            choice2Txt = 'Finish the drink and walk out of the tavern.'
            doubleMessage();
            runFunction = 'begChoices'
            break;
        case 'rumble':
            storyTxt = "I took his hands from my shoulders. Drank the rest of my ale and left the man where he stood. What an old fool he was. He can claim he wasn’t. I know a fool when I see one. I’ve heard those stories before. I can’t recall where, but I have heard of them. The night was warm and the smell of autumn was lingering in the air. I stopped for a moment, taking in a breath. My exhaustion was getting the better of me. Long days and sleepless nights have a way to make people feel constricted. As though they are destined to live a linear path that forces you somewhere you don’t want to be. But that breath, that fresh air always found a way to release all the chains bound to me. "
            singleMessage()
            runFunction = 'rumble2'
            break;
        case 'rumble2':
            storyTxt = '“Child, please one last time, let me beg you. Listen to me. Please!” I heard his voice and began to turn towards him, but as I did the ground beneath me began to rumble. The trees swayed furiously, the lanterns shook from their chains and shattered on the dirt beneath them. The night became darker.'
            singleMessage()
            runFunction = 'main'
            break;
        case 'main':
            storyTxt = 'The man stared blankly. Thinking for a moment before he spoke, “You are the conscript. The only one alive who can put the beast to his final resting place. There will be trials, but I promise you will not be alone. The elders who still live hold the vow that will help you to finish your task. Do keep the knowledge, child, not all can be trusted. But believe me when I say, you are the only one who can save us all. '
            singleMessage()
            runFunction = 'end'
            break;
        case 'end':
            window.location.href = 'index.html'
            break;
    }
}

// Function to handle question branching
let selectionMade = function (event) {  // pass in button that was clicked
    switch (runFunction) { // pass in the name of runFunction (which we set up in runStory)
        case 'beginChoices':
            if (event.target.innerText === 'Choice 1') { // get value of that button
                runFunction = 'main' //set to a new "case"
            }
            else {
                runFunction = 'beg' // set to a new "case"
            }
            break;
        case 'begChoices':
            if (event.target.innerText === 'Choice 1') {
                runFunction = 'main'
            }
            else {
                runFunction = 'rumble'
            }
            break;
    }
    runStory(); // return to runStory, grabbing a new "case"
}

// For the storylines that only have one continue choice: 
let singleMessage = function () {

    let smTypeWriter = function () {

        // let storyTxt = "";
        let i = 0;
        speed = 30;

        function typeWriter() {
            if (i < storyTxt.length) {
                storyContainer.innerHTML += storyTxt.charAt(i);
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
        // btnContinue.setAttribute("id", "continueBtn"); //add
        btnContinue.innerHTML = "Continue";
        btnContinue.addEventListener('click', runStory, true);  // on click, move to the next Storyline (enterVillage)
        // Display the card that we initially had hidden: 
        cardContinue.style.display = "inline";
        cardContinue.appendChild(btnContinue);

    };
    smTypeWriter();
}

// For the storylines that have two choices: 
doubleMessage = function () {
    // ** Writing out the Story paragraph part: ** 
    let dmTypeWriter = function () {

        let i = 0;
        speed = 30;

        function typeWriter() {
            if (i < storyTxt.length) {
                storyContainer.innerHTML += storyTxt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Once the script has been written out, display the user's options: 
                dmChoices();
            }
        }

        typeWriter();

    };

    // ** Writing out the two choices: ** 
    let dmChoices = function () {

        let i = 0;
        let t = 0;
        speed = 50;


        // Create a button and add Event Listener for Choice 1
        let button1 = document.createElement('button');
        button1.classList.add("button");
        button1.innerHTML = "Choice 1";
        button1.addEventListener('click', selectionMade, false); // Brings you to function that determines which Double choice you clicked

        // Create a button and add Event Listener for Choice 2
        let button2 = document.createElement('button');
        button2.classList.add("button");
        button2.innerHTML = "Choice 2";
        button2.addEventListener('click', selectionMade, false); // Brings you to function that determines which Double choice you clicked

        // Display the card that we initially had hidden: 
        card1.style.display = "inline";

        // Type out Choice 1
        function typeWriter() {
            if (i < choice1Txt.length) {
                choice1Container.innerHTML += choice1Txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Display the button: 
                card1.appendChild(button1);
                // Display the second card and begin displaying Choice 2
                card2.style.display = "inline";
                typeWriter2();
            }
        };

        // Type out Choice 2
        function typeWriter2() {
            if (t < choice2Txt.length) {
                choice2Container.innerHTML += choice2Txt.charAt(t);
                t++;
                setTimeout(typeWriter2, speed);
            } else {
                // Display the button: 
                card2.appendChild(button2);
            }
        }
        typeWriter();
    };
    dmTypeWriter();
}

// The function that clears everything on the screen for re-load: 
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

let initializeCounter = function () {
    let gamecounter = 0;
    localStorage.setItem("gamecounter", JSON.stringify(gamecounter));
};

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


// FUNCTIONS FOR MANAGING GAME ITEMS IN LOCAL STORAGE: 

let initalizeGameObjects = function () {
    localStorage.setItem("gameObjects", JSON.stringify([]))
};


let updateGameObjects = function (gameObjects, gameObject) {
    if (!gameObjects.includes(gameObject)) {
        gameObjects.push(gameObject);
        localStorage.setItem("gameObjects", JSON.stringify(gameObjects));
    }
    return gameObjects;
};

let retrieveGameObjects = function () {
    return JSON.parse(localStorage.getItem("gameObjects"))
};

// FUNCTIONS FOR SAVING LOCATION

let setRunFunction = function () {
    console.log(runFunction)
    localStorage.setItem("runfunctionStory1", JSON.stringify(runFunction));
};

let getRunFunction = function () {
    return JSON.parse(localStorage.getItem("runfunctionStory1"));
};


// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

hideInit();






