$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();

    // 1. Click Handler: Insert a MathML Fraction
    $(".oblique").on("click", function(e) {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        // Create the MathML structure
        const fractionHtml = `
            <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
                <mfrac>
                    <mi>A</mi>
                    <mi>B</mi>
                </mfrac>
            </math>&nbsp;`; 

        // Insert at cursor position
        document.execCommand("insertHTML", false, fractionHtml);
        $editor.focus();
    });

    // 2. Cleanup Logic: Remove the whole Math block if empty or backspaced
    $(document).on("keydown", "[contenteditable=true]", function(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const selection = window.getSelection();
            if (selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const cursorNode = range.startContainer;

            // Find if cursor is inside or immediately after a <math> tag
            let mathElement = null;
            
            // Check if cursor is inside a MathML element
            let parent = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;
            mathElement = $(parent).closest("math")[0];

            // If we are at the very beginning of a math block or it's empty, delete the whole thing
            if (mathElement) {
                const content = mathElement.textContent.trim();
                
                // If the user hits backspace and the math block has default 'A' and 'B', 
                // or if it's empty, we treat it as a single unit to be deleted
                if (content === "" || (e.key === "Backspace" && range.startOffset === 0)) {
                    // Prevent default to avoid leaving broken MathML tags
                    e.preventDefault();
                    
                    const prev = mathElement.previousSibling;
                    mathElement.remove();

                    // Reset cursor
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