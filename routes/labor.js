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
/**
 * @swagger
 * 
 * /api/labor/{laborId}:
 *  get:
 *      summary: Obtener labor
 *      description: Obtiene labor por su ID
 *      parameters:
 *      - in: path
 *        name: laborId
 *        description: ID labor
 *        type: string
 *      responses:
 *          "200":
 *              description: OK
 *          "400":
 *              description: ERROR
 */
router.get('/labor/:laborId', read)

/**
 * @swagger
 * 
 * /api/labores:
 *  get:
 *      summary: Listado de labores
 *      description: Obtiene lista de labores en BD
 *      responses:
 *          "200":
 *              description: OK
 */
router.get('/labores', list)

/**
 * @swagger
 * 
 * /api/labor/crear/{usuarioId}:
 *  post:
 *      summary: Crea una labor médica
 *      description: Crea una labor BD
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
 *                          nombre:
 *                              type: string
 *                              description: Nombre de labor (ej. Primer Cirujano)
 *                              required: true
 *                          porcentaje:
 *                              type: number
 *                              description: porcentaje de valor respecto de la prestación
 *                              required: true
 *      responses:
 *          "200":
 *              description: OK 
 *          "400":
 *              description: ERROR
 */
router.post('/labor/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    isAdmin, 
    create
)

/**
 * @swagger
 * 
 * /api/labor/{laborId}/{usuarioId}:
 *  put:
 *      summary: Crea una labor médica
 *      description: Crea una labor BD
 *      parameters:
 *      - in: path
 *        name: laborId
 *        description: ID labor
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
 *                          nombre:
 *                              type: string
 *                              description: Nombre de labor (ej. Primer Cirujano)
 *                              required: true
 *                          porcentaje:
 *                              type: number
 *                              description: porcentaje de valor respecto de la prestación
 *                              required: true
 *      responses:
 *          "200":
 *              description: OK 
 *          "400":
 *              description: ERROR
 */
router.put('/labor/:laborId/:usuarioId',
    requireSignIn, 
    isAuth, 
    isAdmin, 
    update
)

/**
 * @swagger
 * 
 * /api/labor/{laborId}/{usuarioId}:
 *  delete:
 *      summary: Elimina una labor
 *      description: Elimina una labor por su ID
 *      parameters:
 *      - in: path
 *        name: laborId
 *        description: ID labor
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