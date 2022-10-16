import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [editProfileIsOpened, isEditProfilePopupOpen] = useState(false);
  const [addPlaceIsOpened, isAddPlacePopupOpen] = useState(false);
  const [editAvatarIsOpened, isEditAvatarPopupOpen] = useState(false);

  const [selectedCard, isSelectedCard] = useState({});
  const [imagePopupIsOpened, isImagePopupIsOpened] = useState(false);
  return (

    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="profile-edit" buttonText="Сохранить" 
      isOpen={editProfileIsOpened} onClose={closeAllPopups}>
        <input id="profile-name-input" className="popup__input popup__input_type_name" type="text" name="name"
          placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="profile-name-input-error"></span>
        <input id="job-input" className="popup__input popup__input_type_job" type="text" name="profession"
          placeholder="Профессия" required minLength="2" maxLength="200" />
        <span className="job-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="add-card" buttonText="Создать" 
      isOpen={addPlaceIsOpened} onClose={closeAllPopups}>
        <input id="card-title-input" className="popup__input popup__input_type_card-title" type="text" name="card_title"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span className="card-title-input-error"></span>
        <input id="image-link-input" className="popup__input popup__input_type_image-link" type="url" name="image_link"
          placeholder="Ссылка на картинку" required />
        <span className="image-link-input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} 
      onClose={closeAllPopups} isOpen={imagePopupIsOpened} />

      <PopupWithForm title="Вы уверены?" name="delete-card" buttonText="Да">
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="new-avatar" buttonText="Сохранить" 
      isOpen={editAvatarIsOpened} onClose={closeAllPopups}>
        <input id="avatar-link-input" className="popup__input popup__input_type_avatar-image-link" type="url" name="avatar_link"
          placeholder="Ссылка на картинку" required />
        <span className="avatar-link-input-error"></span>
      </PopupWithForm>
    </div>
  );

  function handleEditAvatarClick() {
    isEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    isEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    isAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    isSelectedCard(card);
    isImagePopupIsOpened(true);
  }

  function closeAllPopups() {
    isEditAvatarPopupOpen(false);
    isEditProfilePopupOpen(false);
    isAddPlacePopupOpen(false);
    isSelectedCard(false);
    isImagePopupIsOpened(false);
  }
}

export default App;
