const { Router } = require('express');
const {check} = require('express-validator');
const { visitanteGet, visitantePost, visitantePut, visitanteDelete } = require('../controllers/visitante');
const { validarCampos, validarJWT, tieneRole } = require('../middlewares');
const {  existevisitantePorId } = require('../helpers/db-validators');


const router = Router();


router.get('/', visitanteGet);



router.post('/',[
    validarJWT,
    tieneRole('ADMIN' , 'RECEPCIONISTA'),
    check('nombre', 'el nombre es obligatorio').notEmpty().isString(),
    check('apellido', 'el apellido es obligatorio').notEmpty().isString(),
    check('CI', 'el CI es obligatorio').notEmpty().isNumeric(),
    check('Institucion', 'el Institucion es obligatorio').notEmpty().isString(),
    check('visitado', 'el visitado es obligatorio').notEmpty().isString(),
    check('hora_entrada', 'el hora_entrada es obligatorio').notEmpty(),
    check('hora_salida', 'el hora_salida es obligatorio').notEmpty(),
    validarCampos
] ,visitantePost);




router.put('/:id',[
    validarJWT,
    tieneRole('ADMIN' , 'RECEPCIONISTA'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existevisitantePorId ),
    validarCampos
],visitantePut );



router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN' , 'RECEPCIONISTA'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existevisitantePorId ),
    validarCampos
],visitanteDelete);


module.exports = router;
