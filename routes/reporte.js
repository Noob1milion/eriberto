const {Router}= require('express');
const {check} = require('express-validator');
const { crearReporte } = require('../controllers/reporte');
const { validarJWT } = require('../middlewares');


const router = Router();

router.post('/:CI',[
    validarJWT,

],crearReporte)


module.exports = router
