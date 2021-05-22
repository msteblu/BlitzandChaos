let textContainer = $("#text");
let continueBtn = $("#continue");
let caveImg = $("#caveImage");
let headerImg = $("#header").children().eq(0);
let bodyEl = $("body");
let audioEl = document.querySelector("#audio");
let apiKey = "563492ad6f917000010000015b7284fdeb3c4957b9976cdc11fb5370";
let textCSS = { "display": "block", "width": "100%", "height": "100%", "font-size": "20px", "padding": "10px", "border-radius": "5px", "background-color": "background-color: #e0e0e0d2" };
let textNum = 0;

function nextText() {
    if (textNum === 0) {
        fetch("https://freesound.org/apiv2/sounds/343741?token=qz79q7DsbN3veU3EUNMHVH0GBhsbt4v13jCK7yNh")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $(function () {
                    audioEl.setAttribute("src", data.previews["preview-lq-mp3"]);
                    audioEl.volume = 0.3;
                    audioEl.setAttribute("loop", "true");
                    audioEl.play();
                    console.log(data.previews["preview-lq-mp3"]);
                })
            })
    }
    if ((textNum + 1) < textContainer.children().length) {
        textContainer.children().eq(textNum).css({ "display": "none" });
        textNum++;
        textContainer.children().eq(textNum).css(textCSS);
    } else {
        textContainer.children().eq(textNum).text("I'm pretty tired, I should probably head home now...");
    }
}

fetch("https://api.pexels.com/v1/photos/2633", { headers: { "Authorization": apiKey } })
    .then(function (response) {
        console.log(response.headers.get("X-Ratelimit-Limit"))
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
        headerImg.attr({ "src": data.src.original});
    })

textContainer.children().eq(textNum).css(textCSS);
continueBtn.on("click", nextText);