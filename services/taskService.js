const faker = require('faker')
const boom = require('@hapi/boom')

class TaskService {
    constructor() {
        this.task = []
        this.generate()
    }

    generate() {
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.task.push({
                id: faker.datatype.uuid(),
                name: faker.name.taskName(),
                description: faker.definitions.taksDescription()
            })
        }
    }

    async create(data) {
        const newTask = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.task.push(newTask)
        return newTask
    }

    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.task)
            }, 5000)
        })
    }

    async findOne(id) {
        const task = this.task.find(item => item.id === id)
        if (!task) {
            throw boom.notFound('task not found')
        } else {
            return task
        }
    }

    async update(id, changes) {
        const index = this.task.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('task not found')
        }
        const task = this.task[index]
        this.task[index] = {
            ...task,
            ...changes
        }
        return this.task[index]
    }

    async delete(id) {
        const index = this.task.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('task not found')
        }
        this.task.splice(index, 1)
        return { id }
    }
}

module.exports = TaskService