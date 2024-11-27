const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const trabajador = require('../models/trabajador');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const Trabajador = await trabajador.findById( id );

        if( !Trabajador ) {
            return res.status(401).json({
                msg: 'Token no válido - trabajador no existe DB'
            })
        }

       
        
        
        req.Trabajador = Trabajador;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}