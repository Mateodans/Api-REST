const { response } = require('express')
const express = require('express')

const userService = require('../services/UserService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema')

const router = express.Router()
const service = new userService()

router.get('/', async(req, res) => {
    const user = await service.find()
    res.json(user)
})

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async(req, res) => {
        const body = req.body
        const newUser = await service.create(body)
        res.status(201).json(newUser)
    })

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const user = await service.findOne(id)
            res.json(user)
        } catch (error) {
            next(err)
        }

    })

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const user = await service.update(id, body)
            res.json(user)
        } catch (error) {
            next(error)
        }

    })

router.delete('/:id', async(req, res) => {
    const { id } = req.params
    const rta = await service.delete(id)
    res.json(rta)
})

router.get('/filter', (req, res) => {
    res.send('yo soy un filter')
})




module.exports = router
    /*const express = require('express')

    const router = express.Router()

    router.get('/', (req, res) => {
        const { limit, offset } = req.query
        if (limit && offset) {
            res.json({
                limit,
                offset
            })
        } else {
            res.send('no hay parametros')
        }
    })



    module.exports = router*/