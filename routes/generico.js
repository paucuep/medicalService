const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Generico = require('../models/generico');
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://paucuep:Prcp1986@cluster0.yfaie.mongodb.net/medical?retryWrites=true&w=majority"

mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});


router.get('/all', (req, res) => {

    if (req.query.filtro != null) {
        Generico.find({ id_terapeutico: req.query.filtro },function (err, product) {
            if (err) {
                console.log(err)
            } else {
                res.send(product);
            }
        }).sort('nombre')
    }
    else {
        Generico.find(function (err, product) {
            if (err) {
                console.log(err)
            } else {
                res.send(product);
            }
        }).sort('nombre')
    }
});


router.get('/:id', (req, res) => {
    Generico.findById(req.query.id, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/new', (req, res) => {
    let genericoData = req.body;
    let generico = new Generico(genericoData)
    generico.save((err, registeredGenerico) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredGenerico)
        }
    })
})

module.exports = router;