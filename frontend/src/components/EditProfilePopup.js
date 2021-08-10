import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]);
    
      const handleChangeName = (evt) => {
        setName(evt.target.value);
      };
    
      const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
      };
    
      function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
    
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      }

      return (
          <PopupWithForm
          {...props}
          type={'profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__form">
            <label htmlFor="name-card" className="popup__label">
              <input onChange={handleChangeName} type="text" className="popup__input_type_name popup__input" value={name || ''} name="name" required
                minLength="2" maxLength="40" autoComplete="off" id="name-card" placeholder="Имя" />
              <span className="error" id="name-card-error"></span>
            </label>
            <label htmlFor="job-card" className="popup__label">
              <input onChange={handleChangeDescription} type="text" className="popup__input_type_description popup__input" value={description || ''} name="about"
                placeholder="О себе" autoComplete="off" id="job-card" required minLength="2"
                maxLength="200" />
              <span className="error" id="job-card-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>
      );
}

export default EditProfilePopup;