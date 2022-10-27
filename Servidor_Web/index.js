//Importamos los modulos para crear mi servidor
import express from "express";//De esta manera importamos modulos
import morgan from "morgan";
import {Server as SocketServer } from 'socket.io';//importaciones de servidores 
import http from 'http'
import cors from 'cors'

import {PORT} from './confi_puertos.js'//De esta manera importamos el archivo en donde configuramos los puertos 

//lineas de codigo para que el server funcione 
const app = express();//Aplicacion de express
const server = http.createServer(app)//Esto luego lo convierte a un servidor http
const io = new SocketServer(server)//Finalmente este servidor se lo pasamos como parametro  al servidor de web socket

app.use(cors())//Cualquier servidor externo al local host 3000, va a poder conectarse 
app.use(morgan("dev"));

app.listen(PORT);//Utiliza nuestro puerto importado
console.log("Server started on port ", PORT);//concatena con el puerto que importamos
//Finalmente ya tenemos configurado nuestros servidores 