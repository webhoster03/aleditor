import "./../fn/add.js"

class ALEditor {
    constructor() {

    }

    replace(divId) {
        this.createEditor(divId);
    }

    createEditor(divId) {
        const target = document.getElementById(divId)

        target.classList.add(divId)

        const editor = document.createElement('div')
        editor.className = "aleditor"
        //editor.contentEditable = true
        editor.style.border = "1px solid black"
        editor.style.minHeight = "350px"
        editor.style.maxHeight = "100%"
        editor.style.width = "98%"
        editor.style.overflowY = "auto"
        editor.style.margin = "auto"

        editor.id = divId;

        target.replaceWith(editor)

        this.createToolbar(divId)
    }

    createToolbar(divId) {
        const id = document.getElementById(divId)
        const toolbarContainer = document.createElement('div')
        toolbarContainer.className = "toolbar"

        id.appendChild(toolbarContainer)

        toolbarContainer.style.backgroundColor = "#f5f5f5"
        toolbarContainer.style.borderBottom = "1px solid black"
        toolbarContainer.style.padding = "5px 10px"

        const altoolbar = document.getElementsByClassName("altoolbar")

        const style = document.createElement('style');
        style.innerHTML = `
        *{
            margin: 0px;
            padding:0px;
            box-sizing: border-box;
        }
        
        .aleditor {
            border: 1px solid #ddd;
            border-radius: 4px;
            margin: 20px 0;
            max-width: 1000px;
        }

        .altoolbar        .altookbar-container {
            background: #f5f5f5;
            padding: 5px;
            border-bottom: 1px solid #ddd;
        }

        .altookbar-container .altoolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 3px;
            margin-bottom: 5px;
        }

        .altoolbar .altool-button {
            padding: 5px 8px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 3px;
            cursor: pointer;
            font-size: 14px;
        }

        .altoolbar .altool-button:hover {
            background: #e9e9e9;
        }

        .aloutput {
            width: 100%;
            min-height: 300px;
            padding: 15px;
            border: none;
            resize: vertical;
            font-family: Arial, sans-serif;
            line-height: 1.5;
            font-size: 14px;
        }

        .aloutput/* MathML styling */
        math {
            font-size: 14px;
        }

        .editarea{
            height: 250px;
            width: 100%;
            padding: 10px;
            border:none;
            outline:none;
            resize: vertical;
            font-family: Arial, sans-serif;
            line-height: 1.5;
            font-size: 18px;

        }
                        `;
        document.head.appendChild(style);




        const editorbox = document.createElement("div")
        //const editorbox = document.createElement("textarea")
        editorbox.contentEditable=true
        editorbox.focus()
        editorbox.className= "editarea"
        editorbox.id = "editarea"
        editorbox.innerHTML= "hello how are you"
        id.appendChild(editorbox)

        


        // First toolbar row
        const toolbar1 = document.createElement('div'); 
        toolbar1.className = 'altoolbar';
        toolbar1.innerHTML = `
            <button class="altool-button" title="Cut">
                <i class="fa-solid fa-scissors"></i>
            </button>
            <button class="altool-button" title="Copy">
                <i class="fa-solid fa-copy"></i>
            </button>
            <button class="altool-button" title="Paste">
                <i class="fa-solid fa-paste"></i>
            </button>
            <button class="altool-button"  title="Undo">
                <i class="fa-solid fa-rotate-left"></i>
            </button>
            <button class="altool-button" title="Redo">
                <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <button class="altool-button" title="Spell Check">
                <i class="fa-solid fa-spell-check"></i>
            </button>
            <button class="altool-button" title="Link">
                <i class="fa-solid fa-link"></i>
            </button>
            <button class="altool-button" title="Unlink">
                <i class="fa-solid fa-link-slash"></i>
            </button>
            <button class="altool-button" title="Anchor">
                <i class="fa-solid fa-anchor"></i>
            </button>
            <button class="altool-button" title="Image">
                <i class="fa-solid fa-image"></i>
            </button>
            <button class="altool-button" title="Table">
                <i class="fa-solid fa-table-cells"></i>
            </button>
            <button class="altool-button" title="Horizontal Rule">
                <i class="fa-solid fa-minus"></i>
            </button>
            <button class="altool-button" title="Special Character">
                Ω
            </button>
            <button class="altool-button" title="Fullscreen">
                <i class="fa-solid fa-maximize"></i>
            </button>
            <button class="altool-button" title="Source Code">
                <i class="fa-solid fa-code"></i> source
            </button>
        `;

        // Second toolbar row
        const toolbar2 = document.createElement('div');
        toolbar2.className = 'altoolbar';
        toolbar2.innerHTML = `
            <button class="altool-button" title="Align Right">
                <i class="fa-solid fa-align-right"></i>
            </button>
            <button class="altool-button" title="Align Left">
                <i class="fa-solid fa-align-left"></i>
            </button>
            <button class="altool-button" title="Justify">
                <i class="fa-solid fa-align-justify"></i>
            </button>
            <button class="altool-button" title="Center">
                <i class="fa-solid fa-align-center"></i>
            </button>
            <button class="altool-button" title="Ordered List">
                <i class="fa-solid fa-list-ol"></i>
            </button>
            <button class="altool-button" title="Unordered List">
                <i class="fa-solid fa-list"></i>
            </button>
            <button class="altool-button" title="Heading">
                <i class="fa-solid fa-heading"></i>
            </button>
            <button class="altool-button" title="Paragraph">
                <i class="fa-solid fa-paragraph"></i>
            </button>
        `;

        // Third toolbar row
        const toolbar3 = document.createElement('div');
        toolbar3.className = 'altoolbar';
        toolbar3.innerHTML = `
            <button class="altool-button bold" value="<br>" title="Bold">
                <i class="fa-solid fa-bold"></i>
            </button>
            <button class="altool-button italic" value="<i>" title="Italic">
                <i class="fa-solid fa-italic"></i>
            </button>
            <button class="altool-button underline" value="<u>" title="Underline">
                <i class="fa-solid fa-underline"></i>
            </button>
            <button class="altool-button del" value="<del>" title="Strikethrough">
                <del>D</del>
            </button>
            <button class="altool-button" title="Superscript">
                X<sup>x</sup>
            </button>
            <button class="altool-button" title="Subscript">
                X<sub>x</sub>
            </button>
            <button class="altool-button" title="Fraction">
                <math>
                    <mfrac>
                        <mi>A</mi>
                        <mi>B</mi>
                    </mfrac>
                </math>
            </button>
            <button class="altool-button" title="Math Expression">
                <math>
                    <mrow>
                        <mi>C</mi>
                        <mfrac>
                            <mi>A</mi>
                            <mi>B</mi>
                        </mfrac>
                    </mrow>
                </math>
            </button>
            <button class="altool-button" title="Parentheses">
                ( )
            </button>
            <button class="altool-button"  title="Curly Braces">
                { }
            </button>
            <button class="altool-button" title="Square Brackets">
                [ ]
            </button>
        `;

        toolbarContainer.appendChild(toolbar1);
        toolbarContainer.appendChild(toolbar2);
        toolbarContainer.appendChild(toolbar3);

        return toolbarContainer;
    }

}



export default ALEditor