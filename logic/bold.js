$(document).ready(() => {
    let isManualBoldToggled = false;
    let editor = null;

    function getEditor() {
        if (editor) return editor;
        editor = $("#editor, .editor, [contenteditable=true]").first();
        return editor;
    }
    $(".bold").on("click", (e) => {
        e.preventDefault();
        const $editor = getEditor();
        if (!$editor.length) return;

        const selection = window.getSelection();
        const isBold = document.queryCommandState('bold');

        if (selection.toString().length > 0) {
            document.execCommand("bold", false, null);
            updateBoldButtonState();
        } else {
            document.execCommand("bold", false, null);
            isManualBoldToggled = !isBold;
            $(".bold").toggleClass("active", isManualBoldToggled);
        }
        $editor.focus();
    });

    function updateBoldButtonState() {
        const isBold = document.queryCommandState('bold');
        $(".bold").toggleClass("active", isBold);

        if (window.getSelection().toString().length === 0) {
            isManualBoldToggled = isBold;
        }
    }

    $(document).on("mouseup keyup mousemove", "[contenteditable=true]", function () {
        updateBoldButtonState();
    });

    $(document).on('keydown', "[contenteditable=true]", function (e) {
        if (e.key === 'Enter') {
            setTimeout(() => {
                if (isManualBoldToggled) {
                    document.execCommand("bold", false, null);
                }
            }, 10);
        }
    });
});