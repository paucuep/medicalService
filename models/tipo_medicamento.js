const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tipo_medicamentoSchema = new Schema({
    id:String,
    nombre: String,
    nombre_may: String
});

module.exports = mongoose.model('tipo_medicamento', tipo_medicamentoSchema, 'tipo_medicamentos');