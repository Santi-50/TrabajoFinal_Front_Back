const mongoose = require('mongoose')

const calendarioSchema = mongoose.Schema(
  {
    dia: {
      type: Number,
      required: true
    },
    mes: {             // nuevo campo para diferenciar mes
      type: Number,
      required: true
    },
    horario: {
      type: String,
      required: false
    },
    actividad: {
      type: String,
      required: false
    }
  }
)

module.exports = mongoose.model('calendario', calendarioSchema)
