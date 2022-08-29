const sideMenu = document.querySelector('aside');
const allNotesSection = document.querySelector('.notes-list').parentElement;
const menuIcon = document.querySelector('.menu-icon');
const notesListIcon = document.querySelector('.notes-list-icon');

const toggleMenuVisibility = (sidebar, button) => {
    console.log(sidebar);
    if (sidebar.className.includes('-translate-x-full')) {
        button.children[0].style.display = "initial";
        button.children[1].style.display = "none";
        button.classList.replace('left-0', 'left-[240px]');
        sidebar.classList.replace('-translate-x-full', 'translate-x-0');
        sidebar.style.zIndex = '100';
        return;
    }
    
    button.children[0].style.display = "none";
    button.children[1].style.display = "initial";
    button.classList.replace('left-[240px]', 'left-0');
    sidebar.classList.replace('translate-x-0', '-translate-x-full');
    sidebar.style.zIndex = '10';
};

menuIcon.onclick = toggleMenuVisibility.bind(null, sideMenu, menuIcon);
notesListIcon.onclick = toggleMenuVisibility.bind(null, allNotesSection, notesListIcon);