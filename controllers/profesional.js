const Profesional = require('../models/profesional')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.profesionalById = (req, res, next, id) => {
    Profesional.findById(id).exec((err, profesional) => {
        if(err || !profesional) {
            return res.status(400).json({
                error: "Sucursal no existe"
            })
        }
        req.profesional = profesional
        next()
    })
 }

exports.create = (req, res) => { 
    const profesional = new Profesional(req.body)
    profesional.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    return res.json(req.profesional)
}

exports.update = (req, res) => { 
    const profesional = req.profesional
    profesional.nombre = req.body.nombre
    profesional.estado = req.body.estado
    profesional.sucursal = req.body.sucursal
    profesional.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => { 
    const profesional = req.profesional
    profesional.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "profesional eliminada!"
        })
    })
}

exports.list = (req, res) => { 
    Profesional.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

