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
// Using Art Institute of Chicago API: https://api.artic.edu/docs/#iiif-image-api
// Artwork: https://www.artic.edu/artworks/20314/village
// Maurice de Vlaminck. Village, 1912. The Art Institute of Chicago.

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
// Using Freesound API: https://freesound.org/docs/api/authentication.html
// Sound: https://freesound.org/people/Metzik/sounds/371222/
// "Medieval market" by Metzik

let getMusic = function () {
    fetch("https://freesound.org/apiv2/sounds/371222/?token=VarP0dKebdRzKHFvZOPxw81IsdKK6OH3iLAgQRwY")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.2;
                    audioEl.setAttribute("loop", "true");

                    // Saving location: 
                    runFunction = getRunFunction();
                    runStory();
                })
            }
        })
};

// FUNCTION TO RUN STORYLINES:
let runStory = function () {
    setRunFunction();  // Save location
    clearScreen(); // Each time this runs, first clear the screen
    switch (runFunction) { // It only runs one "case," passing in runFunction as the case name (each case needs to have a unique name)
        case 'vilBegin':
            storyTxt = `The night walk through the village  left me with an uneasy feeling that grew in the pit of my stomach. I clenched onto the paper the old man gave to me before I left him. I rubbed my finger back and forth along the seal that had yet to be broken. **
            There was something about the entire scene that made me question if I had gone mad. I'm still not sure what had prompted me to believe the old man, to take the sealed piece of paper from his hands and store it in the inside pocket of my long coat. What made me believe his madness, believe that I and I alone was the only human that could prevent the end of days. Yet, there I was walking the village streets. They were quieter than usual that night. All the differences added to an eeriness that was covering the world. 
            `
            singleMessage(); // Run the function to display only one continue button
            runFunction = 'vilBegin2' // Set runFunction to the subsequent "case"... called "next"
            break; // break out of the switch function
        case 'vilBegin2':
            storyTxt = `There came a hushed call from the dark alley, "Psst, you there, come, come here my dearie." I stopped where I was and squinted my eyes trying to see who was hiding in the shadows. **

            "Yes you, come, come here. Come help an old woman in need."
            `
            choice1Txt = 'You’re too busy. You ignore her and carry on.'
            choice2Txt = 'You agree and follow her.'
            audioEl.play();
            doubleMessage();
            runFunction = 'vilBeginChoices' // This will be passed in for the case name in selectionMade after everything is written to the screen: to allow for cascading
            break;
        case 'vilEnchanter':
            storyTxt = `There was something about her voice that called to me. It could have been something that the old man said that made me feel as though it was my duty to help her. I stepped into the alley and although it was hard to see where I was going I followed her voice and silhouette that led me through a doorway. **

            "The little devil got himself stuck again. Stuck beneath the boxes, over there. Can you get him for me?" The old woman asked.**

            The small shop smelled of old books and incense. Trinkets, stones and small boxes were tossed wherever they could fit. I had never seen the small shop and my curiosity peaked. What were these things in the jars, the oils, the herbs.
            `
            choice1Txt = 'You are surprised, but you agree to help.'
            choice2Txt = 'You are surprised, and you find that you don’t quite trust her. You tell her that you cannot help.'
            doubleMessage();
            runFunction = 'vilEnchanterChoices'
            break;
        case 'vilCompanion':
            storyTxt =`“Curious child you are, curious but quiet, go ahead and ask all the questions about the magic that fills this place. Ah, yes, but an ol’ woman like myself can sense things deary, that we can. We know things, and this ol’ woman knows who you are. You are the conscript, the one who will deliver our rest. Aye, I know of you, deary. Come, come with me.”  **

            I heard a soft meow coming from a darkened corner. “He’s stuck in there. Always getting himself into tight places and never able to get out. I’m too old to fight with the devil. Help an ol’ lady will you, sir?” 
            `
            addToCounter(15)
            singleMessage()
            runFunction = 'vilBook'
            break;
        case 'vilBook':
            storyTxt = `It was a quick job of moving around a few heavy boxes and opening the lid of the cage. In my mind I questioned if she herself stuck the cat in the cage, then waited around for me to help. I handed her the cat and she smiled a crooked grin. “Come, follow me deary.” **

            I followed her to the far side of the shop, she stopped and pointed her long crooked finger to a ladder that laid propped against a bookshelf. I looked from the bookshelf to the old lady. **
            
            "What do you need from up there?" **
            
            "You'll know, if you're the one, you'll know."
            `
            singleMessage()
            runFunction = 'vilMain'
            break;
        case 'vilBook2':
            storyTxt = `I climbed the ladder one step at a time. Looking for something that caught my eye and pulled my attention. There was nothing on the first shelf, the second, the third, the fourth, or the five. I felt like a fool the higher I climbed. Finally, I stopped climbing. A leatherbound book with gold trim seemed to glisten in the little bit of light that filled the room. I grabbed the book from the shelf and headed back down the ladder.**

            “Aye, I see. You are the one! There are great hopes that come from you deary. Come tomorrow before the sun rises you must leave for the forest. Go there, and you will find all you are looking for.” **
            
            “But what am I looking for?” I asked. **
            
            She smiled, her crooked witch grin and said, “You’ll know deary, you’ll know. Just beware, not all can be trusted. But tonight, tonight deary you have earned mine. When you need me, call, call and I will come.”**

            After leaving the shop I felt more sure about things. About creatures that wake during a warm winter night, and a single human able to defeat the beast. The rest of the walk home was quiet.
             `
             singleMessage()
            runFunction = 'vilEnd'
            break;
        case 'vilMain':
            storyTxt = `The walk home through village did not clear my mind or help me make sense of what was supposed to be my destiny. I walked into my home, lit the small lantern that hung by the door and pulled the envelope from my pocket. Exhaustion had consumed my mind and as I sat down at the table, my finger across the seal. If I broke it open and read its content would that be the same as me accepting a contract without knowing the details? **

            A harsh knock came to the door. Startled, I jumped from the chair. “Who’s there?” I asked. **
            
            There was no verbal response. Only another knock at the door. **
            
            “Who’s there?” I asked again. 
            `
            singleMessage()
            runFunction = 'vilMain2'
            break;
        case 'vilMain2':
            storyTxt = `Again, no voice called back, but instead of the gentle knock like before whoever was on the other side, pounded on the door in anger.**

            I opened the door to find the old hag from the alley. She was hunched over and the hood of her cloak covered most of her face. “Rude, rude children you all are. No consideration for an ol’ lady, no none.  Can’t even help an old lady get a book from a shelf? No, of course not. Why would you? I’m just an ol’ hag, huh? Yes, yes, deary, I know your thoughts. I know just what you are thinking. Here,” she said, shoving the book into my chest. The force behind the woman’s shove left a bruise where she slammed the book against my skin. “Take the damn thing.”**
            
            I clutched the book to my chest, and watched her limp away. I wanted to call out, say something, anything. I wanted answers. I wanted to know the right choice to make **
            
            “No, no, no.” she called out as she walked. “Thinkin about asking an old woman for help when you can’t even help her get a book off a shelf. Well, this woman, she aint got no help for you, no she don’t.” `
            singleMessage()
            runFunction = 'vilMain3'
            break;
        case 'vilMain3': 
            storyTxt = `I closed the door, and sat down at the table. Staring at the envelope my mind battled between opening it or tossing it into the fire. The old man told me the option was mine. 
        `
        choice1Txt = 'Accept the quest'
        choice2Txt = `burn it in fire`
            doubleMessage()
            runFunction = 'vilFinalChoices'
            break;
        case 'vilEnd':
            window.location.href = './forest.html'
            break;
        case 'vilEndStory':
            window.location.href = './mountain.html'
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
                runFunction = 'vilMain'
            }
            break;
        case 'vilFinalChoices':
            if (event.target.innerText === 'Choice 1'){// get value of that button
                runFunction = 'vilEnd'
            } 
            else {
                runFunction = 'vilEndStory'
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

// FUNCTIONS FOR SAVING LOCATION

let setRunFunction = function () {
    localStorage.setItem("runfunctionStory2", JSON.stringify(runFunction));
};

let getRunFunction = function () {
    if (localStorage.getItem("runfunctionStory2") !== null) {
        return JSON.parse(localStorage.getItem("runfunctionStory2"));
    }
    else {
        return "vilBegin"
    }
};


// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

hideInit();