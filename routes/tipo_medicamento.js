const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tipo_Medicamento = require('../models/tipo_medicamento');
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
    Tipo_Medicamento.find(function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
});

router.get('/:id', (req, res) => {
    Tipo_Medicamento.findById(req.query.id,function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/new', (req, res) => {
    let tipo_medicamentoData = req.body;
    let tipo_medicamento = new Tipo_Medicamento(tipo_medicamentoData)
    tipo_medicamento.save((err, registeredTipo_Medicamento) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredTipo_Medicamento)
        }
    })
})

module.exports = router;