const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paciente_Cita = require('../../models/paciente/cita');
const jwt = require('jsonwebtoken')
const db = "mongodb://pcuellar:Prcp1986@ds141043.mlab.com:41043/medical";
// mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});


router.get('/all', (req, res) => {
    console.log(req.query.id);
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



router.get('/:id', (req, res) => {
    console.log(req.query.id);
    paciente_Cita.find({ id: req.query.id }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    let paciente_CitaData = req.body;
    let paciente_cita = new paciente_Cita(paciente_CitaData)



    var c = paciente_cita.hora.toString().split(':');
    var e = new Date(paciente_cita.fecha);

    var d = new Date((e.getFullYear()), (e.getMonth()), (e.getDate() + 1), (c[0] - 6), (c[1]));

    paciente_cita.fecha = d;
    paciente_cita.start = d;
    console.log(d);
    if (paciente_cita._id != null) {
        paciente_Cita.findOneAndUpdate(paciente_cita._id, paciente_cita, function (err, product) {
            if (err) {
                console.log(err)
            } else {
                console.log('update bien');
            }
        })
    } else {
        console.log('inserta nuev');
        paciente_cita._id = mongoose.Types.ObjectId();
        paciente_cita.save((err, registeredpaciente_Cita) => {
            if (err) {
                console.log(err)
            } else {
                console.log('entra');
                res.status(200).send(registeredpaciente_Cita)
            }
        })
    }
})

module.exports = router;