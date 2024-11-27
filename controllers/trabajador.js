const { response, request } = require('express');
const trabajador = require('../models/trabajador');
const bcryptjs = require('bcryptjs');
const logger = require('../helpers/logger');



const crearTrabajador = async (req = request, res = response) => {

    const { CI, password,username, ...body } = req.body

    const Trabajadordb = await trabajador.findOne({ CI })
    const Trabajadoruser = await trabajador.findOne({ username })

    if (Trabajadordb) {
        return res.status(400).json({ msg: `ya existe un trabajador con CI ${CI}  masca bola` })
        
     }

     if (Trabajadoruser) {
        return res.status(400).json({ msg: `ya existe un trabajador con username ${username}  masca bola` })
       
    }

    
     if (password) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt)
        
    }
    
    
    
    
    const data = {
        ...body,
        password:body.password,
        cargo: body.cargo.toUpperCase(),
        CI,
        username
    }

    
    const Trabajador = new trabajador(data)
    await Trabajador.save()

    
    
    res.status(201).json({
        msg: "trabajador creado correctamente",
        Trabajador
    })

   


}



const trabajadorGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
   

    const [ total, trabajadores ] = await Promise.all([
        trabajador.countDocuments(),
        trabajador.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        trabajadores

    });
}


const trabajadorPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id,password, ...resto } = req.body;

   

    const trabajadores = await trabajador.findByIdAndUpdate( id, resto );

    res.json(trabajadores);
}


const trabajadorDelete = async(req, res = response) => {

    const { id } = req.params;
    const trabajadores = await trabajador.findByIdAndDelete( id );

    
    res.json(trabajadores);
}

module.exports = {
    trabajadorGet,
    crearTrabajador,
    trabajadorPut,
    trabajadorDelete
}