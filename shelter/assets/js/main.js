// -----BURGER MENU-----

const mainHeader = document.querySelector('.main-header');
const mainNav = document.querySelector('.main-navigation');
const mainNavButton = document.querySelector('.main-navigation__button');
const overlay = document.querySelector('.overlay');
const page = document.querySelector('.page');

const openOverlay = () => {
    overlay.classList.add('overlay__show');
    page.classList.add('page--overlay');
};

const closeOverlay = () => {
    overlay.classList.remove('overlay__show');
    page.classList.remove('page--overlay');
};

const onCurrentLinkClick = () => {
    closeMenu();
};

const openMenu = () => {
    openOverlay();
    overlay.addEventListener('click', closeMenu);
    mainHeader.classList.add('main-header--overlay');
    mainNav.classList.add('main-navigation--burger');
    mainNav.querySelector('.main-navigation__link--current').addEventListener(`click`, onCurrentLinkClick);
};

const closeMenu = () => {
    closeOverlay();
    overlay.removeEventListener('click', closeMenu);
    mainHeader.classList.remove('main-header--overlay');
    mainNav.classList.remove('main-navigation--burger');
    mainNav.querySelector('.main-navigation__link--current').removeEventListener(`click`, onCurrentLinkClick);
};

mainNavButton.addEventListener('click', () => {
    if (mainNav.classList.contains('main-navigation--burger')) {
        closeMenu();
        return;
    }
    openMenu();
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mainNav.classList.contains('main-navigation--burger')) {
        closeMenu();
    }
});


// -----POPUP-----

const popupCardTemplate = document.querySelector('#popup-card').content.querySelector('.pet-popup');
const pageWrapper = document.querySelector('.page__wrapper');

const createPopup = (popupData) => {
    const popup = popupCardTemplate.cloneNode(true);

    popup.querySelector('.pet-popup__image').src = popupData.img;
    popup.querySelector('.pet-popup__image').alt = popupData.name;
    popup.querySelector('.pet-popup__name').textContent = popupData.name;
    popup.querySelector('.pet-popup__breed').textContent = `${popupData.type} - ${popupData.breed}`;
    popup.querySelector('.pet-popup__description').textContent = popupData.description;
    popup.querySelector('.pet-popup__feature-value--age').textContent = popupData.age;
    popup.querySelector('.pet-popup__feature-value--diseases').textContent = popupData.diseases.join(', ');
    popup.querySelector('.pet-popup__feature-value--parasites').textContent = popupData.parasites.join(', ');
    popup.querySelector('.pet-popup__button').addEventListener('click', closeCardPopup);

    return popup;
};

const onOverlayMouseOver = () => {
    const popup = document.querySelector('.pet-popup');
    popup.querySelector('.pet-popup__button').classList.add('pet-popup__button--hover');
};

const onOverlayMouseOut = () => {
    const popup = document.querySelector('.pet-popup');
    popup.querySelector('.pet-popup__button').classList.remove('pet-popup__button--hover');
};

const openCardPopup = (popupData) => {
    const newPopup = createPopup(popupData);
    newPopup.classList.add('pet-popup--show');
    pageWrapper.after(newPopup);

    openOverlay();
    mainHeader.classList.add('main-header--popup');
    overlay.addEventListener('click', closeCardPopup);
    overlay.addEventListener('mouseover', onOverlayMouseOver);
    overlay.addEventListener('mouseout', onOverlayMouseOut);
};

const closeCardPopup = () => {
    const popup = document.querySelector('.pet-popup');
    if (popup) {
        closeOverlay();
        mainHeader.classList.remove('main-header--popup');
        overlay.removeEventListener('click', closeCardPopup);
        overlay.removeEventListener('mouseover', onOverlayMouseOver);
        overlay.removeEventListener('mouseout', onOverlayMouseOut)
        popup.remove();
    }
};

// -----SLIDER (MAIN PAGE)-----
(function () {
    const homePage = document.querySelector('.main-header--homepage');

    if (!homePage) {
        return;
    }

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

        card.addEventListener('click', () => openCardPopup(cardData));

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
})();

// -----PAGINATION (PETS PAGE)-----
(function () {
    const homePage = document.querySelector('.main-header--homepage');

    if (homePage) {
        return;
    }

    const CARDS_COUNT = 48;
    const screenBreakToCardsPerPage = {
        1280: 8,
        768: 6,
        320: 3
    };

    const firstPageButton = document.querySelector('.pagination__link--very-prev');
    const prevPageButton = document.querySelector('.pagination__link--prev');
    const currentPageButton = document.querySelector('.pagination__link--current');
    const nextPageButton = document.querySelector('.pagination__link--next');
    const lastPageButton = document.querySelector('.pagination__link--very-next');
    const cardsContainer = document.querySelector('.pets__list');
    const cardTemplate = document.querySelector('#pet-card').content.querySelector('.pet-card');

    let petsList = [];

    let currentPage = 0;
    let cardsPerPage = 8;
    let currentBreak = -1;

    const generateFullList = (initialList) => {
        let fullList = [];

        for (let i = 0; i < 6; i++) {
        const randomList = initialList;

        for (let j = initialList.length; j > 0; j--) {
            let randomIndex = Math.floor(Math.random() * j);
            const randomItem = randomList.splice(randomIndex, 1)[0];
            randomList.push(randomItem);
        }

        fullList = [...fullList, ...randomList];
        }

        return fullList;
    };

    const generateEachSixUnique = (fullList) => {
        for (let i = 0; i < (fullList.length / 6); i++) {
        const listPart = fullList.slice(i * 6, (i * 6) + 6);
    
        for (let j = 0; j < 6; j++) {
            const duplicatedItem = listPart.find((item, index) =>
                item.name === listPart[j].name && (index !== j));
    
            if (duplicatedItem !== undefined) {
            const fullListIndex = (i * 6) + j;
            const eightSetOrdinal = Math.floor(fullListIndex / 8);

            const shiftedItem = fullList.splice(fullListIndex, 1)[0];
            fullList.splice(eightSetOrdinal * 8, 0, shiftedItem);
    
            generateEachSixUnique(fullList);
            }
        }
        }

        return fullList;
    };

    const createCard = (cardData) => {
        const card = cardTemplate.cloneNode(true);

        card.querySelector('.pet-card__image').src = cardData.img;
        card.querySelector('.pet-card__image').alt = cardData.name;
        card.querySelector('.pet-card__name').textContent = cardData.name;
        card.addEventListener('click', () => openCardPopup(cardData));

        return card;
    };

    const createCardPage = (number) => {
        if (number >= CARDS_COUNT / cardsPerPage) {
            currentPage = CARDS_COUNT / cardsPerPage - 1;
        } else {
            currentPage = number;
        }

        const startCardIndex = cardsPerPage * currentPage;
        const cardsToShow = petsList.slice(startCardIndex, startCardIndex + cardsPerPage);

        const cardsFragment = document.createDocumentFragment();
        cardsToShow.forEach((card) => cardsFragment.append(createCard(card)));

        return cardsFragment;
    }

    const disablePrevButtons = () => {
        firstPageButton.disabled = true;
        prevPageButton.disabled = true;
    };

    const enablePrevButtons = () => {
        firstPageButton.disabled = false;
        prevPageButton.disabled = false;
    };

    const disableNextButtons = () => {
        nextPageButton.disabled = true;
        lastPageButton.disabled = true;
    };

    const enableNextButtons = () => {
        nextPageButton.disabled = false;
        lastPageButton.disabled = false;
    };

    const checkButtons = () => {
        if (currentPage === 0) {
            disablePrevButtons();
            enableNextButtons();
        } else if (currentPage === CARDS_COUNT / cardsPerPage - 1) {
            disableNextButtons();
            enablePrevButtons();
        } else {
            enablePrevButtons();
            enableNextButtons();
        }
    };

    const renderCardsPage = (number) => {
        cardsContainer.innerHTML = '';

        const createdPage = createCardPage(number);
        cardsContainer.append(createdPage);
        
        currentPageButton.textContent = currentPage + 1;
        checkButtons();
    };

    const changeCardPageView = () => {
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
            cardsPerPage = screenBreakToCardsPerPage[screenBreak];
            renderCardsPage(currentPage);
        }
    };

    fetch('../../assets/json/pets.json').then(res => res.json()).then(data => {
        const finalPetsList = generateEachSixUnique(generateFullList(data));
        petsList = finalPetsList;

        changeCardPageView();
        window.addEventListener('resize', changeCardPageView);

        firstPageButton.addEventListener('click', () => renderCardsPage(0));
        prevPageButton.addEventListener('click', () => renderCardsPage(currentPage - 1));
        nextPageButton.addEventListener('click', () => renderCardsPage(currentPage + 1));
        lastPageButton.addEventListener('click', () => renderCardsPage(CARDS_COUNT / cardsPerPage - 1));
    });
})();