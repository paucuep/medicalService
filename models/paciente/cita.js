const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citaSchema = new Schema({
    _id:String,
    id: String,   
    id_centro: { type: Number },
    id_consulta: { type: Number },
    estatus:[{
        id:Number,
        nombre:String
    }],
    medico:[{
        id:Number,
        nombre_completo:String,
        especialidad:String
    }],
    id_paciente: { type: Number, required: true },
    id_expediente: Number,
    tipo_Servicio:[{
        id:Number,
        Nombre:String
    }],
   nombre:String,
   paterno:String,
   materno:String,
   fecha_Cita:Date,
   hora_Cita:String,
   costo:Number,
   correo:String,
   telefono:String,
   observaciones:String,
   cancelacion:[{
       fecha:Date,
       motivo:String,
       usuario:String
   }],
   bitacora:[{
       usuario:String,
       fecha:Date,
       Accion:String
   }],
   alta_fecha:Date,
   alta_usuario:Number,
   cambio_fecha:Date,
   cambio_usuario:Number,
   activo:Boolean
});

module.exports = mongoose.model('paciente_cita', citaSchema, 'paciente_cita');