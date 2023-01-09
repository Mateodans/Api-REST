function logError(err, req, res, next) {
    console.error(err)
    next(err)
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: error.message,
        satck: error.satck
    })
}

module.exports = { logError, errorHandler }