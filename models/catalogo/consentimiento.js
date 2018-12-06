const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    nombre: String,
    ruta: String,
    contenido:String,
    servicio_id:String,
    servicio_nombre: String,
    tipo:String
});

module.exports = mongoose.model('catalogo_consentimiento', catalogo, 'catalogo_consentimiento');