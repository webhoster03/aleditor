$(".root").on("click", (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();

    const rootWrapper = document.createElement("span");
    rootWrapper.setAttribute("style", "display: inline-flex; align-items: baseline; vertical-align: middle; white-space: nowrap;");

    const symbol = document.createElement("span");
    symbol.textContent = "\u221A";
    symbol.setAttribute("style", "font-size: 1.1em; padding-right: 2px; user-select: none;");

    const content = document.createElement("span");
    // border-top creates the root line; it stretches with the content width
    content.setAttribute("style", "border-top: 2px solid currentColor; padding-top: 1px; margin-left: -1px; display: inline-block; min-width: 10px; outline: none;");
    
    if (selectedText.textContent.length > 0) {
        content.appendChild(selectedText);
    } else {
        content.innerHTML = "&nbsp;";
    }

    rootWrapper.appendChild(symbol);
    rootWrapper.appendChild(content);

    range.insertNode(rootWrapper);
    
    // Move cursor inside
    const newRange = document.createRange();
    newRange.selectNodeContents(content);
    newRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(newRange);
});