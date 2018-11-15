const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo_tituloSchema = new Schema({
    _id: String,
    id: Number,
    nombre: String,
    abreviatura: String
});

module.exports = mongoose.model('catalogo_titulo', catalogo_tituloSchema, 'catalogo_titulos');