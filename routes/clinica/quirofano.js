const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Catalogo = require('../../models/clinica/quirofano');
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
    Catalogo.aggregate([{ $sort: { nombre: 1 } }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});



router.get('/:id', (req, res) => {
    Catalogo.findOne({ _id: req.query.id}, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }

    })
});

router.post('/add', (req, res) => {
    let data = req.body;
    let catalogo = new Catalogo(data)
    if (catalogo._id != null) {
        Catalogo.findByIdAndUpdate(catalogo._id, req.body, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               console.log('update bien');
               res.status(200).send(product)
            }
        })
    } else {

        catalogo._id=mongoose.Types.ObjectId();
        catalogo.save((err, registeredpaciente_Cita) => {
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