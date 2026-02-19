$(document).ready(() => {
    let editor = null;

    function getEditor() {
        if (editor) return editor;
        editor = $("#editor, .editor, [contenteditable=true]").first();
        return editor;
    }

    $(".root").on("click", (e) => {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const rootSymbol = "√";

        // Logic: If user has selected text, wrap it or prefix it
        if (selection.toString().length > 0) {
            // Option A: Just insert symbol before selection
            const span = document.createElement("span");
            span.textContent = rootSymbol;
            range.insertNode(span);
        } else {
            // Option B: No selection, just insert the symbol at cursor
            const textNode = document.createTextNode(rootSymbol);
            range.insertNode(textNode);

            // Move the cursor to after the inserted symbol
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        $editor.focus();
    });
});