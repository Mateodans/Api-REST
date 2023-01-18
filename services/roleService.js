const faker = require('faker')
const boom = require('@hapi/boom')

class RoleService {
    constructor() {
        this.roles = []
        this.generate()
    }

    generate() {
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.roles.push({
                id: faker.datatype.uuid(),
                name: faker.name.findName(),
                description: faker.name.jobDescriptor(),
            })
        }
    }

    async create(data) {
        const newRole = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.roles.push(newRole)
        return newRole
    }

    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.roles)
            }, 5000)
        })
    }

    async findOne(id) {
        const role = this.roles.find(item => item.id === id)
        if (!role) {
            throw boom.notFound('role not found')
        } else {
            return role
        }
    }

    async update(id, changes) {
        const index = this.roles.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('role not found')
        }
        const role = this.roles[index]
        this.roles[index] = {
            ...role,
            ...changes
        }
        return this.roles[index]
    }

    async delete(id) {
        const index = this.roles.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('role not found')
        }
        this.roles.splice(index, 1)
        return { id }
    }
}



module.exports = RoleService