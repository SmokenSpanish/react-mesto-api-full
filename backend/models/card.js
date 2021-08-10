const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название обязательно для заполнения'],
    minlength: [2, 'Название не может быть короче 2-х символов'],
    maxlength: [30, 'Название не может быть длинее 30-ти символов'],
  },
  link: {
    type: String,
    required: [true, 'Ссылка на изображение обязательна'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL должен быть валидным',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
