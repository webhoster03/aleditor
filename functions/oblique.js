const obliqueScreen = `
<div class="obliqueMainScreen">
    <div class="obliqueCloseContainer">
        <div class="obliqueCloseBox obliqueClose">X</div>
    </div>
    <div class="obliqueNumberContainer">
        <div class="obliqueBoxContainer">
            <span>Numerator</span>
            <input type="text" id="numerator" autocomplete="off" />
        </div>
        <div class="obliqueBaseSize"></div>
        <div class="obliqueBoxContainer">
            <span>Denominator</span>
            <input type="text" id="denominator" autocomplete="off" />
        </div>
    </div>
    <div class="obliqueButtonsContainer">
        <button type="button" class="obliqueClose">Close</button>
        <button type="button" class="obliqueAddBtn">Add</button>
    </div>
</div>

<style>
    /* Added z-index to ensure it sits above everything */
    .obliqueMainScreen {
        width: 350px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 5px;
        display: none;
        z-index: 9999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        padding-bottom: 10px;
    }
    .obliqueCloseContainer { display: flex; justify-content: flex-end; }
    .obliqueCloseBox { height: 30px; width: 30px; display: flex; justify-content: center; align-items: center; cursor: pointer; color: #800000; font-weight: bold; }
    .obliqueNumberContainer { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .obliqueBaseSize { border-bottom: 1px solid black; width: 220px; }
    .obliqueBoxContainer { display: flex; align-items: center; justify-content: space-between; width: 220px; }
    .obliqueBoxContainer > input { height: 30px; width: 100px; padding: 0 10px; border: 1px solid #ccc; border-radius: 5px; }
    .obliqueButtonsContainer { display: flex; justify-content: flex-end; gap: 15px; padding: 15px 25px; }
    .obliqueButtonsContainer > button { height: 30px; width: 80px; background: #800000; color: white; border: none; border-radius: 5px; cursor: pointer; }
</style>
`;

$(document).ready(() => {
    const obliqueContainer = document.createElement("div");
    obliqueContainer.innerHTML = obliqueScreen;
    document.body.appendChild(obliqueContainer);

    // Opening the popup
    $(".obliquebox").on("click", function() {
        // Reset fields
        $("#numerator").val("");
        $("#denominator").val("");
        
        $(".obliqueMainScreen, .alPopupBackground").show();
        $("body").css("overflow", "hidden");
        
        // Focus first input
        setTimeout(() => $("#numerator").focus(), 100);
    });

    // Closing the popup
    $(document).on("click", ".obliqueClose", function() {
        $(".obliqueMainScreen, .alPopupBackground").hide();
        $("body").css("overflow", "auto");
    });
});