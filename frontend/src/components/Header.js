import React from 'react';
import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {
    return(
        <header className="header">
            <img src={logo} alt="Логотип проекта Mesto" className="header__logo"/>
            {
            props.loggedIn && (
                <Route exact path="/">
                    <div className="header__container">
                        <p className="header__email">{props.email}</p>
                        <Link
                            className="header__sign-out"
                            onClick={props.onLogout}
                            to="/signin">Выйти
                        </Link>
                    </div>
                </Route>
            )
        }
        <Route path="/signin">
            <Link
                className="header__link"
                to="/signup">Регистрация
            </Link>
        </Route>
        <Route path="/signup">
            <Link
                className="header__link"
                to="/signin">Войти
            </Link>
        </Route>
        </header>
    )
}

export default Header;