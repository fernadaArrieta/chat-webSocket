const express = require("express");
const {Server} = require("socket.io")
const app = express();
 
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`server listening on port ${PORT}`));

app.use(express.static(__dirname+"/public"));

//configugar el server de websocket
const io = new Server (server);

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];


//detectar cada socket de un cliente que se conecte
io.on("connection",(socket) =>{
    console.log("nuevo cliente conectado")
  socket.emit("messagesChat", messages); 
  
  //recibimos el mensaje
  socket.on("newMsg", (data)=>{
    messages.push(data);
    //enviamos los msjs a los socket conectados
    io.sockets.emit("messagesChat", messages)
  })
})