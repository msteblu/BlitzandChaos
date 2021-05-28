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

if (JSON.parse(localStorage.getItem("loading")) === true) {
    var textNum = JSON.parse(localStorage.getItem("saveSpot")).textnum;
    var currentLocation = JSON.parse(localStorage.getItem("saveSpot")).location;
    var currentPoints = JSON.parse(localStorage.getItem("saveSpot")).currentpoints;
    var branch = JSON.parse(localStorage.getItem("saveSpot")).branch;
    localStorage.setItem("loading", JSON.stringify(false));
} else {
    var textNum = 0;
    var currentLocation = "cave"
    var currentPoints = 0;
    var branch = 0;
}
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
            option1.on("click", choice)
            option2.on("click", choice)
        })
    })

function saveHere() {
    localStorage.setItem("saveSpot", JSON.stringify({"location": currentLocation, "textnum": textNum, "branch": branch, "currentpoints": currentPoints}))
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
            option1.text("");
            option2.text("");
            option2.parent().css({"display": "inline"});
            choiceTypeWriter();
        }
    }
}


function choiceTypeWriter() {
    choiceFinished = false;
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
            choiceFinished = true;
            clearTimeout(myVar);
        }
    }
}

function choice(event) {
    let object = $(event.target);
    if (finished === false && option1.text() === "continue") {
        clearTimeout(myVar);
        finished = true;
        charNum = 0;
        textt = "";
        choiceNum = 1;
        textEl.text(line);
        if (choices) {
            option1.text("");
            option2.text("");
            option2.parent().css({"display": "inline"});
            choiceTypeWriter();
        }
        option1.text("continue")
        option2.text("")
        option2.parent().css({"display": "none"})
    } else {
        if (!(choiceFinished)) {
            finished = true;
            choiceFinished = true;
            option1.text(choice1);
            option2.text(choice2);
            charNum = 0;
            textt = "";
            choiceNum = 1;
            clearTimeout(myVar);
        } else {
            if (branch === 0) {
                if (textNum === 0 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    } else {
                        run = false;
                        branch = 1;
                    } 
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                } else if (textNum === 1 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    } else {
                        run = false;
                        branch = 1;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                } else if (textNum === 2 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                } else if (textNum === 3 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    } else {
                        run = false;
                        branch = 1;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                } else if (textNum === 4 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    } else {
                        run = false;
                        branch = 1;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                } else if (textNum === 5 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                } else if (textNum === 6 && finished && choiceFinished) {
                    textNum++;
                    if (object[0].id === "one") {
                        run = false;
                    }
                    option1.text("continue");
                    option2.text("");
                    option2.parent().css({"display": "none"});
                }
            } else if (branch === 1) {
                if (textNum === 0 && finished && choiceFinished) {
                    console.log("pog")
                }
            }
        }
    }
}



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
    if (textNum === 0 && run === false) {
        finished = false;
        line = "You left the cave.";
        choices = false;
        typeWriter();
    }
}

function main() {
    if (branch === 0) {
        if (textNum === 0 && run === false) {
            finished = false;
            choices = true;
            line = "You arrive at the cave.";
            choice1 = "Enter.";
            choice2 = "Leave.";
            typeWriter();
        } else if (textNum === 1 && run === false) {
            finished = false;
            choices = true;
            line = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, porro. Odio accusamus, pariatur eos, nobis ipsa minus sequi ad atque cupiditate porro dolorum obcaecati optio recusandae iusto, nisi vel ut.";
            choice1 = "Enter2.";
            choice2 = "Leave2.";
            typeWriter();
        } else if (textNum === 2 && run === false) {
            finished = false;
            choices = false;
            line = "sit amet consectetur adipisicing elit. Sunt, porro. Odio accusamus, pariatur eos, nobis ipsa minus sequi ad atque cupiditate porro dolorum obcaecati optio recusandae iusto, nisi vel ut. asdfasdfasdfdsa";
            typeWriter();
        } else if (textNum === 3 && run === false) {
            finished = false;
            choices = true;
            line = "You arrive at the cave.";
            choice1 = "Enter3.";
            choice2 = "Leave3.";
            typeWriter();
        } else if (textNum === 4 && run === false) {
            finished = false;
            choices = true;
            line = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, porro. Odio accusamus, pariatur eos, nobis ipsa minus sequi ad atque cupiditate porro dolorum obcaecati optio recusandae iusto, nisi vel ut.";
            choice1 = "Enter4.";
            choice2 = "Leave4.";
            typeWriter();
        } else if (textNum === 5 && run === false) {
            finished = false;
            choices = false;
            line = "dolor sit amet consectetur adipisicing elit. Sunt, porro. Odio accusamus, pariatur eos, nobis ipsa minus sequi ad atque cupiditate porro dolorum obcaecati optio recusandae iusto, nisi vel ut. asdfasdfasdfdsa";
            typeWriter();
        } else if (textNum === 6 && run === false) {
            finished = false;
            choices = false;
            line = "I'm getting tired, I guess I should head home.";
            typeWriter();
        }
    } else if (branch === 1) {
        textNum = 0;
        leftCave();
    }
}





let interval = setInterval(main, 500);

$(function() {
    $("#menu").menu();
});