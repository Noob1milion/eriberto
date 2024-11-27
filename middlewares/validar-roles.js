const { response } = require('express')


const esAdminRole = ( req, res = response, next ) => {

    
    
    if ( !req.trabajador ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el cargo sin validar el token primero'
        });
    }

    const { cargo, nombre } = req.trabajador;
    
    if ( cargo !== 'ADMIN'  ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        

        
        
        if ( !req.Trabajador ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.Trabajador.cargo ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRole
}