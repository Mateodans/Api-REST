const { response } = require('express')
const express = require('express')

const roleService = require('../services/roleService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createRoleSchema, updateRoleSchema, getRoleSchema } = require('../schemas/roleSchema')

const router = express.Router()
const service = new roleService()

router.get('/', async(req, res) => {
    const roles = await service.find()
    res.json(roles)
})

router.post('/',
    validatorHandler(createRoleSchema, 'body'),
    async(req, res) => {
        const body = req.body
        const newRole = await service.create(body)
        res.status(201).json(newRole)
    })

router.get('/:id',
    validatorHandler(getRoleSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const role = await service.findOne(id)
            res.json(role)
        } catch (error) {
            next(err)
        }

    })

router.patch('/:id',
    validatorHandler(getRoleSchema, 'params'),
    validatorHandler(updateRoleSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const role = await service.update(id, body)
            res.json(role)
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