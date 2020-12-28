const mongoose = require('mongoose')

const prestacionSchema = new mongoose.Schema(
    {
        codigo:  { 
            type: String, 
            min: 7, 
            max: 10,
            unique: true,
            required: true
        },
        glosa: String,
        precio: Number
    },
    { timestamps: true }
)


module.exports = mongoose.model("Prestacion", prestacionSchema)