import headerLogo from "../images/header-logo.svg";
import React from 'react';
import {Link, useLocation} from "react-router-dom";

function Header(props) {
    const location = useLocation();
    let navBar;

    if (location.pathname === '/signin') {
        navBar = <Link to="/signup">Регистрация</Link>
    } else if (location.pathname === '/signup') {
        navBar = <Link to="/signin">Войти</Link>
    } else {
        navBar = <div><p>{localStorage.getItem('email')}</p><Link to="/signin" onClick={props.signOut}>Выйти</Link></div>
    }

    return (
        <div className="header">
            <img alt="Логотип Mesto Russia" className="header__logo" src={headerLogo}/>
            { navBar }
        </div>
    )
}

export default Header;