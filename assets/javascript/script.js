// ********************************* VARIABLES ************************************ //
// preload index screen
$(document).ready(function(){
    $("#copyrightBtn").click(function(){
        $("#removeScreen").fadeToggle(2000);
    });
});
// $(document).ready(function() {
	
// 	setTimeout(function(){
// 		$('body').addClass('loaded');
// 		$('h1').css('color','#222222');
// 	}, 3000);
	
// });


let buttonContainer = $("#locationButtons");

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

     // For first page, initialize count
    initializeCounter();

    // For first page, initalize gameObjects 
    initalizeGameObjects();

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

                    // Finally, begin the storyline after we've gathered everything (so there won't be any conflicts): 
                    begin();
                })
            }
        })
};





//************************************ STORYLINES  ***************************************/



// ******************** BEGINNING STORYLINE: ******************

// ** BASIC STORYLINE: **

let begin = function () {

    let storyTxt = "First paragraph here.";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            beginContinue();
        }
    };

    typeWriter();

};

// ** CONTINUE: ** 
let beginContinue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); // ADD AN ID FOR STYLING??
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', begin2, false);  // on click, move to the next Storyline (enterVillage)


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};

// ** BASIC STORYLINE: **
let begin2 = function () {

    remove();

    // Start to play the music, after the first user interaction: 
    audioEl.play();

    // Write out the text for the main Story card: 
    let storyTxt = "The time is upon...";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            begin2Continue();
        }
    }

    typeWriter();

};

// ** CONTINUE: ** 
let begin2Continue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); // ADD AN ID FOR STYLING??
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', begin3, false); 


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};

// ** BASIC STORYLINE: **
let begin3 = function () {

    remove();

    // Add points to storage:
    addToCounter(10); // CHOOSE THE NUMBER OF POINTS TO ADD

    // Write out the text for the main Story card: 
    let storyTxt = " 'Elden, no one wants...' ";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            begin3Choices();
        }
    }

    typeWriter();

};

// ** USER CHOICES: **
let begin3Choices = function () {
    let choice1Txt = "Choice One";
    let choice2Txt = "Choice Two";
    let i = 0;
    let t = 0;
    speed = 50;

    let button1 = document.createElement('button');
    button1.classList.add("button");
    button1.innerHTML = "Choice 1";
    button1.addEventListener('click', mainStory, false); 

    let button2 = document.createElement('button');
    button2.classList.add("button");
    button2.innerHTML = "Choice 2";
    button2.addEventListener('click', beg, false); 

    card1.style.display = "inline";

    function typeWriter() {
        if (i < choice1Txt.length) {
            choice1Container.innerHTML += choice1Txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            card1.appendChild(button1);
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
            card2.appendChild(button2);
        }
    };

    typeWriter();
};

// ***************** BEG STORYLINE: *******************

// ** BASIC STORYLINE: **
let beg = function () {

    remove();

    // Add points to storage:
    addToCounter(15); // CHOOSE THE NUMBER OF POINTS TO ADD

    // Write out the text for the main Story card: 
    let storyTxt = "Beg paragraph....";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            begContinue();
        }
    }

    typeWriter();

};

// ** CONTINUE: ** 
let begContinue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); // ADD AN ID FOR STYLING??
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', beg2, false); 


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};

// ** BASIC STORYLINE: **
let beg2 = function () {

    remove();

    // Write out the text for the main Story card: 
    let storyTxt = "The bartender rolled... ";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            beg2Choices();
        }
    }

    typeWriter();

};

// ** USER CHOICES: **
let beg2Choices = function () {
    let choice1Txt = "Choice One";
    let choice2Txt = "Choice Two";
    let i = 0;
    let t = 0;
    speed = 50;

    let button1 = document.createElement('button');
    button1.classList.add("button");
    button1.innerHTML = "Choice 1";
    button1.addEventListener('click', mainStory, false); 

    let button2 = document.createElement('button');
    button2.classList.add("button");
    button2.innerHTML = "Choice 2";
    button2.addEventListener('click', rumble, false); 

    card1.style.display = "inline";

    function typeWriter() {
        if (i < choice1Txt.length) {
            choice1Container.innerHTML += choice1Txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            card1.appendChild(button1);
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
            card2.appendChild(button2);
        }
    };

    typeWriter();
};


// ***************** RUMBLE STORYLINE: *******************

// ** BASIC STORYLINE: **
let rumble = function () {

    remove();

    // Add points to storage:
    addToCounter(15); // CHOOSE THE NUMBER OF POINTS TO ADD

    // Write out the text for the main Story card: 
    let storyTxt = "Rumble paragraph....";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            rumbleContinue();
        }
    }

    typeWriter();

};

// ** CONTINUE: ** 
let rumbleContinue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); // ADD AN ID FOR STYLING??
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', rumble2, false); 


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};

// ** BASIC STORYLINE: **
let rumble2 = function () {

    remove();

    // Write out the text for the main Story card: 
    let storyTxt = "'Child, please...'";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            rumble2Continue();
        }
    }

    typeWriter();

};

// ** CONTINUE: ** 
let rumble2Continue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); // ADD AN ID FOR STYLING??
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', mainStory, false); 


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline";
    cardContinue.appendChild(btnContinue);

};


// ***************** MAIN STORYLINE: *******************

// ** BASIC STORYLINE: **
let mainStory = function () {

    remove();

    // Add points to storage:
    addToCounter(10); // CHOOSE THE NUMBER OF POINTS TO ADD
    
    // Write out the text for the main Story card: 
    let storyTxt = "The man stared blankly....";
    let i = 0;
    speed = 30;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            mainContinue();
        }
    }

    typeWriter();

};

// ** CONTINUE: ** 
let mainContinue = function () {

    // Create a continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button", "continuebtn");
    // btnContinue.setAttribute("id", "continueBtn"); // ADD AN ID FOR STYLING??
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', end, false); 


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

    document.location.replace("./village.html")
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



// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

// To start the ball rolling:
hideInit();


// LOCATION BUTTON FUNCTION (previous)
// let buttonContainer = $("#locationButtons");

// function goToLocation(event) {
//     let object = $(event.target)
//     if (object.is( ":button" )) {
//         window.location.href = `${object["0"].id}.html`
//     } else {
//         window.location.href = `${object.parent()["0"].id}.html`
//     }

// }

// buttonContainer.on("click", "button", goToLocation)
