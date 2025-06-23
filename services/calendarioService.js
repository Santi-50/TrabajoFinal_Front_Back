const repositorioCalendario = require('../repositories/repositorioCalendarioMongodb');

exports.getCalendariocompleto = async () => {
    try {
        console.log("service getCalendariocompleto");
        let testdatos = await repositorioCalendario.getCalendariocompletorepository();
        return testdatos;
    } catch (error) {
        console.log("ERROR getCalendariocompleto");
        throw Error("error " + error);
    }
}

exports.getJulioCalendario = async () => {
    try {
        console.log("service getCalendariojulio");
        let testdatos = await repositorioCalendario.getJulioCalendarioRepository();
        return testdatos;
    } catch (error) {
        console.log("ERROR getCalendariojulio");
        throw Error("error " + error);
    }
}

exports.getagostoCalendario = async () => {
    try {
        console.log("service getCalendarioagosto");
        let testdatos = await repositorioCalendario.getagostoCalendarioRepository();
        return testdatos;
    } catch (error) {
        console.log("ERROR getCalendarioagosto");
        throw Error("error " + error);
    }
}

exports.createActividadAgosto = async (actividadNueva) => {
    try {
        actividadNueva.mes = 8; 
        console.log("SERVICE createActividadAgosto");
        return await repositorioCalendario.createActividadAgostoRepository(actividadNueva);
    } catch (error) {
        console.log("ERROR createActividadAgosto");
        throw Error("error en service  " + error);
    }
};

exports.createActividadJulio = async (actividadNueva) => {
    try {
        actividadNueva.mes = 7; 
        console.log("SERVICE createActividadJulio");
        return await repositorioCalendario.createActividadJulioRepository(actividadNueva);
    } catch (error) {
        console.log("ERROR createActividadJulio");
        throw Error("error en service  " + error);
    }
};

// Para actualizar buscamos por dia y mes (ya que el repositorio así está hecho)
exports.updateActividadJulio = async (dia, actividadActualizada) => {
    try {
        console.log("SERVICE updateActividadJulio");
        
        actividadActualizada.mes = 7;
        const resultado = await repositorioCalendario.updateActividadJulioRepository(dia, actividadActualizada);
        return resultado;
    } catch (error) {
        console.log("ERROR updateActividadJulio");
        throw new Error("error en service  " + error);
    }
};

exports.updateActividadAgosto = async (dia, actividadActualizada) => {
    try {
        console.log("SERVICE updateActividadAgosto");
        actividadActualizada.mes = 8;
        const resultado = await repositorioCalendario.updateActividadAgostoRepository(dia, actividadActualizada);
        return resultado;
    } catch (error) {
        console.log("ERROR updateActividadAgosto");
        throw new Error("error en service  " + error);
    }
};

// Para eliminar también usamos dia y mes
exports.deleteActividadJulioLService = async (dia) => {
    try {
        console.log(`SERVICE deleteActividadJulio - dia: ${dia}`);
        return await repositorioCalendario.deleteActividadJulioRepository(dia);
    } catch (error) {
        console.log("Error en deleteActividadJulioLService - " + error);
        throw Error("Error en el service: " + error);
    }
}

exports.deleteActividadAgostoLService = async (dia) => {
    try {
        console.log(`SERVICE deleteActividadAgosto - dia: ${dia}`);
        return await repositorioCalendario.deleteActividadAgostoRepository(dia);
    } catch (error) {
        console.log("Error en deleteActividadAgostoLService - " + error);
        throw Error("Error en el service: " + error);
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
