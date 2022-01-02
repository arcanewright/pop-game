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

let users = [];

app.get("/", (req, res) =>{
    res.send("<h1>Pop Game Server</h1>")
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)
    users.push({socket: socket.id, user: "", userName: ""})
    socket.on("hello", () => {
        console.log(socket.id + " said hello!")
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