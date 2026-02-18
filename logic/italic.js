$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();

    $(".italic").on("click", (e) => {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        document.execCommand("italic", false, null);
        
        updateItalicButtonState();
        $editor.focus();
    });

    function updateItalicButtonState() {
        const isItalic = document.queryCommandState('italic');
        $(".italic").toggleClass("active", isItalic);
    }

    $(document).on("mouseup keyup mousemove", "[contenteditable=true]", updateItalicButtonState);

    $(document).on("keydown", "[contenteditable=true]", function(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const selection = window.getSelection();
            
            if (selection.rangeCount > 0 && selection.toString().length === 0) {
                const range = selection.getRangeAt(0);
                const cursorNode = range.startContainer;
                
                let parentTag = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;

                if (parentTag.tagName === "I" || parentTag.tagName === "EM") {
                    
                    setTimeout(() => {
                        const content = parentTag.innerHTML.replace(/&nbsp;|\u200B|<br>/g, '').trim();
                        
                        if (content === "") {
                            console.log("Empty italic tag removed");
                            
                            const prev = parentTag.previousSibling;
                            parentTag.remove();
                            
                            if (prev) {
                                const newRange = document.createRange();
                                newRange.selectNodeContents(prev);
                                newRange.collapse(false);
                                selection.removeAllRanges();
                                selection.addRange(newRange);
                            }
                            updateItalicButtonState();
                        }
                    }, 0);
                }
            }
        }
    });
});