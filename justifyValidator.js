const { body } = require('express-validator');

const justifyValidator = [ body('justifytext').notEmpty().trim().escape().isLength({ min: 79 }) ]


module.exports = { justifyValidator };