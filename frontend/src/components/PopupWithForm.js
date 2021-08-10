function PopupWithForm(props) {
    const submitBtnCaptionIsLoading = props.submitBtnCaptionIsLoading || 'Сохранение...';
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__body">
            <div className="popup__container popup__overlay">
                <button onClick={props.onClose} type="button" className="popup__close-button link"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={props.onSubmit} name={props.type} className="popup__forms" noValidate>
                    {props.children}

                <button type="submit" className="popup__button link">
                    {props.isLoading ? submitBtnCaptionIsLoading : props.buttonText}
                </button>

                </form>
            </div>
            </div>
        </div>
    );
}

export default PopupWithForm;