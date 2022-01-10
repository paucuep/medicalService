const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Unidad_Medida = require('../models/unidad_medida');
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
    Unidad_Medida.find(function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.get('/:id', (req, res) => {
    Unidad_Medida.findById(req.query.id,function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/new', (req, res) => {
    let unidad_MedidaData = req.body;
    let unidad_medida = new Unidad_Medida(unidad_MedidaData)
    unidad_medida.save((err, registeredUnidad_Medida) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredUnidad_Medida)
        }
    })
})

module.exports = router;