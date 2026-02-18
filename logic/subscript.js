$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();

    $(".oblique").on("click", function(e) {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        const fractionHtml = `
            <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" style="cursor: default;">
                <mfrac>
                    <mi class="math-input" contenteditable="true">?</mi>
                    <mi class="math-input" contenteditable="true">?</mi>
                </mfrac>
            </math>&nbsp;`; 

        document.execCommand("insertHTML", false, fractionHtml);
        $editor.focus();
    });

    $(document).on("keydown", "[contenteditable=true]", function(e) {
        if (e.key === "Backspace") {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            
            let parentMath = $(range.startContainer).closest("math");
            
            if (parentMath.length && range.startOffset === 0) {
                if (parentMath.find(".math-input").first().is(range.startContainer.parentNode)) {
                    parentMath.remove();
                }
            }
        }
    });
});