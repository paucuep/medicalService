const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id:String,
    id:Number,
    nombre: String,
    nombre_may:String
});

module.exports = mongoose.model('catalogo_grupo_terapeutico', catalogo, 'catalogo_grupo_terapeutico');