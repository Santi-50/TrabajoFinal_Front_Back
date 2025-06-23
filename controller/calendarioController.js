const calendarioService = require('../services/calendarioService');

// LEE CALENDARIO COMPLETO
exports.readcalendario = async (req, res) => {
    try {
        console.log("Entrando al controller - readcalendario");
        res.setHeader('Content-Type', 'application/json');
        const datos = await calendarioService.getCalendariocompleto();
        res.status(200).json(datos);
    } catch (error) {
        console.error("Error en readcalendario:", error);
        res.status(500).send("Error interno en el servidor");
    }
};

// LEE JULIO
exports.readcalendariojulio = async (req, res) => {
    try {
        console.log("Entrando al controller - readcalendariojulio");
        res.setHeader('Content-Type', 'application/json');
        const datos = await calendarioService.getJulioCalendario();
        res.status(200).json(datos);
    } catch (error) {
        console.error("Error en readcalendariojulio:", error);
        res.status(500).send("Error interno en el servidor");
    }
};

// LEE AGOSTO
exports.readcalendarioAgosto = async (req, res) => {
    try {
        console.log("Entrando al controller - readcalendarioAgosto");
        res.setHeader('Content-Type', 'application/json');
        const datos = await calendarioService.getagostoCalendario();
        res.status(200).json(datos);
    } catch (error) {
        console.error("Error en readcalendarioAgosto:", error);
        res.status(500).send("Error interno en el servidor");
    }
};

// POST JULIO
exports.createActividadjulio = async (req, res) => {
    try {
        console.log("Entrando al controller - createActividadjulio");
        res.setHeader('Content-Type', 'application/json');
        const actividadNueva = req.body;
        const resultado = await calendarioService.createActividadJulio(actividadNueva);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error en createActividadjulio:", error);
        res.status(500).send("Error al crear la actividad: " + error.message);
    }
};

// POST AGOSTO
exports.createActividadagosto = async (req, res) => {
    try {
        console.log("Entrando al controller - createActividadagosto");
        res.setHeader('Content-Type', 'application/json');
        const actividadNueva = req.body;
        const resultado = await calendarioService.createActividadAgosto(actividadNueva);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error en createActividadagosto:", error);
        res.status(500).send("Error al crear la actividad: " + error.message);
    }
};

// PATCH JULIO
exports.updateActividadJulio = async (req, res) => {
    try {
        console.log("Entrando al controller - updateActividadJulio");
        const diaNum = parseInt(req.params.dia, 10);
        const actividadActualizada = req.body;
        const resultado = await calendarioService.updateActividadJulio(diaNum, actividadActualizada);

        if (!resultado) {
            return res.status(404).send(`No se encuentra la actividad con el día: ${diaNum}`);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en updateActividadJulio:", error);
        res.status(500).send("Error interno al actualizar la actividad");
    }
};

// PATCH AGOSTO
exports.updateActividadAgosto = async (req, res) => {
    try {
        console.log("Entrando al controller - updateActividadAgosto");
        const diaNum = parseInt(req.params.dia, 10);
        const actividadActualizada = req.body;
        const resultado = await calendarioService.updateActividadAgosto(diaNum, actividadActualizada);

        if (!resultado) {
            return res.status(404).send(`No se encuentra la actividad con el día: ${diaNum}`);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en updateActividadAgosto:", error);
        res.status(500).send("Error interno al actualizar la actividad");
    }
};

// DELETE JULIO
exports.deleteActividadJulioController = async (req, res) => {
    try {
        const dia = parseInt(req.params.dia, 10);
        const resultado = await calendarioService.deleteActividadJulioLService(dia);

        if (!resultado) {
            return res.status(404).send(`No se encuentra la actividad con el día: ${dia}`);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en deleteActividadJulioController:", error);
        res.status(500).send("Error al eliminar la actividad");
    }
};

// DELETE AGOSTO
exports.deleteActividadAgostoController = async (req, res) => {
    try {
        const dia = parseInt(req.params.dia, 10);
        const resultado = await calendarioService.deleteActividadAgostoLService(dia);

        if (!resultado) {
            return res.status(404).send(`No se encuentra la actividad con el día: ${dia}`);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en deleteActividadAgostoController:", error);
        res.status(500).send("Error al eliminar la actividad");
    }
};

// OBTENER ALERTAS
exports.obtenerAlertas = async (req, res) => {
    try {
        const alertas = await calendarioService.obtenerAlertas();
        res.status(200).json(alertas);
    } catch (error) {
        console.error("Error en obtenerAlertas:", error);
        res.status(500).json({ error: error.message });
    }
};
