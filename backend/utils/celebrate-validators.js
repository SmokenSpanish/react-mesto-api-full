const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('Email')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.email': '{#label} должен быть валидным',
        'string.empty': '{#label} не может быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .min(8)
      .label('Пароль')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.min': '{#label} должен содержать не менее {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .label('Имя')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
    about: Joi
      .string()
      .min(2)
      .max(30)
      .label('Описание')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
    avatar: Joi
      .string()
      .regex(/https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/i)
      .label('URL')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.pattern.base': '{#label} должен быть валидным',
        'string.empty': '{#label} не может быть пустым',
      }),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('Email')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.email': '{#label} должен быть валидным',
        'string.empty': '{#label} не может быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .min(8)
      .label('Пароль')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.min': '{#label} должен содержать не менее {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
  }),
});

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi
      .string()
      .hex()
      .length(24)
      .label('id')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'string.length': '{#label} должен содержать {#limit} символа',
      }),
  }).unknown(true),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .label('Имя')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': '{#label} обязательно для заполнения',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
    about: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .label('Описание')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': '{#label} обязательно для заполнения',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .regex(/https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/i)
      .required()
      .label('URL')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.pattern.base': '{#label} должен быть валидным',
        'string.empty': '{#label} не может быть пустым',
      }),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .label('Название')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': '{#label} обязательно для заполнения',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': '{#label} не может быть пустым',
      }),
    link: Joi
      .string()
      .regex(/https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/i)
      .required()
      .label('URL')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': '{#label} обязателен для заполнения',
        'string.pattern.base': '{#label} должен быть валидным',
        'string.empty': '{#label} не может быть пустым',
      }),
  }),
});

const cardEventValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .hex()
      .length(24)
      .label('id')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'string.min': '{#label} должен содержать не менее {#limit} символов',
      }),
  })
    .unknown(true),
});

module.exports = {
  createUserValidator,
  loginValidator,
  getUserByIdValidator,
  updateUserValidator,
  updateAvatarValidator,
  createCardValidator,
  cardEventValidator,
};
