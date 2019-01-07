const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paciente_Consulta = require('../../models/paciente/consulta');
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


router.get('/cita', (req, res) => {
    let _id = req.query.cita;
    if (_id != null) {
        paciente_Consulta.aggregate([
            { $sort: { nombre: 1 } },
            { $match: { id_cita: _id } }
        ], function (err, product) {
            if (err) {
                console.error('Error! ' + err)
            } else {
                res.status(200).send(product)
            }
        })
    }
   
});

router.get('/all', (req, res) => {
    paciente_Consulta.aggregate([{ $sort: { nombre: 1 } }], function (err, product) {
        if (err) {
            console.error('Error! ' + err)
        } else {
            res.send(product);
        }
    })
});



router.get('/:id', (req, res) => {
    console.log(req.query.id);
    paciente_Consulta.find({ id_consulta: req.query.id }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.send(product);
        }
    })
});

router.post('/add', (req, res) => {
     console.log('entra a consulta add')
    let paciente_CosultaData = req.body;
    let paciente_consulta = new paciente_Consulta(paciente_CosultaData)

    console.log(paciente_consulta);
    console.log(paciente_consulta.procedimiento);
    if (paciente_consulta._id != null) {
        paciente_Consulta.findByIdAndUpdate(paciente_consulta._id, paciente_consulta, function (err, product) {
            if (err) {
                console.log(err)
            } else {
                console.log('update bien');
            }
        })
    } else {
        console.log('inserta nuev');
        paciente_consulta.save((err, registeredpaciente_Cosulta) => {
            if (err) {
                console.log(err)
            } else {
                console.log('entra');
                res.status(200).send(registeredpaciente_Cosulta)
            }
        })
    }
})

router.post('/enfermeria', (req, res) => {
    let enfermeriaData = req.body;

    console.log('entra a enfermeria')
    console.log(enfermeriaData);

    paciente_Consulta.find({ id_cita: enfermeriaData.id_cita }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            console.log(product.length)

            if (product.length == 0) {
                //No existe la consulta, la creamos
                let consulta = new paciente_Consulta(enfermeriaData)
                consulta._id = mongoose.Types.ObjectId();
                consulta.save((err, registeredpaciente_Cosulta) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.status(200).send(registeredpaciente_Cosulta)                       
                    }
                })

            }
            else {
                console.log('existe')
                console.log(product[0])
                let consulta = new paciente_Consulta(product[0])
                consulta.enfermeria=enfermeriaData.enfermeria;
                paciente_Consulta.findOneAndUpdate(consulta._id, consulta, function (err, product) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('update bien');
                    }
                })
            }
        }
    })
})


module.exports = router;