const mongoose = require('mongoose')

const sucursalSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        direccion: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Sucursal", sucursalSchema)