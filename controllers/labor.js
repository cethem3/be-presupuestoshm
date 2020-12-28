const Labor = require('../models/labor')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.laborById = (req, res, next, id) => {
    Labor.findById(id).exec((err, labor) => {
        if(err || !labor) {
            return res.status(400).json({
                error: "Labor no existe"
            })
        }
        req.labor = labor
        next()
    })
 }

exports.create = (req, res) => { 
    const labor = new Labor(req.body)
    labor.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    
    return res.json(req.labor)
}

exports.update = (req, res) => { 
    const labor = req.labor
    labor.nombre = req.body.nombre
    labor.porcentaje = req.body.porcentaje
    labor.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => { 
    const labor = req.labor
    labor.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "labor eliminada!"
        })
    })
}

exports.list = (req, res) => { 
    Labor.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

