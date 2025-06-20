const { Apicalendario } = require('../src/ApiProyecto');
const calendario = require('./model/calendario');
const { getMongoDBConnection } = require('../database/conexion');

getMongoDBConnection();

// GET: calendario completo
exports.getCalendariocompletorepository = async () => {
    try {
        console.log("REPOSITORIO getCalendariocompletorepository ");
        const datos = await calendario.find();
        console.table(datos);
        return datos;
    } catch (error) {
        console.log("error getCalendariocompletorepository: " + error);
        throw Error("error getCalendariocompletorepository: " + error);
    }
}

// GET: julio
exports.getJulioCalendarioRepository = async () => {
    try {
        console.log("REPOSITORIO getjulioalendariocompletorepository ");
        const datos = await calendario.find();
        console.table(datos);
        return datos;
    } catch (error) {
        console.log("error getjulioCalendariocompletorepository: " + error);
        throw Error("error " + error);
    }
}

// GET: agosto
exports.getagostoCalendarioRepository = async () => {
    try {
        console.log("REPOSITORIO getagostoalendariocompletorepository ");
        const datos = await calendario.find();
        console.table(datos);
        return datos;
    } catch (error) {
        console.log("error getagostoCalendariocompletorepository: " + error);
        throw Error("error " + error);
    }
}

// POST: crear actividad en agosto
exports.createActividadAgostoRepository = async (actividadNueva) => {
    try {
        const nuevaActividad = new calendario(actividadNueva);
        await nuevaActividad.save();
        console.log("creando actividad AGOSTO");
        return nuevaActividad;
    } catch (error) {
        console.log("error createActividadAgostoRepository: " + error);
        throw Error("error al crear la actividad: " + error);
    }
};

// POST: crear actividad en julio
exports.createActividadJulioRepository = async (actividadNueva) => {
    try {
        const nuevaActividad = new calendario(actividadNueva);
        await nuevaActividad.save();
        console.log("creando actividad JULIO");
        return nuevaActividad;
    } catch (error) {
        console.log("error createActividadJulioRepository: " + error);
        throw Error("error al crear la actividad: " + error);
    }
};

// PUT: actualizar actividad JULIO
exports.updateActividadJulioRepository = async (id, actividadActualizada) => {
    try {
        const actividadnueva = await calendario.findByIdAndUpdate(
            id,
            { $set: actividadActualizada },
            { new: true }
        );

        if (!actividadnueva) {
            return [];
        } else {
            return actividadnueva;
        }
    } catch (error) {
        console.log("error updateActividadJulioRepository: " + error);
        throw new Error("error al cambiar la actividad: " + error.message);
    }
};

// PUT: actualizar actividad AGOSTO
/* exports.updateActividadAgostoRepository = async (id, actividadActualizada) => {
    try {
        const actividadnueva = await calendario.findByIdAndUpdate(
            id,
            { $set: actividadActualizada },
            { new: true }
        );

        if (!actividadnueva) {
            return [];
        } else {
            return actividadnueva;
        }
    } catch (error) {
        console.log("error updateActividadAgostoRepository: " + error);
        throw new Error("error al cambiar la actividad: " + error.message);
    }
}; */


exports.updateActividadAgostoRepository = async (dia, actividadActualizada) => {
  try {
    const actividadnueva = await calendario.findOneAndUpdate(
      { dia: dia },            // buscar por el campo "dia"
      { $set: actividadActualizada },
      { new: true }
    );

    return actividadnueva || null;
  } catch (error) {
    console.log("error updateActividadAgostoRepository: " + error);
    throw new Error("error al cambiar la actividad: " + error.message);
  }
};

//evento delete

exports.deleteActividadjulioRepositoryMongoose = async (id) => {

    try {
        console.log(`REPOSITORY  - deleteFrontendLanguage - id:${id}`)
        const actividadEliminado = await calendarioService.deleteActividadJulioLService(id)

        if(!actividadEliminado){
            console.log('Lenguaje no encontrado')
        }else{
            console.log('Se eliminó el lenguaje correctamente')
            return actividadEliminado
        }

    } catch (error) {
        console.log("deleteFrontendLanguageRepository - " + error)
        throw Error("Error al intentar eliminar lenguaje: - " + error)
    }
}
exports.deleteActividadAgostoRepositoryMongoose = async (id) => {

    try {
        console.log(`REPOSITORY  - deleteFrontendLanguage - id:${id}`)
        const actividadEliminado2 = await calendarioService.deleteActividadAgostoLService(id)

        if(!actividadEliminado2){
            console.log('Lenguaje no encontrado')
        }else{
            console.log('Se eliminó el lenguaje correctamente')
            return actividadEliminado2
        }

    } catch (error) {
        console.log("deleteFrontendLanguageRepository - " + error)
        throw Error("Error al intentar eliminar lenguaje: - " + error)
    }
}

// Obtener todas las alertas (puedes agregar filtros si lo deseas)
exports.obtenerAlertasRepository = async () => {
    try {
        const alertas = await Alerta.find(); // Puedes filtrar si quieres solo futuras
        return alertas;
    } catch (error) {
        console.error('Error al obtener alertas:', error);
        throw new Error('No se pudieron obtener las alertas');
    }
};



