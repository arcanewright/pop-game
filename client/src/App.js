import react, {useEffect, useState} from "react";
import io from "socket.io-client"
import './App.css';

const socket = io("http://localhost:3001");

const App = () => {
  const [userID, setUserID] = useState(window.localStorage.getItem("userID"));

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
    <div className="App">
      <h1>Pop Game Site</h1>
      <h2>My id is: {userID}</h2>
      <button onClick={() => socket.emit("hello")}>Say hello</button>
      <button onClick={() => setUserID(null)}>Change ID</button>
    </div>
  );
}

export default App;
