const configValidate = {
    formElement: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    buttonInvalidClass: '.popup__input_state_invalid'
};

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup-profile');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImage = document.querySelector('.popup-image');
const popupPlace = document.querySelector('.popup-place');
const popupCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPic = popupImage.querySelector('.popup__image');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__image-button');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const nameInputProfile = profile.querySelector('.profile__name');
const nameInputPopup = popupProfile.querySelector('.popup__input_type_name');
const placeNameInputPopup = popupPlace.querySelector('.popup__input_type_placeName');
const profileAboutInput = profile.querySelector('.profile__about');
const popupAboutInput = popupProfile.querySelector('.popup__input_type_description');
const popupLinkInput = popupPlace.querySelector('.popup__input_type_imgLink');
const formAdd = document.querySelector('.popup-place__form');
const userContainerElements = document.querySelector('.elements'); //контейнер
const profileForm = popupProfile.querySelector('.popup__forms');
const addCardPopupSelector = '.popup-place';
const profilePopupSelector = '.popup-profile';
const confirmPopupSelector = '.popup-confirm';
const popupBody = document.querySelector('.popup__body');
const avatarPopupSelector = ".popup-avatar";
const avatarPopup = document.querySelector(avatarPopupSelector);
const avatarForm = avatarPopup.querySelector(".popup__forms");
const avatarLogo = document.querySelector(".profile__avatar-wrapper");
const nameSelector = ".profile__name";
const jobSelector = ".profile__about";
const avatarSelector = ".profile__avatar";

export { 
    configValidate,
    popupProfile,
    profile,
    popupPlace,
    popupCloseButton,
    popupPic,
    popupImageTitle, 
    popupImage,
    popupPlaceCloseButton,
    popupImageCloseButton,
    profileEditButton,
    profileAddButton,
    nameInputProfile,
    nameInputPopup,
    placeNameInputPopup,
    profileAboutInput,
    popupAboutInput,
    popupLinkInput,
    formAdd,
    userContainerElements,
    profileForm,
    addCardPopupSelector,
    profilePopupSelector,
    popupBody,
    confirmPopupSelector,
    avatarPopupSelector,
    avatarForm,
    avatarLogo,
    nameSelector,
    jobSelector,
    avatarSelector
}
