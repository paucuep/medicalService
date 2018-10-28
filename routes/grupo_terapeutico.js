const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grupo_Teapeutico = require('../models/grupo_terapeutico');
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
    Grupo_Teapeutico.find(function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
});

router.get('/:id', (req, res) => {
    Grupo_Teapeutico.findById(req.query.id,function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/new', (req, res) => {
    let grupoTerapeuticoData = req.body;
    let grupo_terapeutico = new Grupo_Teapeutico(grupoTerapeuticoData)
    grupo_terapeutico.save((err, registeredTGrupo_Terapeutico) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredTGrupo_Terapeutico)
        }
    })
})

module.exports = router;