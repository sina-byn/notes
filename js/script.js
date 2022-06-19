// Variables
const newNoteBtn = document.querySelector(".new-note-btn");
const addNoteBtn = document.querySelector(".add-note-btn");
const resetNoteBtn = document.querySelector(".reset-note-btn");
const cancelNoteBtn = document.querySelector(".cancel-note-btn");
const newNoteSection = document.querySelector(".new-note-section");
const newTitleInp = newNoteSection.querySelector("div input");
const newNoteInp = newNoteSection.querySelector("textarea");

let notesCount = 1;

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
        addNoteCard(title, text);
        setNotesCount();
        newNoteSection.classList.replace("flex", "hidden");
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

const setNotesCount = () => {
    const notesCountDisp = document.querySelector(".notes-count-disp");
    notesCountDisp.innerText = notesCount + " notes";
};

const setNotesNum = () => {
    const noteNumDisps = document.querySelectorAll(".note-num-disp");

    noteNumDisps.forEach((numDisp, idx) => {
        numDisp.innerText = ++idx;
    });
};

const deleteNote = (e) => {
    const targetNoteCard = e.target.parentElement.parentElement;
    targetNoteCard.remove();
    notesCount--;
    setNotesCount();
    setNotesNum();
};

const addNoteCard = (title, text) => {
    const notesList = document.querySelector(".notes-list");
    const noteCard = document.createElement("div");
    const cardData = `
        <section>
            <p
                class="note-num-disp flex items-center justify-center w-5 h-5 text-xs border-px border-gray-400 rounded-full mb-2">
                ${++notesCount}
            </p>
            <div>
                <p class="title text-gray-700">${title}</p>
                <p class="text text-sm text-secondary-dark">
                  ${text}
                </p>
            </div>
        </section>
    `;
    const cardBtns = document.createElement("section");
    const showBtn = document.createElement("i");
    const editBtn = document.createElement("i");
    const deleteBtn = document.createElement("i");
    cardBtns.className = "flex flex-col items-center justify-center gap-y-2 text-secondary-dark";
    showBtn.className = "show-note-btn fa-solid fa-external-link cursor-pointer hover:text-gray-600";
    editBtn.className = "edit-note-btn fa-solid fa-edit cursor-pointer hover:text-gray-600";
    deleteBtn.className = "delete-note-btn fa-solid fa-trash cursor-pointer hover:text-gray-600";

    deleteBtn.onclick = deleteNote;

    cardBtns.append(showBtn);
    cardBtns.append(editBtn);
    cardBtns.append(deleteBtn);

    noteCard.className = "note-card flex justify-between border-b-px border-secondary border-opacity-75 py-3 px-3";
    noteCard.innerHTML = cardData;
    noteCard.append(cardBtns);
    notesList.append(noteCard);
};

const initOnLoad = () => {
    const deleteBtns = document.querySelectorAll(".delete-note-btn");

    deleteBtns.forEach(btn => {
        btn.onclick = deleteNote;
    });
    setNotesCount();
};

// EventListeners
window.onload = initOnLoad;
newNoteBtn.onclick = showNewTextField;
addNoteBtn.onclick = addNote;
resetNoteBtn.onclick = resetNote;
cancelNoteBtn.onclick = cancelNote;