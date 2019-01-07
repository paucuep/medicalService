const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const catalogo = require('../../models/cie/discapacidad');
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
    catalogo.aggregate([{$sort: { nombre: 1 }}],function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});



router.get('/:id', (req, res) => {
    catalogo.findById(req.query.id, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    let data = req.body;
    let cat = new catalogo(data)
    cat.save((err, registered) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registered)
        }
    })
})

module.exports = router;