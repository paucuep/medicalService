const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grupo_Terapeutico = require('../catalogo/grupo_terapeutico');
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
    Grupo_Terapeutico.find(function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
});

router.get('/:id', (req, res) => {
    Grupo_Terapeutico.findById(req.query.id,function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    let data = req.body;
    let catalogo = new Grupo_Teapeutico(data)
    if (catalogo._id != null) {
        Grupo_Terapeutico.findByIdAndUpdate(catalogo._id, req.body, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               res.status(200).send(product)
            }
        })
    } else {

        catalogo._id=mongoose.Types.ObjectId();
        catalogo.save((err, registeredpaciente_Cita) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(registeredpaciente_Cita)
            }
        })
    }
})


module.exports = router;