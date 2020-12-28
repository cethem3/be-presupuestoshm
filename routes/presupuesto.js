const express = require('express')
const router = express.Router()

const {
    create,
    presupuestoById,
    read,
    nullify,
    list
} = require('../controllers/presupuesto')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { usuarioById } = require('../controllers/usuario')


/* routes */


/**
 * @swagger
 * 
 * /api/presupuesto/{presupuestoId}:
 *  get:
 *      summary: Obtener presupuesto
 *      description: Obtiene presupuesto por su ID
 *      parameters:
 *      - in: path
 *        name: presupuestoId
 *        description: ID presupuesto
 *        type: string
 *      responses:
 *          "200":
 *              description: OK
 *          "400":
 *              description: ERROR
 */
router.get('/presupuesto/:presupuestoId', read)


/**
 * @swagger
 * 
 * /api/presupuestos:
 *  get:
 *      summary: Listado de presupuestos generados
 *      description: Obtiene lista de presupuestos generados en BD
 *      responses:
 *          "200":
 *              description: OK
 */
router.get('/presupuestos', list)

/**
 * @swagger
 * 
 * /api/presupuesto/crear/{usuarioId}:
 *  post:
 *      summary: Crea un presupuesto
 *      description: Crea un presupuesto
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
 *                          paciente:
 *                              type: object
 *                              description: información del paciente
 *                              properties: 
 *                                  rut:
 *                                      type: string
 *                                  nombre:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  telefonos:
 *                                      type: array
 *                                      items: 
 *                                          type: array
 *                                  prevision:
 *                                      type: string
 *                                      descripcion: ID de previsión
 *                          profesional:
 *                              type: string
 *                              description: ID profesional
 *                          sucursal:
 *                              type: string
 *                              description: ID sucursal
 *                          intervenciones:
 *                              type: array
 *                              descripcion: array de IDs de equipos médicos
 *                              items:
 *                                  type: string
 *                                  descripcion: ID de equipos médicos
 *                          observaciones:
 *                              type: string
 *      responses:
 *          "200":
 *              description: OK 
 *          "400":
 *              description: ERROR
 */
router.post('/presupuesto/crear/:usuarioId', 
    requireSignIn, 
    isAuth, 
    create
)

/**
 * @swagger
 * 
 * /api/presupuesto/anular/{presupuestoId}/{usuarioId}:
 *  put:
 *      summary: Anula un presupuesto
 *      description: anula un presupuesto (estado=false)
 *      parameters:
 *      - in: path
 *        name: presupuestoId
 *        description: ID presupuesto
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