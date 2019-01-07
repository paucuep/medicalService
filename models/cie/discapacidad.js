const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogoSchema = new Schema({
    _id: String,
    categoria: String,
    subcategoria: String,
    nombre: String,
    otro_nombre: String,
    clave: String,
    codigo: String
});

module.exports = mongoose.model('cie10_discapacidad', catalogoSchema, 'cie10_discapacidad');