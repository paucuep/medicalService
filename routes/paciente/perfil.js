const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Catalogo = require('../../models/paciente/perfil');
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
    Catalogo.aggregate([{ $sort: { nombre: 1 } }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});

router.get('/nombre', (req, res) => { 
    let nombre= {$regex: req.query.nombre, $options: 'i'};
    let paterno= {$regex: req.query.paterno, $options: 'i'};
    let materno= {$regex: req.query.materno, $options: 'i'};

    Catalogo.aggregate([
        { $match: { nombre: nombre,paterno:paterno,materno:materno  }},
        { $sort: { nombre: 1 } 
    }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});

router.get('/nombre2', (req, res) => {
    let searchQuery = {$regex: req.query.nombre, $options: 'i'};
    let nombre="" + req.query.nombre.toString().toLowerCase() + "/";
    console.log(nombre);
    Catalogo.find(
        { nombre: searchQuery }
   , function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});


router.get('/:id', (req, res) => {
    console.log('entra')
    console.log(req.query.id)
    Catalogo.findOne({ _id: req.query.id}, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            console.log(product)
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
    console.log('entra a agregar');
    let data = req.body;
    let catalogo = new Catalogo(data)
    console.log(catalogo);
    if (catalogo._id != null) {
        Catalogo.findByIdAndUpdate(catalogo._id, req.body, function (err, product) {
            if (err) {
                console.log(err)
            } else {
               console.log('update bien');
               res.status(200).send();
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