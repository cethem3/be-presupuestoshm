const mongoose = require('mongoose')

const laborSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxlength: 32,
            unique: true
        },
        porcentaje: { 
            type: Number, 
            min: 1, 
            max: 100,
            required: true
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Labor", laborSchema)