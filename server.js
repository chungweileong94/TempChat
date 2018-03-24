const express = require("express");
const port = process.env.PORT || 8888;

let app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile("chat.html");
});

let server = app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
});