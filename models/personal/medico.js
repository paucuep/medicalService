const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicoSchema = new Schema({
    _id: String,
    id: Number,
    id_centro: { type: Number },
    especialidad:[{
        nombre:String
    }],
    color:String,
    cedula: [{
        universidad: String,
        cedula: String,
        especialidad: String
    }],
    estatus: [{
        id: Number,
        nombre: String
    }],
    id_titulo:String,
    titulo: String,
    nombre_completo: String,
    nombre: String,
    paterno: String,
    materno: String,
    correo: String,
    telefono: String,
    observaciones: String,
    es_consulta: Boolean,
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

module.exports = mongoose.model('personal_medico', medicoSchema, 'personal_medico');