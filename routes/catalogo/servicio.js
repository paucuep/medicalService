const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Catalogo = require('../../models/catalogo/servicio');
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

router.get('/especialidad', (req, res) => {
    Catalogo.aggregate([
        { $match: { especialidad_id: req.query.id } },
        { $sort: { nombre: 1 } 
    }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});

router.get('/:id', (req, res) => {
    Catalogo.findOne({ _id: req.query.id }, function (err, product) {
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
    catalogo.costo = catalogo.costo.toString().replace(",", "");
    if (catalogo._id != null) {
        console.log('entra a update');
        Catalogo.findByIdAndUpdate(catalogo._id, req.body, function (err, registered) {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(registered)
            }
        })
    } else {

        catalogo._id = mongoose.Types.ObjectId();
        catalogo.save((err, registered) => {
            if (err) {
                console.log(err)
            } else {
                console.log('entra');
                res.status(200).send(registered)
            }
        })
    }
})

module.exports = router;