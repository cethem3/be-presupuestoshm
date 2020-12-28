const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const { ObjectId } = mongoose.Schema

const usuarioSchema = new mongoose.Schema(
    {
        rut: {
            type: String,
            trim: true,
            required: true,
            maxLength: 11,
            minLength: 10,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true,
        },
        nombre: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        telefono: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,

        },
        salt: String,
        rol: {
            type: Number,
            default: 0
        },
        estado: {
            type: Number,
            default: 1
        },
    },
    { timestamps: true }
)

// virtual field
usuarioSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// schemas methods
usuarioSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("Usuario", usuarioSchema)