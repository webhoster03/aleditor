$(document).ready(() => {
    let isBoldActive = false;
    let editor = null;
    function getEditor() {
        if (editor) return editor;
        
        // Try multiple selectors to find the editor
        editor = $("#editor").length > 0 ? $("#editor") : 
                 $(".editor").length > 0 ? $(".editor") : 
                 $("[contenteditable=true]").first();
        
        return editor;
    }
    
    $("#bold").on("click", (e) => {
        e.preventDefault();
        
        const $editor = getEditor();

        if (!$editor || $editor.length === 0) {
            return;
        }
        
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const selectedLength = selectedText.length;
        
        $editor.focus();
        
        setTimeout(() => {
            if (selectedLength > 0) {
                const isBold = document.queryCommandState('bold');
                
                if (isBold) {
                    document.execCommand("bold", false, null);
                    $("#bold").removeClass("active");
                } else {
                    document.execCommand("bold", false, null);
                    $("#bold").removeClass("active");
                    moveCursorAfterSelection();
                }
                
                isBoldActive = false;
            } else {
                isBoldActive = !isBoldActive;
                
                if (isBoldActive) {
                    document.execCommand("bold", false, null);
                    $("#bold").addClass("active");
                } else {
                    document.execCommand("bold", false, null);
                    $("#bold").removeClass("active");
                }
            }
        }, 10);
    });
    
    function moveCursorAfterSelection() {
        const selection = window.getSelection();
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    $(document).on("mouseup keyup", "[contenteditable=true], #editor, .editor", function() {
        const $editor = getEditor();
        if (!$editor || $editor.length === 0) return;
        
        const selection = window.getSelection();
        const selectedText = selection.toString();
        
        if (selectedText.length > 0) {
            const isBold = document.queryCommandState('bold');
            if (isBold) {
                $("#bold").addClass("active");
            } else {
                $("#bold").removeClass("active");
            }
        } else if (!isBoldActive) {
            $("#bold").removeClass("active");
        }
    });
    
    $(document).on('keydown', "[contenteditable=true], #editor, .editor", (e) => {
        if (e.key === 'Enter' && isBoldActive) {
            setTimeout(() => {
                document.execCommand("bold", false, null);
            }, 10);
        }
    });
    
    setTimeout(() => {
        const $editor = getEditor();
        // if (!$editor || $editor.length === 0) {
        //     console.warn("No editor element found. Please add an element with id='editor', class='editor', or contenteditable='true'");
        // } else {
        //     console.log("Editor found:", $editor);
        // }
    }, 500);
});