const { check } = require("express-validator");

const validateInputs = [
        check('name').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 10 }),
        check('email')
          .notEmpty().withMessage('El email es obligatorio')
          .isEmail().withMessage('El email no es válido'),
        check('message').notEmpty().withMessage('El mensaje es obligatorio').isLength({ min: 10 })
];

module.exports = validateInputs;