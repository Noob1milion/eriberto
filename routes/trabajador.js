const {Router} = require('express')
const {check} = require('express-validator')
const { trabajadorGet, crearTrabajador, trabajadorPut, trabajadorDelete } = require('../controllers/trabajador')
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index')
const {  existevisitantePorId } = require('../helpers/db-validators');


const router = Router()


router.get('/:param',trabajadorGet)


router.post('/',[
    validarJWT,
    tieneRole("ADMIN","RECEPCIONISTA"),
    check('nombre', ' El nombre es obligatorio').not().isEmpty().isString(),
    check('apellido', ' El apellido es obligatorio').not().isEmpty().isString(),
    check('CI', ' El CI es obligatorio').not().isEmpty().isString(),
    check('expediente_laboral', ' El expediente_laboral es obligatorio').not().isEmpty().isNumeric(),
    check('direccion', ' La direccion es obligatoria').not().isEmpty().isString(),
    check('cargo', ' El cargo es obligatorio').not().isEmpty(),
    check('num_oficina', ' El num_oficina es obligatorio').not().isEmpty().isNumeric(),
    validarCampos
    
], crearTrabajador)



router.put('/:id',[
    validarJWT,
    tieneRole('ADMIN' , 'RECEPCIONISTA'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existevisitantePorId ),

],trabajadorPut)


router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN' , 'RECEPCIONISTA'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existevisitantePorId ),
],trabajadorDelete)




module.exports = router