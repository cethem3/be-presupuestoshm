const Sucursal = require('../models/sucursal')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.sucursalById = (req, res, next, id) => {
    Sucursal.findById(id).exec((err, sucursal) => {
        if(err || !sucursal) {
            return res.status(400).json({
                error: "Sucursal no existe"
            })
        }
        req.sucursal = sucursal
        next()
    })
 }

exports.create = (req, res) => { 
    const sucursal = new Sucursal(req.body)
    sucursal.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    
    return res.json(req.sucursal)
}

exports.update = (req, res) => { 
    const sucursal = req.sucursal
    sucursal.nombre = req.body.nombre
    sucursal.direccion = req.body.direccion
    sucursal.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => { 
    const sucursal = req.sucursal
    sucursal.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "sucursal eliminada!"
        })
    })
}

exports.list = (req, res) => { 
    Sucursal.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

