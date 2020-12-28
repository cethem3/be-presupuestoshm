const express = require('express')
const router = express.Router()

const {
    register,
    login,
    logout
} = require('../controllers/auth')

const { userSignupValidator } = require('../validator')

/* routes */

/**
 * @swagger
 * 
 * /api/register:
 *  post:
 *      summary: Registro de usuario
 *      description: Solicitud de registro de usuario
 *      requestBody:
 *          content: 
 *              application/json:
 *                  schema:
 *                      properties:
 *                          rut:
 *                              type: string
 *                              description: rut válido
 *                          nombre:
 *                              type: string
 *                              description: nombre usuario
 *                          telefono:
 *                              type: string
 *                              description: telefono usuario (opcional)
 *                          email:
 *                              type: string
 *                              description: email usuario
 *                          password:
 *                              type: string
 *                              description: password válido
 *      responses:
 *          "200":
 *              description: OK
 *          "400":
 *              description: ERROR
 */
router.post('/register', userSignupValidator, register)

/**
 * @swagger
 * 
 * /api/login:
 *  post:
 *      summary: Login de usuario
 *      description: Solicitud de login de usuario
 *      requestBody:
 *          content: 
 *              application/json:
 *                  schema:
 *                      properties:
 *                          rut:
 *                              type: string
 *                              description: rut válido
 *                          password:
 *                              type: string
 *                              description: password válido
 *      responses:
 *          "200":
 *              description: OK
 *          "400":
 *              description: ERROR
 */
router.post('/login', login)

/**
 * @swagger
 * 
 * /api/logout:
 *  get:
 *      summary: Logout de usuario
 *      description: Solicitud logout del usuario
 *      responses:
 *          "200":
 *              description: OK
 */
router.get('/logout', logout)




module.exports = router

