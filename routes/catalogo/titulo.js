const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const catalogo_Titulo = require('../../models/catalogo/titulo');
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
    catalogo_Titulo.aggregate([
        { $sort: { nombre: 1 } },
    ], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});



router.get('/:id', (req, res) => {
    console.log(req.query.id);
    catalogo_Titulo.find({ id: req.query.id}, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    let tituloData = req.body;
    let titulo = new catalogo_Titulo(tituloData)
    if (titulo._id != null) {
        catalogo_Titulo.findOneAndUpdate(titulo._id,titulo, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               console.log('update bien');
            }
        })
    } else {
        console.log('inserta nuev');
        titulo._id=mongoose.Types.ObjectId();
        catalogo_Titulo.save((err, registeredtitulo) => {
            if (err) {
                console.log(err)
            } else {
                console.log('entra');
                res.status(200).send(registeredtitulo)
            }
        })
    }
})

module.exports = router;