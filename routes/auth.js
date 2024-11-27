
const { Router } = require('express');
const {check} = require('express-validator');


const { login } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('username','username is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
    validarCampos
],login);

module.exports = router