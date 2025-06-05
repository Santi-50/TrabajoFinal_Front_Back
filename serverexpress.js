const express = require ('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

app.get('/', function (req, res) {
    res.send('<h1>HOLA MUNDO </h1>')
})

app.get('/grupo', function (req, res) {
    res.send('<h1>HOLA grupo de trabajo final</h1>')
})

app.listen (PORT, HOSTNAME, () =>{

    console.log(`El servidor EXPRESS esta corriendo en HTTP://${HOSTNAME}:${PORT}/`)
});