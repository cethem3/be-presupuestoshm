const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const profesionalSchema = new mongoose.Schema(
    {
        rut: {
            type: String,
            trim: true,
            required: true,
            maxLength: 10,
            minLength: 9,
            unique: true,
        },
        nombre: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        sucursal: {
            type: ObjectId,
            ref: "Sucursal",
            required: true,
        },
        estado: {
            type: Number,
            default: 1
        },
    },
    { timestamps: true }
)


module.exports = mongoose.model("Profesional", profesionalSchema)