const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogoSchema = new Schema({
    _id: String,
    id: Number,
    id_tipo:Number,
    tipo: String,
    nombre: String,
    clase: String
});

module.exports = mongoose.model('catalogo_estatus', catalogoSchema, 'catalogo_estatus');