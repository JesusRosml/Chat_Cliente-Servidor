//eliminamos importaciones
import './App.css';
import io from 'socket.io-client'//importamos modulo, con esto ya puedo comunicarme con el backend 
import {useState, useEffect} from 'react'

const socket = io('http://localhost:4000')//pasamos la direccion en donde esta la direccion de web socket la variable socket nos permite comunicar lo que realmente no quiere mandar (Enviar) entre el frontend y backent
//Eliminamos contenido que viene por defecto dentro del div, colocamos contenido propio

//Interfaz que permite al usuario escribir algo y enviarlo
function App() {
  const [message, setMessage] = useState("");//la variable "message" sirve para guardar el mesnaje que el usuario escriba y // y setMessage para establecerlo
  const [messages, setMessages] = useState([]); //Interfaz para usuario


  const handleSubmit = (e) => {
    e.preventDefault();//Cancela el comportamiento por defecto
    socket.emit("message", message);//Enviar mensaje del usuario al backend socket emite evento 
    const newMessage ={
      body: message,
      from: "Me"
    }
    setMessages([newMessage, ...messages])
    setMessage("");//sirve para limpiar contenido al enviar el mensaje 

  }

  useEffect(() => {//permite ejecutar codigo cuando carga la aplicacion 
    const receiveMessage = message => {
      setMessages([message, ...messages])
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages])


   //De esta menera tenemos la forma de capturar el mensaje 
  return (                                  
    <div className="h-screen bg-zinc-600 text-white flex items-center justify-center">
  
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-10">
        <h1 className="text-2x1 font-bold my-5">Chat C-S ITESCO</h1>
        <input type="text" onChange={e => setMessage(e.target.value)} 
          value={message} 
          className="border-2 border-zinc-500 p-2 text-black w-full"
          /> 

        <ul className="h-80 overflow-y-auto">
        {messages.map((message, index) => (//por cada mensaje crea un div 
          <li key={index} className={`my-2 p-2 table text-sm rounded-md ${
            message.from === "Me" ? "bg-sky-700 ml-auto": "bg-black"}`}>
            <p>
              {message.from}: {message.body}
            </p>
          </li>
        ))}
        </ul>
      </form>

    </div>
  );
}

export default App;
