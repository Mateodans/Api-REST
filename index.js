const express = require('express')
const routerApi = require('./routes')

const app = express()
const port = 3000

const { logError, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

routerApi(app)

app.use(logError)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})