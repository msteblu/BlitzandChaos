// ********************** VARIABLES *********************** //

let storyContainer = document.querySelector('.story');
let choice1Container = document.querySelector('.choice1');
let choice2Container = document.querySelector('.choice2');
let background = document.querySelector('#bg');
let audioEl = document.querySelector('#audio');

let card1 = document.querySelector('.card1');
let card2 = document.querySelector('.card2');
let cardContinue = document.querySelector('.cardContinue');



// Local Storage variables: 
// Add Local Storage variables here to push to...



// ***************************** FUNCTIONS ***************************** //

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
                console.log(data);

                // testing to make sure we're grabbing the correct data (can remove later): 
                console.log(data.config.iiif_url);
                console.log(data.data.image_id);

                // set url: 
                let imageUrl = data.config.iiif_url + "/" + data.data.image_id + "/full/843,/0/default.jpg";

                // Change the background: 
                background.setAttribute( "src", imageUrl);

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
                audioEl.volume = 0.3;
                audioEl.setAttribute("loop", "true");
            
                console.log(audioEl); 

                // Finally, begin the storyline after we've gathered everything (so there won't be any conflicts): 
                beginVillage();
            })
        }
    })
}





//******************************* STORYLINES  ********************************/

// ************* Beginning Town Storyline: **************

// ** Basic Storyline: **

let beginVillage = function () {

    let storyTxt = "The village is quiet in the morning. A dog barks, some people bustle in the market... etc.";
    let i = 0;
    let speed = 25;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            beginVillageContinue();
        }
    }

    typeWriter();
    
};

// ** Continue: ** 
let beginVillageContinue = function () {

    // Continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button");
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', enterVillage , false);


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline"; 
    cardContinue.appendChild(btnContinue);

};


// ************* Enter Town Storyline: **************

// ** Basic Storyline: **
let enterVillage = function () {

    // First, set all of the containers back to empty
    storyContainer.innerHTML = "";
    
    // We have to remove the buttons we created or they will just keep piling up each time we run a new function
    cardContinue.removeChild(cardContinue.lastElementChild);
    
    // Once again, hide the containers before they're filled
    cardContinue.style.display = "none";
    // Start to play the music, after the first user interaction: 
    audioEl.play(); 
        
    let storyTxt = "You enter the village. A strange woman stares at you. She beckons and asks you to follow her.";
    let i = 0;
    let speed = 25;

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

// ** User Choices: ** 
let enterVillageChoices = function () {
    let choice1Txt = "You’re too busy. You ignore her and carry on.";
    let choice2Txt = "You agree and follow her.";
    let i = 0;
    let t = 0;
    let speed = 30;

    // Create a button and add Event Listener for Choice 1
    let button1 = document.createElement('button');
    button1.classList.add("button");
    button1.innerHTML = "Choice 1";
    button1.addEventListener('click', myFunctionReference1 , false);

    // Create a button and add Event Listener for Choice 2
    let button2 = document.createElement('button');
    button2.classList.add("button");
    button2.innerHTML = "Choice 2";
    button2.addEventListener('click', theEnchanter , false);

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
            setTimeout(typeWriter, speed);
        } else {
            // Display the button: 
            card2.appendChild(button2);
        }
    }

    typeWriter();
};


// ***************** The Enchanter Storyline: *******************

// Each new storyline/choices is simply copied and modified from the initial function. 

// ** Basic Storyline: **
let theEnchanter = function () {
    // First, set all of the containers back to empty
    storyContainer.innerHTML = "";
    choice1Container.innerHTML = "";
    choice2Container.innerHTML = "";

    // We have to remove the buttons we created or they will just keep piling up each time we run a new function
    card1.removeChild(card1.lastElementChild);
    card2.removeChild(card2.lastElementChild);

    // Once again, hide the containers before they're filled
    card1.style.display = "none";
    card2.style.display = "none";

    // Run the same type of Typewriter functions
    let storyTxt = "The woman leads you to a dark shop filled with strange items. There’s a buzz of magic in the air. She tells you she is an enchanter and that she can sense that you are the one who can save the town from some disaster. She asks you to…  "
    let i = 0;
    let speed = 25;

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

// ** User Choices: **
let theEnchanterChoices = function () {
    let choice1Txt = "You are surprised, but you agree to help.";
    let choice2Txt = "You are surprised, and you find that you don’t quite trust her. You tell her that you cannot help.";
    let i = 0;
    let t = 0;
    let speed = 30;

    let buttonEnchanter1 = document.createElement('button');
    buttonEnchanter1.classList.add("button");
    buttonEnchanter1.innerHTML = "Choice 1";
    buttonEnchanter1.addEventListener('click', myFunctionReference1 , false);

    let buttonEnchanter2 = document.createElement('button');
    buttonEnchanter2.classList.add("button");
    buttonEnchanter2.innerHTML = "Choice 2";
    buttonEnchanter2.addEventListener('click', theBook , false);

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
        
    }

    function typeWriter2() {
        if (t < choice2Txt.length) {
            choice2Container.innerHTML += choice2Txt.charAt(t);
            t++;
            setTimeout(typeWriter, speed);
        } else {
            card2.appendChild(buttonEnchanter2);
        }
    }

    typeWriter();
};


// ***************** The Book Storyline: *******************

// ** Basic Storyline: **
let theBook = function () {
    // First, set all of the containers back to empty
    storyContainer.innerHTML = "";
    choice1Container.innerHTML = "";
    choice2Container.innerHTML = "";

    // We have to remove the buttons we created or they will just keep piling up each time we run a new function
    card1.removeChild(card1.lastElementChild);
    card2.removeChild(card2.lastElementChild);

    // Once again, hide the containers before they're filled
    card1.style.display = "none";
    card2.style.display = "none";

    // Run the same type of Typewriter functions
    let storyTxt = "On your way out, the enchanter points at a small leatherbound book. She tells you that it is a spellbook and will be necessary to what you need to do. Somehow, it feels like the book belongs with you. You take it. {Receive Spellbook.} You flip through the pages… a “holding spell.” It says something about needing “Item”... you think you could find that in a forest..."
    let i = 0;
    let speed = 25;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Run the function to display user choices
            theBookChoices();
        }
    };

    typeWriter();
};

// ** User Choices: **
let theBookChoices = function () {
    let choice1Txt = "You are surprised, but you agree to help.";
    let choice2Txt = "You are surprised, and you find that you don’t quite trust her. You tell her that you cannot help.";
    let i = 0;
    let t = 0;
    let speed = 30;

    let buttonBook1 = document.createElement('button');
    buttonBook1.classList.add("button");
    buttonBook1.innerHTML = "Choice 1";
    buttonBook1.addEventListener('click', myFunctionReference1 , false);

    let buttonBook2 = document.createElement('button');
    buttonBook2.classList.add("button");
    buttonBook2.innerHTML = "Choice 2";
    buttonBook2.addEventListener('click', myFunctionReference , false);

    card1.style.display = "inline";

    function typeWriter() {
        if (i < choice1Txt.length) {
            choice1Container.innerHTML += choice1Txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            card1.appendChild(buttonBook1);
            card2.style.display = "inline";
            typeWriter2();
        }
        
    }

    function typeWriter2() {
        if (t < choice2Txt.length) {
            choice2Container.innerHTML += choice2Txt.charAt(t);
            t++;
            setTimeout(typeWriter, speed);
        } else {
            card2.appendChild(buttonBook2);
        }
    }

    typeWriter();
};

// ***************** The END Storyline: *******************

let endVillage = function () {

    let storyTxt = "This is the ending sequence. You are moving on to the next location.";
    let i = 0;
    let speed = 25;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            endVillageContinue();
        }
    }

    typeWriter();
    
};

// ** Continue: ** 
let endVillageContinue = function () {

    // Continue Button
    let btnContinue = document.createElement('button');
    btnContinue.classList.add("button");
    btnContinue.innerHTML = "Continue";
    btnContinue.addEventListener('click', myContinueReference , false); // Change this to redirect to next HTML page.


    // Display the card that we initially had hidden: 
    cardContinue.style.display = "inline"; 
    cardContinue.appendChild(btnContinue);

};

// This same method can continue for each storyline for the page. 




// STAND-IN FUNCTIONS JUST FOR TESTING EVENT LISTENERS (without having functions to run yet): 
let myFunctionReference = function() { alert("You clicked button 2")};
let myFunctionReference1 = function() { alert("You clicked button 1")};
let myContinueReference = function() { alert("You clicked continue")};




// ************* RUN FUNCTIONS AT INITIALIZE: ******************** 

// To start the ball rolling by getting the background image:
hideInit();
