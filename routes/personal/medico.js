const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const personal_medico = require('../../models/personal/medico');
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
    personal_medico.aggregate([{ $sort: { nombre: 1 } }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});



router.get('/:id', (req, res) => {
    console.log(req.query.id);
    personal_medico.find({ id: req.query.id}, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    let personal_medicoData = req.body;
    let medico = new personal_medico(personal_medicoData)

    if (medico._id != null) {
        personal_medico.findOneAndUpdate(medico._id,medico, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               console.log('update bien');
            }
        })
    } else {
        console.log('inserta nuev');
        medico.save((err, registeredpaciente_Cita) => {
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