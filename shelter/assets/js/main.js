const CURRENT_PAGE_LINK = 'main-navigation__link--current';

const mainHeader = document.querySelector('.main-header');
const mainNav = document.querySelector('.main-navigation');
const mainNavButton = document.querySelector('.main-navigation__button');
const overlay = document.querySelector('.overlay');

const toggleMenu = () => {
    mainHeader.classList.toggle('main-header--overlay');
    mainNav.classList.toggle('main-navigation--burger');
    overlay.classList.toggle('overlay__show');
};

mainNavButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
mainNav.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(CURRENT_PAGE_LINK)) {
        toggleMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainHeader.classList.remove('main-header--overlay');
        mainNav.classList.remove('main-navigation--burger');
        overlay.classList.remove('overlay__show');
    }
});