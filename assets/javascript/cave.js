let textContainer = $("#text");
let continueBtn = $("#continue");
let caveImg = $("#caveImage");
let option1 = $(".choice1");
let option2 = $(".choice2");
let headerImg = $("#header").children().eq(0);
let menuEl = $("#menu");
let menuBtn = $("#showmenu");
let textEl = $("#currentText");
let audioEl = document.querySelector("#audio");
let apiKey = "563492ad6f917000010000015b7284fdeb3c4957b9976cdc11fb5370";
let textCSS = { "display": "block", "width": "100%", "height": "100%", "font-size": "20px", "padding": "10px", "border-radius": "5px", "background-color": "background-color: #ffe4c4" };
let charNum = 0;
let textt = "";
let myVar;
let finished = false;
let line = "";
let choiceNum;
let run = false;
let leaveCave = false;
let choices = false;
let mainLine = false;
let choiceFinished = false;
if (JSON.parse(localStorage.getItem("runfunctionStory4")) === null) {
    var textNum = 0;
    var branch = 0
} else {
    var textNum = JSON.parse(localStorage.getItem("runfunctionStory4"))[0]
    var branch = JSON.parse(localStorage.getItem("runfunctionStory4"))[1]
}
if (textNum === 14) {
    window.location.href = "mountain.html"
}
// if (JSON.parse(localStorage.getItem("loading")) === true) {
//     var textNum = JSON.parse(localStorage.getItem("saveSpot")).textnum;
//     var currentLocation = JSON.parse(localStorage.getItem("saveSpot")).location;
//     var currentPoints = JSON.parse(localStorage.getItem("saveSpot")).currentpoints;
//     var branch = JSON.parse(localStorage.getItem("saveSpot")).branch;
//     localStorage.setItem("loading", JSON.stringify(false));
// } else {
//     var textNum = 0;
//     var currentLocation = "cave"
//     var currentPoints = 0;
//     var branch = 0;
// }
option1.text("continue")
option2.parent().css({ "display": "none" })



fetch("https://api.pexels.com/v1/photos/2633", { headers: { "Authorization": apiKey } })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        caveImg.attr({ "src": data.src.original });
    })

fetch("https://api.pexels.com/v1/photos/97494", { headers: { "Authorization": apiKey } })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        headerImg.attr({ "src": data.src.original });
    })

fetch("https://freesound.org/apiv2/sounds/343741?token=qz79q7DsbN3veU3EUNMHVH0GBhsbt4v13jCK7yNh")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $(function () {
            audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
            audioEl.volume = 0.3;
            audioEl.setAttribute("loop", "true");
            option1.on("click", choice)
            option2.on("click", choice)
        })
    })

// function saveHere() {
//     localStorage.setItem("saveSpot", JSON.stringify({ "location": currentLocation, "textnum": textNum, "branch": branch, "currentpoints": currentPoints }))
// }

function typeWriter() {
    run = true;
    if (charNum < line.length) {
        textt = textt + line[charNum];
        textEl.text(textt);
        charNum++;
        myVar = setTimeout(typeWriter, 50);
    } else {
        clearTimeout(myVar);
        finished = true;
        charNum = 0;
        textt = "";
        choiceNum = 1;
        if (choices) {
            option1.text("");
            option2.text("");
            option2.parent().css({ "display": "inline" });
            choiceTypeWriter();
        }
    }
}

function choiceTypeWriter() {
    choiceFinished = false;
    option2.parent().css({ "display": "inline" })
    if (choiceNum === 1) {
        if (charNum < choice1.length) {
            textt = textt + choice1[charNum]
            option1.text(textt)
            charNum++;
            myVar = setTimeout(choiceTypeWriter, 50);
        } else {
            clearTimeout(myVar);
            charNum = 0;
            textt = "";
            choiceNum = 2;
            choiceTypeWriter();
        }
    } else {
        if (charNum < choice2.length) {
            textt = textt + choice2[charNum];
            option2.text(textt);
            charNum++;
            myVar = setTimeout(choiceTypeWriter, 50);
        } else {
            charNum = 0;
            textt = "";
            choiceFinished = true;
            clearTimeout(myVar);
        }
    }
}

function choice(event) {
    let object = $(event.target);
    if (finished === false && option1.text() === "continue") {
        audioEl.play()
        clearTimeout(myVar);
        finished = true;
        charNum = 0;
        textt = "";
        choiceNum = 1;
        textEl.text(line);
        if (choices) {
            option1.text("");
            option2.text("");
            option2.parent().css({ "display": "inline" });
            choiceTypeWriter();
        }
        option1.text("continue")
        option2.text("")
        option2.parent().css({ "display": "none" })
    } else {
        if (!(choiceFinished)) {
            finished = true;
            choiceFinished = true;
            if (choices) {
                option1.text(choice1);
                option2.text(choice2);
            }
            charNum = 0;
            textt = "";
            choiceNum = 1;
            clearTimeout(myVar);
        } else {
            if (branch === 0) {
                if (textNum === 0 && finished && choiceFinished) {
                    audioEl.play()
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 1 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 2 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 3 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                        textNum = 0;
                        branch = 1;
                    } else {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 4 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 5 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 6 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 7 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 8 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 9 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 10 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                        textNum = 0;
                        branch = 2;
                    } else {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 11 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 12 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 13 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                        window.location.href = "mountain.html"
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                }
            } else if (branch === 1) {
                if (textNum === 0 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 1 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 2 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                        textNum = 4;
                        branch = 0;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                }
            } else if (branch === 2) {
                if (textNum === 0 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 1 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                } else if (textNum === 2 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                        textNum = 11;
                        branch = 0;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({ "display": "none" });
                }
            }
            localStorage.setItem("runfunctionStory4", JSON.stringify([textNum, branch]))
        }
    }
}

// menuBtn.on("click", function (event) {
//     $(event.target).parent().css({ "display": "none" })
//     $(event.target).parent().siblings().eq(0).css({ "display": "block" })
// })

// menuEl.on("click", "div", function (event) {
//     if ($(event.target).text() === "Save") {
//         saveHere()
//     } else if ($(event.target).text() === "Close Menu") {
//         menuBtn.css({ "display": "block" })
//         $(event.target).parent().parent().parent().css({ "display": "none" })
//     } else if ($(event.target).text() === "Load Save") {
//         menuBtn.css({ "display": "block" })
//         $(event.target).parent().parent().parent().css({ "display": "none" })
//         localStorage.setItem("loading", JSON.stringify(true))
//         window.location.href = `${JSON.parse(localStorage.getItem("saveSpot")).location}.html`
//     }
// })

function deadEnd() {
    if (textNum === 0 && run === false) {
        finished = false;
        choices = false;
        line = "As I continued down the tunnel, everything was quiet. The air was motionless. It wasn’t until my calves began to burn that I realized I had been steadily making my way up a slope.";
        typeWriter();
    } else if (textNum === 1 && run === false) {
        finished = false;
        choices = false;
        line = "A solid wall waited for me at the end of the tunnel. I tapped on the walls… overturned rocks near my feet… but there were no sounds of hollowness, no secret etchings, no hidden passageways. It was simply a dead-end.";
        typeWriter();
    } else if (textNum === 2 && run === false) {
        finished = false;
        choices = false;
        line = "I turned back around. Was this all there was? But that gap in the wall was still on my mind. It seemed to be my last choice.";
        typeWriter();
    }
}

function stalagmite() {
    if (textNum === 0 && run === false) {
        finished = false;
        choices = false;
        line = "The oil caught fire instantly. It flared, and I watched the flames race down the trough to light a cavern vaster than I had imagined. Pearly stalactites hung from the ceiling while tremendous pillars of stalagmites rose from the earth. Underground pools shimmered. It was as though I had materialized into an otherworldly palace. Everything was opalescent in the shifting firelight.";
        typeWriter();
    } else if (textNum === 1 && run === false) {
        finished = false;
        choices = false;
        line = "The carvings continued around the edges of the cave’s walls. I followed them, running my hand along the damp stone, and then stepping further and further into the cave, turning and craning to take in all the images. They shifted before me — the dragon soaring, arrows hurtling towards it, fire streaming from its mouth — until I could almost hear the scenes. And then I realized that they all circled something in the center of the cavern. And from that something emitted the yearning sound I had heard snatches of this entire time.";
        typeWriter();
    }
}

function main() {
    if (branch === 0) {
        if (textNum === 0 && run === false) {
            finished = false;
            choices = false;
            line = "It was not long after leaving behind the edges of the forest that I found the cave. The ground beneath my feet was just starting to steepen, forming itself into the imposing mountain ahead. But that path was for the future. Here, at my feet, an ominous crevice slashed its way into the stone. A shiver ran down my spine as cool air wafted from the void. Was this truly the destiny I wanted to accept? Everything I had already encountered had changed me. There was no turning away now.";
            typeWriter();
        } else if (textNum === 1 && run === false) {
            finished = false;
            choices = false;
            line = "Something was etched into the stone. My fingers traced the outline of a dragon. Fraener. I lit my torch and descended into the cave.";
            typeWriter();
        } else if (textNum === 2 && run === false) {
            finished = false;
            choices = false;
            line = "The tunnel twisted through the stone until I lost all sense of direction. Slowly, the walls crept in closer and the ground became more and more treacherous. Besides the carving of Fraener at the entrance, there were no more signs that this was anything beyond a simple fissure in the mountain.";
            typeWriter();
        } else if (textNum === 3 && run === false) {
            finished = false;
            choices = true;
            line = "I slowed as the passageway ahead curved. The rocky pathway I had been following veered off to the right, still wide enough for two abreast. Was it my imagination, or did the ground ahead seem smoother, more worn? At the curve, however, the stone walls had split yet again. To the left was a jagged hole, just a gap really, but it was the first irregularity I had seen in this tunnel. I lifted my torch to its opening. Though narrow - barely wide enough for me to slip into - it seemed to be the start of another tunnel. "
            choice1 = "I pause, and then continue to follow the path to the right."
            choice2 = "I pause, and then clamber into the narrow opening."
            typeWriter();
        } else if (textNum === 4 && run === false) {
            finished = false;
            choices = false;
            line = "Once through the narrow crevice, I relaxed. Somehow, it felt like I was on the right path. The air smelled cleaner. The walls sparkled under my torchlight. My ears caught something — was it humming? I couldn’t quite place it, and then wondered if I imagined it, afterall, silence with your own mind can lead to many delusions. ";
            typeWriter();
        } else if (textNum === 5 && run === false) {
            finished = false;
            choices = false;
            line = "Steadily, the tunnel grew wider and more uniform. The glinting light from the particles in the stone was almost spellbinding. I couldn’t tell you how long I had been walking. And that sound… it’s more like… a melody…";
            typeWriter();
        } else if (textNum === 6 && run === false) {
            finished = false;
            choices = false;
            line = "Something on the wall caught my eye. Another carving. This one of a warrior, spear in hand, words in a language I didn’t understand spiraling around the figure. An etching of a king followed that one, his face harrowed. I leaned in closer, trailing my hand along the wall.";
            typeWriter();
        } else if (textNum === 7 && run === false) {
            finished = false;
            choices = false;
            line = "Carvings filled the walls. It seemed that every bit of the tunnel was covered in olden tales. Villages, where if you looked carefully, you could see tiny people going about their days . . . Armies traipsing across the walls . . . Forests spilling onto the floor, reaching into places they shouldn’t be . . .  Mountains looming . . .  A shifting mosaic of movement and order, and chaos. And then… Fraener.";
            typeWriter();
        } else if (textNum === 8 && run === false) {
            finished = false;
            choices = false;
            line = "Unlike the carving at the cave’s entrance, this depiction of Fraener was monstrous. The dragon loomed over the tunnel, almost palpable in its detail. Every pointed scale was defined, every wicked tooth razor-sharp. And the eyes… they glowed with a horrible intensity, a viciousness so terrible… I was dazed under their fury. Yet Fraener did not look at me. The dragon’s gaze was pointed further down the passage.";
            typeWriter();
        } else if (textNum === 9 && run === false) {
            finished = false;
            choices = false;
            line = "I broke away from the etching and found that I had reached the end of the tunnel. Though my torchlight did not travel far, I could tell I had stepped into a vast chamber. Drops of moisture echoed as they fell from high above and the air moved in cool currents.";
            typeWriter();
        } else if (textNum === 10 && run === false) {
            finished = false;
            choices = true;
            line = "A stone trough stretched out into the darkness. There was some sort of liquid in it, and upon closer consideration, it seemed to be oil. And I heard something — something I couldn’t quite place — out in the cavernous darkness.";
            choice1 = "I light the oil with my torch";
            choice2 = "I quietly creep forward to investigate the noise.";
            typeWriter();
        } else if (textNum === 11 && run === false) {
            finished = false;
            choices = false;
            line = "The noise grew louder as I crept forward, drawing me closer. In the center of the cave lay a great stone, and something in it glinted. The hilt of a sword. The hilt glowed faintly, a blueish color, and from it emanated the sound, now clear and haunting. I didn’t have to guess to know that there was magic entwined with this sword. This was the reason I had been sent here, I was sure of it. I scaled the rock, gripped the hilt cautiously, and pulled.";
            typeWriter();
        } else if (textNum === 12 && run === false) {
            finished = false;
            choices = false;
            line = "The rock easily relinquished it into my grasp. Once it was free of the stone, the sword flared with a blinding light, and the haunting sound and light and carvings swirled around me in the legends of battles long past — time streaming before me. And then I felt a rumbling in the ground. Was it the magic crossing my path? Was it the dragon awakening? Regardless, I knew that my task here was done.";
            typeWriter();
        } else if (textNum === 13 && run === false) {
            finished = false;
            choices = false;
            line = "The cave settled back into silence. The sword, while beautiful, looked normal now, no longer humming or glowing. I slipped it through my belt and made my way back up the tunnel towards the entrance without incident. The ground only rumbled a few times. I knew the end of my journey was now upon me. The mountain awaited.";
            typeWriter();
        }
    } else if (branch === 1) {
        deadEnd();
    } else if (branch === 2) {
        stalagmite();
    }
}

let interval = setInterval(main, 250);

// $(function () {
//     $("#menu").menu();
// });