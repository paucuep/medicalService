const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const tipo_medicamento = require('./routes/tipo_medicamento');
const grupo_terapeutico = require('./routes/grupo_terapeutico')
const generico = require('./routes/generico')
const generico_concentracion = require('./routes/generico_concentracion')
const unidad_medida = require('./routes/unidad_medida')
const personal_medico = require('./routes/personal/medico')

const alergia = require('./routes/cie/alergia')

const consulta = require('./routes/paciente/consulta')
const cita = require('./routes/paciente/cita')
const paciente_perfil = require('./routes/paciente/perfil')

const catalogo_titulo = require('./routes/catalogo/titulo')
const catalogo_especialidad = require('./routes/catalogo/especialidad')
const catalogo_servicio = require('./routes/catalogo/servicio')
const catalogo_estatus = require('./routes/catalogo/estatus')
const catalogo_aseguradora = require('./routes/catalogo/aseguradora')
const catalogo_consentimiento = require('./routes/catalogo/consentimiento')

const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

app.use('/tipo_medicamento', tipo_medicamento);
app.use('/grupo_terapeutico', grupo_terapeutico);
app.use('/generico', generico);
app.use('/unidad_medida', unidad_medida);
app.use('/generico_concentracion',generico_concentracion);
app.use('/alergia',alergia);
app.use('/consulta',consulta);
app.use('/cita',cita);
app.use('/medico',personal_medico);
app.use('/titulo',catalogo_titulo);
app.use('/servicio',catalogo_servicio);
app.use('/especialidad',catalogo_especialidad);
app.use('/estatus',catalogo_estatus);
app.use('/paciente_perfil',paciente_perfil);
app.use('/aseguradora',catalogo_aseguradora);
app.use('/consentimiento',catalogo_consentimiento);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.listen(process.env.PORT || 5000, function(){
    console.log("Server running on localhost:" + port);
});