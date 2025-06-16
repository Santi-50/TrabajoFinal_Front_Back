const express = require('express')

const routerCalendario = express.Router();

routerCalendario.use(express.json());

const Calendariocopntroller = require('../controller/calendarioController')

routerCalendario.get('/', Calendariocopntroller.readcalendario)
routerCalendario.get('/julio', Calendariocopntroller.readcalendariojulio)
routerCalendario.get('/agosto', Calendariocopntroller.readcalendarioAgosto)
routerCalendario.post('/agosto', Calendariocopntroller.createActividadagosto)
routerCalendario.post('/julio', Calendariocopntroller.createActividadjulio)
routerCalendario.patch('/julio/:dia', Calendariocopntroller.updateActividadJulio)


module.exports = routerCalendario;