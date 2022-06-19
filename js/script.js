// Variables
const newNoteBtn = document.querySelector(".new-note-btn");
const addNoteBtn = document.querySelector(".add-note-btn");
const resetNoteBtn = document.querySelector(".reset-note-btn");
const cancelNoteBtn = document.querySelector(".cancel-note-btn");
const newNoteSection = document.querySelector(".new-note-section");
const newTitleInp = newNoteSection.querySelector("div input");
const newNoteInp = newNoteSection.querySelector("textarea");

// Functions
const showNewTextField = () => {
    newTitleInp.value = "";
    newNoteInp.value = "";
    newNoteSection.classList.replace("hidden", "flex");
};

const addNote = () => {
    const title = newTitleInp.value;
    const text = newNoteInp.value;
    const isValueValid = title.length > 0 && text.length > 0;
    const isFieldShown = Array.from(newNoteSection.classList).indexOf("flex");

    if (isFieldShown && isValueValid) {
        console.log(title);
        console.log(text);
    }
};

const resetNote = () => {
    const currentTitleInp = newTitleInp;
    const currentNoteInp = newNoteInp;
    
    currentTitleInp.value = "";
    currentNoteInp.value = "";
};

const cancelNote = () => {
    const currentActiveSection = newNoteSection;
    const currentTitleInp = newTitleInp;
    const currentNoteInp = newNoteInp;

    currentActiveSection.classList.replace("flex", "hidden");
    currentTitleInp.value = "";
    currentNoteInp.value = "";
};

// EventListeners
newNoteBtn.onclick = showNewTextField;
addNoteBtn.onclick = addNote;
resetNoteBtn.onclick = resetNote;
cancelNoteBtn.onclick = cancelNote;