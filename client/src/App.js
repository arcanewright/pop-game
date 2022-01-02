import react, {useEffect, useState} from "react";
import io from "socket.io-client"
import './App.css';

const socket = io("http://localhost:3001");

const App = () => {

  const getSocketID = () => {
    return socket.id;
  }


  return (
    <div className="App">
      <h1>Pop Game Site</h1>
      <h2>ID: {}</h2>
    </div>
  );
}

export default App;
