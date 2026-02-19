const expressionscreen = `
<div class="expressionBackdrop">
    <div class="expressionScreenMainContainer">
        <div class="expressionCloseContainer">
            <div class="expressionCloseBox expressionClose">X</div>
        </div>

        <div class="expressionContent">
            <div class="math-container">
                
                <div class="math-group">
                    <label class="math-label">multiplicand</label>
                    <input type="text" class="math-box" id="input-multiplicand" placeholder="0">
                </div>

                <div class="fraction-wrapper">
                    <div class="fraction-row">
                        <label class="math-label">numerator</label>
                        <input type="text" class="math-box" id="input-numerator" placeholder="0">
                    </div>
                    
                    <hr class="fraction-line">
                    
                    <div class="fraction-row offset-right">
                        <label class="math-label">denominator</label>
                        <input type="text" class="math-box" id="input-denominator" placeholder="0">
                    </div>
                </div>

            </div>
        </div>

        <div class="expressionButton">
            <button class="expressionClose">Close</button>
            <button class="expression">Add </button>
        </div>
    </div>
</div>

<style>

.expressionBackdrop {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
}


.expressionScreenMainContainer {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.expressionCloseContainer {
    display: flex;
    justify-content: flex-end;
    border: 1px solid transparent;
    margin:10px 0px
}

.expressionCloseBox {
    font-size: 22px;
    cursor: pointer;
    color: #800000;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-family: sans-serif;
}


.math-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding: 0px 20px;
}

.math-group, .fraction-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.math-label {
    font-size: 16px;
    margin-right: 12px;
    text-transform: capitalize;
    font-family: serif;
}

.math-box {
    width: 80px;
    height: 30px;
    text-align: center;
    font-size: 18px;
    outline: none;
    border-radius: 4px;
}

.math-box:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}

.fraction-wrapper {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.fraction-line {
    border: none;
    border-top: 2px solid #000;
    width: 100%;
    margin: 10px 0;
}

.fraction-row {
    justify-content: flex-end;
}

.offset-right {
    padding-left: 50px;
}




.expressionButton {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px; 
    padding: 15px 25px 15px 0px;
}

.expressionButton >button {
    height: 35px;
    width: 80px;
    background-color: #800000;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
}


</style>
`;

$(document).ready(() => {
    const expression = document.createElement("div")
    expression.innerHTML = expressionscreen

    document.body.appendChild(expression)

    $(".expressionClose ,.expression").on("click", () => {
        $(".expressionBackdrop, .alPopupBackground").hide()
        $("body").css("overflow", "auto");
    })

    $(".expressionbox").on("click", () => {
        $(".expressionBackdrop, .alPopupBackground").show()
        $("body").css("overflow", "hidden");
    })

});