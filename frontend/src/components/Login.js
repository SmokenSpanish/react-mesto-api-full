import React from 'react';

export default function Login(props) {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onLogin({ email, password });
    }
    return (
        <section className="auth page__auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    className="auth__input auth__input_type_email"
                    type="email"
                    name="emailInput"
                    placeholder="Email"
                    required
                    onChange={handleChangeEmail}
                    value={email}
                />
                <input
                    className="auth__input auth__input_type_password"
                    type="password"
                    name="passwordInput"
                    placeholder="Пароль"
                    required
                    onChange={handleChangePassword}
                    value={password}
                />
                <button
                    className="auth__submit-button"
                    type="submit">Войти</button>
            </form>
        </section>
    );
} 