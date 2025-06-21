import { body } from "express-validator";

export const validations = [
    body("code").exists().isString().isLength({min: 3}).withMessage('El codigo es obligatorio'),
    body("description").isString(),
    body("intensity").exists().isNumeric({ no_symbols: false }).withMessage('la intecidad debe ser un numero valido'),
    body("weight").exists().isNumeric({ no_symbols: false }).withMessage('el peso debe ser un numero valido'),
    body("topic").exists().isObject().withMessage('el tema es obligtorio')
]