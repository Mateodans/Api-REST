const { response } = require('express')
const express = require('express')

const taskService = require('../services/taskService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('../schemas/taskSchema')

const router = express.Router()
const service = new taskService()

router.get('/', async(req, res) => {
    const tasks = await service.find()
    res.json(tasks)
})

router.post('/',
    validatorHandler(createTaskSchema, 'body'),
    async(req, res) => {
        const body = req.body
        const newTask = await service.create(body)
        res.status(201).json(newTask)
    })

router.get('/:id',
    validatorHandler(getTaskSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const task = await service.findOne(id)
            res.json(task)
        } catch (error) {
            next(err)
        }

    })

router.patch('/:id',
    validatorHandler(getTaskSchema, 'params'),
    validatorHandler(updateTaskSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const task = await service.update(id, body)
            res.json(task)
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