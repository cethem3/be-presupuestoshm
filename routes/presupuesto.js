const express = require('express')
const router = express.Router()

const {
    create,
    presupuestoById,
    read,
    nullify,
    list,
    listBySearch
} = require('../controllers/presupuesto')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')


/* routes */
router.get('/presupuesto/:presupuestoId', read)
router.get('/presupuesto/by/search', listBySearch)
router.get('/presupuestos', list)
router.post('/presupuesto/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    create
)
router.put('/presupuesto/anular/:presupuestoId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    nullify
)

/* params */

router.param("presupuestoId", presupuestoById)
router.param("usuarioId", usuarioById)

module.exports = router