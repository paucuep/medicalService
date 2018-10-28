const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genericoSchema = new Schema({
    _id:String,
    id_terapeutico:Number,
    nombre_terapeutico:String,
    nombre: String
});

module.exports = mongoose.model('generico', genericoSchema, 'genericos');