const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const equipoSchema = new mongoose.Schema(
    {
        prestacion: {
            type: ObjectId,
            ref: "Prestacion",
            required: true,
        },
        labores: [{
            type: ObjectId,
            ref: "Labor",
            required: true,
        }]

    },
    { timestamps: true }
)


module.exports = mongoose.model("Equipo", equipoSchema)