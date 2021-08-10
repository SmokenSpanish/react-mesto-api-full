import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarLink = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarLink.current.value,
        });
    }

    return (
        <PopupWithForm
            {...props}
            type={'avatar'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__form">
                <label htmlFor="avatar-card" className="popup__label">
                    <input type="url" className="popup__input" name="avatar" placeholder="Ссылка на аватар"
                        ref={avatarLink} id="link-ava" required minLength="3" />
                    <span className="error" id="link-ava-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;