const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const grupo_terapeuticoSchema = new Schema({
    _id:String,
    id:Number,
    nombre: String,
    nombre_may:String
});

module.exports = mongoose.model('grupo_terapeutico', grupo_terapeuticoSchema, 'grupo_terapeuticos');