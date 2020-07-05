// Importar express y la carpeta de rutas
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config')
const bodyParser = require('body-parser');

// Configurar express
const app = express();
// habilitar pug
app.set('view engine', 'pug');
// Añadir las vistas
app.set('views', path.join(__dirname, './views'));
// Cargamos una carpeta estatica llamada public
app.use(express.static('public'));
// validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];
// creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual
app.use((req, res, next)=>{
    // crear una nueva fecha;
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    console.log(res.locals)
    return next();
});
// ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}));
// cacar ls rutas
app.use('/', routes());
// especificamos el puerto
app.listen(3000);

