const express = require("express");
const app = express();
const morgan = require("morgan")

//settings
app.set('port', process.env.PORT || 3000);// process.env.PORT es para el caso de que exista algun puerto definido por algun servicio del sistema o nube que o use en el caso contrario, solo usar el puerto 3000
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));//para visualizar por consola las peticiones
app.use(express.urlencoded({extended: false}));//tratar de entender los datos que vienen de formularios, como texto
app.use(express.json());//para recibir formatos json y entenderlos

//routes 
app.use('/api/lists',require('./routes/lists')); //con api/todolist estamos sentenciando que todas las rutas comenzaran con esa ruta

// para iniciar el servidor en el puerto 3000
app.listen(app.get('port'), () => {
 console.log(`El servidor está inicializado en el puerto ${app.get('port')}`);
});