const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');

//middleware
// console.log("URI para conexión con mongo: " + (process.env.MONGODB_URI || 'mongodb://mongo/Qiunt'));
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo/Qiunt', {
mongoose.connect('mongodb://localhost/cbd', {
    useNewUrlParser: true,
    useFindAndModify: false,
});
mongoose.set('useCreateIndex', true);
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes

// Ruta principal de nuestra api
app.use('/api', apiRouter);

// Solo usar en despliegue
app.use(express.static(path.join(__dirname, 'dist/cbdmean')));

// Control de acceso HTTP (CORS)
app.use(function (req, res, next) {

    // Permitimos solo a nuestra aplicacion de angular hacer llamadas a nuestra api
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Qué métodos de REST vamos a permitir realizar
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Enviamos las cabeceras en cada respuesta
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Permitir el uso de cookies de sesión
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pasar a la siguiente capa del middleware
    next();
});

app.listen(3000, () => {
    console.log('API Node corriendo en puerto 3000');
});
