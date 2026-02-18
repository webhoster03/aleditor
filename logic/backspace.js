$(document).on("keydown", function (event) {
    if (event.key === "Backspace") {
        event.preventDefault();
        console.log(event.key)
        return false;
    }
});
