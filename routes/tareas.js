// rutas para crear tareas
const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')


// crear tarea
//  api/tareas.
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
    ],
    tareaController.crearTarea
);

// obtener las tareas por proyecto
//  api/tareas.
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// actualizar tarea
//  api/tareas.
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

// eliminar tarea
//  api/tareas.
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;