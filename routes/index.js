const express = require('express')

const rolesRouter = require('./rolesRouter')
const usersRouter = require('./usersRouter')
const tasksRouter = require('./tasksRouter')

function routerApi(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/roles', rolesRouter)
    router.use('/users', usersRouter)
    router.use('/tasks', tasksRouter)
}

module.exports = routerApi