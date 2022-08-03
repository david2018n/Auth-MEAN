
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const path = require('path');

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

//manejo de rutas

app.get( '*', (req, res)=> {
    res.sendFile( path.resolve(__dirname, 'public/index.html') )
} )

app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo el puerto ${process.env.PORT}`)
});