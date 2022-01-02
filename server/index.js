import express from "express";
import http from "http";
import {Server} from "socket.io";

const PORT = process.env.PORT || 3001

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {
    origin:"http://localhost:3000",
    methods:["GET", "POST"],


}});

let color = "yellow"

let users = [];

let games = [];

const gamePrototype = {
    gameRoom:"AAAA",
    mainUser:"",
    players:[],
    state:""
}

app.get("/", (req, res) =>{
    res.send("<h1>Pop Game Server</h1>")
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)
    socket.emit("newColor", color);
    users.push({socket: socket.id, user: "", userName: ""})
    socket.on("hello", () => {
        console.log(socket.id + " said hello!")
    })
    socket.on("askForColorChange", () => {
        color = "rgb(" + Math.random()*256 + ", " + Math.random()*256 + ", " + Math.random()*255 + ")";
        socket.emit("newColor", color);
    })
    socket.on("createGame", () => {
        const newRoom = {gameRoom:"ABCD", mainUser:socket.id, players:[], state:""};
        games.push(newRoom)
        console.log("new game created: " + newRoom.gameRoom)
        socket.emit("roomUpdate", newRoom)
    })
    socket.on("joinGame", (roomCode) => {
        let room = games.find((e)=> e.gameRoom === roomCode);
        if (room) {
            room.players.push(socket.id);
            console.log("Current players: " + room.players)
            games[games.findIndex((e) => e.gameRoom === roomCode)] = room;
            for (let playerID of room.players) {
                io.in(playerID).emit("roomUpdate", room);
            }
            
        }
        
    })
    socket.on("changeID", (newID) => {
        const newUser = {...users.find((e, i) => e.socket === socket.id), user:newID}
        users[users.findIndex((e) => e.socket === socket.id)] = newUser;
        console.log("User " + socket.id + " changed their ID to " + newID);
    } )
})



server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})