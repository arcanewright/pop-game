import react, {useEffect, useState} from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

const socket = io("http://localhost:3001");

const App = () => {
  const [userID, setUserID] = useState(window.localStorage.getItem("userID"));
  const [color, setColor] = useState("black")
  const [currentRoom, setCurrentRoom] = useState("none");
  const [players, setCurrentPlayers] = useState([]);

  
  socket.on(("newColor"), (newColor) => {
    setColor(newColor);
  })

  socket.on(("roomUpdate"), (room) => {
    setCurrentRoom(room.gameRoom);
    setCurrentPlayers(room.players);
  })

  useEffect(() => {
    if (!userID) {
      const newID = genID();
      setUserID(newID);
      window.localStorage.setItem("userID", newID);
      socket.emit("changeID", newID)
    }
  })

  const genID = () => {
    return (10000000* Math.random()).toString();
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<StartScreen></StartScreen>}></Route>
          <Route path=":room" element={<Room></Room>}>

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Room = ({}) => {
  return (<div>
    <h1>Room</h1>
  </div>)
}

const StartScreen = ({roomCode, setRoomCode}) => {

  const [inputRoomCode, setInputRoomCode] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);

  const validateCode = (code) => {
    if (code) {
      
    }
  }

  return (<div className="start-screen">
    <h1>Pop Game Site</h1>
    <div>
      <h2>Room</h2>
      <input type="text" value={roomCode} style={{color: invalidCode ? "red" : "black"}} onChange={(e) => {validateCode(e.target.value); setInputRoomCode(e)}}></input>
    </div>
    <div>
      <button>Join Game</button>
      <h3>Join an existing game as a player</h3>
    </div>
    <div>
      <button>Create New Game</button>
      <h3>Create a new game as the display</h3>
    </div>
  </div>)
}

export default App;
