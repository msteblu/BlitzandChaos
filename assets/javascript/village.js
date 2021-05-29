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
let gameObjects;

// Speed for typewriter functions: 
let speed = 0;

// Run variable
let runFunction = 'vilBegin'

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
    let apiUrl = "https://api.artic.edu/api/v1/artworks/20314"

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    // set url: 
                    let imageUrl = data.config.iiif_url + "/" + data.data.image_id + "/full/843,/0/default.jpg";

                    // Change the background: 
                    background.setAttribute("src", imageUrl);

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
    fetch("https://freesound.org/apiv2/sounds/371222/?token=VarP0dKebdRzKHFvZOPxw81IsdKK6OH3iLAgQRwY")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.2;
                    audioEl.setAttribute("loop", "true");

                    // Saving location: 
                    // runFunction = getRunFunction();
                    runStory();
                })
            }
        })
};

// FUNCTION TO RUN STORYLINES:
let runStory = function () {
    // setRunFunction();  // This will eventually be a way to Save location
    clearScreen(); // Each time this runs, first clear the screen
    switch (runFunction) { // It only runs one "case," passing in runFunction as the case name (each case needs to have a unique name)
        case 'vilBegin':
            storyTxt = 'You enter the village... descriptions'
            singleMessage(); // Run the function to display only one continue button
            runFunction = 'vilBegin2' // Set runFunction to the subsequent "case"... called "next"
            break; // break out of the switch function
        case 'vilBegin2':
            storyTxt = 'A strange woman stares at you. She beckons and asks you to follow her.'
            choice1Txt = 'You’re too busy. You ignore her and carry on.'
            choice2Txt = 'You agree and follow her.'
            audioEl.play();
            doubleMessage();
            runFunction = 'vilBeginChoices' // This will be passed in for the case name in selectionMade after everything is written to the screen: to allow for cascading
            break;
        case 'vilEnchanter':
            storyTxt = 'The woman leads you to a dark shop filled with strange items. There’s a buzz of magic in the air. She tells you she is an enchanter and that she can sense that you are the one who can save the town from some disaster. She asks you to…'
            choice1Txt = 'You are surprised, but you agree to help.'
            choice2Txt = 'You are surprised, and you find that you don’t quite trust her. You tell her that you cannot help.'
            doubleMessage();
            runFunction = 'vilEnchanterChoices'
            break;
        case 'vilCompanion':
            storyTxt = "You help by… She is so grateful that she offers to help with the rest of your quest, if you need any magical assistance. "
            addToCounter(15)
            updateGameObjects(gameObjects, "enchanter")
            singleMessage()
            runFunction = 'vilBook'
            break;
        case 'vilBook':
            storyTxt = 'On your way out, the enchanter points at a small leatherbound book. She tells you that it is a spellbook and will be necessary to what you need to do. Somehow, it feels like the book belongs with you. You take it. {Receive Spellbook.} You flip through the pages… a “holding spell.” It says something about needing “Item”... you think you could find that in a forest...'
            updateGameObjects(gameObjects, "spellbook")
            singleMessage()
            runFunction = 'vilMain'
            break;
        case 'vilMain':
            storyTxt = 'You continue on into the village square. You…'
            singleMessage()
            runFunction = 'vilEnd'
            break;
        case 'vilEnd':
            window.location.href = './forest.html'
            break;
    }
}

// FUNCTION TO HANDLE CHOICES/CASCADING:
let selectionMade = function (event) {  // pass in button that was clicked
    switch (runFunction) { // pass in the name of runFunction (which we set up in runStory)
        case 'vilBeginChoices':
            if (event.target.innerText === 'Choice 1') { // get value of that button
                runFunction = 'vilMain' //set to a new "case"
            }
            else {
                runFunction = 'vilEnchanter' // set to a new "case"
            }
            break;
        case 'vilEnchanterChoices':
            if (event.target.innerText === 'Choice 1') {
                runFunction = 'vilCompanion'
            }
            else {
                runFunction = 'vilBook'
            }
            break;
    }
    runStory(); // return to runStory, grabbing a new "case"
}

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
        btnContinue.addEventListener('click', runStory, true);  // on click, move to the next Storyline (enterVillage)
        // Display the card that we initially had hidden: 
        cardContinue.style.display = "inline";
        cardContinue.appendChild(btnContinue);

    };
    smTypeWriter();
}

// FOR STORYLINES WITH TWO CHOICES:
doubleMessage = function () {
    // ** Writing out the Story paragraph part: ** 
    let dmTypeWriter = function () {

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
                if (choice1Txt.charAt(i) == "*") {
                    choice1Container.innerHTML += "<br />";
                }
                else {
                    choice1Container.innerHTML += choice1Txt.charAt(i);
                }
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
                if (choice2Txt.charAt(t) == "*") {
                    choice2Container.innerHTML += "<br />";
                }
                else {
                    choice2Container.innerHTML += choice2Txt.charAt(t);
                }
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

// FUNCTION FOR CLEARING THE SCREEN FOR RE-WRITES: 
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
    gameObjects = retrieveGameObjects();

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
    localStorage.setItem("runfunctionStory2", JSON.stringify(runFunction));
};

let getRunFunction = function () {
    if (localStorage.getItem("runfunctionStory1") !== null) {
        return JSON.parse(localStorage.getItem("runfunctionStory1"));
    }
    else {
        return "vilBegin"
    }
};


// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

hideInit();