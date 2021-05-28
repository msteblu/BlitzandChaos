let buttonContainer = $("#locationButtons");

function goToLocation(event) {
    let object = $(event.target)
    if (object.is(":button")) {
        window.location.href = `${object["0"].id}.html`
    } else {
        window.location.href = `${object.parent()["0"].id}.html`
    }

}
buttonContainer.on("click", "button", goToLocation)
