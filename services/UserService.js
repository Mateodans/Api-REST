const faker = require('faker')
const boom = require('@hapi/boom')

class UserService {
    constructor() {
        this.user = []
        this.generate()
    }

    generate() {
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.user.push({
                id: faker.datatype.uuid(),
                name: faker.name.userName(),
                lastName: faker.name.userlastName(),
                age: faker.date.userAge(),
                addres: faker.address.userAddres()
            })
        }
    }

    async create(data) {
        const newUser = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.user.push(newUser)
        return newUser
    }

    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.user)
            }, 5000)
        })
    }

    async findOne(id) {
        const user = this.users.find(item => item.id === id)
        if (!user) {
            throw boom.notFound('user not found')
        } else {
            return user
        }
    }

    async update(id, changes) {
        const index = this.user.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('user not found')
        }
        const user = this.users[index]
        this.users[index] = {
            ...user,
            ...changes
        }
        return this.users[index]
    }

    async delete(id) {
        const index = this.users.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('user not found')
        }
        this.users.splice(index, 1)
        return { id }
    }
}

module.exports = UserService