$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();
    let savedRange = null;

    // 1. Capture the cursor position when the popup opens
    // This is critical because clicking the popup inputs steals focus
    $(".obliquebox").on("click", () => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0);
        }
    });

    // 2. Handling the "Add" button click
    $(document).on("click", ".obliqueAddBtn", function (e) {
        e.preventDefault();

        const num = $("#numerator").val().trim() || "?";
        const den = $("#denominator").val().trim() || "?";

        const $editor = getEditor();
        if (!$editor.length) return;

        // Build the MathML structure
        const fractionHtml = `
            <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
                <mfrac>
                    <mi>${num}</mi>
                    <mi>${den}</mi>
                </mfrac>
            </math>&nbsp;`;

        // RESTORE CURSOR: Ensure we insert where the user last clicked
        const sel = window.getSelection();
        if (savedRange) {
            sel.removeAllRanges();
            sel.addRange(savedRange);
        } else {
            $editor.focus();
        }

        // Insert the HTML
        document.execCommand("insertHTML", false, fractionHtml);

        // Clear range after use to prevent conflicts on next insert
        savedRange = null;

        // Close the UI
        $(".obliqueClose").first().click();
    });

    // 3. Backspace Cleanup Logic
    $(document).on("keydown", "[contenteditable=true]", function (e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const cursorNode = range.startContainer;

            // Identify if cursor is inside or immediately after a <math> tag
            let parent = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;
            let mathElement = $(parent).closest("math")[0];

            if (mathElement) {
                // If backspacing at the very start of a fraction
                if (range.startOffset === 0) {
                    e.preventDefault();

                    const prev = mathElement.previousSibling;
                    mathElement.remove();

                    // Restore cursor
                    if (prev) {
                        const newRange = document.createRange();
                        newRange.selectNodeContents(prev);
                        newRange.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    }
                }
            }
        }
    });
});