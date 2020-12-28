const Equipo = require('../models/equipo')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.equipoById = (req, res, next, id) => {
    Equipo.findById(id).exec((err, equipo) => {
        if(err || !equipo) {
            return res.status(400).json({
                error: "Equipo no existe"
            })
        }
        req.equipo = equipo
        next()
    })
 }

exports.create = (req, res) => { 
    const equipo = new Equipo(req.body)
    equipo.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    return res.json(req.equipo)
}

exports.update = (req, res) => { 
    const equipo = req.equipo
    equipo.prestacion = req.body.prestacion
    equipo.labores = req.body.labores
    equipo.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => { 
    const equipo = req.equipo
    equipo.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "equipo eliminado!"
        })
    })
}

exports.list = (req, res) => { 
    Equipo.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}



