const express = require('express')
const router = express.Router()

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { 
    usuarioById, 
    read, 
    update 
} = require('../controllers/usuario')

/* routes */

router.get('/secret/:usuarioId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({ 
        user: req.profile
    })
})
router.get('/usuario/:usuarioId', requireSignIn, isAuth, read)
router.put('/usuario/:usuarioId', requireSignIn, isAuth, update)

/* params */
router.param("usuarioId", usuarioById)

module.exports = router