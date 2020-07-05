const express = require('express');
const router = express.Router();
const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function(){
    router.get('/', (req, res) => {
        res.render("index");
    });
    
    router.get('/nosotros', (req, res) => {
        res.render("nosotros", { 
            pagina: 'Sobre nosotros'
        })
    });

    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render("viajes", { 
                pagina: 'Proximos viajes',
                viajes: viajes
            }))
            .catch(error => console.log(error));
        
    });

    router.get('/viajes/:id', (req, res) => {
        // res.send(req.params.id)
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render("viaje", {
                pagina: 'Proximos viajes',
                viaje: viaje
            }))
            .catch(error => console.log(error));
    });

    router.get('/testimoniales', (req, res) => {
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales
            }))
    });
    
    router.post('/testimoniales', (req, res) => {
        // console.log(req.body);
        let {nombre, correo, mensaje} = req.body;
        // validamos campos llenos
        let errores = [];
        if (!nombre) {
            errores.push({'mensaje': 'Agrega tu Nombre'});
        }
        if (!correo) {
            errores.push({'mensaje': 'Agrega tu corre'});
        }
        if (!mensaje) {
            errores.push({'mensaje': 'Agrega tu mensaje'});
        }
        // revisar por errores
        if (errores.length > 0) {
            // muestra la vista  con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            })
        } else {
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
                .then(testimonial => res.redirect('/testimoniales'))
                .catch(error => console.log(error));

        }
    })
    return router;
}