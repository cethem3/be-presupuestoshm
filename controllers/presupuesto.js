const Presupuesto = require('../models/presupuesto')
const Equipo = require('../models/equipo')
const { errorHandler } = require('../helpers/dbErrorHandler')

// middlewares rest

exports.presupuestoById = (req, res, next, id) => {
    Presupuesto.findById(id).exec((err, presupuesto) => {
        if(err || !presupuesto) {
            return res.status(400).json({
                error: "Presupuesto no existe"
            })
        }
        req.presupuesto = presupuesto
        next()
    })
 }

exports.create = async (req, res) => { 
    const presupuesto = new Presupuesto(req.body)
    const intervencionesEquipo = await Equipo
                        .find()
                        .where('_id')
                        .in(req.body.intervenciones)
                        .populate("labores prestacion")
                        .exec()
                        .then(data => {
                            let v = data.map(d => {
                                return {
                                    codigo: d.prestacion.codigo, 
                                    valores: d.labores.map(labor => { 
                                        return { 
                                            labor: labor.nombre, 
                                            valor: Math.round((labor.porcentaje/100)*d.prestacion.precio) 
                                        } 
                                    })
                                }
                            })
                            return v
                        })
    presupuesto.intervenciones = intervencionesEquipo
    res.json(presupuesto)
    
    
    presupuesto.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data )
    })
}

exports.read = (req, res) => { 
    return res.json(req.presupuesto)
}

exports.nullify = (req, res) => { 
    const presupuesto = req.presupuesto
    presupuesto.estado = false
    presupuesto.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "presupuesto anulado!"
        })
    })
}

exports.list = (req, res) => { 
    Presupuesto.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.listBySearch = (req, res) => { 
    Presupuesto.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}