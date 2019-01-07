const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogo = new Schema({
    _id: String,
    id:Number,
    cuadro:String,
    grupo_terapeutico_id:String,
    grupo_terapeutico_nombre:String,
    clave:String,
    sub_clave:String,    
    nombre: String,
    forma_farmaceutica:String,
    concentracion:String,
    presentacion:String,
    indicacion_principal:String,
    indicacion_otra:String,
    descripcion:String,
});

module.exports = mongoose.model('farmacia_generico', catalogo, 'farmacia_generico');