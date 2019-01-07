const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    nombre: String,
    siglas: String,
});

module.exports = mongoose.model('catalogo_genero', catalogo, 'catalogo_genero');