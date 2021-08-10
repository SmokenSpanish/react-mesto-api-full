import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
      };

      const handleDeleteClick = () => {
        onCardDelete(card);
      };

    return (
        <div className="element">
            {isOwn && (
            <button onClick={handleDeleteClick} className="element__trash link" />
            )}
            <img onClick={handleClick} src={card.link} alt={card.name} className="element__image" />
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-box">
                    <button onClick={handleLikeClick} type="button" className={`element__rectangle link ${isLiked ? "element__rectangle_active" : ''}`} />
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;