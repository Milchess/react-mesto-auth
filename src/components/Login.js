import React from "react";
import { withRouter } from 'react-router-dom';

function Login() {
    return(
        <div className="login">
           <h3 className="login__title">Вход</h3>
            <form className="login__form">
                <input className="login__form-input" required id="email" name="email" type="email" placeholder="Email"/>
                <input className="login__form-input" required id="password" name="password" type="text" placeholder="Пароль"/>
                <div className="login__button-container">
                    <button className="login__link">Войти</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login);