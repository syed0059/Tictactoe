import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinGame({socket, username, rooms}) {
    const navigate = useNavigate();

    const [rn, setRn] = useState("");

    const createRoom = async () => {
        await socket.emit("createRoom", rn, username);
        navigate("/game");
    }

    const joinRoom = async (roomName) => {
        await socket.emit("joinRoom", roomName, username);
        navigate("/game");
    }

    return(
        <div>
            <div className="joinGame">
                <Typography variant="h2">Create Game</Typography>
                <TextField label="Room Name" variant="outlined" value={rn} onChange={(event) => {
                setRn(event.target.value);}}/>
                <Button variant="outlined" onClick={createRoom}>Create Session</Button>
            </div>
            <div className="rooms" style={{display:"flex", flexDirection:"column"}}>
                {rooms ? rooms.map((r) => {
                    return(
                        <Button key={r} variant="outlined" onClick={() => {joinRoom(r)}}>Join {r}</Button>
                    );
                }) : []}
            </div>
        </div>
    )
}

export default JoinGame;