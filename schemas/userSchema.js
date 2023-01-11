const joi = require('joi')

const id = joi.string().uuid()
const userName = joi.string().min(3).max(15)
const userLastName = joi.string().min(3).max(15)
const userAge = joi.number().integer()
const userAddres = joi.string().number()


const createUserSchema = joi.object({
    id: id.required(),
    userName: userName.required(),
    userLastName: userLastName.required(),
    userAge: userAge.required(),
    userAddres: userAddres.required()
})

const updateUserSchema = joi.object({
    userName: userName,
    userLastName: userLastName,
    userAge: userAge,
    userAddres: userAddres
})

const getUserSchema = joi.object({
    id: id.required()
})

module.exports = { getUserSchema, updateUserSchema, createUserSchema }