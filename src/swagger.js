const swaggerAutogen = require("swagger-autogen")

const outputFile = './swagger_output.json'
const endPointsFiles = ['./routes/denuncias.js']

swaggerAutogen(outputFile, endPointsFiles).then(() =>{
    require('./server.js')
})