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


        const toolbar = document.createElement('div')
        toolbar.className = "alToolEditor"
        

        const editor = document.createElement('div')
        editor.className = `aleditor`
        editor.contentEditable = true



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
        const altoolbar = document.getElementsByClassName("altoolbar")

    




        const editorbox = document.createElement("div")
        //const editorbox = document.createElement("textarea")
        editorbox.contentEditable = true
        editorbox.focus()
        editorbox.className = "editarea"
        editorbox.id = "editarea"




        // First toolbar row
        const toolbar1 = document.createElement('div');
        toolbar1.className = 'altoolbar';
        toolbar1.innerHTML = `
            <div class="altool-div">
                <button class="altool-button" title="Cut">✂</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Copy">📄</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Copy">📄</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Paste">📋</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Undo">↶</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Redo">↷</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Spell Check">✔</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Link">🔗</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Unlink">❌</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Anchor">⚓</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Image">🖼</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Table">▦</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Horizontal Rule">―</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Special Character">Ω</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Fullscreen">⛶</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Source Code">&lt;/&gt;</button>
            </div>

        `;

        // Second toolbar row
        const toolbar2 = document.createElement('div');
        toolbar2.className = 'altoolbar';
        toolbar2.innerHTML = `
            <div class="altool-div">
                <button class="altool-button" title="Align Right">⇉</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Align Left">⇇</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Justify">☰</button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Center">≣</button>
            </div>
            <div class="altool-div">
                <button class="altool-button list" title="List">
                <i class="fas fa-list"></i>
            </button>
            </div>
            <div class="altool-div addheadingbutton">
                <select class="headingBox headingboxheadle">
                    <option value="">H</option>
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                </select>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Paragraph">P</button>
            </div>
        `;

        // Third toolbar row
        const toolbar3 = document.createElement('div');
        toolbar3.className = 'altoolbar';
        toolbar3.innerHTML = `
            <div class="altool-div">
                <button class="altool-button bold" value="bold" title="Bold">
                    <b>B</b>
                </button>
            </div>
             <div class="altool-div">
                <button class="altool-button italic" value="italic" title="Italic">
                <i>I</i>
            </button>
            </div>
            <div class="altool-div">
                <button class="altool-button underline" value="underline" title="Underline">
                    <u>U </u>
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button del" value="strikeThrough" title="Strikethrough">
                    S
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button superscript" value="superscript" title="Superscript">
                    X²
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button subscript" value="subscript" title="Subscript">
                    X₂
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button root" value="root" title="root">
                    √
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button obliquebox" title="Fraction">
                    <math>
                        <mfrac>
                            <mi>A</mi>
                            <mi>B</mi>
                        </mfrac>
                    </math>
                </button>
            </div>
            <div class="altool-div">
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
            </div>
            <div class="altool-div">
                <button class="altool-button parentheses" title="Parentheses" disabled>
                    ( )
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Curly Braces" disabled>
                    { }
                </button>
            </div>
            <div class="altool-div">
                <button class="altool-button" title="Square Brackets" disabled>
                    [ ]
                </button>
            </div>
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
