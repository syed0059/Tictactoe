const http = require("http").createServer();

const io = require("socket.io")(http, {
    cors: {origin: "*"}
});

const rooms = {};
const past = {}

io.on("connection", (socket) => {
    console.log("a user connected");
    io.emit("allRooms", Object.keys(rooms));
    io.sockets.emit("pastgames", past);

    socket.on("createRoom", (room, playername) => {
        socket.join(room);
        console.log(socket.id, "created room", room);
        rooms[room] = [socket.id];
        past[room] = [];
        io.emit("allRooms", Object.keys(rooms));
    })

    socket.on("joinRoom", (room, playername) => {
        socket.join(room);
        rooms[room].push(socket.id);
        console.log(socket.id, "joined room", room);
        console.log(rooms);
        console.log("past", past);
    })

    socket.on("sendMove", (move) => {
        console.log("move ", move);
        const currentRoom = Object.keys(rooms).find(key => rooms[key].includes(move.id));
        socket.to(currentRoom).emit("sendMove", move);
        past[currentRoom].push(`Player ${move.username} - Square ${move.square} - ${move.player}`);
    })

    socket.on("won", async (message) => {
        console.log("won by", message);
        const currentRoom = Object.keys(rooms).find(key => rooms[key].includes(message.id));
        past[currentRoom].push(`Won by ${message.username} - ${message.player}`);
        io.sockets.emit("pastgames", past);
        console.log(past);
    })

    socket.on("disconnecting", () => {
        console.log(rooms)
        for (const x of socket.rooms) {
            if (x === socket.id) {
                continue;
            }

            delete rooms[x];
            console.log(rooms)
        }
        io.emit("allRooms", Object.keys(rooms));
    })


});

http.listen(8080, () => console.log("listening"))
