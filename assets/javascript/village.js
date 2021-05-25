// ********************** VARIABLES *********************** //

let storyContainer = document.querySelector('.story');
let choice1Container = document.querySelector('.choice1');
let choice2Container = document.querySelector('.choice2');
let background = document.querySelector('#bg');

let card1 = document.querySelector('.card1');
let card2 = document.querySelector('.card2');

// Creating an empty variable that will be the url for the background image
let villageUrl

// Local Storage variables: 
// Add Local Storage variables here to push to...



// ***************************** FUNCTIONS ***************************** //

// *** Get background image function: ***

let getImage = function () {
    let apiUrl = "https://api.artic.edu/api/v1/artworks/20314"
    // let softUrl = "https://api.artic.edu/api/v1/artworks/107348"  // this is a bonus artwork; also, I got my background images through the Art Institute of Chicago API... just testing out other API's

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                // testing to make sure we're grabbing the correct data (can remove later): 
                console.log(data.config.iiif_url);
                console.log(data.data.image_id);

                // set url to be able to call it later: 
                let imageUrl = data.config.iiif_url + "/" + data.data.image_id + "/full/843,/0/default.jpg";
                villageUrl = imageUrl;

                // Call the next function to display it:
                displayImage();
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to API');
    });
};


// *** Display background image function: *** 
// (Run this first so it will load before the rest of the functions try to run...)

let displayImage = function (data) {
    background.setAttribute( "src", villageUrl);
    // Run a function to hide everthing initially, and to start the story sequence: 
    hideInit();
};

// Testing Music: !!!!!!!!!!!!!!!


// ***** The Initial function:  *****

let hideInit = function () {
    card1.style.display = "none";
    card2.style.display = "none";

    // start the story sequence:
    enterVillage();
};


//******************************* STORYLINES  ********************************/

// ************* Enter Town Storyline: **************

// ** Basic Storyline: **
let enterVillage = function () {

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

// STAND-IN FUNCTIONS JUST FOR TESTING EVENT LISTENERS (without having functions to run yet): 
let myFunctionReference = function() { alert("You clicked button 2")};
let myFunctionReference1 = function() { alert("You clicked button 1")};



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
    buttonEnchanter2.addEventListener('click', myFunctionReference , false);

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


// This same method can continue for each storyline for the page. 






// ************* RUN FUNCTIONS AT INITIALIZE: ******************** 

// To start the rolling by getting the background image:
getImage();
