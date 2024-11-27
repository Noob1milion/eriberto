const { Schema, model } = require('mongoose');

const visitanteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    apellido: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    CI: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 11,
    },
    Institucion: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    visitado: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },

    hora_entrada: {
        type: String,
        required: true,

        default: Date.now,
    },
    hora_salida: {
        type: String,
        required: true,
    },
});



module.exports = model('Visitante', visitanteSchema);