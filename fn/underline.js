import "./../plugins/jquery.js";

$(document).ready(() => {
    $(".underline").on("click", function () {
        const val = $(this).val()
        const editor = document.querySelector(".editarea")
        const selection = window.getSelection()

        if (!editor.contains(selection.anchorNode)) {
            editor.focus();
            return;
        }

        const range = selection.getRangeAt(0);

        if (selection.toString().length > 0) {
            document.execCommand("underline", false, null);
            editor.focus() 
        }

    })
})