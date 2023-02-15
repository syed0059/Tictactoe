import React, {useEffect, useState} from "react";
import Square from "./Square";

function Board({socket, username, past, setPast}) {

    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");

    
    useEffect(() => {
        const winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (const pattern of winningPatterns) {
            if (board[pattern[0]] === "") {
                continue;
            }
            if (board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
                alert("Game over");
                if (player === board[pattern[2]]) {
                    socket.emit("won", {"id": socket.id, player, username});
                }
                return;
            }
        }
        return;
    }, [board, socket, player, username]);
    

    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");
            await socket.emit("sendMove", {square, "id": socket.id, player, username})
            setBoard(board.map((val, index) => {
                if (index === square && val === "") {
                    return player;
                }
                return val;
            }))
        }
    }
    
    socket.on("pastgames", (past) => {
        //console.log("past received",past);
        setPast(past);
    })


    socket.on("updateBoard", (message) => {
        setBoard(message);
    })


    socket.on("sendMove", (move) => {
        console.log("player id", socket.id);
        if (move.id !== socket.id) {
            const currentPlayer = move.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(board.map((val, index) => {
                if (index === move.square && val === "") {
                    return move.player;
                }
                return val;
            }))
        }
    })

    return(
        <div className="board">
            <div className="row" aria-label="row 1" >
                <Square val={board[0]} chooseSquare={() => {chooseSquare(0)}} pos="Row 1 Square 1"/>
                <Square val={board[1]} chooseSquare={() => {chooseSquare(1)}} pos="Row 1 Square 2"/>
                <Square val={board[2]} chooseSquare={() => {chooseSquare(2)}} pos="Row 1 Square 3"/>
            </div>
            <div className="row" aria-label="row 1">
                <Square val={board[3]} chooseSquare={() => {chooseSquare(3)}} pos="Row 2 Square 1"/>
                <Square val={board[4]} chooseSquare={() => {chooseSquare(4)}} pos="Row 2 Square 2"/>
                <Square val={board[5]} chooseSquare={() => {chooseSquare(5)}} pos="Row 2 Square 3"/>
            </div>
            <div className="row" aria-label="row 1">
                <Square val={board[6]} chooseSquare={() => {chooseSquare(6)}} pos="Row 3 Square 1"/>
                <Square val={board[7]} chooseSquare={() => {chooseSquare(7)}} pos="Row 3 Square 2"/>
                <Square val={board[8]} chooseSquare={() => {chooseSquare(8)}} pos="Row 3 Square 3"/>
            </div>
        </div>
    )
}

export default Board;