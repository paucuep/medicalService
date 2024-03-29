const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultaSchema = new Schema({
    _id:String,
    id: String,
    id_clinica:Number,
    id_consulta : Number,
    id_cita:String ,
    id_medico:String,
    id_paciente:  String,
    id_expediente: String,
    id_estatus: Number ,
    id_motivo_alta: String,   
    padecimiento: String,
    exploracion: String,
    evolucion: String,
    pronostico: String,
    nota_valoracion:String,
    deficiencias: String,
    motivo_alta_servicio: Boolean,
    motivo_alta_definitiva: Boolean,
    es_alergia:Boolean,
    es_discapacidad:Boolean,
    enfermeria:[{
        estatura: Number,
        peso: Number,
        temperatura: Number,
        glucometria: Number,
        frecuencia_cardiaca: Number,
        frecuencia_respiratoria: Number,
        tension_arterial_a: Number,
        tension_aterial_s: Number,
        usuario_id:String,
        usuario_nombre:String,
        fecha:Date        
    }],    
    fotografia:[{
        ruta:String,
        fecha:Date
    }],
    consentimiento:[{
        ruta:String,
        fecha:Date
    }],
    antecedente: [{
        hf_hipertension:Boolean,
        hf_dislipidemia:Boolean,
        hf_diabetes:Boolean,
        hf_cancer:Boolean,
        hf_cancer_observacion:String,
        hf_observaciones:String,
        p_hipertension:Boolean,
        p_hipertension_tiempo:String,
        p_diabetes:Boolean,
        p_diabetes_tiempo:String,
        p_hipertiroidismo:Boolean,
        p_hipertiroidismo_tiempo:String,
        p_quirurgico:String,
        p_transfuncionales:String,
        p_fracturas:String,
        p_observaciones:String,
        
        np_tipo_Sangre:String,
        np_tabaquismo:Boolean,
        np_alcoholismo:Boolean,
        np_observaciones:String,
        pre_observaciones:String,
        gin_observaciones:String
    }],
    discapacidad: [{
        id: String,
        nombre: String,
        clave: String,
        alta_fecha: String,
        alta_usuario: Number
    }],
    ayuda_funcional: [{
        id: String,
        nombre: String,
        alta_fecha: String,
        alta_usuario: Number
    }],
    alergia: [{
        id: String,
        nombre: String,
        clave: String,
        alta_fecha: String,
        alta_usuario: Number
    }],
    procedimiento: [{
        especialidad_id: String,
        especialidad_nombre: String,
        servicio_id: String,
        servicio_nombre: String,
        indicacion: String,
        es_cita:Boolean,
        id_cita:String,
        fecha_cita:Date,
        hora_cita:String,
        quirofano_id:String,
        quirofano_nombre:String,
        alta_fecha: String,
        alta_usuario: String,
        kit: [{
            es_cortesia: Boolean,
            costo_total:Number,
            precio_total:Number,
            estatus_id:String,
            estatus_nombre:String,
            material: [{
                id: String,
                tipo:String,
                cantidad: Number,
                precio_unitario:Number,
                precio_total:Number,
                costo_unitario:Number,
                costo_total:Number,
                es_cortesia: Boolean,
                activo:Boolean,
                visible:Boolean,
                observaciones:String
            }],       
        }],
    }],
    tratamiento: Array,
    receta: Array,
    estudio: Array,
    diagnostico: Array,
    alta_fecha: Date,
    alta_usuario: Number,
    cambio_fecha: Date,
    cambio_usuario: Number,
    activo: Boolean

});

module.exports = mongoose.model('paciente_consulta', consultaSchema, 'paciente_consultas');