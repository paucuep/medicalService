const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    nombre: String,
    numero: String,
    responsable: String,
});

module.exports = mongoose.model('clinica_quirofano', catalogo, 'clinica_quirofano');