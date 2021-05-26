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
// if (JSON.parse(localStorage.getItem("loading")) === true) {
//     var textNum = JSON.parse(localStorage.getItem("saveSpot")).textnum;
//     var currentLocation = JSON.parse(localStorage.getItem("saveSpot")).location;
//     var currentDay = JSON.parse(localStorage.getItem("saveSpot")).day;
//     localStorage.setItem("loading", JSON.stringify(false));
// } else {
var textNum = 0;
// }
option1.text("continue")
option2.parent().css({"display": "none"})



fetch("https://api.pexels.com/v1/photos/2633", { headers: { "Authorization": apiKey } })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        caveImg.attr({ "src": data.src.original });
        console.log(data.src.original)
    })

fetch("https://api.pexels.com/v1/photos/97494", { headers: { "Authorization": apiKey } })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        headerImg.attr({ "src": data.src.original});
        console.log(data.src.original)
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
            continueBtn.on("click", nextText);
            option1.on("click", nextText);
            option2.on("click", nextText);
        })
    })

function saveHere() {
    localStorage.setItem("saveSpot", JSON.stringify({"location": currentLocation, "textnum": textNum, "day": currentDay}))
}

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
            option2.parent().css({"display": "inline"})
            choiceTypeWriter();
        }
    }
}


function choiceTypeWriter() {
    option2.parent().css({"display": "inline"})
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
            clearTimeout(myVar);
        }
    }
}

function choice(event) {
    let object = $(event.target);
    if (finished === false && option1.text() === "continue") {
        console.log("pog")
        clearTimeout(myVar);
        option2.parent().css({"display": "inline"})
        finished = true;
        charNum = 0;
        textt = "";
        choiceNum = 1;
        textEl.text(line)
        if (choices) {
            choiceTypeWriter();
        }
    } else {
        if (textNum === 0 && finished) {
            if (object[0].id === "one") {
                textNum++;
                run = false;
            } else {
                textNum++
                leaveCave = true;
            } 
        }
    }
    option1.text("continue")
    option2.text("")
    option2.parent().css({"display": "none"})
}

option1.on("click", choice)
option2.on("click", choice)

menuBtn.on("click", function(event) {
    $(event.target).parent().css({"display": "none"})
    $(event.target).parent().siblings().eq(0).css({"display": "block"})
})

menuEl.on("click", "div", function(event) {
    if ($(event.target).text() === "Save") {
        saveHere()
    } else if ($(event.target).text() === "Close Menu") {
        menuBtn.css({"display": "block"})
        $(event.target).parent().parent().parent().css({"display": "none"})
    } else if ($(event.target).text() === "Load Save") {
        menuBtn.css({"display": "block"})
        $(event.target).parent().parent().parent().css({"display": "none"})
        localStorage.setItem("loading", JSON.stringify(true))
        window.location.href = `${JSON.parse(localStorage.getItem("saveSpot")).location}.html`
    }
})

function leftCave() {
    if (textNum === 1 && run === false) {
        line = "You left the cave.";
        choices = false;
        typeWriter();
    }
}

function main() {
    if (textNum === 0 && run === false) {
        finished = false;
        choices = true;
        line = "You arrive at the cave.";
        choice1 = "Enter.";
        choice2 = "Leave.";
        typeWriter()
    } else if (textNum === 1 && run === false) {
        finished = false;
        choices = true;
        line = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, porro. Odio accusamus, pariatur eos, nobis ipsa minus sequi ad atque cupiditate porro dolorum obcaecati optio recusandae iusto, nisi vel ut.";
        choice1 = "Enter2.";
        choice2 = "Leave2.";
        typeWriter();
    }
    if (leaveCave) {
        run = false;
        leftCave();
        clearInterval(interval);
    }
}

let interval = setInterval(main, 500);







$(function() {
    $("#menu").menu();
});