
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');

require('dotenv').config();

//crear app/ server de express
const app = express();

//Base de datos

dbConnection();

//Directorio Publico
app.use(express.static('public'));

//cors
app.use(cors());

//lectura y parseo de request
app.use( express.json());

//Rutas
app.use( '/api/auth', require('./routes/auth') );

app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo el puerto ${process.env.PORT}`)
});