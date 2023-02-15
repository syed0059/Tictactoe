import './App.css';
import io from "socket.io-client";
import Board from './Components/Board';
import JoinGame from './Components/JoinGame';
import PastGames from './Components/PastGames';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const newSocket = io(`ws://${window.location.hostname}:8080`);

function App() {
  
  //Create array of rooms with button to join
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [past, setPast] = useState({});

  
  newSocket.on("allRooms", (message) => {
    setRooms(message);
  })

  newSocket.on("pastgames", (msg) => {
    console.log("past received",msg);
    setPast(msg);
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div>
              <h2>Enter username</h2>
              <input placeholder="Username" value={username} onChange={ async (event) => {
                setUsername(event.target.value);}}></input>
              <button onClick={() => {navigate("rooms")}}>New Game</button>
            <button onClick={() => {navigate("past")}}>Past Games</button>
          </div>
        } />
        <Route path="/past" element={<PastGames past={past}/>} />
        <Route path='/rooms' element={<JoinGame socket={newSocket} username={username} rooms={rooms}/>} />
        <Route path="/game" element={<Board socket={newSocket} username={username} past={past} setPast={setPast}/>} />
      </Routes>
    </div>
  );
}

export default App;
