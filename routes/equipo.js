const express = require('express')
const router = express.Router()

const {
    create,
    equipoById,
    read,
    update,
    remove,
    list
} = require('../controllers/equipo')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')


/* routes */
router.get('/equipo/:equipoId', read)
router.get('/equipos', list)
router.post('/equipo/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    create
)
router.put('/equipo/:equipoId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    update
)
router.delete('/equipo/:equipoId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    remove
)

/* params */

router.param("equipoId", equipoById)
router.param("usuarioId", usuarioById)

module.exports = router