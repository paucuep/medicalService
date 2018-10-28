const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const generico_ConcentracionSchema = new Schema({
    _id: String,
    id_terapeutico: Number,
    nombre_terapeutico: String,
    clave: String,
    subclave: String,
    nombre_generico: String,
    forma_farmaceutica: String,
    concentracion: String,
    presentacion: String,
    p_indicacion: String,
    d_indicacion: String
});

module.exports = mongoose.model('generico_concentracion', generico_ConcentracionSchema, 'generico_concentraciones');