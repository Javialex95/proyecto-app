// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController')
const { check } = require('express-validator')

// crea un usuario
//  api/usuarios. Es decir, no necesito colocar todo path ya que lo sabe
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es muy corto').isLength({min: 3}),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;
