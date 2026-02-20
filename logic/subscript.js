$(document).ready(() => {
    let isManualSubscriptToggled = false;
    let editor = null;

    function getEditor() {
        if (editor) return editor;
        editor = $("#editor, .editor, [contenteditable=true]").first();
        return editor;
    }

    // 1. Click Handler: Toggle Subscript
    $(".subscript").on("click", (e) => {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        const selection = window.getSelection();
        const isSub = document.queryCommandState('subscript');

        if (selection.toString().length > 0) {
            // Apply to highlighted text
            document.execCommand("subscript", false, null);
            updateSubscriptButtonState();
        } else {
            // Toggle for the blinking cursor
            document.execCommand("subscript", false, null);
            isManualSubscriptToggled = !isSub;
            $(".subscript").toggleClass("active", isManualSubscriptToggled);
        }
        $editor.focus();
    });

    // 2. State Sync: Update button highlight
    function updateSubscriptButtonState() {
        const isSub = document.queryCommandState('subscript');
        $(".subscript").toggleClass("active", isSub);
        
        // Sync manual toggle if there's no selection
        if (window.getSelection().toString().length === 0) {
            isManualSubscriptToggled = isSub;
        }
    }

    // Sync button on cursor movement
    $(document).on("mouseup keyup mousemove", "[contenteditable=true]", function() {
        updateSubscriptButtonState();
    });

    // 3. Line Break Support: Maintain state on Enter
    $(document).on('keydown', "[contenteditable=true]", function(e) {
        if (e.key === 'Enter') {
            setTimeout(() => {
                if (isManualSubscriptToggled) {
                    document.execCommand("subscript", false, null);
                }
            }, 10);
        }
    });
});