const { Schema, model } = require('mongoose');
const {Timestamp} = require('mongodb')


const trabajadorSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: false
        
    },
    apellido: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    CI: {
        type: String,
        
        unique: true,
        maxlength: 11,
    },
    expediente_laboral: {
        type: String,
        required: true,
       
    },
    direccion: {
        type: String,
        required: true,
        
    },
    cargo: {
        type: String,
        required: true,
    
    },
    num_oficina:{
        type:Number,
        required:true,
    },
   
    password: {
        type: String,
       
        
    },
    username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique:true

    },
   
    Hora_entrada: {
        type: Date,
       
       

    },
    Hora_salida: {
        type: Date,
       

    },


});

trabajadorSchema.methods.toJSON = function() {
    const { __v, _id, ...trabajador  } = this.toObject();
    trabajador.uid = _id;
    return trabajador;
}

module.exports = model( 'Trabajador', trabajadorSchema );
