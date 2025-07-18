document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const toolbarButtons = document.querySelectorAll('.toolbar button');
    const headingSelector = document.querySelector('.heading-selector');
    
    // Initialize undo/redo history
    let history = [];
    let historyIndex = -1;
    
    // Save initial state
    saveState();
    
    // Toolbar button actions
    toolbarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            
            if (command === 'undo') {
                undo();
                return;
            }
            
            if (command === 'redo') {
                redo();
                return;
            }
            
            // Execute the command for formatting
            document.execCommand(command, false, null);
            editor.focus();
            saveState();
        });
    });
    
    // Heading selector
    headingSelector.addEventListener('change', function() {
        const value = this.value;
        
        if (value === 'paragraph') {
            document.execCommand('formatBlock', false, '<p>');
        } else if (value === 'heading1') {
            document.execCommand('formatBlock', false, '<h1>');
        } else if (value === 'heading2') {
            document.execCommand('formatBlock', false, '<h2>');
        }
        
        editor.focus();
        saveState();
    });
    
    // Track changes for undo/redo
    editor.addEventListener('input', saveState);
    
    // Handle paste to clean up formatting
    editor.addEventListener('paste', function(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text/plain');
        document.execCommand('insertText', false, text);
        saveState();
    });
    
    // Save editor state to history
    function saveState() {
        const html = editor.innerHTML;
        
        // If we're not at the end of history, discard future states
        if (historyIndex < history.length - 1) {
            history = history.slice(0, historyIndex + 1);
        }
        
        history.push(html);
        historyIndex = history.length - 1;
    }
    
    // Undo functionality
    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            editor.innerHTML = history[historyIndex];
        }
    }
    
    // Redo functionality
    function redo() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            editor.innerHTML = history[historyIndex];
        }
    }
    
    // Focus the editor on load
    editor.focus();
});