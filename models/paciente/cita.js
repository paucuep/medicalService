const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citaSchema = new Schema({
    _id: String,
    id: String,
    id_centro: { type: Number },
    id_consulta: { type: Number },
    id_estatus: Number,
    estatus: String,
    medico_id: String,
    medico_nombre_completo: String,
    medico_especialidad: String,
    id_paciente: { type: String },
    id_expediente: Number,
    id_tipo_servicio: String,
    tipo_servicio: String,
    title: String,
    start: Date,
    end: Date,
    color: String,
    nombre: String,
    paterno: String,
    materno: String,
    fecha: Date,
    hora: String,
    costo: Number,
    correo: String,
    telefono: String,
    observaciones: String,
    cancelacion: [{
        fecha: Date,
        motivo: String,
        usuario: String
    }],
    bitacora: [{
        usuario: String,
        fecha: Date,
        Accion: String
    }],
    alta_fecha: Date,
    alta_usuario: Number,
    cambio_fecha: Date,
    cambio_usuario: Number,
    activo: Boolean
});

module.exports = mongoose.model('paciente_cita', citaSchema, 'paciente_cita');