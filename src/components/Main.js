import React, { useState, useEffect } from 'react';
import api from '../utils/api_config.js';
import Card from './Card.js'
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const userAvatar = currentUser.avatar
    const userName =currentUser.name
    const userDescription = currentUser.about
    
    return (
        <main className="main page__main">
            <section className="profile main__profile">
                <div onClick={props.onEditAvatar} className="profile__wrapper">
                    <img
                        className="profile__avatar"
                        src={userAvatar}
                        alt="Аватар профиля."
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button onClick={props.onEditProfile} className="profile__edit-button" type="button" />
                    <h2 className="profile__description">{userDescription}</h2>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button" />
            </section>
            <section className="main__gallery">
                <ul className="gallery">
                    {props.cards.map((card) => <Card 
                      key={card._id} 
                      card={card} 
                      onCardClick={props.onCardClick}
                      onCardLike = {props.onCardLike} 
                      onCardDelete = {props.onCardDelete} />)}
                </ul>
            </section>
        </main>
    )
}

export default Main