function ImagePopup({ card, onClose }) {
    return(
    <div className={`popup popup-image ${card ? 'popup_opened' : ''}`}>
        <div className="popup__body">
            <div className="popup__image-container popup__overlay">
                <button onClick={onClose} type="button" className="popup__close-button popup__image-button link" />
                <img  src={card && card.link} alt={card && card.name} className="popup__image"/>
                <p className="popup__image-title">{card && card.name}</p>
            </div>
        </div>
    </div>
    );
}

export default ImagePopup;