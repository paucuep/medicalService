const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paciente_Consulta = require('../../models/paciente/consulta');
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
    paciente_Consulta.aggregate([{ $sort: { nombre: 1 } }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});



router.get('/:id', (req, res) => {
    console.log(req.query.id);
    paciente_Consulta.find({ id_consulta: req.query.id}, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    let paciente_CosultaData = req.body;
    let paciente_consulta = new paciente_Consulta(paciente_CosultaData)

    console.log(paciente_consulta);
    if (paciente_consulta._id != null) {
        paciente_Consulta.findOneAndUpdate(paciente_consulta._id,paciente_consulta, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               console.log('update bien');
            }
        })
    } else {
        console.log('inserta nuev');
        paciente_consulta.save((err, registeredpaciente_Cosulta) => {
            if (err) {
                console.log(err)
            } else {
                console.log('entra');
                res.status(200).send(registeredpaciente_Cosulta)
            }
        })
    }
})

module.exports = router;