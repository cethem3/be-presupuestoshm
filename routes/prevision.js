const express = require('express')
const router = express.Router()

const {
    create,
    previsionById,
    read,
    update,
    remove,
    list
} = require('../controllers/prevision')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')

/* routes */
router.get('/prevision/:previsionId', read)
router.get('/previsiones', list)
router.post('/prevision/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin,
    create
)
router.put('/prevision/:previsionId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin,
    update
)
router.delete('/prevision/:previsionId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    remove
)

/* params */

router.param("previsionId", previsionById)
router.param("usuarioId", usuarioById)

module.exports = router