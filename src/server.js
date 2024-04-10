const express = require("express");
const denunciasRouter = require('./routes/denuncias')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/denuncias', denunciasRouter)

app.listen(3333, 
    () => console.log('🚀 Servidor ligado http://localhost:3333'))

