const mongoose = require('mongoose')

const previsionSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Prevision", previsionSchema)