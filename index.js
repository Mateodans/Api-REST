const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

const { logError, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

app.use(express.json())

const whiteList = ['http://localhost:8080']
const options = {
    origin: (origin, callbback) => {
        if (whiteList.includes(origin)) {
            callbback(null, true)
        } else {
            callbback(new Error('no permitido'))
        }
    }
}
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

routerApi(app)

app.use(logError)
app.use(boomErrorHandler)
app.use(errorHandler)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) => console.error(error))

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})