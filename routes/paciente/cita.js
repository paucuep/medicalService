const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paciente_Cita = require('../../models/paciente/cita');
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://paucuep:Prcp1986@cluster0.yfaie.mongodb.net/medical?retryWrites=true&w=majority"
// mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});


router.get('/paciente', (req, res) => {
    let _id = req.query.paciente;
    if (_id != null) {
        paciente_Cita.aggregate([
            { $sort: { nombre: 1 } },
            { $match: { id_paciente: _id } }
        ], function (err, product) {
            if (err) {
                console.error('Error! ' + err)
            } else {
                res.status(200).send(product)
            }
        })
    }
   
});


router.get('/calendario', (req, res) => {
    let _id = req.query.id;
    if (_id != null) {
        paciente_Cita.aggregate([
            { $sort: { nombre: 1 } },
            { $match: { medico_id: _id } }
        ], function (err, product) {
            if (err) {
                console.error('Error! ' + err)
            } else {
                res.send(product);
            }
        })
    }
    else {
        paciente_Cita.aggregate([
            { $sort: { nombre: 1 } },


        ], function (err, product) {
            if (err) {
                console.error('Error! ' + err)
            } else {
                res.send(product);
            }
        })
    }
});

router.get('/all', (req, res) => {
    let _id = req.query.id;
    let fecha = req.query.fecha;


    let fechamayor=new Date();
    let fechamenor=new Date();

    if(fecha!=null){
        var result = new Date(fecha);
        result.setDate(result.getDate() + 1);
    
        fechamayor = result;
        result = new Date(fecha);
        result.setDate(result.getDate() - 1);
        fechamenor = result;
    }
    else{
        fechamayor.setDate(fechamayor.getDate() + 1);
        fechamenor.setDate(fechamenor.getDate() - 1);
    }

  
    if (_id != null) {
        paciente_Cita.aggregate([
            { $sort: { id_estatus: 1 ,hora:1} },
            { $match: { medico_id: _id, start: { $lte: fechamayor, $gte: fechamenor } } }


        ], function (err, product) {
            if (err) {
                console.error('Error! ' + err)
            } else {
                res.send(product);
            }
        })
    }
    else {
        paciente_Cita.aggregate([
            { $sort: { id_estatus: 1 ,hora:1} },
            { $match: { start: { $lte: fechamayor, $gte: fechamenor } } }

        ], function (err, product) {
            if (err) {
                console.error('Error! ' + err)
            } else {
                res.send(product);
            }
        })
    }
});



router.get('/:id', (req, res) => {
    paciente_Cita.find({ _id: req.query.id }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});


router.post('/edit', (req, res) => {
    let paciente_CitaData = req.body;
    let paciente_cita = new paciente_Cita(paciente_CitaData)
    console.log(req.body);
    var c = paciente_cita.hora.toString().split(':');
    var e = new Date(paciente_cita.fecha);

    if (paciente_cita.fecha.toString().includes('GMT')) {
        var c = paciente_cita.hora.toString().split(':');
        var e = new Date(paciente_cita.start);

        var d = new Date((e.getFullYear()), (e.getMonth()), (e.getDate()), (c[0] - 6), (c[1]));

        paciente_cita.fecha = d;
        paciente_cita.start = d;
        console.log(d);
    }

    if (paciente_cita._id != null) {
        paciente_Cita.findByIdAndUpdate(paciente_cita._id, req.body, function (err, product) {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(product)
            }
        })
    }
})

router.post('/addPaciente', (req, res) => {
    let paciente_CitaData = req.body;
    paciente_Cita.find({ _id: paciente_CitaData._id }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            let pacienteExistente = new paciente_Cita(product[0])
            pacienteExistente.id_paciente=paciente_CitaData.id_paciente;
            paciente_Cita.findByIdAndUpdate(pacienteExistente._id,pacienteExistente, function (err, product2) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(product2)
                }
            })
        }
    })
    
})

router.post('/add', (req, res) => {
    console.log('entra a actualizar');
    let paciente_CitaData = req.body;
    let paciente_cita = new paciente_Cita(paciente_CitaData)
    var c = paciente_cita.hora.toString().split(':');
    var e = new Date(paciente_cita.fecha);

    var d = new Date((e.getFullYear()), (e.getMonth()), (e.getDate() + 1), (c[0] - 6), (c[1]));

    paciente_cita.fecha = d;
    paciente_cita.start = d;
    if (paciente_cita._id != null) {
        paciente_Cita.findByIdAndUpdate(paciente_cita._id, paciente_cita, function (err, product) {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(product)
            }
        })
    } else {
        paciente_cita._id = mongoose.Types.ObjectId();
        paciente_cita.save((err, registeredpaciente_Cita) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(registeredpaciente_Cita)
            }
        })
    }
})

module.exports = router;