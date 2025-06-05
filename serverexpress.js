const express = require ('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const fs = require('node:fs')
const {Apicalendario} = require ('./src/ApiProyecto')


const HOME = fs.readFileSync('./index.html')
//const GRUPO = fs.readFileSync('./grupo.html')


app.get('/', function (req, res) {
    res.send('<h1>HOLA MUNDO </h1>')
})


app.get('/grupo', function (req, res) {
    res.send('<h1>HOLA grupo de trabajo final</h1>')
})

app.get('/api/calendario', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.status(200)
    res.send(JSON.stringify(Apicalendario))
    //res.send(JSON.stringify(Apicalendario))
})

app.listen (PORT, HOSTNAME, () =>{

    console.log(`El servidor EXPRESS esta corriendo en HTTP://${HOSTNAME}:${PORT}/`)
});