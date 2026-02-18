$(document).ready(() => {
    $(".underline").on("click", function(e) {
        e.preventDefault();
        const $editor = $("#editor, .editor, [contenteditable=true]").first();
        if (!$editor.length) return;

        document.execCommand("underline", false, null);
        
        $editor.focus();
        updateUnderlineState();
    });

    function updateUnderlineState() {
        const isUnderline = document.queryCommandState('underline');
        $(".underline").toggleClass("active", isUnderline);
    }

    $(document).on("mouseup keyup mousemove", "[contenteditable=true]", updateUnderlineState);

    $(document).on("keydown", "[contenteditable=true]", function(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const selection = window.getSelection();
            if (selection.rangeCount === 0 || selection.toString().length > 0) return;

            const range = selection.getRangeAt(0);
            const cursorNode = range.startContainer;
            let parentTag = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;

            if (parentTag.tagName === "U") {
                setTimeout(() => {
                    const content = parentTag.innerHTML.replace(/&nbsp;|\u200B|<br>/g, '').trim();
                    
                    if (content === "") {
                        const prev = parentTag.previousSibling;
                        parentTag.remove();
                        
                        if (prev) {
                            const newRange = document.createRange();
                            newRange.selectNodeContents(prev);
                            newRange.collapse(false);
                            selection.removeAllRanges();
                            selection.addRange(newRange);
                        }
                        updateUnderlineState();
                    }
                }, 0);
            }
        }
    });
});