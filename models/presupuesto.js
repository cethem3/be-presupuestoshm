const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { ObjectId } = mongoose.Schema


const intervencionSchema = new mongoose.Schema(
    {
        codigo: String,
        valores: [ {
            labor: String, 
            valor: Number
        } ]
    }
)


const pacienteSchema = new mongoose.Schema(
    {
        rut: {
            type: String,
            trim: true,
            required: true,
        },
        nombre: String,
        telefonos: [String],
        email: String,
        prevision: { 
            type: ObjectId, 
            ref: "Prevision",
            required: true
        },
    }
)

const presupuestoSchema = new mongoose.Schema(
    {
        paciente: pacienteSchema,
        sucursal: {
            type: ObjectId,
            ref: "Sucursal",
            required: true,
        },
        profesional: {
            type: ObjectId,
            ref: "Profesional",
            required: true,
        },
        intervenciones: [intervencionSchema],
        observaciones: String,
        estado: {type: Boolean, default: true }

    },
    { timestamps: true }
)

presupuestoSchema.plugin(AutoIncrement, {inc_field: 'folio'});

module.exports = mongoose.model("Presupuesto", presupuestoSchema)
