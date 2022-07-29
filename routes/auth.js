const {Router, response} = require('express');
const { check } = require('express-validator');
const { CrearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//Crear usuario
router.post('/new', [
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    check('name', 'Se requiere un nombre').not().isEmpty(),
    validarCampos
], 
CrearUsuario);

//Login de usuario
router.post('/', [
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], 
loginUsuario);


//Re validar token
router.get('/renew', [
    validarJWT
], revalidarToken);

module.exports = router;