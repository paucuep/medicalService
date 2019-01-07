const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogoSchema = new Schema({
    _id: String,
    id: Number,
    id_centro: { type: String },
    especialidad_id: { type: String },
    especialidad_nombre: { type: String },
    nombre: String,
    costo: Number,
    kit: [{
        es_cortesia: Boolean,
        material: [{
            id: String,
            tipo:String,
            cantidad: Number,
            es_cortesia: Boolean,
            activo:Boolean,
            visible:Boolean,
            observaciones:String
        }],       
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

module.exports = mongoose.model('catalogo_servicio', catalogoSchema, 'catalogo_servicios');