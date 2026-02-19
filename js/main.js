const script = document.createElement("script");
script.src = "./addon/add.js";
document.head.appendChild(script);

const AlEditor = {
    instances: {},
    
    

    replace: function (selector) {
        const element = $("#" + selector);
        // Pass the selector string (id) to keep track of this specific editor
        this.createEditor(element, selector);
    },

    createEditor: function (element, id) {
        this.edit(element, id);
    },

    edit: function (selector, id) {
        const element = $(selector);
        element.addClass('aleditor')

        const toolbarContainer = document.createElement('div')
        toolbarContainer.className = "toolbarMainContainer"
        toolbarContainer.style.border = "1px solid black"
        toolbarContainer.style.margin = "0px 20px"


        const toolbar = document.createElement('div')
        toolbar.className = "toolbar"
        //toolbar.style.border = "1px solid black"
        toolbar.style.minHeight = "100px"
        toolbar.style.maxHeight = "100%"
        toolbar.style.width = "100%"
        toolbar.style.overflowY = "auto"
        //toolbar.style.border= "1px solid red"

        const editor = document.createElement('div')
        editor.className = `aleditor`
        editor.contentEditable = true
        editor.style.height = "350px"
        editor.style.width = "100%"
        editor.style.overflowY = "auto"
        editor.style.fontSize = "20px";
        editor.style.lineHeight = "1.5";
        editor.style.padding = "20px 40px";
        editor.style.boxSizing = "border-box";
        editor.style.fontFamily = "serif";
        editor.style.overflow = "auto";



        // 2. REGISTER INSTANCE: Store the editor reference in our manager object
        this.instances[id] = editor;

        element.replaceWith(toolbarContainer)
        toolbarContainer.append(toolbar)
        toolbarContainer.append(editor)
        this.toolbar(toolbar.className)
    },

    toolbar: function (toolbar) {
        const id = document.querySelector("." + toolbar)
        const toolbarContainer = document.createElement('div')
        toolbarContainer.className = "toolbar"

        id.append(toolbarContainer)

        toolbarContainer.style.backgroundColor = "transparent"
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
            max-width: 100%;
        }

        .altoolbar .altookbar-container {
            background-color: #f5f5f5;
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

        .aloutput
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
        .active{
            background-color:blue;
            color:white;
        }
                        `;
        document.head.appendChild(style);




        const editorbox = document.createElement("div")
        //const editorbox = document.createElement("textarea")
        editorbox.contentEditable = true
        editorbox.focus()
        editorbox.className = "editarea"
        editorbox.id = "editarea"
        editorbox.innerHTML = "hello how are you"
        //id.appendChild(editorbox)




        // First toolbar row
        const toolbar1 = document.createElement('div');
        toolbar1.className = 'altoolbar';
        toolbar1.innerHTML = `
            <button class="altool-button" title="Cut">✂</button>

            <button class="altool-button" title="Copy">📄</button>

            <button class="altool-button" title="Paste">📋</button>

            <button class="altool-button" title="Undo">↶</button>

            <button class="altool-button" title="Redo">↷</button>

            <button class="altool-button" title="Spell Check">✔</button>

            <button class="altool-button" title="Link">🔗</button>

            <button class="altool-button" title="Unlink">❌</button>

            <button class="altool-button" title="Anchor">⚓</button>

            <button class="altool-button" title="Image">🖼</button>

            <button class="altool-button" title="Table">▦</button>

            <button class="altool-button" title="Horizontal Rule">―</button>

            <button class="altool-button" title="Special Character">Ω</button>

            <button class="altool-button" title="Fullscreen">⛶</button>

            <button class="altool-button" title="Source Code">&lt;/&gt;</button>

        `;

        // Second toolbar row
        const toolbar2 = document.createElement('div');
        toolbar2.className = 'altoolbar';
        toolbar2.innerHTML = `
            <button class="altool-button" title="Align Right">⇉</button>

            <button class="altool-button" title="Align Left">⇇</button>

            <button class="altool-button" title="Justify">☰</button>

            <button class="altool-button" title="Center">≣</button>

            <button class="altool-button" title="Ordered List">1 2 3</button>

            <button class="altool-button" title="Unordered List">__</button>

            <button class="altool-button" title="Heading">H1</button>

            <button class="altool-button" title="Paragraph">P</button>
        `;

        // Third toolbar row
        const toolbar3 = document.createElement('div');
        toolbar3.className = 'altoolbar';
        toolbar3.innerHTML = `
            <button class="altool-button bold" value="bold" title="Bold">
                <b>B</b>
            </button>

            <button class="altool-button italic" value="italic" title="Italic">
                <i>I</>
            </button>

            <button class="altool-button underline" value="underline" title="Underline">
                <u>U </u>
            </button>

            <button class="altool-button del" value="strikeThrough" title="Strikethrough">
                S
            </button>

            <button class="altool-button superscript" value="superscript" title="Superscript">
                X²
            </button>

            <button class="altool-button subscript" value="subscript" title="Subscript">
                X₂
            </button>

            <button class="altool-button obliquebox" title="Fraction">
                <math>
                    <mfrac>
                        <mi>A</mi>
                        <mi>B</mi>
                    </mfrac>
                </math>
            </button>

            <button class="altool-button expressionbox" title="Math Expression">
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
                ()
            </button>

            <button class="altool-button" title="Curly Braces">
                {}
            </button>

            <button class="altool-button" title="Square Brackets">
                []
            </button>

        `;

        toolbarContainer.appendChild(toolbar1);
        toolbarContainer.appendChild(toolbar2);
        toolbarContainer.appendChild(toolbar3);

        return toolbarContainer;
    },

    getData: function (id) {
        if (this.instances[id]) {
            return this.instances[id].innerHTML;
        }
        return "";
    },

    // 4. IMPLEMENT CLEARDATA
    clearData: function (id) {
        if (this.instances[id]) {
            this.instances[id].innerHTML = "";
        }
    }


};

window.AlEditor = AlEditor;
