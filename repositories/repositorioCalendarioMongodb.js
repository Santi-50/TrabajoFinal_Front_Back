const { Apicalendario } = require('../src/ApiProyecto');
const calendario = require('./model/calendario');
const { getMongoDBConnection } = require('../database/conexion');
const Alerta = require('./model/alerta'); 

getMongoDBConnection();

// GET: calendario completo (todos los meses)
exports.getCalendariocompletorepository = async () => {
    try {
        console.log("REPOSITORIO getCalendariocompletorepository");
        const datos = await calendario.find();
        console.table(datos);
        return datos;
    } catch (error) {
        console.log("error getCalendariocompletorepository: " + error);
        throw Error("error getCalendariocompletorepository: " + error);
    }
}

// GET: julio (mes = 7)
exports.getJulioCalendarioRepository = async () => {
    try {
        console.log("REPOSITORIO getJulioCalendarioRepository");
        const datos = await calendario.find({ mes: 7 });  // filtro mes Julio
        console.table(datos);
        return datos;
    } catch (error) {
        console.log("error getJulioCalendarioRepository: " + error);
        throw Error("error " + error);
    }
}

// GET: agosto (mes = 8)
exports.getagostoCalendarioRepository = async () => {
    try {
        console.log("REPOSITORIO getagostoCalendarioRepository");
        const datos = await calendario.find({ mes: 8 });  // filtro mes Agosto
        console.table(datos);
        return datos;
    } catch (error) {
        console.log("error getagostoCalendarioRepository: " + error);
        throw Error("error " + error);
    }
}

// POST: crear actividad en agosto (asegurate que actividadNueva tenga mes: 8)
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

// POST: crear actividad en julio (asegurate que actividadNueva tenga mes: 7)
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

// PUT: actualizar actividad JULIO (buscar por dia y mes)
exports.updateActividadJulioRepository = async (dia, actividadActualizada) => {
    try {
        const actividadnueva = await calendario.findOneAndUpdate(
            { dia: dia, mes: 7 }, // filtro por dia y mes Julio
            { $set: actividadActualizada },
            { new: true }
        );

        return actividadnueva || null;
    } catch (error) {
        console.log("error updateActividadJulioRepository: " + error);
        throw new Error("error al cambiar la actividad: " + error.message);
    }
};

// PUT: actualizar actividad AGOSTO (buscar por dia y mes)
exports.updateActividadAgostoRepository = async (dia, actividadActualizada) => {
    try {
        const actividadnueva = await calendario.findOneAndUpdate(
            { dia: dia, mes: 8 }, // filtro por dia y mes Agosto
            { $set: actividadActualizada },
            { new: true }
        );

        return actividadnueva || null;
    } catch (error) {
        console.log("error updateActividadAgostoRepository: " + error);
        throw new Error("error al cambiar la actividad: " + error.message);
    }
};

// DELETE: eliminar actividad JULIO (por dia y mes)
exports.deleteActividadJulioRepository = async (dia) => {
    try {
        console.log(`REPOSITORY - deleteActividadJulioRepository - dia: ${dia}`);

        const actividadEliminada = await calendario.findOneAndDelete({ dia: dia, mes: 7 });

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

// DELETE: eliminar actividad AGOSTO (por dia y mes)
exports.deleteActividadAgostoRepository = async (dia) => {
    try {
        console.log(`REPOSITORY - deleteActividadAgostoRepository - dia: ${dia}`);

        const actividadEliminada = await calendario.findOneAndDelete({ dia: dia, mes: 8 });

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
