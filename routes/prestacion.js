const express = require('express')
const router = express.Router()

const {
    create,
    prestacionById,
    read,
    update,
    remove,
    list
} = require('../controllers/prestacion')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')


/* routes */
router.get('/prestacion/:prestacionId', read)
router.get('/prestaciones', list)
router.post('/prestacion/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    create
)
router.put('/prestacion/:prestacionId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    update
)
router.delete('/prestacion/:prestacionId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    remove
)

/* params */

router.param("prestacionId", prestacionById)
router.param("usuarioId", usuarioById)

module.exports = router