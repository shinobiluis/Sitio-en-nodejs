// Importar express y la carpeta de rutas
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Configurar express
const app = express();
// habilitar pug
app.set('view engine', 'pug');
// Añadir las vistas
app.set('views', path.join(__dirname, './views'));
// Cargamos una carpeta estatica llamada public
app.use(express.static('public'));
// Muestra el año actual
app.use((req, res, next)=>{
    // crear una nueva fecha;
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    console.log(res.locals)
    return next();
});
// cacar ls rutas
app.use('/', routes());
// especificamos el puerto
app.listen(3000);

