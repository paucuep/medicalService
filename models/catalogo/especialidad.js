const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogoSchema = new Schema({
    _id: String,
    id: Number,
    id_centro: { type: Number },  
    nombre: String, 
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

module.exports = mongoose.model('catalogo_especialidad', catalogoSchema, 'catalogo_especialidades');