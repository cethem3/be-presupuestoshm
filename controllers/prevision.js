const Prevision = require('../models/prevision')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.previsionById = (req, res, next, id) => {
    Prevision.findById(id).exec((err, prevision) => {
        if(err || !prevision) {
            return res.status(400).json({
                error: "Previsión no existe"
            })
        }
        req.prevision = prevision
        next()
    })
 }

exports.create = (req, res) => { 
    const prevision = new Prevision(req.body)
    prevision.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    
    return res.json(req.prevision)
}

exports.update = (req, res) => { 
    const prevision = req.prevision
    prevision.nombre = req.body.nombre
    prevision.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => { 
    const prevision = req.prevision
    prevision.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Previsión eliminada!"
        })
    })
}

exports.list = (req, res) => { 
    Prevision.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

