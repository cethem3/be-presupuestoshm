const express = require('express')
const router = express.Router()

const {
    create,
    profesionalById,
    read,
    update,
    remove,
    list
} = require('../controllers/profesional')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')
const { rutValidator } = require('../validator')

/* routes */
router.get('/profesional/:profesionalId', read)
router.get('/profesionales', list)
router.post('/profesional/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    rutValidator,
    create
)
router.put('/profesional/:profesionalId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    rutValidator,
    update
)
router.delete('/profesional/:profesionalId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    remove
)

/* params */

router.param("profesionalId", profesionalById)
router.param("usuarioId", usuarioById)

module.exports = router