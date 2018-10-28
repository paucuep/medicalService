const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Generico_concentracion = require('../models/generico_concentracion');
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

    if (req.query.ter != null) {
        Generico_concentracion.find({ nombre_terapeutico: req.query.ter, nombre_generico:req.query.gen},function (err, product) {
            if (err) {
                console.log(err)
            } else {
                res.send(product);
            }
        }).sort('concentracion')
    }
    else {
        Generico_concentracion.find(function (err, product) {
            if (err) {
                console.log(err)
            } else {
                res.send(product);
            }
        }).sort('concentracion')
    }
});


router.get('/:id', (req, res) => {
    Generico_concentracion.findById(req.query.id, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/new', (req, res) => {
    let genericoData = req.body;
    let generico = new Generico_concentracion(genericoData)
    generico.save((err, registeredGenerico) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredGenerico)
        }
    })
})

module.exports = router;