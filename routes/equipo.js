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

/**
 * @swagger
 * 
 * /api/equipo/{equipoId}:
 *  get:
 *      summary: Obtener un equipo médico
 *      description: Obtiene un equipo médico por su ID
 *      parameters:
 *      - in: path
 *        name: equipoId
 *        description: ID equipo médico
 *        type: string
 *      responses:
 *          "200":
 *              description: OK
 *          "400":
 *              description: ERROR
 */
router.get('/equipo/:equipoId', read)

/**
 * @swagger
 * 
 * /api/equipos:
 *  get:
 *      summary: Listado de equipos médicos
 *      description: Obtiene lista de equipos médicos en BD
 *      responses:
 *          "200":
 *              description: OK
 */
router.get('/equipos', list)

/**
 * @swagger
 * 
 * /api/equipo/crear/{usuarioId}:
 *  post:
 *      summary: Crea un equipo médico
 *      description: Crea un equipo médico en BD
 *      parameters:
 *      - in: path
 *        name: usuarioId
 *        description: ID usuario
 *        type: string
 *      requestBody:
 *          content: 
 *              application/json:
 *                  schema:
 *                      properties:
 *                          prestacion:
 *                              type: string
 *                              description: ID prestación
 *                          labores:
 *                              type: array
 *                              description: array de IDs labores
 *                              items:
 *                                  type: string
 *                                  description: ID labor
 *      responses:
 *          "200":
 *              description: OK 
 *          "400":
 *              description: ERROR
 */
router.post('/equipo/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    create
)

/**
 * @swagger
 * 
 * /api/equipo/{equipoId}/{usuarioId}:
 *  put:
 *      summary: Crea un equipo médico
 *      description: Obtiene lista de equipos médicos en BD
 *      parameters:
 *      - in: path
 *        name: equipoId
 *        description: ID equipo médico
 *        type: string
 *      - in: path
 *        name: usuarioId
 *        description: ID usuario
 *        type: string
 *      requestBody:
 *          content: 
 *              application/json:
 *                  schema:
 *                      properties:
 *                          prestacion:
 *                              type: string
 *                              description: ID prestación
 *                          labores:
 *                              type: array
 *                              description: array de IDs labores
 *                              items:
 *                                  type: string
 *                                  description: ID labor
 *      responses:
 *          "200":
 *              description: OK 
 *          "400":
 *              description: ERROR
 */
router.put('/equipo/:equipoId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    update
)

/**
 * @swagger
 * 
 * /api/equipo/{equipoId}/{usuarioId}:
 *  delete:
 *      summary: Elimina un equipo médico
 *      description: Elimina un equipo médico por su ID
 *      parameters:
 *      - in: path
 *        name: equipoId
 *        description: ID equipo médico
 *        type: string
 *      - in: path
 *        name: usuarioId
 *        description: ID usuario
 *        type: string
 *      responses:
 *          "200":
 *              description: OK 
 *          "400":
 *              description: ERROR
 */
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