$(document).ready(() => {
    let editor = null;

    // 1. Inject Dynamic CSS to handle the button behavior and remove auto-bold
    const injectStyles = () => {
        const css = `
            /* Normalize heading weights to stop auto-bold button activation */
            [contenteditable=true] h1, [contenteditable=true] h2, 
            [contenteditable=true] h3, [contenteditable=true] h4, 
            [contenteditable=true] h5, [contenteditable=true] h6 {
                font-weight: normal !important;
            }
            /* Visual behavior: Make select look like a button when active */
            .headingBox.active {
                background-color: #007BFF !important;
                color: white !important;
                border: none !important;
                cursor: pointer;
                appearance: none; /* Removes the dropdown arrow to look more like a button */
                -webkit-appearance: none;
                padding: 0 10px;
                text-align: center;
            }
            .headingBox option { background: white; color: black; }
        `;
        $("<style>").prop("type", "text/css").html(css).appendTo("head");
    };
    injectStyles();

    function getEditor() {
        if (editor) return editor;
        editor = $("#editor, .editor, [contenteditable=true]").first();
        return editor;
    }

    // 2. Change Handler: The "Apply and Transform" logic
    $(".headingBox").on("change", function() {
        const $editor = getEditor();
        if (!$editor.length) return;

        const val = $(this).val();
        let tag;

        // Condition 1: Use Switch to apply the heading
        switch (val) {
            case "h1": tag = "h1"; break;
            case "h2": tag = "h2"; break;
            case "h3": tag = "h3"; break;
            case "h4": tag = "h4"; break;
            case "h5": tag = "h5"; break;
            case "h6": tag = "h6"; break;
            default:   tag = "p";  break;
        }

        document.execCommand("formatBlock", false, `<${tag}>`);
        $editor.focus();
        
        // Immediately sync the UI to show the "Button" state
        updateHeadingUI(); 
    });

    // 3. Condition 2: Sync dropdown name and transform to Button behavior via Class
    function updateHeadingUI() {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;

        let node = selection.getRangeAt(0).startContainer;
        if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;

        let currentTagName = "";
        const $editor = getEditor()[0];

        // Search for active heading tag
        while (node && node !== $editor && node.tagName) {
            const tag = node.tagName.toLowerCase();
            if (/^h[1-6]$/.test(tag)) {
                currentTagName = tag;
                break;
            }
            node = node.parentNode;
        }

        const $select = $(".headingBox");
        const $placeholder = $select.find('option[value=""]');

        // Update the value so the select is synced
        $select.val(currentTagName);

        if (currentTagName !== "") {
            // BEHAVIOR: HEADING ACTIVE (BUTTON MODE)
            //$select.addClass("active"); 
            $placeholder.text(currentTagName.toUpperCase()); // Set label to H1, H2, etc.
        } else {
            // BEHAVIOR: INACTIVE (SELECT MODE)
            //$select.removeClass("active");
            $placeholder.text("H"); // Set label back to default
        }
    }

    // 4. Update UI on user interaction
    $(document).on("mouseup keyup input mousemove", "[contenteditable=true]", updateHeadingUI);
});