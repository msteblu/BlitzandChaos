// ********************************* VARIABLES ************************************ / /

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
let gameObjects;

// Speed for typewriter functions: 
let speed = 0;

// Run variable
let runFunction = 'forBegin'

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
    // getImage();
    getMusic();
};

// *** Get background image function: ***

// let getImage = function () {
//     let apiUrl = "https://api.artic.edu/api/v1/artworks/70047"

//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {

//                     // set url: 
//                     let imageUrl = data.config.iiif_url + "/" + data.data.image_id + "/full/843,/0/default.jpg";

//                     // Change the background: 
//                     background.setAttribute("src", imageUrl);

//                     // Next, load the background music: 
//                     getMusic();
//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to connect to API');
//         });

// };

// *** Get background music function: ***
// Using Freesound API: https://freesound.org/docs/api/authentication.html
// Sound: https://freesound.org/people/klankbeeld/sounds/572546/
// "2020 park NL » park Cromvoirt May NL 210523_0284.ogg" by klankbeeld

let getMusic = function () {
    fetch("https://freesound.org/apiv2/sounds/572546/?token=VarP0dKebdRzKHFvZOPxw81IsdKK6OH3iLAgQRwY")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.2;
                    audioEl.setAttribute("loop", "true");

                    // // Saving location: 
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
        case 'forBegin':
            storyTxt = `The wind against my face was cold. Cold, yet warmer than it should have been for that time of year. The village ground should have been covered in snow, and yet the leaves were still changing and taking their time to fall.**

            As instructed, I left the next morning before the sun had a chance to rise. The pack I carried contained a few things, some food, water, a few pairs of clothes, the book from the old woman and the now unsealed envelope. The third elder lived somewhere deep within the forest. Where exactly was unknown. Something was telling me I would find my way, I had to. Getting lost or losing my way was not an option. Time was moving and with each passing second the wakening of Fraener was drawing closer. I moved swiftly, I wanted to keep warm, and the other part of me wanted to get to where I needed to be. But where was that? 
            `
            singleMessage(); // Run the function to display only one continue button
            
            runFunction = 'forBegin2' // Set runFunction to the subsequent "case"... called "next"
            break; // break out of the switch function
        case 'forBegin2': 
            storyTxt = `Stopping for a moment at the edge of the forest, I analyzed the dirt path that was dry and dusty with green grass still around its edges. The sun was finally rising and slowly making its way over the dense forest. I closed my eyes and prayed that something would guide me. The forest was not known for its kindness, more so to strangers who never wander through the trees.  **

            A shaking came from deep beneath the ground. **
            
            I held my stance firm to keep from falling over and watched the roots of the trees because I was too scared to look up. Were the trees going to crash to the ground? The sky fall from up above me? Would I look up to see a beast with a wing span the size of a fully grown sequoia tree? Oh, the stupid thoughts. Yet, there I was, standing, just waiting for the rumbling to stop. 
             `
            audioEl.play();
            singleMessage()
            
            runFunction = `forBegin3`
            break;
        case 'forBegin3':
            storyTxt = `The first few steps were disorienting. More so with the ground still moving, but something was pushing me towards the forest, telling me it was time to go. Not a second more could be wasted with just standing and waiting. So I walked, even though I truly felt the need to crawl. **

            The ground stopped moving as I passed the beginning edge of the forest. Thank the gods, so did the dizziness that came with the movement. **
            
            Even with the sun creeping into the sky, beneath the trees was still dark. I wondered if light ever reached this far below the top of the trees. To be honest, I couldn’t control my thoughts. They were scattered.  I still believe it was a way for my brain to fight the fear of what was to come.**
            
            The path in the forest widened through the trees and shrubs. A sign appeared on the path with arrows pointing in two directions. 
            `
            choice1Txt = `To the River`
            choice2Txt = `To the Deep Forest`            
            doubleMessage();
            addToCounter(15)
            runFunction = 'forBeginChoices' // This will be passed in for the case name in selectionMade after everything is written to the screen: to allow for cascading
            break;
        case 'theRiver':
            storyTxt = `Trees became less dense the further I walked. The grass on the other hand was overgrown and taking over small to large sections of the path.  A small stream flowed from a hill. It weaved itself between the deep rooted shrubs and trees. **

            The stream and I followed the same path that eventually led us to the river. The sound of the water crashing along the banks made me more cold than I already was. I imagined myself sitting at home, next to a warm fire that I always built in the fireplace on cold days. The wind gushed back and forth making me wish I would have followed the other path into the deep forest. I didn’t, though. Instead, I was still waiting for the sun to warm the sky just enough so I could sit on the ground and eat the small meal I had stashed away in my bag. 
             `
            singleMessage()
            addToCounter(15)
            runFunction = 'theRiver2'
            break;
        case 'theRiver2':
            storyTxt = `The walk along the river gave me peace. The sound of rushing water washed away all the bad, and as the sun warmed the ground the walk became more enjoyable. When the sun reached the high peak, I found a large boulder next to the river and sat for a moment, pulling out the sandwich I made and watching the world around me. **

            The birds whistled, the squirrels jumped from tree to tree, and a mama bear and her cubs went down to the river for their lunch time fishing. 
            `
            singleMessage();
            runFunction = 'theRiver3'
            break;
        case 'theRiver3': 
            storyTxt = `I pulled the book from my bag and flipped the pages to the back of the book to a page that contained a map of the forest. The path that runs by the river was a longer way to the blacksmith's cottage. It was better to take the time to keep from going through the deep woods. It was said to be safer for travel. **

            After making sure I was on the right path I packed up all my things and again started down the path. 
            `
            singleMessage();
            runFunction ='forMain'
            break;
        case 'deepForest':
            storyTxt = `The path was a straight incline up the small mountain. The cold didn't feel so bad as my body worked to get to the top. As it grew steeper wooden stairs came into view making the climb a little easier. ** 

            I reached the top and took a small break. The creatures of the forest were watching my every move. I could feel their eyes on me, watching, waiting. They wanted me to step off the path. See, it is said that a long time ago the witch casted a spell along the paths in the forest. A protection spell of sorts. Any creature that came along the path to do harm, would suffer a horrible death. I don’t know the truth of that story, but as I walked I chose to believe it. The thought gave me comfort. 
            `
            singleMessage()
            runFunction = 'deepForest2'
            break;
        case 'deepForest2':
            storyTxt = 'A few hours in I could feel the hunger kicking in. And down the path a ways was a lake, a nice like just off the path that I could stop at, enjoy a nice lunch. I debated in my mind on if I should keep pressing on, or stop for a short break.'
            choice1Txt = `Stop for a short break`
            choice2Txt = `Continue through the forest`
            doubleMessage();
            runFunction ='demonsOrMain'
            break;
        case 'demonsAtTheLake': 
            storyTxt = `I found a spot right off the path, perfect for sitting and viewing the lake. I pulled out the sandwich I made earlier that morning along with some water. The lake was peaceful and made me calm, relaxed. Almost too relaxed. I had things to do and a mission to complete, but there was time. I was taking the shortcut through the forest, which was saving some time. **

            I pulled the book, food and water from the bag, leaving just the clothes inside of it. I rolled it up and placed it beneath my head. I just needed a moment to rest my eyes. **
             `
            singleMessage();
            runFunction = `demonsAtTheLake2`
            break;
        case 'demonsAtTheLake2': 
            storyTxt = `A snarling sound woke me. In a frantic mess I sat up and looked around.  No one was there. Infact, nothing was there but off in the distance I heard a dog or some kind of canine barking frantically. I wiped the dirt from my face, took a sip of water and packed my bag. When I went to grab the book it was gone! My heart paced a million miles a minute. I reached my hand inside my pack and found the envelope. At the very least I still had that.`
            singleMessage()
            subtractFromCounter(100)
            runFunction = 'forMain'
            break;
        case 'forMain':
            storyTxt = `Rising smoke was the first sign of the cottage. The next was how the path went from dirt to stone. **

            Nervousness found its place in the pit of my stomach. Something felt off, not quite right. The air contained an unsettling stillness. No birds could be heard, the wind never blew. All was silent and the only sound that could be heard was that of my footsteps. **
            
            The cottage came into view. It was small but built to last centuries. The closer I got the more my nerves kicked into overdrive. 
            `
            singleMessage();
            runFunction = 'forMain2'
            break;
        case 'forMain2':
            storyTxt = `A wild dog rushed from the door of the cottage straight towards me. There was a deep growl coming from the back of his throat as he stopped directly in front of me. **

            I stopped where I was and tried to calm it. ** 
            
            A man stepped out of the cottage and made his way down the path. ** 
            
            "Now what do we have here, Captain? Looks like you gone and found yourself a fool."
            `
            choice1Txt = `Who are you calling a fool? `
            choice2Txt = `Sorry to bother you, sir. I was told you could help me.`
            doubleMessage();
            runFunction = 'foolOrNot'
            break;
        case 'theFool':
            storyTxt = `Perhaps, my response was not what it should have been. The day was long, and although that is no excuse, I still should have understood my position. I was not the one in control, and I needed the man. I needed instruction and guidance. But instead, what came was a  door in the face, and me, just another human, lost in a dense forest searching for a way out, praying I would finish the tasks before it was too late.  `
            singleMessage()
            subtractFromCounter(100)
            runFunction = `theFool2`
            break;
        case 'theFool2':
            window.location.href = './mountain.html'
            break;
        case 'forTorch':
            storyTxt = `The old man groaned, and if I heard it right, the dog did too. The man turned from me and went inside his home. I went to follow, assuming that was what I was supposed to do. As I took a step forward, the dog growled, showing his sharp teeth. I took a step back.**

            “Okay, okay. I’ll wait here then.” The dog sat down, his tail wagging one whip. And there we waited, just like that. Captain’s eyes never left mine, and I never moved a muscle. ** 
            Five minutes later the old man came back outside, and began to walk down the path. “Now where is he going?” I asked the dog.
            `
            singleMessage()
            runFunction = 'forTorch2'
            break;
        case 'forTorch2':
            storyTxt =`The old man whistled, Captain’s ears perked up and without another moment's hesitation he went to the man's side. **

            I stayed put. Waiting for instruction. The man stopped, turned around and glared. The dog stopped, turned around and growled. **
            
            “Are you coming or not?” the old man grumbled. “Damn fool. Supposed to save the world, can you believe that Captain?” **
            
            I swear I saw the dog shake his head. I have never seen a human and animal with such a connection. I had questions, plenty of them. But,  it didn’t seem this man was willing to answer a single one. 
            `
            singleMessage()
            runFunction = 'forTorch3'
            break;
        case 'forTorch3':
            storyTxt = `We walked until my ankles were swollen, my calves and thighs sore. We stopped for a moment and I sat down on the dirt. **

            “You’re not done, yet.” he said. “He pulled out a torch from his bag and handed it down to me. “If you’re the one, you’ll find the way. I’m supposed to say if you need me or Captain. . . “ The dog growled. “We’ll come. But we won’t. No one will. You’re on your own. Let us all hope your not as stupid as look. Captain, come.” And it was there they left me in the middle of the forest to finish a quest that was supposed to save the world. 
             `
            singleMessage();
            addToCounter(10);
            runFunction = 'forEnd'
            break;
        case 'forEnd':
            window.location.href = './cave.html'
            break;
    }
}

// FUNCTION TO HANDLE CHOICES/CASCADING:
let selectionMade = function (event) {  // pass in button that was clicked
    switch (runFunction) { // pass in the name of runFunction (which we set up in runStory)
        case 'forBeginChoices':
            if (event.target.innerText === 'Choice 1') { // get value of that button
                runFunction = 'theRiver' //set to a new "case"
            }
            else {
                runFunction = `deepForest` // set to a new "case"
            }
            break;
        case 'demonsOrMain':
            if (event.target.innerText === 'Choice 1'){
                runFunction ='demonsAtTheLake'
            }
            else {
                runFunction = 'forMain'
            }
            break;
        case 'foolOrNot':
            if (event.target.innerText === 'Choice 1') {
                runFunction = 'theFool'
            }
            else {
                runFunction = 'forTorch'
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
        cardContinue.style.backgroundColor = 'black';
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
    localStorage.setItem("runfunctionStory3", JSON.stringify(runFunction));
};

let getRunFunction = function () {
    if (localStorage.getItem("runfunctionStory3") !== null) {
        return JSON.parse(localStorage.getItem("runfunctionStory3"));
    }
    else {
        return "forBegin"
    }
};


document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

// **************************** RUN FUNCTIONS AT INITIALIZE: ******************** 

hideInit();