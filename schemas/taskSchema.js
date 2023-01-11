const joi = require('joi')

const id = joi.string().uuid()
const taskName = joi.string().min(3).max(15)
const taskDescription = joi.string().min(10).max(255)

const createTaskSchema = joi.object({
    taskName: taskName.required(),
    taskDescription: taskDescription.required()
})

const updateTaskSchema = joi.object({
    taskName: taskName,
    taskDescription: taskDescription
})

const getTaskSchema = joi.object({
    id: id.required()
})

module.exports = { getTaskSchema, updateTaskSchema, createTaskSchema }