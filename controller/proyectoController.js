const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')


exports.crearProyecto = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer nombre del proyecto
    const { nombre } = req.body;


    try {
        let nombreProyecto = await Proyecto.findOne({ nombre });
        if (nombreProyecto) {
            return res.status(400).json({
                msg: 'El proyecto ya existe'
            })
        }

        // crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // guardar el creador
        proyecto.creador = req.usuario.id;

        // guardar el proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 })
        res.json({ proyectos })

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer nombre del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};


    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    // extraer información del proyecto
    try {

        let nombreProyecto = await Proyecto.findOne({ nombre });
        if (nombreProyecto) {
            return res.status(400).json({
                msg: 'El proyecto ya existe'
            })
        }

        // revisar el ID
        let proyecto = await Proyecto.findById(req.params.id)

        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(500).json({ msg: 'Proyecto no encontrado' })
        }

        // verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' })
        }

        // actualizar
        proyecto = await Proyecto.findOneAndUpdate({ _id: req.params.id },
            { $set: nuevoProyecto }, { new: true });

        res.json({ proyecto });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// eliminar un proyecto por id
exports.eliminarProyecto = async (req, res) => {
    try {
        // revisar el ID
        let proyecto = await Proyecto.findById(req.params.id)

        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(500).json({ msg: 'Proyecto no encontrado' })
        }

        // verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' })
        }

        // actualizar
        proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'Este proyecto fue eliminado', proyecto });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}