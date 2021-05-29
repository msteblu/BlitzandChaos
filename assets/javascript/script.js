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
let runFunction = 'indexBegin'

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
    let apiUrl = "https://api.artic.edu/api/v1/artworks/70047"

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
    fetch("https://freesound.org/apiv2/sounds/321220/?token=VarP0dKebdRzKHFvZOPxw81IsdKK6OH3iLAgQRwY")  // CHOOSE A DIF SOUND
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.2;
                    audioEl.setAttribute("loop", "true");

                    // // Saving location: 
                    // runFunction = getRunFunction();

                    runStory(runFunction);
                })
            }
        })
};

// FUNCTION TO RUN STORYLINES:
let runStory = function () {
    // setRunFunction();  // This will eventually be a way to Save location
    clearScreen(); // Each time this runs, first clear the screen
    switch (runFunction) { // It only runs one "case," passing in runFunction as the case name (each case needs to have a unique name)
        case 'indexBegin':
            storyTxt = `"When the days become warmer, the nights become darker. In those dark nights things. . . monstrous things wake. Now, some people say this is just folklore; a tale to tell for metaphorical reasons, or perhaps just to pass the time. Those are the lucky ones, the ones who got to live their lives in peace, never seeing the darkest of nights filled with smoke, flames and death. I am an old man. Very old, indeed. I have seen too much of those things I care not to remember. Those of us who survived that dark night remember the death and destruction of everything we loved and with that we remember the vow we made: to survive long enough to stop the next blitz and chaos. `
            singleMessage(); // Run the function to display only one continue button
            runFunction = 'indexBegin2' // Set runFunction to the subsequent "case"
            break; // break out of the switch function
        case 'indexBegin2':
            storyTxt = `The time is upon us again, child. The time has come for Fraener to fly again. He has waited patiently for this day. Sleeping in his cave beneath the mountains. It is said that this time nothing will survive his flames." **
            The old man looked up from an almost empty whiskey glass. His eyes glazed in fear. **
            "Elden, no one wants to hear an old man's crazy talk." The bartender said as he poured the man another shot.`
            // Start to play the music, after the first user interaction: 
            audioEl.play();
            singleMessage();
            runFunction = 'indexBegin3'
            break;
        case 'indexBegin3':
            storyTxt = `Elden ignored the bartender. "Child, think me a drunk, think me crazy; but I beg you, hear my story!" `
            choice1Txt = `I have the time, go ahead old man, tell me your story.`
            choice2Txt = 'I just came here to drink in peace, leave me alone.'
            doubleMessage();
            runFunction = 'indexBeginChoices' // This will be passed in for the case name in selectionMade after everything is written to the screen: to allow for cascading
            break;
        case 'indexBeg':
            storyTxt = `“If you don’t heed my advice everything will soon become fire and ash. Everyone! Everything! Destroyed! Do you hear me? Everyone! Everything!” The old man jumped from his chair, knocking the glass to the floor. The entire tavern fell silent, but only for a second. After the glass shattered and sprawled across the floor, all the people sitting in their stools and standing around the wooden tables continued their conversations, filling the room with noise and laughter. It was as though the man standing was just another drunk in a tavern on a late, warm winter's night. `
            singleMessage()
            runFunction = 'indexBeg2'
            break;
        case 'indexBeg2':
            storyTxt = `The bartender rolled his eyes and grabbed a broom. For him it was just another night working in the tavern. **

            The old man turned towards me. Then forced his hands on my shoulders. “I am not a fool, I am a drunk, yes; but not a fool. I know the words I speak, and what they mean. The choice is yours. Save the world or watch it burn. 
            `
            choice1Txt = '"What do you want from me, old man?"'
            choice2Txt = 'Finish the drink and walk out of the tavern.'
            doubleMessage();
            runFunction = 'indexBegChoices'
            break;
        case 'indexRumble':
            storyTxt = `I took his hands from my shoulders. Drank the rest of my ale and left the man where he stood. What an old fool he was. He can claim he wasn’t. I know a fool when I see one. I’ve heard those stories before. I can’t recall where, but I have heard of them. The night was warm and the smell of autumn was lingering in the air. I stopped for a moment, taking in a breath. My exhaustion was getting the better of me. Long days and sleepless nights have a way to make people feel constricted. As though they are destined to live a linear path that forces you somewhere you don’t want to be. But that breath, that fresh air always found a way to release all the chains bound to me.`
            singleMessage()
            runFunction = 'indexRumble2'
            break;
        case 'indexRumble2':
            storyTxt = `“Child, please one last time, let me beg you. Listen to me. Please!” His voice called from the doorway of the tavern. I turned towards him, and as I did the ground beneath me began to rumble. The trees swayed furiously, the lanterns shook from their chains and shattered on the dirt beneath them. The night became darker.`
            singleMessage()
            runFunction = 'indexMain'
            break;
        case 'indexMainIntro':
            storyTxt = `“Jack, pour us another drink! This ones on me.” Elden said, his voice bellowed cheerfully. **

            “Only if you take it with you. I’ve told you no more of your stories in here. The last one cost me five broken stools, two broken tables and poor Johnny nearly lost an eye and broke his nose. I lost a good customer that night, Elden and you will owe me.” **
            
            “I paid you the cost for the stools and tables. Besides that lousy scum bucket was sticking his fat nose where it doesn’t belong.” **
            
            Jack shook his head and pulled a half empty bottle of whiskey from the top shelf. He poured with one hand and pointed towards the door with the other, “Doesn’t matter, outside.”
            `
            singleMessage()
            runFunction = 'indexMain'
            break;
        case 'indexMain':
            storyTxt = `The man stared blankly. Thinking for a moment before he spoke, “You are the conscript. The only one alive who can put the beast to his final resting place. There will be trials, but I promise, you will not be alone. The elders who still live hold the vow that will help you to finish your task. Do keep the knowledge, child, not all can be trusted. There has always been evil in the world and evil will always be incessant. But believe me when I say, you are the only one who can save us all.” **
            
            The man moved his eyes from left to right as though he was ensuring no one was watching. He pulled an envelope from the inside of his cloak, “Take this, take this and do not open it until you are home. Keep it safe, child. Keep it safe and you will always find what you are looking for.  
            `
            // addToCounter(5) // This is an example of adding 5 points
            // updateGameObjects(gameObjects, "map") // This is an example of adding a Map object
            singleMessage()
            runFunction = 'indexEnd'
            break;
        case 'indexEnd':
            window.location.href = './village.html' // Re-direct to next location: Village
            break;
    }
}

// FUNCTION TO HANDLE CHOICES/CASCADING:
let selectionMade = function (event) {  // pass in button that was clicked
    switch (runFunction) { // pass in the name of runFunction (which we set up in runStory)
        case 'indexBeginChoices':
            if (event.target.innerText === 'Choice 1') { // get value of that button
                runFunction = 'indexMainIntro' //set to a new "case"
            }
            else {
                runFunction = 'indexBeg' // set to a new "case"
            }
            break;
        case 'indexBegChoices':
            if (event.target.innerText === 'Choice 1') {
                runFunction = 'indexMain'
            }
            else {
                runFunction = 'indexRumble'
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
        btnContinue.addEventListener('click', runStory, true); 
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
    if (!gameObjects.includes(gameObject)) {
        gameObjects.push(gameObject);
        localStorage.setItem("gameObjects", JSON.stringify(gameObjects));
    }
    return gameObjects;
};

let retrieveGameObjects = function () {
    return JSON.parse(localStorage.getItem("gameObjects"))
};

// FUNCTIONS FOR SAVING LOCATION (in progress)

let setRunFunction = function () {
    console.log(runFunction)
    localStorage.setItem("runfunctionStory1", JSON.stringify(runFunction));
};

let getRunFunction = function () {
    if (localStorage.getItem("runfunctionStory1") !== null) {
        console.log("here");
        return JSON.parse(localStorage.getItem("runfunctionStory1"));
    }
    else {
        return "indexBegin"
    }
};


// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

hideInit();