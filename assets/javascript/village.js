// ********************************* VARIABLES ************************************ //

let background = document.querySelector('#backgroundImage');
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

                    // Finally, begin the storyline after we've gathered everything (so there won't be any conflicts): 
                    beginVillage();
                })
            }
        })
};





//************************************ STORYLINES  ***************************************/



// ******************** BEGINNING TOWN STORYLINE: ******************

// ** BASIC STORYLINE: **

let beginVillage = function () {

    let storyTxt = "The village is quiet in the morning. A dog barks, some people bustle in the market... etc.";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            beginVillageContinue();
        }
    };

    typeWriter();

};

// ** CONTINUE: ** 
let beginVillageContinue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); //add
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', enterVillage, false);  // on click, move to the next Storyline (enterVillage)


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};


// ************************ ENTER TOWN STORYLINE: *************************

// ** BASIC STORYLINE: **
let enterVillage = function () {

    // First, set all of the containers back to empty by calling the remove() function.
    // We have to remove the buttons we created or they will just keep piling up each time we run a new function
    // Once again, hide the containers before they're filled

    remove();

    // Start to play the music, after the first user interaction: 
    audioEl.play();

    // Write out the text for the main Story card: 
    let storyTxt = "You enter the village. A strange woman stares at you. She beckons and asks you to follow her.";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            enterVillageChoices();
        }
    }

    typeWriter();

};

// ** USER CHOICES: ** 
let enterVillageChoices = function () {
    // Write out the text for the two choices: 
    let choice1Txt = "You’re too busy. You ignore her and carry on.";
    let choice2Txt = "You agree and follow her.";
    let i = 0;
    let t = 0;
    speed = 50;


    // Create a button and add Event Listener for Choice 1
    let button1 = document.createElement('button');
    button1.classList.add("button");
    button1.innerHTML = "Choice 1";
    button1.addEventListener('click', mainStoryline, false); // Brings you to Main Storyline

    // Create a button and add Event Listener for Choice 2
    let button2 = document.createElement('button');
    button2.classList.add("button");
    button2.innerHTML = "Choice 2";
    button2.addEventListener('click', theEnchanter, false); // Brings you to the Enchanter Storyline

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


// ***************** THE ENCHANTER STORYLINE: *******************

// Each new storyline/choices is simply copied and modified from the initial function. 
// So, theEnchanter() is just a repeat of the functions above used to modify the Story card.
// And, theEnchanterChoices() is just repeat of the functions above that modify the Choices card.

// ** BASIC STORYLINE: **
let theEnchanter = function () {

    remove();

    // Add points to storage:
    let pointsToAdd = 10;
    addToCounter(pointsToAdd);

    // Run the same type of Typewriter functions
    let storyTxt = "The woman leads you to a dark shop filled with strange items. There’s a buzz of magic in the air. She tells you she is an enchanter and that she can sense that you are the one who can save the town from some disaster. She asks you to…  "
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Run the function to display user choices
            theEnchanterChoices();
        }
    };

    typeWriter();
};

// ** USER CHOICES: **
let theEnchanterChoices = function () {
    let choice1Txt = "You are surprised, but you agree to help.";
    let choice2Txt = "You are surprised, and you find that you don’t quite trust her. You tell her that you cannot help.";
    let i = 0;
    let t = 0;
    speed = 50;

    let buttonEnchanter1 = document.createElement('button');
    buttonEnchanter1.classList.add("button");
    buttonEnchanter1.innerHTML = "Choice 1";
    buttonEnchanter1.addEventListener('click', getCompanion, false); // Brings you to getCompanion on click

    let buttonEnchanter2 = document.createElement('button');
    buttonEnchanter2.classList.add("button");
    buttonEnchanter2.innerHTML = "Choice 2";
    buttonEnchanter2.addEventListener('click', theBook, false); // Brings you to theBook on click

    card1.style.display = "inline";

    function typeWriter() {
        if (i < choice1Txt.length) {
            choice1Container.innerHTML += choice1Txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            card1.appendChild(buttonEnchanter1);
            card2.style.display = "inline";
            typeWriter2();
        }
    };

    function typeWriter2() {
        if (t < choice2Txt.length) {
            choice2Container.innerHTML += choice2Txt.charAt(t);
            t++;
            setTimeout(typeWriter, speed);
        } else {
            card2.appendChild(buttonEnchanter2);
        }
    };

    typeWriter();
};


// ************************ COMPANION STORYLINE: *************************

// ** BASIC STORYLINE: **
let getCompanion = function () {

    remove();

    // Write out the text for the main Story card: 
    let storyTxt = "You help by… She is so grateful that she offers to help with the rest of your quest, if you need any magical assistance. {Receive Companion.}";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            companionContinue();
        }
    }

    typeWriter();

};

// ** CONTINUE: ** 
let companionContinue = function () {

    // Continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); //add
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', theBook, false);  // on click, move to the next Storyline

    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};


// ***************** THE BOOK STORYLINE: *******************

// ** BASIC STORYLINE: **
let theBook = function () {

    remove();

    // Adding game items to storage:
    gameObjects = updateGameObjects(gameObjects, "spellbook");
    console.log(retrieveGameObjects())

    let storyTxt = "On your way out, the enchanter points at a small leatherbound book. She tells you that it is a spellbook and will be necessary to what you need to do. Somehow, it feels like the book belongs with you. You take it. {Receive Spellbook.} You flip through the pages… a “holding spell.” It says something about needing “Item”... you think you could find that in a forest..."
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Run the function to display user choices
            bookContinue();
        }
    };

    typeWriter();
};

// ** CONTINUE: ** 
let bookContinue = function () {

    // Continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); //add
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', mainStoryline, false);  // on click, move to the next Storyline

    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};


// ************************ THE MAIN STORYLINE: *************************

// ** BASIC STORYLINE: **
let mainStoryline = function () {
   
    remove();

    // Run the same type of Typewriter functions
    let storyTxt = "You return back to the village... You do this. Maybe get an item.... "
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Run the function to display user choices
            mainContinue();
        }
    };

    typeWriter();
};

// ** USER CHOICES: ** 
let mainContinue = function () {

    // Continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); //add
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', endVillage, false);  // on click, move to the next Storyline

    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};


// ************************* THE END STORYLINE: ******************************

// ** BASIC STORYLINE: ** 
let endVillage = function () {

    remove();

    let storyTxt = "This is the ending sequence. You are moving on to the next location.";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            endVillageContinue();
        }
    };

    typeWriter();

};

// ** CONTINUE: ** 
let endVillageContinue = function () {

    // Continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button");
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', end, false); // Change this to redirect to next HTML page.


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};

// ******************* REDIRECT TO NEXT LOCATION ******************

let end = function () {
    storyContainer.innerHTML = "";
    choice1Container.innerHTML = "";
    choice2Container.innerHTML = "";
    continueContainer.innerHTML = "";

    card1.style.display = "none";
    card2.style.display = "none";
    cardContinue.style.display = "none";

    document.location.replace("./forest.html")
};



// *********************************  REFERENCE FUNCTIONS  *******************************

// REMOVE FUNCTION:

let remove = function () {

    storyContainer.innerHTML = "";
    choice1Container.innerHTML = "";
    choice2Container.innerHTML = "";
    continueContainer.innerHTML = "";

    if (card1.lastElementChild.className == 'button') {
        card1.removeChild(card1.lastElementChild)
    }

    if (card2.lastElementChild.className == 'button') {
        card2.removeChild(card2.lastElementChild)
    }

    if (cardContinue.lastElementChild.className == 'button continuebtn') {
        cardContinue.removeChild(cardContinue.lastElementChild)
    }

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


// FUNCTIONS FOR MANAGING TYPEWRITER: 

let setSpeed = function () {
    speed = 0;
};

autofill.addEventListener("click", setSpeed, false);


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


// STAND-IN FUNCTIONS JUST FOR TESTING EVENT LISTENERS (without having functions to run yet): 
// let myFunctionReference = function () { alert("You clicked button 2") };
// let myFunctionReference1 = function () { alert("You clicked button 1") };
// let myContinueReference = function () { alert("You clicked continue") };



// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

// To start the ball rolling:
hideInit();
