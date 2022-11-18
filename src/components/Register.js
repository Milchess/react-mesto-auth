import React from "react";
import { Link, withRouter } from 'react-router-dom';
import "./styles/Register.css";

function Register() {
    return(
        <div className="login">
            <h3 className="login__title">Регистрация</h3>
            <form className="login__form">
                <input className="login__form-input" required id="email" name="email" type="email" placeholder="Email"/>
                <input className="login__form-input" required id="password" name="password" type="text" placeholder="Пароль"/>
                <div className="login__button-container">
                    <button className="login__link">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signup">
                <p className="register__subtitle">Уже зарегистрированы?</p>
                <Link to="login" className="signup__link">Войти</Link>
            </div>
        </div>
    )
}

export default withRouter(Register);