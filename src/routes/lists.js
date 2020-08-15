const { Router } = require('express');//desde express requiero su metodo Router
const router = Router();//ejecutar Router en una constante llamada router, permitiendome crear nuevas rutas
const _ = require('underscore');

const lists = require('../sample.json'); //simulación de una DB
console.log(lists);

router.get('/', (req, res) => {//al recibir algo a esta ruta, enviare algo
    res.json(lists);//aquí podemos enviar objetos tales como los archivos JSON
});

router.post('/', (req, res) => {
    const {nombre, estado, descripcion } = req.body;//desde request body quiero obtener el nombre, estado y descripcion de la lista.
    if (nombre && estado && descripcion) { //validación de que estamos recibiendo todos estos datos.
        const id = lists.length + 1; //como id es un identificador unico y que debe generarse solo, lo definimos aqui
        const newList = {...req.body, id}; //pasamos todo el objeto del request body en un nuevo objeto
        console.log(newList);
        lists.push(newList);//almacenamos
        res.json(lists);//aquí podemos enviar objetos tales como los archivos JSON
    } else {
        res.send('Petición errónea');
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, estado, descripcion } = req.body;//desde request body quiero obtener el nombre, estado y descripcion de la lista.
    
    if (nombre) { //validación de que estamos recibiendo todos estos datos.
        _.each(lists, (list, i) => {
            if (list.id == id) {
                list.nombre = nombre;
            }
        });
    }
    
    if (estado) {
        _.each(lists, (list, i) => {
            if (list.id == id) {
                list.estado = estado;
            }
        });
    }

    if (descripcion) {
        _.each(lists, (list, i) => {
            if (list.id == id) {
                list.descripcion = descripcion;
            }
        });
    }

    res.json(lists);//aquí podemos enviar objetos tales como los archivos JSON

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(lists, (list, i) => {//empieza a recorrer todo el arreglo de lists, del cual se obtiene una funcion que recibe una lista y un indice.
        if (list.id == id) {//si se cumple esta sentencia, removemos el id solicitado
            lists.splice(i, 1);//aqui se remueve
        }
    });
    res.json(lists);//aquí podemos enviar objetos tales como los archivos JSON    
});

module.exports = router;//exportamos al index.js principal