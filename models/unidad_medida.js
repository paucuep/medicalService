const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unidad_medidaSchema = new Schema({
    _id:String,
    id:Number,
    nombre: String
});

module.exports = mongoose.model('unidad_medida', unidad_medidaSchema, 'unidad_medidas');