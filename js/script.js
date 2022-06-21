// Variables - Constant
const searchInp = document.querySelector(".search-input");
const newNoteBtn = document.querySelector(".new-note-btn");
const sideBtnsContainer = document.querySelector(".side-btns-container");
const submitNoteBtn = document.querySelector(".submit-note-btn");
const resetNoteBtn = document.querySelector(".reset-note-btn");
const cancelNoteBtn = document.querySelector(".cancel-note-btn");
const newNoteSection = document.querySelector(".new-note-section");
const newTitleInp = newNoteSection.querySelector("div input");
const newNoteInp = newNoteSection.querySelector("textarea");
const editNoteSection = document.querySelector(".edit-note-section");
const editTitleInp = editNoteSection.querySelector("div input");
const editNoteInp = editNoteSection.querySelector("textarea");
const showNoteSection = document.querySelector(".show-note-section");
const titleDisp = showNoteSection.querySelector(".title-disp");
const noteDisp = showNoteSection.querySelector(".note-disp");

// Other Variables
let isAddMode = false,
    isEditModeEnabled = false,
    notesCount = 1,
    activeTextarea,
    currentNoteIDX;

// Functions
const showNewTextField = () => {
    newTitleInp.value = "";
    newNoteInp.value = "";
    newNoteSection.classList.replace("hidden", "flex");
    sideBtnsContainer.classList.replace("hidden", "initial");
    showNoteSection.classList.replace("flex", "hidden");
    isAddMode = true;
    activeTextarea = newNoteInp;
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
            showNote();
            indicateShownNote(null);
        } else {
            const currentNote = document.querySelectorAll(".note-card")[currentNoteIDX];
            editNoteSection.classList.replace("flex", "hidden");
            currentNote.querySelector(".title").innerText = title;
            currentNote.querySelector(".note").innerText = note;
            showNote(currentNote);
            indicateShownNote(currentNote);
            isEditModeEnabled = false;
        }

        sideBtnsContainer.classList.replace("initial", "hidden");
        resetTextEditor();

        isAddMode = false;
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

    sideBtnsContainer.classList.replace("initial", "hidden");
    isAddMode = false;
    isEditModeEnabled = false;
    activeTextarea = null;
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
    if (!isEditModeEnabled && !isAddMode) {
        const targetNoteCard = !e ? document.querySelector(".notes-list").lastChild :
            e.target.parentElement.parentElement;
        console.log(targetNoteCard);
        const title = targetNoteCard.querySelector(".title").innerText;
        const note = targetNoteCard.querySelector(".note").innerText;

        showNoteSection.classList.replace("hidden", "flex");
        titleDisp.innerText = title;
        noteDisp.innerText = note;

        indicateShownNote(targetNoteCard);

        const noteCards = Array.from(targetNoteCard.parentElement.children);
        currentNoteIDX = noteCards.indexOf(targetNoteCard);
        activeTextarea = null;
    }
};

const edtiNote = (e) => {
    if (!isAddMode && !isEditModeEnabled) {
        const targetNoteCard = e.target.parentElement.parentElement;
        const noteIDX = targetNoteCard.querySelector(".note-num-disp").innerText - 1;
        const title = targetNoteCard.querySelector(".title").innerText;
        const note = targetNoteCard.querySelector(".note").innerText;

        currentNoteIDX = noteIDX;
        editNoteSection.classList.replace("hidden", "flex");
        editTitleInp.value = title;
        editNoteInp.value = note;

        showNoteSection.classList.replace("flex", "hidden");
        sideBtnsContainer.classList.replace("hidden", "initial");

        isEditModeEnabled = true;
        activeTextarea = editNoteInp;
    }
};

const deleteNote = (e) => {
    const targetNoteCard = e.target.parentElement.parentElement;
    const noteCards = Array.from(targetNoteCard.parentElement.children);
    targetNoteCard.remove();
    notesCount--;
    setNotesCount();
    setNotesNum();


    if (noteCards.indexOf(targetNoteCard) === currentNoteIDX) {
        newNoteSection.classList.replace("flex", "hidden");
        editNoteSection.classList.replace("flex", "hidden");
        showNoteSection.classList.replace("flex", "hidden");
    }
};

const indicateShownNote = (card) => {
    const noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach(card => {
        card.classList.remove("bg-secondary-dark");
        card.classList.replace("text-gray-200", "text-secondary-medium");
        card.querySelector(".note-num-disp").classList.replace("border-gray-200", "border-gray-400");
        card.querySelector(".note-num-disp").classList.replace("text-gray-200", "text-gray-700");
    });

    const noteCard = card || noteCards[noteCards.length - 1];

    noteCard.classList.add("bg-secondary-dark");
    noteCard.classList.replace("text-secondary-medium", "text-gray-200");
    noteCard.querySelector(".note-num-disp").classList.replace("border-gray-400", "border-gray-200");
    noteCard.querySelector(".note-num-disp").classList.replace("text-gray-700", "text-gray-200");
};

const addNoteCard = (title, note) => {
    const notesList = document.querySelector(".notes-list");
    const noteCard = document.createElement("div");
    const cardData = `
        <section>
            <p
                class="note-num-disp flex items-center justify-center w-5 h-5 text-gray-700 text-xs border-px border-gray-400 rounded-full mb-2">
                ${++notesCount}
            </p>
            <div>
                <p class="title w-fit text-gray-700">${title}</p>
                <p class="note text-sm">
                  ${note.slice(0, 22) + " ..."}
                </p>
            </div>
        </section>
    `;
    const cardBtns = document.createElement("section");
    const showBtn = document.createElement("i");
    const editBtn = document.createElement("i");
    const deleteBtn = document.createElement("i");
    cardBtns.className = "flex flex-col items-center justify-center gap-y-2";
    showBtn.className = "show-note-btn fa-solid fa-external-link cursor-pointer hover:text-gray-600";
    editBtn.className = "edit-note-btn fa-solid fa-edit cursor-pointer hover:text-gray-600";
    deleteBtn.className = "delete-note-btn fa-solid fa-trash cursor-pointer hover:text-gray-600";

    showBtn.onclick = showNote;
    editBtn.onclick = edtiNote;
    deleteBtn.onclick = deleteNote;

    cardBtns.append(showBtn);
    cardBtns.append(editBtn);
    cardBtns.append(deleteBtn);

    noteCard.className = "note-card flex justify-between text-secondary-medium border-b-px border-secondary border-opacity-75 py-3 px-3";
    noteCard.innerHTML = cardData;
    noteCard.append(cardBtns);
    notesList.append(noteCard);

    isAddMode = false;
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

const searchNotes = (e) => {
    const searchVal = e.target.value;
    const noteCards = Array.from(document.querySelector(".notes-list").children);
    const titleElems = noteCards.map(card => {
        return card.querySelector(".title");
    })

    titleElems.forEach(title => {
        const targetNoteCard = title.parentElement.parentElement.parentElement;
        const hasSearchVal =
            title.innerText.toUpperCase().includes(searchVal.toUpperCase());
        if (!hasSearchVal && searchVal.length > 1) {
            targetNoteCard.classList.replace("flex", "hidden");
        } else {
            targetNoteCard.classList.replace("hidden", "flex");
            title.classList.add("bg-yellow-200");
        }

        if (!searchVal) {
            title.classList.remove("bg-yellow-200");
        }
    });
};

// EventListeners
window.onload = initOnLoad;
newNoteBtn.onclick = showNewTextField;
submitNoteBtn.onclick = submitNote;
resetNoteBtn.onclick = resetNote;
cancelNoteBtn.onclick = cancelNote;
searchInp.oninput = searchNotes;