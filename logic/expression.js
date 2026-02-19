$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();
    let savedRange = null;

    // 1. Save cursor position when the popup opens
    $(document).on("click", ".expressionbox", function() {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0);
        }
        // Clear previous inputs for a fresh start
        $("#input-multiplicand, #input-numerator, #input-denominator").val("");
    });

    // 2. Add Button Logic
    $(document).on("click", "button.expression", function (e) {
        e.preventDefault();
        
        // Capture values
        const multi = $("#input-multiplicand").val().trim();
        const num = $("#input-numerator").val().trim() || "0";
        const den = $("#input-denominator").val().trim() || "0";
        
        const $editor = getEditor();
        if (!$editor.length) return;

        // Build MathML: <mi> for the multiplicand, followed by <mfrac>
        // If multiplicand is empty, we only show the fraction
        const mathContent = multi !== "" ? `<mi>${multi}</mi>` : "";

        const expressionHtml = `
            <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" style="cursor:default;">
                ${mathContent}
                <mfrac>
                    <mi>${num}</mi>
                    <mi>${den}</mi>
                </mfrac>
            </math>&nbsp;`; 

        // Restore cursor position
        const sel = window.getSelection();
        if (savedRange) {
            sel.removeAllRanges();
            sel.addRange(savedRange);
        } else {
            $editor.focus();
        }

        // Insert and clear the saved range for the next use
        document.execCommand("insertHTML", false, expressionHtml);
        savedRange = null;

        // Close UI (This triggers the hide logic in your fileone.js)
        $(".expressionClose").first().click();
    });

    // 3. Backspace Cleanup (Removes the whole unit)
    $(document).on("keydown", "[contenteditable=true]", function (e) {
        if (e.key === "Backspace") {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const cursorNode = range.startContainer;
            let parent = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;
            let mathElement = $(parent).closest("math")[0];

            if (mathElement && range.startOffset === 0) {
                e.preventDefault();
                mathElement.remove();
            }
        }
    });
});