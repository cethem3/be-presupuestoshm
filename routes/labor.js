const express = require('express')
const router = express.Router()

const {
    create,
    laborById,
    read,
    update,
    remove,
    list
} = require('../controllers/labor')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')


/* routes */
router.get('/labor/:laborId', read)
router.get('/labores', list)
router.post('/labor/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    create
)
router.put('/labor/:laborId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    update
)
router.delete('/labor/:laborId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    remove
)

/* params */

router.param("laborId", laborById)
router.param("usuarioId", usuarioById)

module.exports = router