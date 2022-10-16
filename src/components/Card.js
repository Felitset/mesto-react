import React from 'react';

function Card(props) {

    return (
        <li key={props.card._id} className="gallery__item">
            <button className="gallery__delete-item" type="button"></button>
            <img className="gallery__image" src={props.card.link} alt={props.card.name} onClick={() => {
                handleClick()
            }} />
            <div className="gallery__item-content">
                <h2 className="gallery__title">{props.card.name}</h2>
                <div className="gallery__like_container">
                    <button className="gallery__like" type="button"></button>
                    <span className="gallery__like-counter"></span></div>
            </div>
        </li>
    )

    function handleClick() {
        props.onCardClick(props.card);
    }

}

export default Card