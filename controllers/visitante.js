const { response, request } = require('express');
const visitante = require('../models/visitante');
// const trabajador = require('../models/trabajador');
const bcryptjs = require('bcryptjs');



const visitanteGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
   

    const [ total, visitantes ] = await Promise.all([
        visitante.countDocuments(),
        visitante.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        visitantes

    });
}

const visitantePost = async(req, res = response) => {
    
    const { nombre, apellido, CI, Institucion, visitado,hora_entrada, hora_salida } = req.body;

    const visitantebd = await visitante.findOne({ CI })


    if (visitantebd) {
        return res.status(400).json({ msg: `ya existe un visitante con CI ${CI}  masca bola` })
     }
    
    const visitantes = new visitante({ nombre, apellido, CI, Institucion, visitado,hora_entrada, hora_salida});

   
    // Guardar en BD
    await visitantes.save();

    res.json({
        visitantes
    });
}

const visitantePut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

   

    const visitantes = await visitante.findByIdAndUpdate( id, resto );

    res.json(visitantes);
}


const visitanteDelete = async(req, res = response) => {

    const { id } = req.params;
    const visitantes = await visitante.findByIdAndDelete( id );

    
    res.json(visitantes);
}




module.exports = {
    visitanteGet,
    visitantePost,
    visitantePut,
    visitanteDelete,
}