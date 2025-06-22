const express = require ('express')
const cors = require('cors'); 

const app = express();

app.use(cors());

const HOSTNAME = '127.0.0.1';
const PORT = 3000;


const { getMongoDBConnection } = require('./database/conexion');

getMongoDBConnection();

const fs = require('node:fs')
const {Apicalendario} = require ('./src/ApiProyecto')

const routerCalendario = require('./Routers/RouterCalendario');

//router
app.use('/api/calendario', routerCalendario)

//otros metodos http
app.get('/', function (req, res) {
    res.send('<h1>HOLA MUNDO </h1>')
})

app.get('/grupo', function (req, res) {
    res.send('<h1>HOLA grupo de trabajo final</h1>')
})

app.get('/{*any}', (req, res) => {
    res.setHeader('Content-type', 'text/plain')
    res.status(404)
    res.send("La ruta ingresada no existe")
})

app.listen(PORT, () => {
    console.log(`El servidor EXPRESS esta corriendo en http://localhost:${PORT}/`)
});
