const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    id:Number,
    nombre: String
});

module.exports = mongoose.model('catalogo_estado_civil', catalogo, 'catalogo_estado_civil');