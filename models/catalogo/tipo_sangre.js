const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    nombre: String,
});

module.exports = mongoose.model('catalogo_tipo_sangre', catalogo, 'catalogo_tipo_sangre');