const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    nombre: String,
    siglas: String,
    tipo_id:Number,
    tipo_nombre: String
});

module.exports = mongoose.model('catalogo_aseguradora', catalogo, 'catalogo_aseguradora');