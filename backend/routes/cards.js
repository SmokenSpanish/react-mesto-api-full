const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidator, cardEventValidator } = require('../utils/celebrate-validators');

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', cardEventValidator, deleteCard);
router.put('/:cardId/likes', cardEventValidator, likeCard);
router.delete('/:cardId/likes', cardEventValidator, dislikeCard);

module.exports = router;
