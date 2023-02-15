import './App.css';
import io from "socket.io-client";
import Board from './Components/Board';
import JoinGame from './Components/JoinGame';
import PastGames from './Components/PastGames';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

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
    <div className="App" style={{display:"flex", flexDirection:"column"}}>
    <Typography variant='h1'>Tictactoe</Typography><br/><br/>
      <Routes>
        <Route path="/" element={
          <div>
            <Typography variant="h4">Enter username</Typography>
            <Stack direction="row">
              <TextField label="Username" variant="outlined" value={username} onChange={ async (event) => {
                setUsername(event.target.value);}}/>
              <Button variant="contained" onClick={() => {navigate("rooms")}}>New Game</Button>
              <Button variant="contained" onClick={() => {navigate("past")}}>Past Games</Button>
            </Stack>
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
