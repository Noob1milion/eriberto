const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const  trabajador   = require('../models/trabajador');
const  visitante   = require('../models/visitante');


const coleccionesPermitidas = [
    'trabajador',
    'visitante',
    
];

const buscarvisitante = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const Visitante = await visitante.findById(termino);
        return res.json({
            results: ( Visitante ) ? [ Visitante ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const visitantes = await visitante.find({
        $or:[{nombre:regex},{apellido:regex},{CI:regex}]
    });

    res.json({
        results: visitantes
    });

}

const buscartrabajador = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const Trabajador = await trabajador.findById(termino);
        return res.json({
            results: ( Trabajador ) ? [ Trabajador ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    
    
    
    const Trabajadores = await trabajador.find({
        $or:[{nombre:regex},{apellido:regex},{CI:regex}]
    });

    res.json({
        results: Trabajadores
    });

}




const buscar = ( req, res = response ) => {
    
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'visitante':
            buscarvisitante(termino, res);
        break;
        case 'trabajador':
            buscartrabajador(termino, res);
        break;
        

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}



module.exports = {
    buscar
}