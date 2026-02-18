$(document).ready(() => {
    const getEditor = () => $("#editor, .editor, [contenteditable=true]").first();

    // 1. Click Handler: Target the .del button specifically
    $(".del").on("click", function(e) {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        // Use the value attribute ("strikeThrough") directly
        const command = $(this).val() || "strikeThrough";
        document.execCommand(command, false, null);
        
        updateStrikeState();
        $editor.focus();
    });

    // 2. State Sync: Highlight button if cursor is inside strikethrough text
    function updateStrikeState() {
        const isStrike = document.queryCommandState('strikeThrough');
        $(".del").toggleClass("active", isStrike);
    }

    // Monitor events to toggle the 'active' class on the button
    $(document).on("mouseup keyup mousemove", "[contenteditable=true]", updateStrikeState);

    // 3. Cleanup Logic: Remove empty <s>, <strike>, or <del> tags
    $(document).on("keydown", "[contenteditable=true]", function(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const selection = window.getSelection();
            
            if (selection.rangeCount > 0 && selection.toString().length === 0) {
                const range = selection.getRangeAt(0);
                const cursorNode = range.startContainer;
                
                // Get the parent element of the cursor
                let parentTag = cursorNode.nodeType === Node.TEXT_NODE ? cursorNode.parentNode : cursorNode;

                // Array of possible tags browsers use for strikethrough
                const strikeTags = ["STRIKE", "S", "DEL"];

                if (strikeTags.includes(parentTag.tagName)) {
                    // Check if tag is empty AFTER the keypress happens
                    setTimeout(() => {
                        const content = parentTag.innerHTML.replace(/&nbsp;|\u200B|<br>/g, '').trim();
                        
                        if (content === "") {
                            const prev = parentTag.previousSibling;
                            parentTag.remove();
                            
                            // Keep the cursor in the correct position after tag removal
                            if (prev) {
                                const newRange = document.createRange();
                                newRange.selectNodeContents(prev);
                                newRange.collapse(false);
                                selection.removeAllRanges();
                                selection.addRange(newRange);
                            }
                            updateStrikeState();
                        }
                    }, 0);
                }
            }
        }
    });
});