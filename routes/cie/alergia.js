const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cie10_Alergia = require('../../models/cie/alergia');
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
    Cie10_Alergia.aggregate([{$sort: { nombre: 1 }}],function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});

router.get('/categoria', (req, res) => {

    Cie10_Alergia.aggregate([
        { $group: { _id: "$categoria" } },
        { $sort: { _id: 1 } }
    ], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {

            res.send(product);
        }
    })
});

router.get('/subcategoria', (req, res) => {

    Cie10_Alergia.aggregate([
        { $match: { categoria: req.query.filtro } },
        { $group: { _id: "$subcategoria" } },
        { $sort: { _id: 1 } }
    ], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {

            res.send(product);
        }
    })
});

router.get('/:id', (req, res) => {
    Cie10_Alergia.findById(req.query.id, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/new', (req, res) => {
    let cie10_alergiaData = req.body;
    let cie10_alergia = new Cie10_Alergia(cie10_alergiaData)
    cie10_alergia.save((err, registeredCie10_alergia) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredCie10_alergia)
        }
    })
})

module.exports = router;