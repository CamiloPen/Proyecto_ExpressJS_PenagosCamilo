import { body } from "express-validator";

export const courseValidations = [
    body("code").exists().isString().isLength({min: 3}).withMessage('El codigo es obligatorio'),
    body("description").isString(),
    body("intensity").exists().isNumeric({ no_symbols: false }).withMessage('la intecidad debe ser un numero valido'),
    body("weight").exists().isNumeric({ no_symbols: false }).withMessage('el peso debe ser un numero valido'),
    body("topic").exists().isObject().withMessage('el tema es obligtorio')
]

export const userValidations = [
    body("firstName").exists().isString().isLength({min: 3}).withMessage('El nombre es obligatorio'),
    body("lastName").exists().isString().isLength({min: 3}).withMessage('El apellido es obligatorio'),
    body("identification.code").exists().isString().withMessage('la intecidad debe ser un numero valido'),
    body("identification.number").exists().isNumeric({ no_symbols: false }).withMessage('el peso debe ser un numero valido'),
    body("rol").exists().withMessage('el rol es obligtorio'),
    body("gender").exists().isString().isLength({min: 3}).withMessage('El nombre es obligatorio'),
    body("birthDate").exists().isString().isLength({min: 3}).withMessage('El apellido es obligatorio'),
    body("place.cityCode").exists().isString().withMessage('la intecidad debe ser un numero valido'),
    body("place.cityName").exists().isNumeric({ no_symbols: false }).withMessage('el peso debe ser un numero valido'),
    body("place.address").exists().withMessage('el rol es obligtorio')
]