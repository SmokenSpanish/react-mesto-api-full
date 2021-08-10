import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [place, setPlace] = React.useState({
        name: '',
        link: '',
    });

    const handleChange = (evt) => {
        setPlace((state) => ({
            ...state,
            [evt.target.name]: evt.target.value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlaceSubmit(place);
    }

    React.useEffect(() => {
        setPlace({
          name: '',
          link: '',
        });
      }, [props.isOpen]);

    return (
        <PopupWithForm
            {...props}
            type={'place'}
            title={'Новое место'}
            buttonText={'Создать'}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__form">
                <label htmlFor="place-card" className="popup__label">
                    <input onChange={handleChange} value={place.name || ''} type="text" className="popup__input_type_placeName popup__input" name="name"
                        placeholder="Название" required minLength="2" maxLength="30" autoComplete="off"
                        id="place-card" />
                    <span className="error" id="place-card-error"></span>
                </label>
                <label htmlFor="link-card" className="popup__label">
                    <input onChange={handleChange}  value={place.link || ''} type="url" className="popup__input_type_imgLink popup__input" name="link"
                        placeholder="Ссылка на картинку" id="link-card" required minLength="3" />
                    <span className="error" id="link-card-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;