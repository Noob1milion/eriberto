const { Schema, model } = require('mongoose');


const ReporteSchema = Schema({
    // Hora_entrada: {
    //     type: Date,
    //     format: "HH:MM:SS",
    //     required:true
       

    // },
    // Hora_salida: {
    //     type: Date,
    //     required:true

    // },
    fechaReporte:{
        type:String
    },


    nombre:{
        type: String,
            
            required:true
    },

    apellido:{
        type: String,
            
            required:true
    },

    CI:{
        type: String,
            
            required:true
    },
   

});


module.exports = model( 'Reporte', ReporteSchema );