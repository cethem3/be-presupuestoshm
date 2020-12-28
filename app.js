// generic imports
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerExpressUi = require('swagger-ui-express')

// import routes 
const authRoutes = require('./routes/auth')
const usuarioRoutes = require('./routes/usuario')
const sucursalRoutes = require('./routes/sucursal')
const laborRoutes = require('./routes/labor')
const equipoRoutes = require('./routes/equipo')
const profesionalRoutes = require('./routes/profesional')
const prestacionRoutes = require('./routes/prestacion')
const previsionRoutes = require('./routes/prevision')
const presupuestoRoutes = require('./routes/presupuesto')

// app - express
const app = express()

// db
const db = async () => {
    try{
        const success = await mongoose.connect(
            process.env.DATABASE, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
        )
        console.log('DB Connected')
    } catch(e) {
        console.error('DB Connection ERROR', e)
    }
}

// execute db connection
db()

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// routes middlewares
app.use("/api", authRoutes)
app.use("/api", usuarioRoutes)
app.use("/api", sucursalRoutes)
app.use("/api", laborRoutes)
app.use("/api", profesionalRoutes)
app.use("/api", prestacionRoutes)
app.use("/api", previsionRoutes)
app.use("/api", equipoRoutes)
app.use("/api", presupuestoRoutes)

// port
const port = process.env.PORT || 8001

// listen port
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
})