import headerLogo from "../images/header-logo.svg";
import React from 'react';

function Header() {
    return (
        <div className="header">
            <img alt="Логотип Mesto Russia" className="header__logo" src={headerLogo}/>
        </div>
    )
}

export default Header;