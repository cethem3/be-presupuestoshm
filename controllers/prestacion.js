const Prestacion = require('../models/prestacion')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.prestacionById = (req, res, next, id) => {
    Prestacion.findById(id).exec((err, prestacion) => {
        if(err || !prestacion) {
            return res.status(400).json({
                error: "Prestacion no existe"
            })
        }
        req.prestacion = prestacion
        next()
    })
 }

exports.create = (req, res) => { 
    const prestacion = new Prestacion(req.body)
    prestacion.save((err, data) => {
        console.log(err);
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    return res.json(req.prestacion)
}

exports.update = (req, res) => { 
    const prestacion = req.prestacion
    prestacion.glosa = req.body.glosa
    prestacion.precio = req.body.precio
    prestacion.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => { 
    const prestacion = req.prestacion
    prestacion.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "prestacion eliminada!"
        })
    })
}

exports.list = (req, res) => { 
    Prestacion.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

