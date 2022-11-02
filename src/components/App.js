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
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, editProfilePopupOpen] = useState(false);
  const [addPlaceIsOpened, isAddPlacePopupOpen] = useState(false);
  const [isEditAvatarIsOpened, editAvatarPopupOpen] = useState(false);

  const [selectedCard, isSelectedCard] = useState({});
  const [imagePopupIsOpened, isImagePopupIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err)
      })
  },
    [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      });
  }

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

  function handleAddPlaceSubmit(placeInfo) {
    api.saveCard(placeInfo)

      .then((res) => {
        setCards([res, ...cards]);
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
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards} />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={addPlaceIsOpened}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />


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
          onUpdateAvatar={handleUpdateAvatar} />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
