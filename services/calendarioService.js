//const repositorioCalendario = require('../repositories/repositorioCalendario')
const repositorioCalendario = require('../repositories/repositorioCalendarioMongodb')




exports.getCalendariocompleto = async () => {
    try {
        console.log("service getCalendariocompleto ")
        let testdatos = await repositorioCalendario.getCalendariocompletorepository();
        return testdatos
    } catch (error) {
        console.log("ERROR getCalendariocompleto ")
        throw Error("error" + error)
    }
}

exports.getJulioCalendario = async () => {
    try {
        console.log("service getCalendariojulio ")
        let testdatos = await repositorioCalendario.getJulioCalendarioRepository();
        return testdatos
    } catch (error) {
        console.log("ERROR getCalendariojulio ")
        throw Error("error" + error)
    }

}

exports.getagostoCalendario = async () => {
    try {
        console.log("service getCalendarioagosto ")
        let testdatos = await repositorioCalendario.getagostoCalendarioRepository();
        return testdatos
    } catch (error) {
        console.log("ERROR getCalendarioagosto ")
        throw Error("error" + error)
    }
}



exports.createActividadAgosto = async (actividadNueva) => {
    try {
        console.log("SERVICE")
    return await repositorioCalendario.createActividadAgostoRepository(actividadNueva);
    } catch (error) {
         console.log("ERROR createActividadAgosto ")
        throw Error("error en service  " + error)
    }
    
};

exports.createActividadJulio = async (actividadNueva) => {
    try {
        console.log("SERVICE")
    return await repositorioCalendario.createActividadJulioRepository(actividadNueva);
    } catch (error) {
         console.log("ERROR createActividadjulio ")
        throw Error("error en service  " + error)
    }   
};

//julio actualizado
exports.updateActividadJulio = async (id, actividadActualizada) => {
    try {
        console.log("SERVICE");
        const resultado = await repositorioCalendario.updateActividadJulioRepository(id, actividadActualizada);
        return resultado;
    } catch (error) {
        console.log("ERROR updateActividadJulio");
        throw new Error("error en service  " + error);
    }
};

//agosto actualizado
exports.updateActividadAgosto = async (id, actividadActualizada) => {
    try {
        console.log("SERVICE");
        const resultado = await repositorioCalendario.updateActividadAgostoRepository(id, actividadActualizada);
        return resultado;
    } catch (error) {
        console.log("ERROR updateActividadAgosto");
        throw new Error("error en service  " + error);
    }
};


// delete julio

exports.deleteActividadJulioLService = async (id) => {
    try {
        console.log(`SERVICE - deleteFrontendLanguage - id:${id}`)
        return await repositorioCalendario.deleteActividadJulioRepositor(id)
    } catch (error) {
        console.log("Error en deleteFrontendLanguage  - " + error)
        throw Error("Error en el service: " + error)
    }
}
exports.deleteActividadAgostoLService = async (id) => {
    try {
        console.log(`SERVICE - deleteFrontendLanguage - id:${id}`)
        return await repositorioCalendario.deleteActividadAgostoRepository(id)
    } catch (error) {
        console.log("Error en deleteFrontendLanguage  - " + error)
        throw Error("Error en el service: " + error)
    }
}


exports.obtenerAlertas = async () => {
    try {
        const alertas = await repositorioCalendario.obtenerAlertasRepository();
        return alertas;
    } catch (error) {
        throw new Error(error.message);
    }
};




