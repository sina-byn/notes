// Variables - Constant
const newNoteBtn = document.querySelector(".new-note-btn");
const submitNoteBtn = document.querySelector(".submit-note-btn");
const resetNoteBtn = document.querySelector(".reset-note-btn");
const cancelNoteBtn = document.querySelector(".cancel-note-btn");
const newNoteSection = document.querySelector(".new-note-section");
const newTitleInp = newNoteSection.querySelector("div input");
const newNoteInp = newNoteSection.querySelector("textarea");
const editNoteSection = document.querySelector(".edit-note-section");
const editTitleInp = editNoteSection.querySelector("div input");
const editNoteInp = editNoteSection.querySelector("textarea");

// Variables
let isEditModeEnabled = false,
    notesCount = 1,
    currentNoteIDX;

// Functions
const showNewTextField = () => {
    newTitleInp.value = "";
    newNoteInp.value = "";
    newNoteSection.classList.replace("hidden", "flex");
};

const submitNote = () => {
    const title = isEditModeEnabled ? editTitleInp.value : newTitleInp.value;
    const note = isEditModeEnabled ? editNoteInp.value : newNoteInp.value;
    const isValueValid = title.length > 0 && note.length > 0;
    const isFieldShown =
        Array.from(newNoteSection.classList).indexOf("flex") > -1 ||
        Array.from(editNoteSection.classList).indexOf("flex") > -1;

    if (isFieldShown && isValueValid) {
        if (!isEditModeEnabled) {
            addNoteCard(title, note);
            setNotesCount();
            newNoteSection.classList.replace("flex", "hidden");
            newTitleInp.value = "";
            newNoteInp.value = "";
        } else {
            const currentNote = document.querySelectorAll(".note-card")[currentNoteIDX];
            editNoteSection.classList.replace("flex", "hidden");
            currentNote.querySelector(".title").innerText = title;
            currentNote.querySelector(".note").innerText = note;
            isEditModeEnabled = false;
        }
    }
};

const resetNote = () => {
    const currentTitleInp = isEditModeEnabled ? editTitleInp : newTitleInp;
    const currentNoteInp = isEditModeEnabled ? editNoteInp : newNoteInp;

    currentTitleInp.value = "";
    currentNoteInp.value = "";
};

const cancelNote = () => {
    const currentActiveSection = isEditModeEnabled ? editNoteSection : newNoteSection;
    const currentTitleInp = isEditModeEnabled ? editTitleInp : newTitleInp;
    const currentNoteInp = isEditModeEnabled ? editNoteInp : newNoteInp;

    currentActiveSection.classList.replace("flex", "hidden");
    currentTitleInp.value = "";
    currentNoteInp.value = "";

    (isEditModeEnabled) ? isEditModeEnabled = false : null;
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

const showNote = (e) => {
    const targetNoteCard = e.target.parentElement.parentElement;
    const title = targetNoteCard.querySelector(".title").innerText;
    const note = targetNoteCard.querySelector(".note").innerText;

    const showNoteSection = document.querySelector(".show-note-section");
    const titleDisp = showNoteSection.querySelector(".title-disp");
    const noteDisp = showNoteSection.querySelector(".note-disp");

    showNoteSection.classList.replace("hidden", "flex");
    titleDisp.innerText = title;
    noteDisp.innerText = note;
};

const edtiNote = (e) => {
    const targetNoteCard = e.target.parentElement.parentElement;
    const noteIDX = targetNoteCard.querySelector(".note-num-disp").innerText - 1;
    const title = targetNoteCard.querySelector(".title").innerText;
    const note = targetNoteCard.querySelector(".note").innerText;

    currentNoteIDX = noteIDX;
    editNoteSection.classList.replace("hidden", "flex");
    editTitleInp.value = title;
    editNoteInp.value = note;

    isEditModeEnabled = true;
};

const deleteNote = (e) => {
    const targetNoteCard = e.target.parentElement.parentElement;
    targetNoteCard.remove();
    notesCount--;
    setNotesCount();
    setNotesNum();
};

const addNoteCard = (title, note) => {
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
                <p class="note text-sm text-secondary-dark">
                  ${note.slice(0, 22) + " ..."}
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

    showBtn.onclick = showNote;
    editBtn.onclick = edtiNote;
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
    const showBtns = document.querySelectorAll(".show-note-btn");
    const editBtns = document.querySelectorAll(".edit-note-btn");
    const deleteBtns = document.querySelectorAll(".delete-note-btn");

    deleteBtns.forEach((btn, idx) => {
        btn.onclick = deleteNote;
        showBtns[idx].onclick = showNote;
        editBtns[idx].onclick = edtiNote;
    });
    setNotesCount();
};

// EventListeners
window.onload = initOnLoad;
newNoteBtn.onclick = showNewTextField;
submitNoteBtn.onclick = submitNote;
resetNoteBtn.onclick = resetNote;
cancelNoteBtn.onclick = cancelNote;