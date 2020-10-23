// -----BURGER MENU-----

const CURRENT_PAGE_LINK = 'main-navigation__link--current';

const mainHeader = document.querySelector('.main-header');
const mainNav = document.querySelector('.main-navigation');
const mainNavButton = document.querySelector('.main-navigation__button');
const overlay = document.querySelector('.overlay');
const page = document.querySelector('.page');

const toggleMenu = () => {
    mainHeader.classList.toggle('main-header--overlay');
    mainNav.classList.toggle('main-navigation--burger');
    overlay.classList.toggle('overlay__show');
    page.classList.toggle('page--overlay');
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
        page.classList.remove('page--overlay');
    }
});

// -----SLIDER-----

const screenBreakToCardsCount = {
    1280: 3,
    768: 2,
    320: 1
};

const sliderContainer = document.querySelector('.slider__container');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');

const sliderItemTemplate = document.querySelector('#slider-item').content.querySelector('.slider__item');
const cardTemplate = document.querySelector('#slider-item').content.querySelector('.pet-card');

let allCards = [];
let currentCards = [];

let currentBreak = -1;
let cardsCount = 3;
let isEnabled = true;

let currentSlide;
let newSlide;

const getArrayDifference = (bigArray, smallArray) => {
    return bigArray.filter((item) => smallArray.indexOf(item) < 0);
};

const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min));

const chooseCardsData = (cards, totalCount) => {
    const allCards = [...cards];
    const newCards = [];
  
    for (let i = 0; i < totalCount; i++) {
        const randomCardIndex = getRandomIntegerNumber(0, allCards.length);
        const randomCard = allCards.splice(randomCardIndex, 1)[0];
        newCards.push(randomCard);
    }
  
    return newCards;
};

const createCard = (cardData) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.pet-card__image').src = cardData.img;
    card.querySelector('.pet-card__image').alt = cardData.name;
    card.querySelector('.pet-card__name').textContent = cardData.name;

    return card;
};

const createSliderItem = (cardsData) => {
    const sliderItem = sliderItemTemplate.cloneNode(false);
    cardsData.forEach((card) => {
        sliderItem.append(createCard(card));
    });

    return sliderItem;
};

const createNewSlide = () => {
    const cardsDataToChoose = getArrayDifference(allCards, currentCards);
    const newCardsData = chooseCardsData(cardsDataToChoose, cardsCount);
    currentCards = newCardsData;
    const slide = createSliderItem(newCardsData);

    return slide;
};

const renderNewSlide = () => {
    const createdSlide = createNewSlide();
    sliderContainer.append(createdSlide);
    newSlide = createdSlide;
};

const hideCurrentSlide = (direction) => {
    isEnabled = false;
    currentSlide.classList.add(direction);
    currentSlide.addEventListener('animationend', function() {
        this.remove();
    });
};

const showAnotherSlide = (direction) => {
    newSlide.classList.add('slider__item--next', direction);
    newSlide.addEventListener('animationend', function() {
        this.classList.remove('slider__item--next', direction);
        this.classList.add('slider__item--active');
        isEnabled = true;
    });
    currentSlide = newSlide;
};

const showNextSlide = () => {
    renderNewSlide();
    hideCurrentSlide('slider__item--to-left');
    showAnotherSlide('slider__item--from-right');
};

const showPrevSlide = () => {
    renderNewSlide();
    hideCurrentSlide('slider__item--to-right');
    showAnotherSlide('slider__item--from-left');
};

const renderFirstSlide = () => {
    sliderContainer.innerHTML = '';
    const createdSlide = createNewSlide();
    createdSlide.classList.add('slider__item--active');
    sliderContainer.append(createdSlide);
    currentSlide = createdSlide;
};

const changeSliderView = () => {
    const breakpoints = [1280, 768, 320];
    const width = window.innerWidth;
    let screenBreak;

    for (let i = 0; i < breakpoints.length; i++) {
        if (width >= breakpoints[i]) {
            screenBreak = breakpoints[i];
            break;
        } 
    }

    if (screenBreak !== currentBreak) {
        currentBreak = screenBreak;
        cardsCount = screenBreakToCardsCount[screenBreak];
        renderFirstSlide();
    }
};

fetch('../../assets/json/pets.json').then(res => res.json()).then(data => {
    allCards = data;
    changeSliderView();

    nextButton.addEventListener('click', function() {
        if (isEnabled) {
            showNextSlide();
        }
    });

    prevButton.addEventListener('click', function() {
        if (isEnabled) {
            showPrevSlide();
        }
    });

    window.addEventListener('resize', changeSliderView);
});