import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api_config.js';
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {
  const [isEditProfilePopupOpen, editProfilePopupOpen] = useState(false);
  const [addPlaceIsOpened, isAddPlacePopupOpen] = useState(false);
  const [isEditAvatarIsOpened, editAvatarPopupOpen] = useState(false);

  const [selectedCard, isSelectedCard] = useState({});
  const [imagePopupIsOpened, isImagePopupIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUser()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleEditAvatarClick() {
    editAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    editProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    isAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    isSelectedCard(card);
    isImagePopupIsOpened(true);
  }

  function closeAllPopups() {
    editAvatarPopupOpen(false);
    editProfilePopupOpen(false);
    isAddPlacePopupOpen(false);
    isSelectedCard(false);
    isImagePopupIsOpened(false);
  }

  function handleUpdateUser(userInfo) {
    
    api.saveUser(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })

  }

  function handleUpdateAvatar(imageLink) {
    api.postNewAvatar(imageLink)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick} />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <PopupWithForm
          title="Новое место"
          name="add-card"
          buttonText="Создать"
          isOpen={addPlaceIsOpened} onClose={closeAllPopups}>
          <input id="card-title-input" className="popup__input popup__input_type_card-title" type="text" name="card_title"
            placeholder="Название" required minLength="2" maxLength="30" />
          <span className="card-title-input-error"></span>
          <input id="image-link-input" className="popup__input popup__input_type_image-link" type="url" name="image_link"
            placeholder="Ссылка на картинку" required />
          <span className="image-link-input-error"></span>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={imagePopupIsOpened} />

        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          buttonText="Да">
        </PopupWithForm>

        <EditAvatarPopup 
        isOpen={isEditAvatarIsOpened} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}/>
        
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
