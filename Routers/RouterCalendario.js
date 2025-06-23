const express = require('express')

const routerCalendario = express.Router();

routerCalendario.use(express.json());

const Calendariocontroller = require('../controller/calendarioController')

routerCalendario.get('/', Calendariocontroller.readcalendario)
routerCalendario.get('/julio', Calendariocontroller.readcalendariojulio)
routerCalendario.get('/agosto', Calendariocontroller.readcalendarioAgosto)
routerCalendario.post('/agosto', Calendariocontroller.createActividadagosto)
routerCalendario.post('/julio', Calendariocontroller.createActividadjulio)
routerCalendario.patch('/julio/:dia', Calendariocontroller.updateActividadJulio)
routerCalendario.patch('/agosto/:dia', Calendariocontroller.updateActividadAgosto)
routerCalendario.get('/alertas', Calendariocontroller.obtenerAlertas)
routerCalendario.delete('/julio/:dia', Calendariocontroller.deleteActividadJulioController)
routerCalendario.delete('/agosto/:dia', Calendariocontroller.deleteActividadAgostoController)

module.exports = routerCalendario;
