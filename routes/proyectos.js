// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyectoController')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')

// crea proyectos
//  api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoController.crearProyecto
);

// obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

// actualiza proyecto via ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyecto
);

// actualiza proyecto via ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyecto
);
 
// eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;