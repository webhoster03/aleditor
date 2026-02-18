$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();

    $(".superscript").on("click", function(e) {
        
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        document.execCommand("superscript", false, null);
        
        updateSuperscriptState();
        $editor.focus();
    });

    function updateSuperscriptState() {
        const isSuperscript = document.queryCommandState('superscript');
        $(".superscript").toggleClass("active", isSuperscript);
    }

    $(document).on("mouseup keyup mousemove", "[contenteditable=true]", updateSuperscriptState);

    $(document).on("keydown", "[contenteditable=true]", function(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const selection = window.getSelection();
            
            if (selection.rangeCount > 0 && selection.toString().length === 0) {
                const range = selection.getRangeAt(0);
                const cursorNode = range.startContainer;
                
                let parentTag = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;

                if (parentTag.tagName === "SUP") {
                    
                    setTimeout(() => {
                        const content = parentTag.innerHTML.replace(/&nbsp;|\u200B|<br>/g, '').trim();
                        
                        if (content === "") {
                            console.log("Empty superscript tag removed");
                            
                            const prev = parentTag.previousSibling;
                            parentTag.remove();
                            
                            if (prev) {
                                const newRange = document.createRange();
                                newRange.selectNodeContents(prev);
                                newRange.collapse(false);
                                selection.removeAllRanges();
                                selection.addRange(newRange);
                            }
                            updateSuperscriptState();
                        }
                    }, 0);
                }
            }
        }
    });
});