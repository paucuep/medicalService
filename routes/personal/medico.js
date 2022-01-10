const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const personal_medico = require('../../models/personal/medico');
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
    console.log(req.query);
    personal_medico.findOne({ _id: req.query.id}, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }

    })
});

router.get('/:especialidad', (req, res) => {
    console.log(req.query);
    personal_medico.find({ especialidad: req.query.id}, function (err, product) {
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
console.log(medico);
    if (medico._id != null) {
        console.log('entra a update');
        personal_medico.findByIdAndUpdate(medico._id, req.body, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               console.log('update bien');
            }
        })
    } else {

        medico._id=mongoose.Types.ObjectId();
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