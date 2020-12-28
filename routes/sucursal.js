const express = require('express')
const router = express.Router()

const {
    create,
    sucursalById,
    read,
    update,
    remove,
    list
} = require('../controllers/sucursal')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')


/* routes */
router.get('/sucursal/:sucursalId', read)
router.get('/sucursales', list)
router.post('/sucursal/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    create
)
router.put('/sucursal/:sucursalId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    update
)
router.delete('/sucursal/:sucursalId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    remove
)

/* params */

router.param("sucursalId", sucursalById)
router.param("usuarioId", usuarioById)

module.exports = router