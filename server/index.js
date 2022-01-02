import express from "express";
import http from "http";
import {Server} from "socket.io";

const PORT = process.env.PORT || 3001

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) =>{
    res.send("<h1>Pop Game Server</h1>")
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)
})

server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})