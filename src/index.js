const express = require("express");
const app = express();
const morgan = require("morgan")

//configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));//para visualizar por consola las peticiones
app.use(express.urlencoded({extended: false}));//tratar de entender los datos que vienen de formularios, como texto.
app.use(express.json());//para recibir formatos JSON

//routes 
app.use('/api/lists',require('./routes/lists')); //con "api/lists" sentenciamos que todas las rutas comenzaran con esa ruta, por buena practica de apis

//iniciamos el servidor en el puerto 3000
app.listen(app.get('port'), () => {
 console.log(`El servidor está inicializado en el puerto ${app.get('port')}`);
});