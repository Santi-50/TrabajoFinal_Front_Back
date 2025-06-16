const calendarioService = require('../services/calendarioService')

//LEE CALENDARIO
exports.readcalendario = async (req, res) => {
    try {
        console.log("entrando al controller")
        res.setHeader('Content-type', 'application/json')
        res.status(200)
        res.send(await calendarioService.getCalendariocompleto())
    } catch (error) {
        console.log("error en readcalendario" + error)
    }
}

//LEE JULIO
exports.readcalendariojulio = async (req, res) => {
    try {
        console.log("entrando al controller julio")
    res.setHeader('Content-type', 'application/json')
    res.status(200)
    res.send(await calendarioService.getJulioCalendario()) 
    } catch (error) {
        console.log("error en readcalendario" + error)
    }  
}

//LEE AGOSTO
exports.readcalendarioAgosto = async (req, res) => {
    try {
        console.log("entrando al controller agosto")
    res.setHeader('Content-type', 'application/json')
    res.status(200)
    res.send(await calendarioService.getagostoCalendario())
    } catch (error) {
        console.log("error en readcalendario" + error)
    } 
}

//POST JULIO
exports.createActividadjulio = async (req, res) => {
  try {
    console.log("entrando al controller CREATE julio");
    res.setHeader('Content-type', 'application/json')
    const actividadNueva = req.body;
    const resultado = await calendarioService.createActividadJulio(actividadNueva);
    res.status(201).json(resultado);

  } catch (error) {
    console.log("ERROR " + error);
    res.status(500).send("Error al crear la actividad: " + error.message);
  }
};


//POST AGOSTO
exports.createActividadagosto = async (req, res) => {
    try {
        console.log("entrando al controller CREATE agosto")
        res.setHeader('Content-type', 'application/json')
        const actividadNueva = req.body;

        const resultado = await calendarioService.createActividadAgosto(actividadNueva);
        res.status(201).json(resultado);
        
    } catch (error) {
        console.log("ERROR " + error)
        res.status(500).send("Error al crear la actividad: " + error.message);
    }
}


//PATCH JULIO machea lo que pasamos y los que hay y modifica solo lo que es diferente
exports.updateActividadJulio = async (req, res) => {
  try {
    console.log("Entrando a update julio");

    const diaNum = parseInt(req.params.dia, 10); 
    const actividadActualizada = req.body;

    console.log("Día recibido:", diaNum);
    console.log("Datos a actualizar:", actividadActualizada);

    const resultado = await calendarioService.updateActividadJulio(diaNum, actividadActualizada);

    if (!resultado || resultado.length === 0) {
      return res.status(404).send("No se encuentra la actividad con el día: " + diaNum);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(resultado);
  } catch (error) {
    console.log("ERROR en updateActividadJulio:", error);
    res.status(500).send("Error interno al actualizar la actividad");
  }
};