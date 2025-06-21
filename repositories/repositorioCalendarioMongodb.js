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

//evento delete JULIO

exports.deleteActividadJuliotoRepository = async (dia) => {
    try {
        console.log(`REPOSITORY - deleteActividadJulioRepository - dia: ${dia}`);

        const actividadEliminada = await calendario.findOneAndDelete({ dia: dia });

        if (!actividadEliminada) {
            console.log('Actividad no encontrada');
            return null;
        } else {
            console.log('Actividad eliminada correctamente');
            return actividadEliminada;
        }
    } catch (error) {
        console.log("Error en deleteActividadJulioRepository - " + error);
        throw new Error("Error al intentar eliminar actividad: " + error.message);
    }
}

//delete AGOSTO

exports.deleteActividadAgostoRepository = async (dia) => {
    try {
        console.log(`REPOSITORY - deleteActividadAgostoRepository - dia: ${dia}`);

        const actividadEliminada = await calendario.findOneAndDelete({ dia: dia });

        if (!actividadEliminada) {
            console.log('Actividad no encontrada');
            return null;
        } else {
            console.log('Actividad eliminada correctamente');
            return actividadEliminada;
        }
    } catch (error) {
        console.log("Error en deleteActividadAgostoRepository - " + error);
        throw new Error("Error al intentar eliminar actividad: " + error.message);
    }
}



// Obtener todas las alertas (puedes agregar filtros si lo deseas)
exports.obtenerAlertasRepository = async () => {
    try {
        const alertas = await Alerta.find(); 
        return alertas;
    } catch (error) {
        console.error('Error al obtener alertas:', error);
        throw new Error('No se pudieron obtener las alertas');
    }
};



