import { body } from "express-validator";

export const courseValidations = [
    body("code").exists().isString().isLength({min: 2}).withMessage('El codigo es obligatorio'),
    body("description").isString(),
    body("intensity").exists().isNumeric({ no_symbols: false }).withMessage('la intecidad debe ser un numero valido'),
    body("weight").exists().isNumeric({ no_symbols: false }).withMessage('el peso debe ser un numero valido'),
    body("topic").exists().withMessage('el tema es obligtorio')
]

export const userValidations = [
    body("firstName").exists().isString().isLength({min: 3}).withMessage('1'),
    body("lastName").exists().isString().isLength({min: 3}).withMessage('2'),
    body("identification.code").exists().isString().withMessage('3'),
    body("identification.name").exists().isString().withMessage('4'),
    body("identification.number").exists().isNumeric({ no_symbols: false }).withMessage('5'),
    body("rol").exists().withMessage('6'),
    body("gender").exists().isString().withMessage('7'),
    body("birthDate").exists().isDate().withMessage('8'),
    body("place.cityCode").exists().isString().withMessage('9'),
    body("place.cityName").exists().isString({ no_symbols: false }).withMessage('10'),
    body("place.address").exists().withMessage('11')
]                               

export const scheduleValidations = [
    body("code").exists().isString().isLength({min: 2}).withMessage('El codigo es obligatorio'),
    body("course").isString(),
    body("schedule").exists().isObject().withMessage('la intecidad debe ser un numero valido'),
    body("classroom").exists().isObject().withMessage('el peso debe ser un numero valido'),
    body("teacher").exists().withMessage('el tema es obligtorio')
]