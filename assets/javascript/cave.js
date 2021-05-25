let textContainer = $("#text");
let continueBtn = $("#continue");
let caveImg = $("#caveImage");
let headerImg = $("#header").children().eq(0);
let bodyEl = $("body");
let menuEl = $("#menu");
let menuBtn = $("#showmenu");
let itemMenu = $("#items");
let audioEl = document.querySelector("#audio");
let apiKey = "563492ad6f917000010000015b7284fdeb3c4957b9976cdc11fb5370";
let textCSS = { "display": "block", "width": "100%", "height": "100%", "font-size": "20px", "padding": "10px", "border-radius": "5px", "background-color": "background-color: #e0e0e0d2" };
if (JSON.parse(localStorage.getItem("loading")) === true) {
    var textNum = JSON.parse(localStorage.getItem("saveSpot")).textnum;
    var items = JSON.parse(localStorage.getItem("saveSpot")).items;
    var currentLocation = JSON.parse(localStorage.getItem("saveSpot")).location;
    var currentDay = JSON.parse(localStorage.getItem("saveSpot")).day;
    localStorage.setItem("loading", JSON.stringify(false));
} else {
    var textNum = 0;
    var items = JSON.parse(localStorage.getItem("items"));
    var currentLocation = localStorage.getItem("location");
    var currentDay = localStorage.getItem("day");
}

function nextText() {
    audioEl.play();
    if ((textNum + 1) < textContainer.children().length) {
        textContainer.children().eq(textNum).css({ "display": "none" });
        textNum++;
        textContainer.children().eq(textNum).css(textCSS);
    } else {
        textContainer.children().eq(textNum).text("I'm pretty tired, I should probably head home now...");
    }
}

function saveHere() {
    localStorage.setItem("saveSpot", JSON.stringify({"location": currentLocation, "textnum": textNum, "day": day, "items": items}))
}

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
        })
    })

textContainer.children().eq(textNum).css(textCSS);

for (i in items) {
    let pEl = $("<p>");
    pEl.text(items[i]);
    itemMenu.append($("<li>").addClass("ui-state-disabled").append("<div>").append($(pEl).css({
        "width": "100%",
        "height": "100%",
        "padding": "15px",
        "font-size": "20px",
        "font-family": "cheboygan, sans-serif",
        "color": "red",
        "background-image": "-webkit-linear-gradient(#261B04, #D83F03, #7D2800, #524E4E)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent"
    })));
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

$(function() {
    $("#menu").menu();
});

