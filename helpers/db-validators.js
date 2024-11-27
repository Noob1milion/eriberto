
const cargo = require('../models/cargo');
const visitante = require('../models/visitante');

const esCargoValido = async(cargo = '') => {

    const existeCargo = await cargo.findOne({ cargo });
    if ( !existeCargo ) {
        throw new Error(`El Cargo ${ cargo } no está registrado en la BD`);
    }
}



const existevisitantePorId = async( id ) => {

    // Verificar si el correo existe
    const existevisitante = await visitante.findById(id);
    if ( !existevisitante ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    esCargoValido,
    
    existevisitantePorId,
    coleccionesPermitidas
}

