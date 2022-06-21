// Variables - Constant
const boldBtn = document.querySelector(".bold-btn");
const italicBtn = document.querySelector(".italic-btn");
const underlineBtn = document.querySelector(".underline-btn");
const capitalizeBtn = document.querySelector(".capitalize-btn");
const uppercaseBtn = document.querySelector(".uppercase-btn");
const lowercaseBtn = document.querySelector(".lowercase-btn");
const alignCenterBtn = document.querySelector(".align-center-btn");
const alignRightBtn = document.querySelector(".align-right-btn");
const alignLeftBtn = document.querySelector(".align-left-btn");
const colorInp = document.querySelector("input[type='color']");
const rtlBtn = document.querySelector(".rtl-btn");
const ltrBtn = document.querySelector(".ltr-btn");
const fontDropDown = document.querySelector("select");
const fontSizeDropDown = document.querySelector("input[type='number']");
const emojis = document.querySelectorAll(".emoji");

// Other Variables
let selectionObj;

// Functions
const getSelectedText = (e) => {
    if (e.target.value.length) {
        const textField = e.target;
        const valLen = textField.value.length;
        const selStart = textField.selectionStart;
        const selEnd = textField.selectionEnd;

        return {
            targetField: e.target,
            valLen,
            selStart,
            selEnd,
            selection: textField.value.substring(selStart, selEnd),
        };
    }
};

colorInputHandler = (e) => {
    const inputLabel = colorInp.parentElement;
    const color = e ? colorInp.value : null;
    inputLabel.style.backgroundColor = color ? color : "#000000";
    return color;
};

const setActiveTextarea = (e) => {
    activeTextarea = e.target;
};

const formatSelection = (formatType) => {
    if (selectionObj) {
        const {
            targetField,
            valLen,
            selStart,
            selEnd,
            selection
        } = selectionObj;

        if (selection && activeTextarea === targetField) {
            let formattedSelection;
            if (formatType.length === 1 || formatType.length === 7) {
                formattedSelection = `<${formatType}>${selection}</${formatType}>`;
            } else {
                switch (formatType) {
                    case 'capitalize':
                        formattedSelection = selection.slice(0, 1).toUpperCase() +
                            selection.slice(1);
                        break;
                    case 'uppercase':
                        formattedSelection = selection.toUpperCase();
                        break;
                    case 'lowercase':
                        formattedSelection = selection.toLowerCase();
                        break;
                    default:
                        return;
                }
            }
            const formattedVal = targetField.value.substring(0, selStart) +
                formattedSelection + targetField.value.substring(selEnd, valLen);
            targetField.value = formattedVal;
        }
    }
};

const setDir = (dir) => {
    activeTextarea.setAttribute("dir", dir);
};

const setTextAlign = (align) => {
    activeTextarea.style.textAlign = align;
};

const setFont = (e) => {
    if (activeTextarea === newNoteInp || activeTextarea === editNoteInp) {
        const font = e.target.value;
        activeTextarea.style.fontFamily = font;
    }
};

const setFontSize = (e) => {
    if (activeTextarea === newNoteInp || activeTextarea === editNoteInp) {
        const fontSize = e.target.value;
        activeTextarea.style.fontSize = fontSize + "px";
    }
};

const addEmoji = (e) => {
    activeTextarea.value = activeTextarea.value + e.target.innerText;
};

const resetTextEditor = () => {
    fontDropDown.value = "serif";
    fontSizeDropDown.value = "20";
    newNoteInp.style.fontSize = "20px";
    newNoteInp.style.textAlign = "left";
    newNoteInp.setAttribute("dir", "ltr");
    editNoteInp.style.fontSize = "20px";
    editNoteInp.style.textAlign = "left";
    editNoteInp.setAttribute("dir", "ltr");
    colorInputHandler();
};

// EventListeners
newNoteInp.onmouseup = getSelectedText;
editNoteInp.onmouseup = getSelectedText;
newTitleInp.onfocus = setActiveTextarea;
newNoteInp.onfocus = setActiveTextarea;
editNoteInp.onfocus = setActiveTextarea;
editTitleInp.onfocus = setActiveTextarea;
boldBtn.onclick = () => {
    formatSelection('b');
};
italicBtn.onclick = () => {
    formatSelection('i');
};
underlineBtn.onclick = () => {
    formatSelection('u');
};
capitalizeBtn.onclick = () => {
    formatSelection('capitalize');
};
uppercaseBtn.onclick = () => {
    formatSelection('uppercase');
}
lowercaseBtn.onclick = () => {
    formatSelection('lowercase');
};
colorInp.oninput = (e) => {
    const color = colorInputHandler(e);
    formatSelection(color);
};
alignCenterBtn.onclick = () => {
    setTextAlign("center");
};
alignRightBtn.onclick = () => {
    setTextAlign("right");
};
alignLeftBtn.onclick = () => {
    setTextAlign("left");
};
rtlBtn.onclick = () => {
    setDir("rtl");
};
ltrBtn.onclick = () => {
    setDir("ltr")
};
fontDropDown.oninput = setFont;
fontSizeDropDown.oninput = setFontSize;
emojis.forEach(emoji => {
    emoji.onclick = addEmoji;
});