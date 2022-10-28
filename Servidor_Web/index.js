//Importamos los modulos para crear mi servidor
import express from "express";//De esta manera importamos modulos
import morgan from "morgan";
import {Server as SocketServer } from 'socket.io';//importaciones de servidores 
import http from 'http'
import cors from 'cors'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'

import {PORT} from './confi_puertos.js'//De esta manera importamos el archivo en donde configuramos los puertos 

//lineas de codigo para que el server funcione 
const app = express();//Aplicacion de express
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const server = http.createServer(app)//Esto luego lo convierte a un servidor http
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000',//conectamos nuestro frontend con el backend
    }
})//Finalmente este servidor se lo pasamos como parametro  al servidor de web socket

app.use(cors())//Cualquier servidor externo al local host 3000, va a poder conectarse 
app.use(morgan("dev"));

io.on('connection', (socket) => {//conectamos nuestros servidores, (socket)<--informacion 
    console.log(socket.id)//<-- es el id del usuario conectado
    
    socket.on('message', (message) => { //esta funcion recibe el mensaje enviado por el frontend
        socket.broadcast.emit('message', { //sirve para hacer un reenvio a los otros clientes
            body: message,
            from: socket.id
        })
    })//mmsalkmlm
})

app.use(express.static(join(__dirname, '../cliente/build')))

server.listen(PORT);//Utiliza nuestro puerto importado
console.log("Server started on port ", PORT);//concatena con el puerto que importamos
//Finalmente ya tenemos configurado nuestros servidores 