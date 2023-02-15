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
                <h2>Create Game</h2>
                <input placeholder="Room Name" value={rn} onChange={(event) => {
                setRn(event.target.value);}}></input>
                <button onClick={createRoom}>Create Session</button>
            </div>
            <div className="rooms">
                {rooms ? rooms.map((r) => {
                    return(
                        <ul key={r}>{r} <button onClick={() => {joinRoom(r)}}>Join room</button></ul>
                    );
                }) : []}
            </div>
        </div>
    )
}

export default JoinGame;