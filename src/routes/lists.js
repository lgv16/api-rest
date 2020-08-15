const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const lists = require('../sample.json'); //archivo json que simula una DB
console.log(lists);

router.get('/', (req, res) => {//Petición GET. Al recibir algo a esta ruta, se enviará una respuesta
    res.json(lists);//aquí podemos enviar objetos tales como el archivo JSON
});

router.post('/', (req, res) => {//Petición POST. Desde el request body quiero obtener el nombre, estado o descripcion de la lista.
    const {nombre, estado, descripcion } = req.body;
    if (nombre && estado && descripcion) { //validación de que estamos recibiendo todos estos datos.
        const id = lists.length + 1; //como id es un identificador unico y que debe generarse solo, lo definimos aqui
        const newList = {...req.body, id}; //pasamos todo el objeto del request body en un nuevo objeto
        console.log(newList);
        lists.push(newList);//almacenamos en memoria el nuevo objeto
        res.json(lists);
    } else {
        res.send('Petición errónea');//en caso de error en la petición.
    }
});

router.put('/:id', (req, res) => {//Función PUT.
    const { id } = req.params;
    const {nombre, estado, descripcion } = req.body;
    
    if (nombre) { //validación de que estamos recibiendo este dato.
        _.each(lists, (list, i) => {
            if (list.id == id) {
                list.nombre = nombre;//asignamos el nuevo dato
            }
        });
    }
    
    if (estado) {//validación de que estamos recibiendo este dato.
        _.each(lists, (list, i) => {
            if (list.id == id) {
                list.estado = estado;//asignamos el nuevo dato
            }
        });
    }

    if (descripcion) {//validación de que estamos recibiendo este dato.
        _.each(lists, (list, i) => {
            if (list.id == id) {
                list.descripcion = descripcion;//asignamos el nuevo dato
            }
        });
    }

    res.json(lists);//enviamos la respuesta de objetos JSON

});

router.delete('/:id', (req, res) => {//Funcion DELETE.
    const { id } = req.params;
    _.each(lists, (list, i) => {//empieza a recorrer todo el arreglo de lists, del cual se obtiene una funcion que recibe una lista y un indice.
        if (list.id == id) {//si se cumple esta sentencia, removemos el id solicitado
            lists.splice(i, 1);//aqui se remueve con la funcion SPLICE
        }
    });
    res.json(lists);
});

module.exports = router;//exportamos al index.js principal