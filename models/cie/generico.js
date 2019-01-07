const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogoSchema = new Schema({
    _id: String,
    id: Number,
    cuadro: String,
    nombre: String,
    id_nivel_atencion: Number,
    id_grupo_medico: String,
    clave: String,
    sub_clave: String,
    nombre: String,
    forma_farmaceutica:String,
    concentracion: String,
    preesentacion: String,
    clave: String,
    indicacion_principal:String,
    indicacion_otras:String,
    descripcion_completa: String
});

module.exports = mongoose.model('cie10_generico', catalogoSchema, 'cie10_generico');