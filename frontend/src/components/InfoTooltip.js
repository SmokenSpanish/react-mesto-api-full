import React from 'react';

export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__body">
            <div className="popup__container popup__overlay">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                />
                <img
                    className="popup__tooltip-image"
                    src={props.image}
                    alt="Статус"
                />
                <h2 className="popup__tooltip-title">{props.title}</h2>
            </div>
        </div>
        </div>
    )
} 