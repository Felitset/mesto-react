import React from 'react';

function PopupWithForm(props) {
    return (
<div className={props.isOpen ? `popup popup-${props.name} popup_is-opened` : `popup popup-${props.name}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={props.onClose}/>
          <h2 className="popup__title">{props.title}</h2>
          <form id="profile" className="popup__form popup__form_edit-profile" name={props.name} noValidate>
          {props.children}
          <button className="popup__save-button popup__button" type="submit">{props.buttonText}</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm