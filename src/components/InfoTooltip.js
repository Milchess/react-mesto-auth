import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {
    return(
        <>
            <PopupWithForm
                name="popupRegistrationGood"
                isOpen={props.isOpen}
                onClose={props.onClose}>
                <img src='../images/goodRegistration.svg' className='popup-registration__image' alt='Успешная регистрация'></img>
                <p className='popup-registration__text'>Вы успешно зарегистрировались!</p>
            </PopupWithForm>
            <PopupWithForm
                name="popupRegistrationBad"
                isOpen={props.isOpen}
                onClose={props.onClose}>
                <img src='../images/badRegistration.svg' className='popup-registration__image' alt='Ошибка! Попробуйте еще раз'></img>
                <p className='popup-registration__text'>Что-то пошло не так!</p>
                <p className='popup-registration__text'>Попробуйте еще раз.</p>
            </PopupWithForm>
        </>
    )
}

export default InfoTooltip;