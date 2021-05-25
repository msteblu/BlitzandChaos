// ********************** VARIABLES *********************** //

let storyContainer = document.querySelector('.story');
let choice1Container = document.querySelector('.choice1');
let choice2Container = document.querySelector('.choice2');
let background = document.querySelector('#bg');

let card1 = document.querySelector('.card1');
let card2 = document.querySelector('.card2');


// Local Storage variables: 
// Add Local Storage variables here to push to...



// ***************************** FUNCTIONS ***************************** //

// *** Get background image function: ***

let getImage = function () {
    let apiKey = "563492ad6f917000010000015b7284fdeb3c4957b9976cdc11fb5370"

    fetch( "https://api.pexels.com/v1/photos/1450082/", { headers: { "Authorization": apiKey } })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // set url to be able to call it later: 
                background.setAttribute("src", data.src.original)
                hideInit();
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to API');
    });
};


// Testing Music: !!!!!!!!!!!!!!!


// ***** The Initial function:  *****

let hideInit = function () {
    card1.style.display = "none";
    card2.style.display = "none";

    // start the story sequence:
    enterMountain();
};


//******************************* STORYLINES  ********************************/

// ************* Enter Town Storyline: **************

// ** Basic Storyline: **
let enterMountain = function () {

    let storyTxt = "You enter the mountain. Lorem ipsum lorem ipsum";
    let i = 0;
    let speed = 25;

    function typeWriter() {
        if (i < storyTxt.length) {
            storyContainer.innerHTML += storyTxt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Once the script has been written out, display the user's options: 
            enterMountainChoices();
        }
    }

    typeWriter();
    
};

// ** User Choices: ** 
let enterMountainChoices = function () {
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
    let storyTxt = "Example text... lorem ipsum lorem ipsum "
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
    let choice1Txt = "Choice one is this lorem ipsum.";
    let choice2Txt = "Choice two is this, lorem ipsum";
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
